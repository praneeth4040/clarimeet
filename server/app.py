from fastapi import FastAPI
from components.audioInput import record_audio
from components.speech_to_text import speech_to_text
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
