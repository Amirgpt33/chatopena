
async function askGPT() {
  const input = document.getElementById("userInput").value.trim();
  if (!input) return;

  const chatBox = document.getElementById("chatBox");

  const userMsg = document.createElement("div");
  userMsg.className = "message user";
  userMsg.innerText = input;
  chatBox.appendChild(userMsg);

  const loadingMsg = document.createElement("div");
  loadingMsg.className = "message bot";
  loadingMsg.innerText = "⏳ سوچ رہا ہوں...";
  chatBox.appendChild(loadingMsg);

  chatBox.scrollTop = chatBox.scrollHeight;

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer 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"
      },
      body: JSON.stringify({
        model: "mistralai/mistral-7b-instruct",
        messages: [
          { role: "system", content: "تم ایک مددگار اردو چیٹ بوٹ ہو جو تفصیلی جواب دیتا ہے۔" },
          { role: "user", content: input }
        ]
      })
    });

    const data = await response.json();
    loadingMsg.remove();

    const reply = document.createElement("div");
    reply.className = "message bot";
    reply.innerText = data.choices?.[0]?.message?.content || "❌ کوئی جواب نہیں آیا";
    chatBox.appendChild(reply);
    chatBox.scrollTop = chatBox.scrollHeight;

  } catch (error) {
    loadingMsg.innerText = "❌ کچھ غلط ہو گیا!";
    console.error(error);
  }

  document.getElementById("userInput").value = "";
}
