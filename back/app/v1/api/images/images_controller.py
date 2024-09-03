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
):
    try:
        payload = await request.json()
        image_data = payload.get("image", None)
        form = payload.get("form", "")

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
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    clients.append(websocket)
    stop_streaming = False

    try:
        while not stop_streaming:
            data = await websocket.receive_text()
            if data == "STOP_STREAM":
                stop_streaming = True
                await websocket.send_text("END_OF_STREAM")

    except WebSocketDisconnect:
        print("Client déconnecté")
    except Exception as e:
        print(f"Erreur : {e}")
    finally:
        clients.remove(websocket)