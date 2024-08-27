from fastapi import WebSocket, WebSocketDisconnect, APIRouter, status, Depends
from fastapi.responses import JSONResponse
import asyncio
from typing import List
from pydantic import BaseModel

# Import du service d'authentification utilisateur
from app.v1.api.users.users_service import current_active_user

# Stockage temporaire des connexions WebSocket
clients: List[WebSocket] = []

router = APIRouter(prefix="/images", tags=["images"])

class ImagePayload(BaseModel):
    image: str

@router.post("/generate-description")
async def upload_image(
    payload: ImagePayload,
    # user=Depends(current_active_user)  # Activez ceci si vous voulez authentifier l'utilisateur
):
    try:
        # Décoder l'image depuis la base64 (décommenter si nécessaire)
        # image_data = base64.b64decode(payload.image)

        tasks = []
        for client in clients:
            tasks.append(asyncio.create_task(send_websocket_message(client)))
        
        await asyncio.gather(*tasks)

        return JSONResponse(content={"message": "Image reçue et traitée"}, status_code=status.HTTP_200_OK)
    except Exception as e:
        print(f"Erreur : {e}")
        return JSONResponse(content="INTERNAL_SERVER_ERROR", status_code=status.HTTP_500_INTERNAL_SERVER_ERROR)


async def send_websocket_message(client: WebSocket):
    try:
        await client.send_text("L'image a été reçue. Traitement en cours...")
        # Simuler un long traitement
        for i in range(5):
            await asyncio.sleep(1)
            await client.send_text(f"Traitement étape {i+1}/5...")
        await client.send_text("Traitement terminé. Résultat : L'image a été traitée avec succès !")
    except Exception as e:
        print(f"Erreur lors de l'envoi de message WebSocket : {e}")
        await client.close()

@router.websocket("/description/stream")
async def websocket_endpoint(
    websocket: WebSocket,
    # user=Depends(current_active_user) 
):
    await websocket.accept()
    clients.append(websocket)
    try:
        while True:
            
            data = await websocket.receive_text()
            print(f"Message reçu de sdfdsfxcv : {data}")
    except WebSocketDisconnect as e:
        print(e)
        print(f"Client déconnecté : sdfdsfxcv")
    except Exception as e:
        print(e)
        print(f"Client déconnecté : sdfdsfxcv")
