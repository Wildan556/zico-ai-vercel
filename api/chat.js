async function sendMessage() {
  const input = document.getElementById("userInput");
  const text = input.value.trim();
  if (!text) return;

  input.value = "";

  // bubble user
  addBubble(text, "user");

  // bubble AI (loading)
  const aiBubble = addBubble("AI lagi mikir...", "ai");

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message: text }),
      signal: controller.signal
    });

    clearTimeout(timeout);

    const data = await res.json();

    if (data.reply) {
      aiBubble.textContent = data.reply;
    } else if (data.error) {
      aiBubble.textContent = data.error;
    } else {
      aiBubble.textContent = "AI gak ngasih jawaban 😅";
    }

  } catch (err) {
    aiBubble.textContent = "AI terlalu lama mikir (timeout)";
  }
}
