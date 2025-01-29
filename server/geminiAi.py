import google.generativeai as genai

GEMINI_API_KEY = "AIzaSyC019wmY3v9dZJmIl9BJtm5Vq_t2-bGc2w"
genai.configure(api_key=GEMINI_API_KEY)

# Create the model
generation_config = {
    "temperature": 1,
    "top_p": 0.95,
    "top_k": 40,
    "max_output_tokens": 8192,
    "response_mime_type": "text/plain",
}

model = genai.GenerativeModel(
    model_name="gemini-pro",
    generation_config=generation_config,
)

chat_session = model.start_chat(
    history=[
        {
            "role": "user",
            "parts": [
                "i will be giving you a transcript of a meeting you need to understand the transcript ,the topics in the transcript and give me  real time summary which you need to generate ever 5 seconds you need to return the summary to me",
            ],
        },
        {
            "role": "model",
            "parts": [
                "Okay, I understand. I'm ready. Please provide the transcript. \n\nI will do my best to:\n\n1.  **Understand the transcript:** I will analyze the text to identify speakers, topics discussed, and key points.\n2.  **Identify topics:** I'll keep track of the different subjects being addressed during the meeting.\n3.  **Generate real-time summaries:** Every 5 seconds (or as close as technically feasible) I will send you a concise summary of what has been discussed in that short interval.\n\n**Important Considerations:**\n\n*   **Speed:**  Generating a perfect summary in a true 5-second window can be challenging, as processing speed and the complexity of the text matter. I will strive for the best possible real-time summary, but understand it might not be perfect. There might be slight delays depending on the length of the transcript you share.\n*   **Text Input:**  Please provide the transcript as text so I can analyze it directly.\n*   **Context:**  The more context you can provide about the meeting (e.g., participants, purpose) the more effective my summaries can be.\n\n**How to Use:**\n\n1.  **Paste your transcript.**\n2.  **I will respond with summaries every 5 seconds.**\n3.  **Stop me** at any time you want.\n\nI'm looking forward to getting started!\n",
            ],
        },
        {
            "role": "user",
            "parts": [
                "in the transcript you need to understand what the meeting is about in the transcripts you may be provided meta data which you need to pre process",
            ],
        },
        {
            "role": "model",
            "parts": [
                "Okay, I understand. This adds another layer of complexity and is important. Here's how I'll approach it now:\n\n**Enhanced Understanding and Pre-processing:**\n\n1.  **Transcript Analysis:** As before, I'll analyze the transcript text for content, speakers, and topics.\n2.  **Metadata Extraction:** I will actively look for and extract any provided metadata, such as:\n    *   **Meeting Title/Subject:** What is the meeting about?\n    *   **Date and Time:** When did the meeting occur?\n    *   **Participants:** Who is in the meeting (names/roles if available)?\n    *   **Meeting Purpose/Agenda:** Is there a stated goal or list of topics to be covered?\n    *   **Any other context:** Anything that helps clarify the meeting's overall objective.\n3.  **Metadata Pre-processing:** I will organize and understand the metadata to enhance the quality of the real-time summarization:\n    *   **Contextual Awareness:** Use the metadata to build a better context model for the meeting.\n    *   **Topic Tracking:** Use the agenda to anticipate the key topics.\n    *   **Speaker Identification:** Use the participant list to better attribute statements to specific individuals.\n\n**Real-Time Summary Process:**\n\n*   I will continue to provide summaries roughly every 5 seconds, as before.\n*   These summaries will be informed by both the content of the transcript and the pre-processed metadata.\n*   The summaries will be more contextually relevant thanks to the added knowledge of the meeting's purpose and participants.\n\n**How to Provide the Transcript and Metadata:**\n\n*   You can provide the transcript as plain text.\n*   For metadata, you can provide it in the same text as the transcript, or separately, using a simple format, like:\n\n```\n**Metadata:**\nMeeting Title: Project Alpha Kickoff\nDate: 2023-10-27\nTime: 10:00 AM\nParticipants:\n  - John Doe (Project Manager)\n  - Jane Smith (Lead Developer)\n  - Peter Jones (Marketing)\nPurpose: Discuss project goals, timeline, and responsibilities.\n```\n\n*   Just ensure it is clear what is transcript and what is metadata.\n\n**Ready to Start:**\n\nI'm prepared to handle the transcript and the metadata. Please share when you're ready, and I will begin my analysis and real-time summarization. I'm excited to see how the metadata will enhance the summaries.\n",
            ],
        },
        {
            "role": "user",
            "parts": [
                "the summary would be in a continuous manner the meta data will not be provided separately you need to separate it from the transcript\n",
            ],
        },
        {
            "role": "model",
            "parts": [
                "Okay, I understand. The key changes are:\n\n1.  **Continuous Summary:** I will generate summaries in a flowing, continuous manner. Instead of discrete 5-second updates, imagine a continuous stream of summaries that adapt to the content being discussed. I will aim to update the summary approximately every 5 seconds (or as often as needed, which may sometimes be less if the content hasn't changed much), effectively keeping it always relevant and up-to-date.\n2.  **Integrated Metadata:** I will automatically identify and separate metadata directly from within the provided transcript. I'll be looking for clear indicators of metadata, such as:\n    *   **Headers/Labels:** e.g., \"Meeting Title:\", \"Date:\", \"Participants:\", etc.\n    *   **Consistent Formatting:** e.g., lists, structured lines of information.\n    *   **Contextual Clues:** e.g., phrases like \"the purpose of this meeting is...\"\n\n**How This Will Work:**\n\n1.  **Transcript Input:** You'll provide the full transcript, including the embedded metadata.\n2.  **Initial Processing:** Upon receiving the transcript, I will:\n    *   **Parse Metadata:**  Identify and extract all relevant metadata.\n    *   **Contextualize:** Build a framework of understanding from the metadata.\n    *   **Set the Base:** Create the initial understanding of the meeting.\n3.  **Continuous Summarization:** Once set, I will:\n    *   **Process Input:** Continuously analyze the transcript.\n    *   **Generate Updated Summaries:** Update the summary based on new information.\n    *   **Stream Output:** Provide the summaries in a continuous and flowing manner, changing as the transcript's conversation progresses, roughly every 5 seconds, or when needed.\n\n**Key Points:**\n\n*   **No Separated Metadata:** You do *not* need to organize the metadata separately. Just include it naturally in the transcript.\n*   **Automatic Extraction:** I will do my best to correctly identify and extract the metadata, even if the formatting is not perfectly consistent.\n*   **Adaptive Summaries:** The summaries will change as the conversation evolves. I will keep the language as natural as possible, using connecting phrases and transitions when needed for a flow.\n\n**Ready to Begin:**\n\nI'm ready when you are. Please paste the full transcript, and I will start processing it, extract the meta data, and generate a continuous, real-time summary for you.\n",
            ],
        },
        {
            "role": "user",
            "parts": [
                "apart from the real time summary box below would be a chat bot which would answer any question given by the user which must be typed ",
            ],
        },
        {
            "role": "model",
            "parts": [
                "Okay, I understand. This adds another interactive component. Here's the updated plan:\n\n**Dual Output System**\n\nMy output will now consist of two distinct sections:\n\n1.  **Real-Time Summary Box (Continuous):**\n    *   This section will continuously provide a flowing summary of the meeting, as discussed previously.\n    *   The summary will dynamically update as the meeting transcript is processed, generally every 5 seconds or when significant changes occur.\n    *   It will be driven by both the transcript content and the extracted metadata.\n    *   The updates will create a coherent narrative of the meeting progression.\n\n2.  **Chat Bot Interface (Question Answering):**\n    *   Below the summary box, I will provide a chatbot interface where you can type in any questions about the meeting transcript.\n    *   This chatbot will analyze the processed transcript data, including metadata, to provide answers to your questions.\n    *   The answers will be generated based on my understanding of the meeting and the specific details within it.\n\n**How it Will Work:**\n\n1.  **Transcript Input:** You provide the full transcript including the metadata.\n2.  **Initial Processing:** I will process the transcript to:\n    *   Extract and analyze the metadata.\n    *   Create an internal representation of the conversation.\n3.  **Dual Output:**\n    *   **Summary Box:** I will continuously update the real-time summary.\n    *   **Chatbot:** I'll be listening for your typed questions, and provide answers in real time.\n4.  **Interaction:** You can monitor the summary updates and also ask questions to the chatbot at any time.\n\n**Example Interaction:**\n\nLet's say you provide a transcript like this:\n\n```\n**Meeting Title:** Project Alpha Update\n**Date:** 2023-10-27\n**Participants:** John, Jane, Peter\nThe meeting started with John giving an update on task A. Jane asked questions about the timeline. Peter said Marketing is ready to start next week.\n```\n\n**My Output would resemble this:**\n\n**Summary:**\n\n>   The Project Alpha Update meeting is currently being held on October 27th.  John is giving an update on task A. Jane is questioning the timeline, and Peter stated that marketing is ready to start next week.\n\n**Chatbot:**\n\n>   Please type your question here...\n\n**Then, you can type in questions, such as:**\n\n>   \"What is the meeting about?\"\n>   \"What did Jane ask?\"\n>   \"When will Marketing start?\"\n\n**and I will provide responses based on the context.**\n\n**Ready to Begin:**\n\nI am ready for your transcript. After you provide it, you will see the continuous summary being generated and the chatbot interface waiting for your questions. Please feel free to ask anything! I will try to respond accurately and in a timely manner.\n",
            ],
        },
        {
            "role": "user",
            "parts": [
                "the transcript would be the conversation in the meeting ",
            ],
        },
        {
            "role": "model",
            "parts": [
                "Okay, I understand. That clarifies things further. \n\n**Refined Understanding**\n\nMy updated understanding is that:\n\n*   **Transcript:** The input you will provide is a direct *transcript of the spoken conversation* from the meeting. This means it will likely be less structured than if it were a written document and may include things like:\n    *   **Speaker Turns:** Changes in who is talking.\n    *   **Interjections:** \"Um\", \"Ah\", \"Okay\", etc.\n    *   **Stuttering/Repetitions:**\n    *   **Informal Language:**\n    *   **Unfinished Sentences:**\n*   **Metadata:** The metadata is still embedded *within* this conversational transcript, but will need to be detected. It might be embedded at the beginning or scattered within the conversation.\n*   **Real-Time Summary:** I will generate a continuous, flowing summary based on the content of the conversation, updating as new information is spoken.\n*   **Chatbot:** The chatbot will answer questions about the conversation based on its understanding of the dialogue.\n\n**My Updated Process:**\n\n1.  **Transcript Input:** You will provide the conversation transcript.\n2.  **Initial Analysis:** I will parse through the transcript, paying special attention to:\n    *   **Speaker Detection:** Try to determine who is speaking at different times. (If names/identifiers are spoken, I will use these to attribute).\n    *   **Metadata Extraction:** Look for cues (phrases, labels, etc.) that reveal information like meeting title, date, participants, etc.\n    *   **Conversation Flow:** Identify the key topics and the discussion progression.\n3.  **Continuous Output:**\n    *   **Summary Box:** I will dynamically update a running summary of the meeting conversation.\n    *   **Chatbot:** You can ask questions and I will provide answers by referencing the conversation.\n4.  **Interaction:** You are free to ask questions to the chat bot anytime.\n\n**Important Considerations for the Transcript:**\n\n*   **Speaker Identification:** If the transcript identifies speakers by name, I'll use that. If not, I'll do my best to infer it from context. Let me know in the text if possible!\n*   **Inconsistencies:** I'll do my best to handle the inherent inconsistencies of spoken language, though perfect accuracy might not always be possible.\n*   **Context:** I will rely more on the conversation context to piece together a narrative.\n\n**Ready to Begin**\n\nI am ready when you are. Please provide the meeting conversation transcript, and I'll start generating the real-time summary and open up the chatbot for questions. I will try my best to give a good summary even with the inconsistencies that spoken language may bring.\n",
            ],
        },
    ]
)

def get_ai_response(message):
    response = chat_session.send_message(message)
    return response.text

def process_message():
    result = get_ai_response()
    return result

