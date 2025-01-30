import os
import google.generativeai as genai
import json

genai.configure(api_key="AIzaSyC019wmY3v9dZJmIl9BJtm5Vq_t2-bGc2w")


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
        "You are an AI assistant that processes structured JSON data.  \n\n### *Task*  \nYou will receive a JSON object containing:  \n- \"transcript\": A new piece of text (e.g., conversation, paragraph, or note).  \n- \"summary\": A previous summary of all past transcripts (or null if none exists).  \n- \"user_question\": A question asked by the user (or null if no question is present).  \n- \"ai_response\": The AI's response to the user question (or null if no question is present).  \n\nYou are allowed to *modify only \"summary\" and \"ai_response\".  \n\n---\n\n### **Instructions*  \n\n1. *Summarization Rule:*  \n   - Combine the \"summary\" and \"transcript\" fields.  \n   - Update \"summary\" to provide a clear, concise summary of all past and current transcripts.  \n   - If \"summary\" is null, create a new summary from the \"transcript\".  \n   - Ensure the summary remains *informative, non-repetitive, and easy to understand.  \n\n2. **Answering Questions:*  \n   - If \"user_question\" is *not null, generate a concise, accurate answer based on \"summary\".  \n   - Store the answer in \"ai_response\".  \n   - If \"user_question\" is null, do not modify \"ai_response\".  \n\n3. **Output Format:*  \n   - Return only the modified JSON object.  \n   - Do not include any additional text, explanations, or formatting.  \n\n---\n\n### *Example Input JSON:*\njson\n{\n  \"transcript\": \"Today, the team worked overnight for the hackathon. We completed the backend.\",\n  \"summary\": null,\n  \"user_question\": null,\n  \"ai_response\": null\n}\n",
      ],
    },
    {
      "role": "model",
      "parts": [
        "json\n{\n  \"transcript\": \"Today, the team worked overnight for the hackathon. We completed the backend.\",\n  \"summary\": \"The team worked overnight for the hackathon and completed the backend.\",\n  \"user_question\": null,\n  \"ai_response\": null\n}\n\n",
      ],
    },
  ]
)

global_transcript = None
global_summary = None
global_user_question = None

def get_ai_res(prompt):
    string_prompt = json.dumps(prompt)
    response = chat_session.send_message(string_prompt)
    return response.text

def update_prompt():
    prompt = {"transcript": global_transcript,"summary": global_summary,"user_question": global_user_question,"ai_response": None}
    return prompt

def send_ai_res(question , transcript):
    global global_transcript, global_user_question, global_summary
    global_transcript = transcript
    global_user_question = question
    prompt = update_prompt()
    complete_response = get_ai_res(prompt)
    print("returned response before converting into json :",complete_response)
    complete_response_after_removing = complete_response.replace('json', '').replace('```', '').strip()
    try:
        complete_response_json = json.loads(complete_response_after_removing)
        print("it the final thing we are sending to frontend",complete_response_json)
        global_summary = complete_response_json["summary"]
        print(global_summary)
        return complete_response_json
    except json.JSONDecodeError as e:
        print("Error parsing JSON:", e)

def send_summary_real():
    return global_summary
