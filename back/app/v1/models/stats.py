from pydantic import BaseModel
from typing import List, Optional

class Stats(BaseModel):
    years: Optional[List[int]] = None
    names: Optional[List[str]] = None
    gender: Optional[str] = None
    births_value: Optional[int] = None
    births_condition: Optional[str] = None
