fetch("/api/chat", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ message: input.value })
})
.then(res => res.json())
.then(data => {
  if (data.reply) {
    output.innerText = data.reply;
  } else if (data.error) {
    output.innerText = data.error;
  } else {
    output.innerText = "AI gak ngirim jawaban 😅";
  }
})
.catch(() => {
  output.innerText = "Koneksi error, coba lagi";
});
