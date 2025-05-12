# News categorizer transformer

A web application for categorizing news articles using a fine-tuned transformer-based model (DistilBERT) with word-level importances. Was made as  a part of Machine Learining course in my university.

## Table of Contents

* [About](#about)
* [Features](#features)
* [Tech Stack](#tech-stack)
* [Prerequisites](#prerequisites)
* [Installation & Run](#installation--run)
* [Usage](#usage)
* [API Reference](#api-reference)

## About

Application provides a simple UI and API to classify news text into predefined categories using a fine-tuned DistilBERT model. It highlights token importances to help interpret model decisions.

## Features

* FastAPI backend for classification API.
* TensorFlow saved model deployment.
* DistilBERT tokenizer for efficient inference.
* Word importance scores for interpretability.
* Next.js frontend with interactive charts.
* Dockerized services for easy deployment.

## Tech Stack

**Backend**: Python, FastAPI, TensorFlow, Hugging Face Transformers

**Frontend**: Next.js (React), TypeScript, Charts.js, TailwindCSS

## Prerequisites

* Docker & Docker Compose installed.
* Alternatively, Python 3.11.9 and Node.js (v23+) for local run.

## Installation & run

### Docker Compose

> [!IMPORTANT]  
> Backend: [http://localhost:8000](http://localhost:8000)
> Webapp: [http://localhost:3000](http://localhost:3000)

```bash
git clone https://github.com/vadim-ghostman/news-categorizer-transformer.git
cd news-categorizer-transformer
docker-compose up --build
```

### Local Setup

#### Backend

```bash
poetry install --no-root
poetry shell
uvicorn app:app --host 0.0.0.0 --port 8000
```

#### Webapp

```bash
cd frontend
npm install
npm run dev
```

## Usage

* Navigate to the frontend URL (<https://localhost:3000>).
* Enter or paste news text.
* View predicted category probabilities and word importances.
* Use `curl` or any HTTP client to access the POST `/predict` endpoint:

```bash
curl -X POST http://localhost:8000/predict \
    -H "Content-Type: application/json" \
    -d '{"text": "Local soccer team clinches championship in a dramatic penalty shootout"}'
```

## API Reference

### POST /predict

* **Request**: JSON payload:

  * `text` (string): Text to classify.
* **Response**: JSON object:

  * `probs`: Object mapping category labels to probabilities.
  * `tokens`: Array of tokens/words from input.
  * `importances`: Array of importance scores corresponding to tokens.
