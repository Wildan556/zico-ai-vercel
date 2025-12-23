async function kirim() {
  const msg = document.getElementById("msg").value;
  const hasil = document.getElementById("hasil");

  hasil.textContent = "ZICO lagi mikir...";

  const res = await fetch(
    "https://zico-ai-vercel.vercel.app/api/chat",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: msg })
    }
  );

  const data = await res.json();
  hasil.textContent = data.reply;
}
