from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import subprocess
import os

app = FastAPI()

class RecordRequest(BaseModel):
    duration: int

# Endpoint to record audio and convert to text
@app.post("/record")
async def record_audio(request: RecordRequest):
    try:
        # Run the audio recording script
        subprocess.run(["python", "components/audioInput.py", str(request.duration)], check=True)

        # Run the speech-to-text script
        subprocess.run(["python", "components/speech-to-text.py"], check=True)

        # Read the converted text from the output file
        with open("output.txt", "r") as file:
            text = file.read()

        return {"text": text}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
