export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const apiKey = process.env.OPENAI_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "API key belum di set di Vercel" });
  }

  const { message } = req.body;
  if (!message) {
    return res.status(400).json({ error: "Pesan kosong" });
  }

  try {
    const response = await fetch(
      "https://api.openai.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [{ role: "user", content: message }],
          temperature: 0.7
        })
      }
    );

    // 🔴 INI PENTING
    if (!response.ok) {
      const errText = await response.text();
      return res.status(500).json({
        error: "AI lagi rame, coba bentar lagi"
      });
    }

    const data = await response.json();

    return res.status(200).json({
      reply: data.choices[0].message.content
    });

  } catch (err) {
    return res.status(500).json({
      error: "AI lagi mikir lama 😅 coba ulang"
    });
  }
}
