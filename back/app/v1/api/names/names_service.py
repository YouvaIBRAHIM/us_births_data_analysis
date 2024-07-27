from app.v1.api.names.names_model import NamesModel
from app.v1.api.names.names_DTO import NameDTO
from typing import List
from fastapi.encoders import jsonable_encoder

class NamesService():
    
    def get_names() -> List[NameDTO]:
        return jsonable_encoder(NamesModel.get_names())

    def create_name() -> NameDTO:
        return jsonable_encoder(NamesModel.create_name())