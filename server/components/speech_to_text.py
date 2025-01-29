import assemblyai as aai   


aai.settings.api_key = "afc3d846f104490aa7ef89269c02edbb"
transcriber = aai.Transcriber()
def speech_to_text(output_file):
    transcript = transcriber.transcribe(output_file)
    audioText = transcript.text
    print("recived message :",audioText)
    return audioText
