from transformers import DistilBertTokenizerFast
import tensorflow as tf, numpy as np
import json
from fastapi import FastAPI

app = FastAPI()
EXPORT_DIR = "saved_model/"
MAX_LEN = 128

# load model
tokenizer = DistilBertTokenizerFast.from_pretrained(EXPORT_DIR)
with open(f"{EXPORT_DIR}/idx2label.json") as f:
    idx2label = json.load(f)
serve_fn = tf.saved_model.load(EXPORT_DIR).signatures["serving_default"]

@app.post("/predict")
def predict(payload: dict):
    text = payload["text"]

    # tokenize
    enc = tokenizer(
        text,
        padding="max_length",
        truncation=True,
        max_length=MAX_LEN,
        return_tensors="tf",
        return_offsets_mapping=True,  # optional
    )

    # inference
    out = serve_fn(
        input_ids=enc["input_ids"],
        attention_mask=enc["attention_mask"]
    )
    probs = out["probabilities"].numpy()[0]
    importances = out["token_importance"].numpy()[0]

    # group importances
    word_ids = enc.word_ids(batch_index=0)
    grouped = {}
    for idx, wid in enumerate(word_ids):
        if wid is None:
            continue
        grouped.setdefault(wid, []).append(importances[idx])

    # reconstruct words
    response_tokens = []
    response_importances = []
    for wid, scores in sorted(grouped.items()):
        span = enc.word_to_tokens(wid)  # (start, end)
        if span is None:
            continue
        start, end = span
        token_ids = enc["input_ids"].numpy()[0][start:end]
        word = tokenizer.decode(token_ids, skip_special_tokens=True)
        response_tokens.append(word)
        response_importances.append(float(sum(scores) / len(scores)))


    return {
        "probs": { idx2label[i]: float(probs[i]) for i in range(len(probs)) },
        "tokens": response_tokens,
        "importances": response_importances
    }
