const backendURL = "https://zico-ai-vercel.vercel.app/api/chat";
const messages = document.getElementById('messages');
const msgInput = document.getElementById('msg');
const sendBtn = document.getElementById('send');
const topImageDiv = document.querySelector('.top-image');
const body = document.body;

// Load config.json untuk gambar
fetch('config.json')
  .then(res => res.json())
  .then(cfg => {
      body.style.background = `linear-gradient(rgba(18,72,116,0.7), rgba(18,72,116,0.7)), url('${cfg.background}') center/cover fixed`;
      topImageDiv.style.backgroundImage = `url('${cfg.topImage}')`;
  });

// Fungsi tambah chat
function addMessage(text, sender, isLoading=false) {
    const div = document.createElement('div');
    div.className = `msg-bubble ${sender}`;
    if(isLoading) div.innerHTML = '<div class="loading"><span></span><span></span><span></span></div>';
    else div.textContent = text;
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
    return div;
}

// Fungsi kirim chat
async function sendMessage() {
    const text = msgInput.value.trim();
    if(!text) return;

    addMessage(text,'user');
    msgInput.value='';

    const zicoMsg = addMessage('', 'zico', true);

    try {
        const response = await fetch(backendURL,{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({message:text})
        });
        const data = await response.json();
        zicoMsg.innerHTML = data.reply;
    } catch(e) {
        zicoMsg.innerHTML = "Maaf, sistem sedang sibuk. Coba lagi ya!";
    }
}

sendBtn.addEventListener('click', sendMessage);
msgInput.addEventListener('keypress', e => { if(e.key==='Enter') sendMessage(); });
