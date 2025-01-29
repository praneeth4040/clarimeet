from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import subprocess
import os

app = FastAPI()

class RecordRequest(BaseModel):
    duration: int

@app.post("/record")
async def record_audio(request: RecordRequest):
    try:
        subprocess.run(["python", "components/audioInput.py", str(request.duration)], check=True)
        
        subprocess.run(["python", "components/speech-to-text.py"], check=True)

        with open("output.txt", "r") as file:
            text = file.read()

        return {"text": text}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
