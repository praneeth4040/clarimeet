from fastapi import FastAPI
from components.audioInput import record_audio
from components.speech_to_text import speech_to_text
from geminiAi import send_ai_res
from components.geminiApiForurl import get_summary
import os

app = FastAPI()

@app.get("/record_audio")
def record_audio_endpoint(duration: int):
    output_file = "output.wav"
    record_audio(duration, output_file)
    return {"message": "Recording finished", "file_path": os.path.abspath(output_file)}


@app.get("/Ai_transcript")
def transcript_audio_endpoint():
    output_file = "output.wav"
    transcripted_text = speech_to_text(output_file)
    return {"message": "it has successfully done the transcript", "transcripted_text":transcripted_text}

@app.get("/send_res")
def send_generated_res(question: str,transcript:str):
    completed_script = send_ai_res(question , transcript)

    return completed_script

@app.get("/url_summary")
def send_summary(url:str):
    response = get_summary(url)
    return response