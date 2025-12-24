const input = document.getElementById("msg");
const button = document.getElementById("send");
const output = document.getElementById("hasil");

button.addEventListener("click", kirimPesan);

async function kirimPesan() {
  const pesan = input.value.trim();

  if (!pesan) {
    output.innerText = "Ketik pesan dulu 😅";
    return;
  }

  output.innerText = "AI lagi mikir...";

  try {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message: pesan
      })
    });

    const data = await res.json();

    if (data.reply) {
      output.innerText = data.reply;
    } else if (data.error) {
      output.innerText = data.error;
    } else {
      output.innerText = "AI gak ngirim jawaban 😵‍💫";
    }

  } catch (err) {
    output.innerText = "Koneksi error, coba lagi bentar";
  }
}
