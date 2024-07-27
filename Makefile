.ONESHELL:
.PHONY: web compose server help kill stop
.DEFAULT_GOAL = help

# Variables:
CURRENT_DIR = $(shell pwd)
PYTHON= ./.venv/bin/python3
PIP= ./.venv/bin/pip

COM_COLOR   = \033[0;34m
OBJ_COLOR   = \033[0;36m
OK_COLOR    = \033[0;32m
ERROR_COLOR = \033[0;31m
WARN_COLOR  = \033[0;33m
NO_COLOR    = \033[m

help:
	@grep -E '(^[a-zA-Z_-]+:.*?##.*$$)|(^##)' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[32m%-10s\033[0m %s\n", $$1, $$2}' | sed -e 's/\[32m##/[33m/'

# DOCKER:
build: ## Construit le projet en mode detache
	docker compose up -d --build

compose: ## Up docker en mode detache
	docker compose up -d

back: compose ## Lance docker et active le terminal de fastapi
	docker exec -it names-back bash

stop: ## Stop les services go_project
	docker stop names-back names-db

kill: ## Stop docker et supprime le volume
	docker compose down -v


venv/bin/activate: ./back/requirements.txt
	python -m venv .venv
	chmod +x .venv/bin/activate
	. ./.venv/bin/activate
	$(PIP) install -r requirements.txt
	$(PIP) freeze > requirements.txt


venv: venv/bin/activate
	. ./.venv/bin/activate

update: venv ## Mise à jour des packages
	docker cp ./back/requirements.txt names-back:/app/
	docker exec names-back pip install -r /app/requirements.txt

deactivate:
	@rm -rf __pycache__
	@rm -rf venv

