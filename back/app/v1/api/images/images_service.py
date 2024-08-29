from langchain.chains import TransformChain
from langchain_core.messages import HumanMessage
from langchain_openai import ChatOpenAI
from langchain import globals
import os
from dotenv import load_dotenv
from fastapi import WebSocket

load_dotenv()

# Set verbose
globals.set_debug(True)

class ImagesService:

    @staticmethod
    async def describe_image(client: WebSocket, base64Image: str):
        try:
            model = ChatOpenAI(temperature=0.5, model="gpt-4o", max_tokens=100, stream=True)

            stop_streaming = False

            async def receive_stop_signal():
                nonlocal stop_streaming
                try:
                    data = await client.receive_text()
                    if data == "STOP_STREAM":
                        stop_streaming = True
                    await client.send_text("END_OF_STREAM")
                except Exception as e:
                    print(e)

            async for response in model.astream(
                [HumanMessage(
                    content=[
                        {"type": "text", "text": 'Dis "Coucou !" puis fais une analyse des données sur l\'image'},
                        {"type": "image_url", "image_url": {"url": base64Image}},
                    ])]
            ):
                if stop_streaming:
                    break

                await receive_stop_signal()

                await client.send_text(response.content)

            if not stop_streaming:
                await client.send_text("END_OF_STREAM")

        except Exception as e:
            print(f"Erreur lors de l'envoi de message : {e}")
            await client.send_text(f"Erreur lors de l'envoi de la réponse : {e}")
        finally:
            await client.close()
