import assemblyai as aai
import google.generativeai as genai

# AssemblyAI API Key
aai.settings.api_key = "afc3d846f104490aa7ef89269c02edbb"

# Transcribe Audio using AssemblyAI
transcriber = aai.Transcriber()
transcript = transcriber.transcribe("https://assembly.ai/news.mp4")
transcribed_text = transcript.text

# Google Gemini API Key
genai.configure(api_key="AIzaSyBPEtLXjY2GrUFl-em1XF-ytEy51vUv6Wc")

# Send transcribed text to Gemini
model = genai.GenerativeModel("gemini-pro")
response = model.generate_content(transcribed_text)

# Print Gemini's response
print("Gemini's Response:", response.text)
