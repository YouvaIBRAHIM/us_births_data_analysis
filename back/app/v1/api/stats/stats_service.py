from typing import List, Optional
import pandas as pd
from sqlalchemy.orm import Session
from sqlalchemy import text
from app.v1.api.stats.stats_errors import InvalidConditionFormat, DatabaseConnectionError, DataFrameProcessingError
from sqlalchemy.orm import aliased
from sqlalchemy.exc import SQLAlchemyError
from app.v1.models.births import Birth
from app.v1.models.names import Name
from app.v1.models.years import Year
from app.v1.api.stats.stats_model import StatsModel
from fastapi.encoders import jsonable_encoder
import numpy
class StatsService:
    
    @staticmethod
    async def get_stats(payload):
        indexes, columns, years, names, gender, conditions, aggregations, limit, orderBy = StatsService.extract_payload_info(payload)

        # Utiliser des alias uniques pour les tables
        names_alias = aliased(Name, name='n')
        years_alias = aliased(Year, name='y')
        births_alias = aliased(Birth, name='b')

        conditions = []
        try:
            # Obtenir les conditions de filtrage
            conditions = StatsService.get_conditions(payload, names_alias, years_alias, births_alias)
        except KeyError as e:
            raise InvalidConditionFormat()

        try:
            # Récupérer les données brutes
            query = StatsModel.get_query(conditions, names_alias, years_alias, years, names, gender, orderBy, limit)

        except SQLAlchemyError:
            raise DatabaseConnectionError()
        try:
            df = await StatsService.get_dataframe(query)


            if(len(indexes) > 0):
                df = df.pivot_table(index=indexes, columns=columns, values='births', aggfunc='sum')
            else:
                columns_without_birth = list(columns)

                if("births" in columns_without_birth):
                    columns_without_birth.remove("births")

                if(len(columns_without_birth) > 0):
                    df = df.groupby(columns_without_birth, as_index=False)['births'].sum()
            

            if 'years' in columns and aggregations.get('years') == 'decades':
                df = StatsService.aggregate_by_decade(df)
            if 'names' in columns and aggregations.get('names') == 'compounds-names':
                df = StatsService.filter_compound_names(df)
            if 'births' in columns and aggregations.get('births') in ['mean', 'sum', 'median', 'max', 'min']:
                df = StatsService.add_summary_row(df, aggregations.get('births'))

            df = StatsService.clean_dataframe(df)

            df.reset_index(inplace=True)  
            cells = df.columns.tolist() 
            rows = df.values.tolist() 

            return {
                "cells": cells,
                "rows": rows
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

        return indexes, columns, years, names, gender, conditions, aggregations, limit, orderBy

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
                elif field == 'names':
                    if cond == "=":
                        conditions.append(names_alias.name == value)
                    elif cond == "LIKE":
                        conditions.append(names_alias.name.like(value))
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
                else:
                    raise InvalidConditionFormat()
            except Exception as e:
                raise InvalidConditionFormat()

        return conditions
    
    @staticmethod
    def aggregate_by_decade(df: pd.DataFrame) -> pd.DataFrame:
        df['decade'] = (df['years'] // 10) * 10
        return df.groupby('decade', as_index=False)['births'].sum()

    @staticmethod
    def filter_compound_names(df: pd.DataFrame) -> pd.DataFrame:
        df['is_compound'] = df['names'].str.contains(r'[ -]', regex=True)
        df = df[df['is_compound']]
        df.drop(columns=['is_compound'], inplace=True)
        return df

    @staticmethod
    def add_summary_row(df: pd.DataFrame, aggregation_type: str) -> pd.DataFrame:
        if aggregation_type == 'mean':
            mean_value = df['births'].mean()
            summary_df = pd.DataFrame({'births': [mean_value]}, index=['Moyenne'])
            return pd.concat([df, summary_df], axis=0)

        elif aggregation_type == 'sum':
            sum_value = df['births'].sum()
            summary_df = pd.DataFrame({'births': [sum_value]}, index=['Total'])
            return pd.concat([df, summary_df], axis=0)

        elif aggregation_type == 'median':
            median_value = df['births'].median()
            summary_df = pd.DataFrame({'births': [median_value]}, index=['Médiane'])
            return pd.concat([df, summary_df], axis=0)

        elif aggregation_type == 'min':
            min_value = df['births'].min()
            summary_df = pd.DataFrame({'births': [min_value]}, index=['Minimum'])
            return pd.concat([df, summary_df], axis=0)

        elif aggregation_type == 'max':
            max_value = df['births'].max()
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