from typing import List, Optional
import pandas as pd
from sqlalchemy.orm import Session
from sqlalchemy import text

class StatsService:
    @staticmethod
    async def get_dataframe(
        db: Session, 
        years: Optional[List[int]] = None,
        names: Optional[List[str]] = None,
        gender: Optional[str] = None,
        births_value: Optional[int] = None,
        births_condition: Optional[str] = None
    ) -> pd.DataFrame:
        base_query = """
        SELECT 
            y.year AS year, 
            n.name AS name, 
            n.gender AS gender,
            b.births AS nombre
        FROM 
            births b
        INNER JOIN 
            names n ON b.name_id = n.id
        INNER JOIN 
            years y ON b.year_id = y.id
        WHERE 1=1
        """
        
        if years:
            placeholders = ', '.join([str(ye) for ye in years])
            base_query += f" AND y.year IN ({placeholders})"

        if names:
            placeholders = ', '.join([f"'{name}'" for name in names])
            base_query += f" AND n.name IN ({placeholders})"
        
        if gender:
            base_query += f" AND n.gender = '{gender}'"
        
        if births_value is not None and births_condition:
            if births_condition not in ['greater', 'less', 'equal']:
                raise ValueError("Invalid value for 'births_condition'. Expected 'greater', 'less', or 'equal'.")
            
            if births_condition == 'greater':
                base_query += f" AND b.births > {births_value}"
            elif births_condition == 'less':
                base_query += f" AND b.births < {births_value}"
            elif births_condition == 'equal':
                base_query += f" AND b.births = {births_value}"
        
        base_query += " ORDER BY y.year, n.name, n.gender;"
        
        final_query = text(base_query)

        result = await db.execute(final_query)
        df = pd.DataFrame(result.fetchall(), columns=['year', 'name', 'gender', 'nombre'])

        if df.empty:
            raise ValueError("No data found for the specified conditions.")

        return df
