import requests

payload = {
    "message": "Find schemes for manufacturing MSMEs",
    "conversation_id": "test1234",
    "conversation_history": []
}

try:
    response = requests.post("http://localhost:8000/api/v1/copilot/chat", json=payload)
    print("Status Code:", response.status_code)
    print("Response JSON:")
    try:
        print(response.json())
    except:
        print(response.text)
except Exception as e:
    print("Error:", str(e))
