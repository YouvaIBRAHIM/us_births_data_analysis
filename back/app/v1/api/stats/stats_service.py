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

class StatsService:
    
    @staticmethod
    async def get_stats(payload):
        indexes, columns, years, names, gender, births, conditions = StatsService.extract_payload_info(payload)

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
            raw_data = StatsModel.get_data(conditions, names_alias, years_alias)

        except SQLAlchemyError:
            raise DatabaseConnectionError()
        
        df = await StatsService.get_dataframe(raw_data)
        # appliquer à partir d'ici les fonctions sur la dataframe

        return df.to_json()

    @staticmethod
    async def get_dataframe(raw_data) -> pd.DataFrame:
        try:
            df = pd.DataFrame(jsonable_encoder(raw_data))
            return df
        except Exception as e:
            DataFrameProcessingError()

    @staticmethod
    def extract_payload_info(payload):
        indexes = payload.get('indexes', ['years'])
        columns = payload.get('columns', ['names', 'gender', 'births'])

        years = payload.get('years', {})
        names = payload.get('names', {})
        gender = payload.get('gender', {})
        births = payload.get('births', {})
        conditions = payload.get('conditions', [])

        return indexes, columns, years, names, gender, births, conditions


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
