from dataclasses import dataclass

@dataclass
class BirthsDTO:
    id: str
    first_name: str
    last_name: str
    email: str
    password: str