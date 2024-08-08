from sqlalchemy import and_, func
from sqlalchemy.exc import NoResultFound
from app.v1.models.births import Birth
from app.v1.api.births.births_errors import NameNotFound
from database.connect import SessionLocal

db = SessionLocal()

class ChartsModel:

    @staticmethod
    def get_charts(conditions, names_alias, years_alias, xAxis, xAxis_values, xAxis_type, yAxis, yAxis_values, yAxis_type, chart_type):
        try:
            query = db.query(Birth).join(names_alias, names_alias.id == Birth.name_id) \
                                    .join(years_alias, years_alias.id == Birth.year_id)

            if conditions:
                query = query.filter(and_(*conditions))

            if xAxis_type != "all":
                # Appliquer les filtres basés sur xAxis et yAxis
                if xAxis == 'years':
                    query = query.filter(years_alias.year.in_(xAxis_values) if xAxis_type == 'enum' else years_alias.year.between(xAxis_values[0], xAxis_values[1]))
                elif xAxis == 'names':
                    query = query.filter(names_alias.name.in_(xAxis_values))
                elif xAxis == 'gender':
                    query = query.filter(names_alias.gender.in_(xAxis_values))
                elif xAxis == 'births':
                    query = query.filter(Birth.births.in_(xAxis_values))

            if yAxis_type != "all":
                if yAxis == 'years':
                    query = query.filter(years_alias.year.in_(yAxis_values) if yAxis_type == 'enum' else years_alias.year.between(yAxis_values[0], yAxis_values[1]))
                elif yAxis == 'names':
                    query = query.filter(names_alias.name.in_(yAxis_values))
                elif yAxis == 'gender':
                    query = query.filter(names_alias.gender.in_(yAxis_values))
                elif yAxis == 'births':
                    query = query.filter(Birth.births.in_(yAxis_values))


            # Vérifier si le type de graphique est valide
            if chart_type in ['bar', 'line']:
                # Création d'un dictionnaire de mappages pour simplifier la logique de regroupement
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
                
                # Obtenir les colonnes pour le groupement en fonction des axes
                group_by_columns = group_by_options.get((xAxis, yAxis))
                
                if group_by_columns is not None:
                    # Construire la requête avec les colonnes obtenues
                    query = query.with_entities(
                        *group_by_columns,
                        func.sum(Birth.births).label('total_births')
                    ).group_by(*group_by_columns)


                results = query.all()
                return results

            elif chart_type == 'pie':
                # Appliquer les filtres et faire l'agrégation
                if yAxis == 'years':
                    query = query.with_entities(
                        years_alias.year,
                        func.sum(Birth.births).label('total_births')
                    ).group_by(years_alias.year)
                elif yAxis == 'names':
                    query = query.with_entities(
                        names_alias.name,
                        func.sum(Birth.births).label('total_births')
                    ).group_by(names_alias.name)
                elif yAxis == 'gender':
                    query = query.with_entities(
                        names_alias.gender,
                        func.sum(Birth.births).label('total_births')
                    ).group_by(names_alias.gender)
                else:
                    raise ValueError("Unsupported yAxis field for pie chart")

                results = query.all()

                return results

            elif chart_type == 'scatter':
                if xAxis == 'years':
                    query = query.with_entities(
                        years_alias.year,
                        names_alias.name,
                        Birth.births
                    ).order_by(years_alias.year).all()
                elif xAxis == 'names':
                    query = query.with_entities(
                        names_alias.name,
                        years_alias.year,
                        Birth.births
                    ).order_by(names_alias.name).all()
                elif xAxis == 'gender':
                    query = query.with_entities(
                        names_alias.gender,
                        years_alias.year,
                        Birth.births
                    ).order_by(names_alias.gender).all()
                elif xAxis == 'births':
                    query = query.with_entities(
                        Birth.births,
                        years_alias.year,
                        names_alias.name
                    ).order_by(Birth.births).all()
                else:
                    raise ValueError("Unsupported xAxis field for scatter plot")

                return query

            else:
                raise ValueError("Unsupported chart type")

        except NoResultFound:
            raise NameNotFound()
