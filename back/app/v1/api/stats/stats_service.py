import pandas as pd
from app.v1.api.stats.stats_errors import InvalidConditionFormat, DataFrameProcessingError
from sqlalchemy.orm import aliased
from app.v1.models.births import Birth
from app.v1.models.names import Name
from app.v1.models.years import Year
from app.v1.api.stats.stats_model import StatsModel
from app.v1.api.charts.charts_service import ChartServiceV2

ROUND = 3

class StatsService:
    aggregation_mapper = {
        'mean': 'Moyenne',
        'sum': 'Total',
        'median': 'Médiane',
        'min': 'Minimum',
        'max': 'Maximum'
    }

    @staticmethod
    async def get_stats(payload):
        indexes, columns, years, names, gender, conditions, aggregations, limit, orderBy, chart_type, chart_orientation, title = StatsService.extract_payload_info(payload)

        names_alias = aliased(Name, name='n')
        years_alias = aliased(Year, name='y')
        births_alias = aliased(Birth, name='b')

        conditions = []
        try:
            conditions = StatsService.get_conditions(payload, names_alias, years_alias, births_alias)

        except KeyError as e:
            raise InvalidConditionFormat()

        query = StatsModel.get_query(conditions, names_alias, years_alias, years, names, gender)
        
        try:
            df = await StatsService.get_dataframe(query)

            columns_without_birth = list(columns)

            if("births" in columns_without_birth):
                columns_without_birth.remove("births")

            if(len(indexes) > 0):
                df = df.pivot_table(index=indexes, columns=columns_without_birth, values='births', aggfunc='sum')

            else:
                if(len(columns_without_birth) > 0):
                    df = df.groupby(columns_without_birth, as_index=False)['births'].sum()

            df = StatsService.do_aggregations(df, indexes, columns, aggregations)

            df = await StatsService.apply_order_and_limitation(df, orderBy, limit)

            chart_service = ChartServiceV2(df)
            chart = chart_service.generate_chart(chart_type, chart_orientation, title)

            df = StatsService.clean_dataframe(df)

            df.reset_index(inplace=True)  
            cells = df.columns.tolist() 
            rows = df.values.tolist() 
            
            return {
                "cells": cells,
                "rows": rows,
                "chart": chart
            }
        except Exception as e:
            DataFrameProcessingError()

    @staticmethod
    async def get_dataframe(query) -> pd.DataFrame:
        try:
            df = pd.read_sql(query.statement, query.session.bind)
            return df
        except Exception as e:
            DataFrameProcessingError()

    @staticmethod
    async def apply_order_and_limitation(df, orderBy=None, limit=None) -> pd.DataFrame:
        try:
            if orderBy:
                field = orderBy.get('field')
                order = orderBy.get('order', 'asc').lower()

                df = df.sort_values(by=field, ascending=(order == 'asc'))
            if limit:
                df = df.head(limit)

            return df
        
        except Exception as e:
            DataFrameProcessingError()

    @staticmethod
    def extract_payload_info(payload):
        indexes = payload.get('indexes', [])
        columns = payload.get('columns', ['years', 'names', 'gender', 'births'])

        years = payload.get('years', {})
        names = payload.get('names', {})
        gender = payload.get('gender', {})
        conditions = payload.get('conditions', [])
        aggregations = payload.get('aggregations', {
            "years": None,
            "names": None,
            "gender": None,
            "births": None
        })

        limit = payload.get('limit', None)
        orderBy = payload.get('orderBy', None)
        chart_type = payload.get('chartType', None)
        chart_orientation = payload.get('chartOrientation', 'v')
        title = payload.get('title', 'Graphique')

        return indexes, columns, years, names, gender, conditions, aggregations, limit, orderBy, chart_type, chart_orientation, title

    @staticmethod
    def aggregate_by_decade(df: pd.DataFrame, indexes: list) -> pd.DataFrame:
        # Déterminer l'emplacement de 'years' dans l'index
        year_index = None
        for i, idx_name in enumerate(df.index.names):
            if idx_name in indexes and idx_name == 'years':
                year_index = i
                break
        
        if year_index is None:
            raise ValueError("'years' not found in index or indexes list.")

        # Extraire les années à partir du multi-index
        years = df.index.get_level_values(year_index)
        
        # Créer une colonne 'decade' en fonction des années
        df['decade'] = (years // 10) * 10

        df_reset = df.reset_index()

        df_decade = df_reset.groupby('decade').sum()
        
        df_decade.drop(columns='decade', errors='ignore', inplace=True)
        df_decade.drop(columns='years', errors='ignore', inplace=True)

        return df_decade

    @staticmethod
    def filter_compound_names(df: pd.DataFrame) -> pd.DataFrame:
        df_reset = df.reset_index()

        df_reset['is_compound'] = df_reset['names'].str.contains(r'.*[- ].*', regex=True)

        df_filtered = df_reset[df_reset['is_compound']]

        df_filtered.drop(columns=['is_compound'], inplace=True)
        
        df_filtered.set_index('names', inplace=True)

        return df_filtered

    @staticmethod
    def add_summary_row(df: pd.DataFrame, aggregation_type: str, cells) -> pd.DataFrame:
        summary_data = {}
        
        if('births' in cells):
            df = StatsService.add_summary_row_on_birth_column(df, aggregation_type)
            return df

        for column in cells:
            if(column not in ['years', 'gender', 'names', 'births']):
                if aggregation_type == 'mean':
                    summary_data[column] = (df[column].mean()).round(ROUND)
                elif aggregation_type == 'sum':
                    summary_data[column] = (df[column].sum()).round(ROUND)
                elif aggregation_type == 'median':
                    summary_data[column] = (df[column].median()).round(ROUND)
                elif aggregation_type == 'min':
                    summary_data[column] = (df[column].min()).round(ROUND)
                elif aggregation_type == 'max':
                    summary_data[column] = (df[column].max()).round(ROUND)
                else:
                    raise ValueError(f"Unknown aggregation type: {aggregation_type}")
                
                translated_aggregation = StatsService.aggregation_mapper.get(aggregation_type, aggregation_type)

                summary_df = pd.DataFrame(summary_data, index=[translated_aggregation])
        
        return pd.concat([df, summary_df], axis=0)

    @staticmethod
    def add_summary_row_on_birth_column(df: pd.DataFrame, aggregation_type: str) -> pd.DataFrame:
        if aggregation_type == 'mean':
            mean_value = (df['births'].mean()).round(ROUND)
            summary_df = pd.DataFrame({'births': [mean_value]}, index=['Moyenne'])
            return pd.concat([df, summary_df], axis=0)

        elif aggregation_type == 'sum':
            sum_value = (df['births'].sum()).round(ROUND)
            summary_df = pd.DataFrame({'births': [sum_value]}, index=['Total'])
            return pd.concat([df, summary_df], axis=0)

        elif aggregation_type == 'median':
            median_value = (df['births'].median()).round(ROUND)
            summary_df = pd.DataFrame({'births': [median_value]}, index=['Médiane'])
            return pd.concat([df, summary_df], axis=0)

        elif aggregation_type == 'min':
            min_value = (df['births'].min()).round(ROUND)
            summary_df = pd.DataFrame({'births': [min_value]}, index=['Minimum'])
            return pd.concat([df, summary_df], axis=0)

        elif aggregation_type == 'max':
            max_value = (df['births'].max()).round(ROUND)
            summary_df = pd.DataFrame({'births': [max_value]}, index=['Maximum'])
            return pd.concat([df, summary_df], axis=0)

        else:
            return df

    @staticmethod
    def clean_dataframe(df: pd.DataFrame) -> pd.DataFrame:
        df = df.fillna('/')
        
        # Remplacer les valeurs infinies par un indicateur de chaîne
        df.replace([float('inf'), -float('inf')], None, inplace=True)

        return df

    @staticmethod
    def calculate_names_proportions(df: pd.DataFrame) -> pd.DataFrame:
        total_births = df.sum(axis=1)
        
        df['proportions'] = ((total_births / total_births.sum()) * 100).round(ROUND)
        
        return df
    
    @staticmethod
    def calculate_gender_proportions(df: pd.DataFrame) -> pd.DataFrame:
        # Calcul du total des naissances par ligne (année, par exemple)
        total_births_per_row = df.sum(axis=1)
        
        # Calcul du total des naissances sur l'ensemble des lignes et des colonnes
        total_births_overall = total_births_per_row.sum()
        
        # Calcul des proportions pour chaque genre (chaque colonne représente un genre)
        for column in df.select_dtypes(include=['number']).columns:
            df[column + '_proportion'] = ((df[column] / total_births_per_row) * 100).round(ROUND)
        
        # Ajout de la colonne 'proportion_total' pour représenter la proportion sur l'ensemble
        df['proportion_total'] = ((total_births_per_row / total_births_overall) * 100).round(ROUND)
        
        return df
    
    @staticmethod
    def aggregate_names_length(df: pd.DataFrame) -> pd.DataFrame:
        # Assure que 'names' est dans les index
        if 'names' not in df.index.names:
            raise ValueError("'names' must be in the index for this aggregation.")
        
        # Réinitialise l'index pour travailler avec les colonnes
        df_reset = df.reset_index()

        # Calculer la longueur des prénoms
        df_reset['Tailles'] = df_reset['names'].apply(len)
        
        # Compter le nombre de prénoms pour chaque longueur
        length_counts = df_reset.groupby('Tailles').size().reset_index(name='Nombre de prénoms')
        
        # Définir 'Tailles' comme index
        length_counts.set_index('Tailles', inplace=True)
        
        return length_counts
    
    @staticmethod
    def get_conditions(payload, names_alias, years_alias, births_alias):
        conditions = []
        for condition in payload.get('conditions', []):
            try:
                field = condition['field']
                value = condition['value']
                cond = condition['condition']

                if field == 'gender':
                    if cond == "=":
                        conditions.append(names_alias.gender == value)
                    elif cond == "LIKE":
                        conditions.append(names_alias.gender.like(value))
                    elif cond == "IN":
                        values_list = value.split(',')
                        conditions.append(names_alias.gender.in_(values_list))
                    elif cond == "REGEX":
                        conditions.append(names_alias.gender.op('~')(value))
                        
                elif field == 'names':
                    if cond == "=":
                        conditions.append(names_alias.name == value)
                    elif cond == "LIKE":
                        conditions.append(names_alias.name.like(value))
                    elif cond == "IN":
                        values_list = value.split(',')
                        conditions.append(names_alias.name.in_(values_list))
                    elif cond == "REGEX":
                        # REGEX des prénoms composés => .*[- ].*
                        conditions.append(names_alias.name.op('~')(value))
                        
                elif field == 'years':
                    if cond == "=":
                        conditions.append(years_alias.year == int(value))
                    elif cond == ">":
                        conditions.append(years_alias.year > int(value))
                    elif cond == ">=":
                        conditions.append(years_alias.year >= int(value))
                    elif cond == "<":
                        conditions.append(years_alias.year < int(value))
                    elif cond == "<=":
                        conditions.append(years_alias.year <= int(value))
                    elif cond == "IN":
                        values_list = [int(v) for v in value.split(',')]
                        conditions.append(years_alias.year.in_(values_list))
                    elif cond == "REGEX":
                        conditions.append(years_alias.year.op('~')(value))
                        
                elif field == 'births':
                    if cond == "=":
                        conditions.append(births_alias.births == int(value))
                    elif cond == ">":
                        conditions.append(births_alias.births > int(value))
                    elif cond == ">=":
                        conditions.append(births_alias.births >= int(value))
                    elif cond == "<":
                        conditions.append(births_alias.births < int(value))
                    elif cond == "<=":
                        conditions.append(births_alias.births <= int(value))
                    elif cond == "IN":
                        values_list = [int(v) for v in value.split(',')]
                        conditions.append(births_alias.births.in_(values_list))
                    elif cond == "REGEX":
                        conditions.append(births_alias.births.op('~')(value))
                        
                else:
                    raise InvalidConditionFormat()
            except Exception as e:
                raise InvalidConditionFormat()

        return conditions

    @staticmethod
    def do_aggregations(df: pd.DataFrame, indexes, columns, aggregations) -> pd.DataFrame:
        if 'names' in indexes:
            if aggregations.get('names') == 'proportions':
                df = StatsService.calculate_names_proportions(df)

            if aggregations.get('names') == 'compounds-names':
                df = StatsService.filter_compound_names(df)

            if aggregations.get('names') == 'names-length':
                df = StatsService.aggregate_names_length(df)

        if 'years' in indexes and aggregations.get('years') == 'decades':
            df = StatsService.aggregate_by_decade(df, indexes)

        if 'gender' in columns and aggregations.get('gender') == 'proportions':
            df = StatsService.calculate_gender_proportions(df)

        if 'births' in columns and aggregations.get('births') in ['mean', 'sum', 'median', 'max', 'min']:
            cells = df.columns.tolist() 
            df = StatsService.add_summary_row(df, aggregations.get('births'), cells)

        return df

