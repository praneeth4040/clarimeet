import assemblyai as aai
output = 'output.wav'
aai.settings.api_key = "afc3d846f104490aa7ef89269c02edbb"
transcriber = aai.Transcriber()

transcript = transcriber.transcribe(output)
# transcript = transcriber.transcribe("./my-local-audio-file.wav")

print(transcript.text)