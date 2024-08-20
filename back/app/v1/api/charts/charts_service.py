from sqlalchemy import Null, null
from app.v1.api.charts.charts_model import ChartsModel
from app.v1.api.charts.charts_errors import (
    DataNotFound, InvalidChartType, InvalidConditionFormat, 
    DatabaseConnectionError, DataProcessingError, DataFrameProcessingError
)
import pandas as pd
from sqlalchemy.orm import aliased
from sqlalchemy.exc import SQLAlchemyError
from app.v1.models.births import Birth
from app.v1.models.names import Name
from app.v1.models.years import Year

class ChartsService:

    @staticmethod
    def get_charts(payload):
        xAxis, xAxis_values, xAxis_type, yAxis, yAxis_values, yAxis_type, chart_type = ChartsService.extract_axis_info(payload)

        # Utiliser des alias uniques pour les tables
        names_alias = aliased(Name, name='n')
        years_alias = aliased(Year, name='y')
        births_alias = aliased(Birth, name='b')
  
        conditions = []
        try:
            # Obtenir les conditions de filtrage
            conditions = ChartsService.get_conditions(payload, names_alias, years_alias, births_alias)
        except KeyError as e:
            raise InvalidConditionFormat()

        try:
            # Récupérer les données brutes
            raw_data = ChartsModel.get_charts(conditions, names_alias, years_alias, xAxis, xAxis_values, xAxis_type, yAxis, yAxis_values, yAxis_type, chart_type)
        except SQLAlchemyError:
            raise DatabaseConnectionError()

        # Vérifier si les données existent
        if not raw_data:
            raise DataNotFound()
        # Formater les données en fonction du type de graphique
        return ChartsService.format_chart_data(raw_data, xAxis, yAxis, chart_type, payload)


    @staticmethod
    def extract_axis_info(payload):
        xAxis = payload.get('xAxis', {}).get('field', 'year')
        xAxis_values = payload.get('xAxis', {}).get('value', [])
        xAxis_type = payload.get('xAxis', {}).get('type', 'all')
        yAxis = payload.get('yAxis', {}).get('field', 'name')
        yAxis_values = payload.get('yAxis', {}).get('value', [])
        yAxis_type = payload.get('yAxis', {}).get('type', 'all')
        chart_type = payload.get('type', 'bar')

        return xAxis, xAxis_values, xAxis_type, yAxis, yAxis_values, yAxis_type, chart_type

    @staticmethod
    def format_chart_data(raw_data, xAxis, yAxis, chart_type, payload):
        try:
            df = pd.DataFrame(raw_data, columns=ChartsService.get_columns(raw_data, xAxis, yAxis))
        except Exception as e:
            raise DataFrameProcessingError()

        try:
            if chart_type in ['bar', 'line']:
                data = ChartsService.format_bar_or_line_chart(df, xAxis, yAxis, chart_type, payload)
            elif chart_type == 'pie':
                data = ChartsService.format_pie_chart(df, xAxis, yAxis)
            elif chart_type == 'scatter':
                data = ChartsService.format_scatter_chart(df, xAxis, yAxis)
            elif chart_type == 'heat':
                data = ChartsService.format_heatmap(df)
            else:
                raise InvalidChartType()
        except ValueError as e:
            raise DataProcessingError()

        return {
            'data': data,
            'layout': {
                'title': payload.get('title', 'Chart'),
                'xaxis': {'title': xAxis},
                'yaxis': {'title': 'Total des naissances'}
            }
        }

    @staticmethod
    def get_columns(raw_data, xAxis, yAxis):
        try:
            if len(raw_data[0]) == 2:
                return [xAxis, yAxis]
            elif len(raw_data[0]) == 3:
                return [xAxis, yAxis, 'Total des naissances']
            else:
                raise DataFrameProcessingError()
        except Exception as e:
            raise DataFrameProcessingError()
    @staticmethod
    def format_bar_or_line_chart(df, xAxis, yAxis, chart_type, payload):
        try:
            orientation = payload.get('orientation', 'v')
            
            if xAxis == 'years' and yAxis == 'births':
                grouped = df.groupby(xAxis)[yAxis].sum().reset_index()
                data = [{
                    'x': grouped[yAxis].tolist() if orientation == 'h' else grouped[xAxis].tolist(),
                    'y': grouped[xAxis].tolist() if orientation == 'h' else grouped[yAxis].tolist(),
                    'type': 'bar' if chart_type == 'bar' else 'scatter',
                    'orientation': orientation,
                    'name': 'Total Births',
                    'mode': 'lines' if chart_type == 'line' else None
                }]
            else:
                grouped = df.pivot(index=xAxis, columns=yAxis, values='Total des naissances' if 'Total des naissances' in df.columns else yAxis).fillna(0)
                data = [{
                    'x': grouped[y_value].tolist() if orientation == 'h' else grouped.index.tolist(),
                    'y': grouped.index.tolist() if orientation == 'h' else grouped[y_value].tolist(),
                    'type': 'bar' if chart_type == 'bar' else 'scatter',
                    'orientation': orientation,
                    'name': str(y_value),
                    'mode': 'lines' if chart_type == 'line' else None
                } for y_value in grouped.columns]
        except Exception as e:
            raise DataProcessingError()

        return data

    @staticmethod
    def format_pie_chart(df, xAxis, yAxis):
        try:
            grouped = df.groupby(xAxis)[yAxis].sum()
            return [{
                'labels': grouped.index.tolist(),
                'values': grouped.tolist(),
                'type': 'pie'
            }]
        except Exception as e:
            raise DataProcessingError()

    @staticmethod
    def format_scatter_chart(df, xAxis, yAxis):
        try:
            data = []
            for y_value in df[yAxis].unique():
                subset = df[df[yAxis] == y_value]
                data.append({
                    'x': subset[xAxis].tolist(),
                    'y': subset['Total des naissances'].tolist(),
                    'type': 'scatter',
                    'mode': 'markers',
                    'name': str(y_value)
                })
            return data
        except Exception as e:
            raise DataProcessingError()

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
    def format_heatmap(df):
        try:
            pivot_df = df.pivot(index='years', columns='names', values='Total des naissances').fillna("null")

            data = [{
                'z': pivot_df.values.tolist(),
                'x': pivot_df.index.tolist(),
                'y': pivot_df.columns.tolist(),
                'type': 'heatmap'
            }]
        except Exception as e:
            raise DataProcessingError()

        return data

