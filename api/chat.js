export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const pesan = req.body.message;

  try {
    const controller = new AbortController();
setTimeout(() => controller.abort(), 15000); // maksimal 15 detik

const r = await fetch(
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" +
    process.env.GEMINI_KEY,
  {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    signal: controller.signal,
    body: JSON.stringify({
      contents: [{
        parts: [{ text: pesan }]
      }]
    })
  }
);
       
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `
text: `Kamu adalah AI bernama ZICO.
Jawab singkat, santai, bahasa Indonesia gaul.

User: ${pesan}`
`
            }]
          }]
        })
      }
    );

    const data = await r.json();

    res.status(200).json({
      reply: data.candidates[0].content.parts[0].text
    });

  } catch (e) {
  res.status(200).json({
    reply: "ZICO lagi rame 😵 coba kirim lagi bentar ya"
  });
}
