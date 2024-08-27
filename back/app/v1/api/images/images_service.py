from langchain.chains import TransformChain
from langchain_core.messages import HumanMessage
from langchain_openai import ChatOpenAI
from langchain import globals
from langchain_core.runnables import chain
import os
from dotenv import load_dotenv
from fastapi import WebSocket

load_dotenv()

os.environ["OPENAI_API_KEY"] = "ma_key"

# Set verbose
globals.set_debug(True)

class ImagesService:

    @staticmethod
    async def describe_image(client: WebSocket, base64Image: str):
        try:
            # Configurer le modèle pour le streaming
            model = ChatOpenAI(temperature=0.5, model="gpt-4o", max_tokens=100, stream=True)

            # Déclencher l'invocation du modèle avec streaming

            # Parcourir chaque partie de la réponse de manière synchrone
            async for response in model.astream(
                [HumanMessage(
                    content=[
                        {"type": "text", "text": 'Dis "Coucou !" puis fais une analyse des données sur l\'image'},
                        {"type": "image_url", "image_url": {"url": base64Image}},
                    ])]
            ):
                # Envoyer chaque partie de la réponse au client WebSocket de manière asynchrone
                await client.send_text(response.content)

        except Exception as e:
            print(f"Erreur lors de l'envoi de message : {e}")
            await client.send_text(f"Erreur lors de l'envoi de la reponse : {e}")
        finally:
            await client.close()