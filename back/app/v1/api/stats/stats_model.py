from sqlalchemy import and_
from sqlalchemy.exc import NoResultFound, SQLAlchemyError
from app.v1.models.births import Birth
from app.v1.api.charts.charts_errors import (DataProcessingError, DatabaseConnectionError, DataNotFound, FilterApplicationError
)
from database.connect import SessionLocal

db = SessionLocal()

class StatsModel:

    @staticmethod
    def get_query(conditions, names_alias, years_alias, years, names, gender):
        try:
            query = StatsModel.build_base_query(conditions, names_alias, years_alias)
            query = StatsModel.apply_field_filters(query, names_alias, years_alias, years)
            query = StatsModel.apply_field_filters(query, names_alias, years_alias, names)
            query = StatsModel.apply_field_filters(query, names_alias, years_alias, gender)

            return query
        except NoResultFound:
            raise DataNotFound()
        except SQLAlchemyError:
            raise DatabaseConnectionError()
        except Exception as e:
            raise DataProcessingError()

    @staticmethod
    def build_base_query(conditions, names_alias, years_alias):
        try:
            query = db.query(
                names_alias.name.label('names'),
                names_alias.gender,
                Birth.births,
                years_alias.year.label('years')
            ).join(names_alias, names_alias.id == Birth.name_id) \
            .join(years_alias, years_alias.id == Birth.year_id)

            if conditions:
                query = query.filter(and_(*conditions))
            return query
        except SQLAlchemyError:
            raise DatabaseConnectionError()
        except Exception as e:
            raise DataProcessingError() from e



    @staticmethod
    def apply_field_filters(query, names_alias, years_alias, filter):
        try:
            filter_field = filter.get('field')
            filter_type = filter.get('type', 'all')
            filter_values = filter.get('value', [])

            if(filter_field):
                if filter_type != "all":
                    query = StatsModel.apply_filter(query, filter_field, filter_values, filter_type, names_alias, years_alias)

            return query
        except Exception as e:
            raise FilterApplicationError()

    @staticmethod
    def apply_filter(query, field, values, type, names_alias, years_alias):
        try:
            if field == 'years':
                query = query.filter(years_alias.year.in_(values) if type == 'enum' else years_alias.year.between(values[0], values[1]))
            elif field == 'names':
                query = query.filter(names_alias.name.in_(values))
            elif field == 'gender':
                query = query.filter(names_alias.gender.in_(values))
            else:
                return query
        except Exception as e:
            raise FilterApplicationError()

        return query