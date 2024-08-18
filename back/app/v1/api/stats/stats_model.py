from sqlalchemy import and_
from sqlalchemy.exc import NoResultFound, SQLAlchemyError
from app.v1.models.births import Birth
from app.v1.api.charts.charts_errors import (DataProcessingError, DatabaseConnectionError, DataNotFound
)
from database.connect import SessionLocal

db = SessionLocal()

class StatsModel:

    @staticmethod
    def get_data(conditions, names_alias, years_alias):
        try:
            query = StatsModel.build_base_query(conditions, names_alias, years_alias)
            
            result = query.all()

            data = [
                {
                    "years": row[3],
                    "names": row[0],
                    "gender": row[1],
                    "births": row[2],
                } for row in result
            ]

            return data
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
