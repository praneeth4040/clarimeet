from fastapi import FastAPI
from components.audioInput import record_audio
from components.speech_to_text import speech_to_text
from geminiAi import send_ai_res , send_summary_real
from components.geminiApiForurl import get_summary
from fastapi.middleware.cors import CORSMiddleware
import os

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods (GET, POST, PUT, DELETE, etc.)
    allow_headers=["*"],  # Allow all headers
)

@app.get("/record_audio")
def record_audio_endpoint(duration: int):
    output_file = "output.wav"
    record_audio(duration, output_file)
    return {"message": "Recording finished", "file_path": os.path.abspath(output_file),"value":1}


@app.get("/Ai_transcript")
def transcript_audio_endpoint():
    output_file = "output.wav"
    transcripted_text = speech_to_text(output_file)
    print("text before sending to frontend",transcripted_text)
    return {"message": "it has successfully done the transcript", "transcripted_text":transcripted_text,"value":1}

@app.get("/send_res")
def send_generated_res(question: str,transcript:str):
    completed_script = send_ai_res(question , transcript)

    return completed_script

@app.get("/url_summary")
def send_summary(url:str):
    response = get_summary(url)
    return response

@app.get("/send_summary")
def send_summarizer():
    response = send_summary_real()
    print(response)
    return response