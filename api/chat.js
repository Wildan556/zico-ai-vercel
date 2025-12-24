const messages = document.getElementById("messages");
const msgInput = document.getElementById("msg");
const sendBtn = document.getElementById("send");

function addMessage(text, sender, loading = false) {
  const div = document.createElement("div");
  div.className = `msg-bubble ${sender}`;

  if (loading) {
    div.innerHTML = `
      <div class="loading">
        <span></span><span></span><span></span>
      </div>
    `;
  } else {
    div.textContent = text;
  }

  messages.appendChild(div);
  messages.scrollTop = messages.scrollHeight;
  return div;
}

async function sendMessage() {
  const text = msgInput.value.trim();
  if (!text) return;

  // pesan user
  addMessage(text, "user");
  msgInput.value = "";

  // loading AI
  const aiBubble = addMessage("", "zico", true);

  try {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message: text })
    });

    // kalau backend error
    if (!res.ok) {
      aiBubble.textContent = "AI lagi sibuk 😅 coba lagi ya";
      return;
    }

    const data = await res.json();

    // proteksi biar ga undefined / object
    if (data && typeof data.reply === "string") {
      aiBubble.textContent = data.reply;
    } else {
      aiBubble.textContent = "AI tidak memberi jawaban.";
    }

  } catch (err) {
    aiBubble.textContent = "Koneksi bermasalah 😢";
  }
}

// tombol kirim
sendBtn.addEventListener("click", sendMessage);

// enter
msgInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") sendMessage();
});
