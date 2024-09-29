import pandas as pd
from app.v1.api.stats.stats_errors import InvalidConditionFormat, DataFrameProcessingError
from sqlalchemy.orm import aliased
from app.v1.models.births import Birth
from app.v1.models.names import Name
from app.v1.models.years import Year
from app.v1.api.stats.stats_model import StatsModel
from app.v1.api.charts.charts_service import ChartServiceV2
from app.v1.api.stats.stats_aggregations import StatsAgregations

class StatsService:

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

            df = await StatsAgregations.apply_order_and_limitation(df, orderBy, limit)

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
    def clean_dataframe(df: pd.DataFrame) -> pd.DataFrame:
        df = df.fillna('/')
        
        # Remplacer les valeurs infinies par un indicateur de chaîne
        df.replace([float('inf'), -float('inf')], None, inplace=True)

        return df

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
                df = StatsAgregations.calculate_names_proportions(df)

            if aggregations.get('names') == 'compounds-names':
                df = StatsAgregations.filter_compound_names(df)

            if aggregations.get('names') == 'names-length':
                df = StatsAgregations.aggregate_names_length(df)

        if 'years' in indexes :
            if aggregations.get('years') == 'decades':
                df = StatsAgregations.aggregate_by_decade(df, indexes)

            if aggregations.get('years') == 'count-names-per-year' :
                df = StatsAgregations.count_names_per_year(df)
        
        if 'gender' in columns and aggregations.get('gender') == 'proportions':
            df = StatsAgregations.calculate_gender_proportions(df)

        if 'births' in columns and aggregations.get('births') in ['mean', 'sum', 'median', 'max', 'min']:
            cells = df.columns.tolist() 
            df = StatsAgregations.add_summary_row(df, aggregations.get('births'), cells)

        return df

