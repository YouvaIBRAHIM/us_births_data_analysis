from dataclasses import dataclass

@dataclass
class BirthsDTO:
    id: str
    name: str
    year: str
    births: int