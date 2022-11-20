FROM python3.10

COPY . .

RUN python3.10 -m venv venv && \
    pip install -r reqirements.txt

RUN ["uvicorn", "__init__:app", "--host", "0.0.0.0", "--port", "8888"]
