from database.connect import engine, async_engine
from app.v1.models import main as models

models.Base.metadata.create_all(bind=engine)