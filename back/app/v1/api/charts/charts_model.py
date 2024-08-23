from sqlalchemy import and_, func
from sqlalchemy.exc import NoResultFound, SQLAlchemyError
from app.v1.models.births import Birth
from app.v1.api.charts.charts_errors import (
    InvalidChartType, UnsupportedYAxisField, UnsupportedXAxisField,
    FilterApplicationError, DataProcessingError, DatabaseConnectionError, DataNotFound
)
from database.connect import SessionLocal

db = SessionLocal()

class ChartsModel:

    @staticmethod
    def get_charts(conditions, names_alias, years_alias, xAxis, xAxis_values, xAxis_type, yAxis, yAxis_values, yAxis_type, chart_type):
        try:
            query = ChartsModel.build_base_query(conditions, names_alias, years_alias)
            
            query = ChartsModel.apply_axis_filters(query, names_alias, years_alias, xAxis, xAxis_values, xAxis_type, yAxis, yAxis_values, yAxis_type)

            if chart_type in ['bar', 'line']:
                return ChartsModel.generate_bar_or_line_chart(query, xAxis, yAxis, names_alias, years_alias)
            elif chart_type == 'pie':
                return ChartsModel.generate_pie_chart(query, yAxis, names_alias, years_alias)
            elif chart_type == 'scatter':
                return ChartsModel.generate_scatter_plot(query, xAxis, names_alias, years_alias)
            elif chart_type == 'heat':

                return ChartsModel.generate_heatmap(query, names_alias, years_alias)
            else:
                raise InvalidChartType()

        except NoResultFound:
            raise DataNotFound()
        except SQLAlchemyError:
            raise DatabaseConnectionError()
        except Exception as e:
            raise DataProcessingError()

    @staticmethod
    def build_base_query(conditions, names_alias, years_alias):
        try:
            query = db.query(Birth).join(names_alias, names_alias.id == Birth.name_id) \
                                   .join(years_alias, years_alias.id == Birth.year_id)

            if conditions:
                query = query.filter(and_(*conditions))

            return query
        except SQLAlchemyError:
            raise DatabaseConnectionError()
        except Exception as e:
            raise DataProcessingError() from e

    @staticmethod
    def apply_axis_filters(query, names_alias, years_alias, xAxis, xAxis_values, xAxis_type, yAxis, yAxis_values, yAxis_type):
        try:
            if xAxis_type != "all":
                query = ChartsModel.apply_filter(query, xAxis, xAxis_values, xAxis_type, names_alias, years_alias)

            if yAxis_type != "all":
                query = ChartsModel.apply_filter(query, yAxis, yAxis_values, yAxis_type, names_alias, years_alias)

            return query
        except Exception as e:
            raise FilterApplicationError()

    @staticmethod
    def apply_filter(query, axis, values, axis_type, names_alias, years_alias):
        try:
            if axis == 'years':
                query = query.filter(years_alias.year.in_(values) if axis_type == 'enum' else years_alias.year.between(values[0], values[1]))
            elif axis == 'names':
                query = query.filter(names_alias.name.in_(values))
            elif axis == 'gender':
                query = query.filter(names_alias.gender.in_(values))
            elif axis == 'births':
                query = query.filter(Birth.births.in_(values))
            else:
                raise UnsupportedXAxisField()
        except Exception as e:
            raise FilterApplicationError()

        return query

    @staticmethod
    def generate_bar_or_line_chart(query, xAxis, yAxis, names_alias, years_alias):
        try:
            group_by_options = {
                ('years', 'births'): [years_alias.year],
                ('years', 'names'): [years_alias.year, names_alias.name],
                ('years', 'gender'): [years_alias.year, names_alias.gender],
                ('names', 'births'): [names_alias.name],
                ('names', 'years'): [names_alias.name, years_alias.year],
                ('names', 'gender'): [names_alias.name, names_alias.gender],
                ('gender', 'births'): [names_alias.gender],
                ('gender', 'years'): [names_alias.gender, years_alias.year],
                ('gender', 'names'): [names_alias.gender, names_alias.name],
                ('births', 'years'): [years_alias.year],
                ('births', 'names'): [names_alias.name],
                ('births', 'gender'): [names_alias.gender]
            }

            group_by_columns = group_by_options.get((xAxis, yAxis))
            if group_by_columns is not None:
                query = query.with_entities(
                    *group_by_columns,
                    func.sum(Birth.births).label('Total des naissances')
                ).group_by(*group_by_columns)

            return query.all()
        except Exception as e:
            raise DataProcessingError()

    @staticmethod
    def generate_pie_chart(query, yAxis, names_alias, years_alias):
        try:
            if yAxis == 'years':
                query = query.with_entities(
                    years_alias.year,
                    func.sum(Birth.births).label('Total des naissances')
                ).group_by(years_alias.year)
            elif yAxis == 'names':
                query = query.with_entities(
                    names_alias.name,
                    func.sum(Birth.births).label('Total des naissances')
                ).group_by(names_alias.name)
            elif yAxis == 'gender':
                query = query.with_entities(
                    names_alias.gender,
                    func.sum(Birth.births).label('Total des naissances')
                ).group_by(names_alias.gender)
            else:
                raise UnsupportedYAxisField()

            return query.all()
        except Exception as e:
            raise DataProcessingError()

    @staticmethod
    def generate_scatter_plot(query, xAxis, names_alias, years_alias):
        try:
            if xAxis == 'years':
                query = query.with_entities(
                    years_alias.year,
                    names_alias.name,
                    Birth.births
                ).order_by(years_alias.year)
            elif xAxis == 'names':
                query = query.with_entities(
                    names_alias.name,
                    years_alias.year,
                    Birth.births
                ).order_by(names_alias.name)
            elif xAxis == 'gender':
                query = query.with_entities(
                    names_alias.gender,
                    years_alias.year,
                    Birth.births
                ).order_by(names_alias.gender)
            elif xAxis == 'births':
                query = query.with_entities(
                    Birth.births,
                    years_alias.year,
                    names_alias.name
                ).order_by(Birth.births)
            else:
                raise UnsupportedXAxisField()

            return query.all()
        except Exception as e:
            raise DataProcessingError()
        
    @staticmethod
    def generate_heatmap(query, names_alias, years_alias):
        try:
            # Récupérer l'année, le nom et le total des naissances
            query = query.with_entities(
                years_alias.year,
                names_alias.name,
                func.sum(Birth.births).label('Total des naissances')
            ).group_by(years_alias.year, names_alias.name)
            query = query.order_by(years_alias.year, names_alias.name)
            return query.all()
        except Exception as e:
            raise DataProcessingError()



