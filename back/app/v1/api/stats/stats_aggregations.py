import pandas as pd
from app.v1.api.stats.stats_errors import DataFrameProcessingError

ROUND = 3

class StatsAgregations:
    aggregation_mapper = {
        'mean': 'Moyenne',
        'sum': 'Total',
        'median': 'Médiane',
        'min': 'Minimum',
        'max': 'Maximum'
    }

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
            df = StatsAgregations.add_summary_row_on_birth_column(df, aggregation_type)
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
                
                translated_aggregation = StatsAgregations.aggregation_mapper.get(aggregation_type, aggregation_type)

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
    def count_names_per_year(df: pd.DataFrame) -> pd.DataFrame:
        df_filled = df.fillna(0)        
        df_bool = df_filled > 0
        df_count = df_bool.sum(axis=1)
        
        df_count = df_count.to_frame(name='Nombre de prénoms')
        
        return df_count
    