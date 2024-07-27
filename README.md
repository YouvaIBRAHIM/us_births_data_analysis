
Dans le terminal:

## Pour lancer le backend
1. `cp .env.example .env`  
2.  `make build` --> build le projet en mode détaché
    - `docker compose up -d --build`

#### Autres commandes à connaitre
- `make compose` --> lance docker en mode détaché
    - `docker compose up -d`
- `make back` --> lance docker et active le terminal de fastapi
    - `docker exec -it names-back bash`
- `make stop` --> arrête les conteuneurs mais persiste la donnée
    - `docker stop names-back names-db`
- `make kill`--> arrête ET supprime la donnée
    - `docker compose down -v`

## Pour lancer le frontend
1. `cd front`
2. `cp .env.example .env` 
3. `npm install`
4. `npm run dev`