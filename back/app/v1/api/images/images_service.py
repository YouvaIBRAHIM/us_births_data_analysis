from langchain_core.messages import HumanMessage
from langchain_openai import ChatOpenAI
from fastapi import WebSocket
import asyncio

INSTRUCTIONS_PROMPT = f"""Tu es un assistant qui rédige de courts rapports (500 mots maximum) sur des données statistiques. 
Je détiens dans ma base de données des informations sur la fréquence des prénoms attribués aux bébés depuis 1880 jusqu'à 2018.
Voici le type de données que j'ai : Le prénom, le genre (M = Homme et F = Femme), l'année et enfin le nombre de naissances pour chaque prénom par genre et par année.
Tu récevras une image de données statistiques, avec une table et possiblement un graphique. 
Pour avoir plus de contexte, je vais te transmettre les données du formulaire rempli depuis le front qui ont servis à générer les données statistiques. 
Tu seras chargés de rédiger un court résumé des informations les plus importantes et de faire à la fin une conclusion.
"""

class ImagesService:

    @staticmethod
    async def describe_image(client: WebSocket, base64Image: str, form: str):
        has_generate_response = False
        try:
            model = ChatOpenAI(temperature=0.5, model="gpt-4o", max_tokens=1024, stream=True)
            
            async for response in model.astream([
                HumanMessage(
                    content=[
                        {"type": "text", "text": INSTRUCTIONS_PROMPT},
                        {"type": "text", "text": f"Voici les données du formulaire : {form}"},
                        {"type": "image_url", "image_url": {"url": base64Image}},
                    ])
            ]):
                
                if has_generate_response == False:
                    has_generate_response = True

                if response.content:
                    await client.send_text(response.content)

            await client.send_text("END_OF_STREAM")  

        except Exception as e:
            print(f"Erreur lors de l'envoi de message : {e}")
            if has_generate_response:
                await client.send_text("END_OF_STREAM")
            else:
                await client.send_text(f"Erreur lors de l'envoi de la réponse : {e}")
