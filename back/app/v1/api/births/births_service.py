from app.v1.api.births.births_model import BirthsModel
from app.v1.api.births.births_DTO import BirthsDTO
from typing import List
from fastapi.encoders import jsonable_encoder

class BirthsService():
    
    def get_births() -> List[BirthsDTO]:
        return jsonable_encoder(BirthsModel.get_births())
