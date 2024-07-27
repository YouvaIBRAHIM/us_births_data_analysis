FROM python:3.9

WORKDIR /app

COPY ./back/requirements.txt /app/requirements.txt

RUN pip install --no-cache-dir --upgrade -r /app/requirements.txt

COPY ./back /app

CMD ["fastapi", "run", "main.py", "--port", "8000", "--reload"]