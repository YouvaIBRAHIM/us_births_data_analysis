from app.v1.api.charts.charts_model import ChartsModel
import pandas as pd
from fastapi.encoders import jsonable_encoder
from sqlalchemy.orm import aliased
from app.v1.models.births import Birth
from app.v1.models.names import Name
from app.v1.models.years import Year

class ChartsService:

    @staticmethod
    def get_charts(payload):
        xAxis = payload.get('xAxis', {}).get('field', 'year')
        xAxis_values = payload.get('xAxis', {}).get('value', [])
        xAxis_type = payload.get('xAxis', {}).get('type', 'all')
        yAxis = payload.get('yAxis', {}).get('field', 'name')
        yAxis_values = payload.get('yAxis', {}).get('value', [])
        yAxis_type = payload.get('yAxis', {}).get('type', 'all')
        chart_type = payload.get('type', 'bar')

        # Utiliser des alias uniques pour les tables
        names_alias = aliased(Name, name='n')
        years_alias = aliased(Year, name='y')

        conditions = ChartsService.get_conditions(payload, names_alias, years_alias)

        raw_data = ChartsModel.get_charts(conditions, names_alias, years_alias, xAxis, xAxis_values, xAxis_type, yAxis, yAxis_values, yAxis_type, chart_type)


        # Créer une DataFrame avec les données brutes
        if chart_type in ['bar', 'line']:
            df = pd.DataFrame(raw_data, columns=[xAxis, yAxis])

            # Formater les données selon le type de graphique
            if chart_type == 'bar':
                if xAxis == 'years' and yAxis == 'births':
                    grouped = df.groupby(xAxis)[yAxis].sum().reset_index()
                    data = [{
                        'x': grouped[xAxis].tolist(),
                        'y': grouped[yAxis].tolist(),
                        'type': 'bar',
                        'name': 'Total Births'
                    }]
                else:
                    grouped = df.pivot(index=xAxis, columns=yAxis, values=yAxis).fillna(0)
                    data = [{
                        'x': grouped.index.tolist(),
                        'y': grouped[y_value].tolist(),
                        'type': 'bar',
                        'name': y_value
                    } for y_value in grouped.columns]

            elif chart_type == 'line':
                if xAxis == 'years' and yAxis == 'births':
                    grouped = df.groupby(xAxis)[yAxis].sum().reset_index()
                    data = [{
                        'x': grouped[xAxis].tolist(),
                        'y': grouped[yAxis].tolist(),
                        'type': 'scatter',
                        'mode': 'lines',
                        'name': 'Total Births'
                    }]
                else:
                    grouped = df.pivot(index=xAxis, columns=yAxis, values=yAxis).fillna(0)
                    data = [{
                        'x': grouped.index.tolist(),
                        'y': grouped[y_value].tolist(),
                        'type': 'scatter',
                        'mode': 'lines',
                        'name': y_value
                    } for y_value in grouped.columns]

        elif chart_type == 'pie':
            df = pd.DataFrame(raw_data, columns=[xAxis, yAxis])
            if yAxis in ['names', 'gender', 'years']:
                grouped = df.groupby(xAxis)[yAxis].sum()
                data = [{
                    'labels': grouped.index.tolist(),
                    'values': grouped.tolist(),
                    'type': 'pie'
                }]
            else:
                raise ValueError("Unsupported yAxis field for pie chart")


        elif chart_type == 'scatter':
            df = pd.DataFrame(raw_data, columns=[xAxis, yAxis, 'total_births'])
            data = []
            for y_value in df[yAxis].unique():
                subset = df[df[yAxis] == y_value]
                data.append({
                    'x': subset[xAxis].tolist(),
                    'y': subset['total_births'].tolist(),
                    'type': 'scatter',
                    'mode': 'markers',
                    'name': y_value
                })

        else:
            raise ValueError("Unsupported chart type")

        # Retourner les données formatées pour Plotly.js
        return {
            'data': data,
            'layout': {
                'title': payload.get('title', 'Chart'),
                'xaxis': {'title': xAxis},
                'yaxis': {'title': 'Total Births'}
            }
        }

    @staticmethod
    def get_conditions(payload, names_alias, years_alias):
        conditions = []
        for condition in payload.get('conditions', []):
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
                    conditions.append(Birth.births == int(value))
                elif cond == ">":
                    conditions.append(Birth.births > int(value))
                elif cond == ">=":
                    conditions.append(Birth.births >= int(value))
                elif cond == "<":
                    conditions.append(Birth.births < int(value))
                elif cond == "<=":
                    conditions.append(Birth.births <= int(value))

        return conditions
