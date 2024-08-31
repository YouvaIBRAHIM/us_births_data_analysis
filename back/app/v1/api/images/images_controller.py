from fastapi import WebSocket, WebSocketDisconnect, APIRouter, status, Depends, Request
from fastapi.responses import JSONResponse
import asyncio
from typing import List
from pydantic import BaseModel

# Import du service d'authentification utilisateur
from app.v1.api.users.users_service import current_active_user
from app.v1.api.images.images_service import ImagesService

# Stockage temporaire des connexions WebSocket
clients: List[WebSocket] = []

router = APIRouter(prefix="/images", tags=["images"])


@router.post("/generate-description")
async def upload_image(
    request: Request,
    # user=Depends(current_active_user)  # Activez ceci si vous voulez authentifier l'utilisateur
):
    try:
        # Décoder l'image depuis la base64 (décommenter si nécessaire)
        payload = await request.json()
        image_data = payload.get("image", None)
        form = payload.get("form", {})

        if image_data:
            tasks = []
            for client in clients:
                tasks.append(asyncio.create_task(ImagesService.describe_image(client, image_data, form)))
            
            await asyncio.gather(*tasks)

            return JSONResponse(content={"message": "Image reçue et traitée"}, status_code=status.HTTP_200_OK)
        return JSONResponse(content="ERROR_NO_IMAGE", status_code=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        print(f"Erreur : {e}")
        return JSONResponse(content="INTERNAL_SERVER_ERROR", status_code=status.HTTP_500_INTERNAL_SERVER_ERROR)

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
