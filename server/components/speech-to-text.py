import assemblyai as aai   

output = 'output.wav'
aai.settings.api_key = "afc3d846f104490aa7ef89269c02edbb"
transcriber = aai.Transcriber()

transcript = transcriber.transcribe(output)

audioText = transcript.text
print("recived message :",transcript.text)
