import google.generativeai as genai

genai.configure(api_key="AIzaSyCZjDg0hM1piiCwqGXDUdCTGSzWbsgLfvA")

generation_config = {
  "temperature": 1,
  "top_p": 0.95,
  "top_k": 40,
  "max_output_tokens": 8192,
  "response_mime_type": "text/plain",
}

model = genai.GenerativeModel(
  model_name="gemini-2.0-flash-exp",
  generation_config=generation_config,
)

chat_session = model.start_chat(
  history=[
    {
      "role": "user",
      "parts": [
        "Input: A YouTube video URL.\n\nTask: Summarize the video in bullet points, focusing on the key information from the video. Provide a concise list of bullet points that cover the main topics, important details, and any critical actions or conclusions. The response should only include the bullet points summary — no additional text or context is required.\n\nImportant Notes for Model:\n\nThe output should consist solely of bullet points that summarize the main points of the video.\nFocus on capturing the essence of the content without unnecessary detail or filler.\nBullet points should be direct, clear, and easy to understand for the user.\nOnly relevant content from the video should be included in the summary.\n",
      ],
    },
    {
      "role": "model",
      "parts": [
        "*   [Model will populate with bullet points when given a YouTube URL]\n",
      ],
    },
  ]
)
#url = "https://youtu.be/BLl32FvcdVM?feature=shared"

def get_summary(url):
    response = chat_session.send_message()
    print(response.text)
    return response.text