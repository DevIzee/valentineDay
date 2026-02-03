const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const card = document.querySelector(".card");

// YES grows over time
let yesScale = 1;
const MAX_SCALE = 1.35;

const growYes = setInterval(() => {
  if (yesScale < MAX_SCALE) {
    yesScale += 0.03;
    yesBtn.style.transform = `scale(${yesScale})`;
  } else {
    clearInterval(growYes);
  }
}, 900);

// NO button flee by proximity
document.addEventListener("mousemove", evade);
document.addEventListener("touchmove", e => evade(e.touches[0]));

function evade(e) {
  const rect = noBtn.getBoundingClientRect();
  const dx = e.clientX - (rect.left + rect.width / 2);
  const dy = e.clientY - (rect.top + rect.height / 2);
  const dist = Math.hypot(dx, dy);

  if (dist < 120) {
    const x = Math.random() * 300 - 150;
    const y = Math.random() * 120 - 60;
    noBtn.style.transform = `translate(${x}px, ${y}px)`;
  }
}

// Snow + hearts generator
function spawn(className, content) {
  const el = document.createElement("span");
  el.textContent = content;
  el.style.left = Math.random() * 100 + "vw";
  el.style.fontSize = Math.random() * 16 + 12 + "px";
  el.style.animationDuration = Math.random() * 5 + 4 + "s";
  document.querySelector(className).appendChild(el);
  setTimeout(() => el.remove(), 9000);
}

// YES click
yesBtn.addEventListener("click", () => {
  // Remplacer le contenu de la carte
  card.innerHTML = `
    <h1>Yaaay 🥰</h1>
    <p>You chose love</p>
    <div style="font-size:48px;margin-top:16px">💖</div>
  `;

  // Lancer l'audio
  const audio = document.getElementById("bgAudio");
  if (audio) {
    audio.currentTime = 2; // exemple : démarrer à 2s
    audio.volume = 0.3;
    audio.play().catch(() => {
      document.addEventListener("click", () => audio.play(), { once: true });
    });
  }

  // Commencer la neige et les cœurs après le clic
  setInterval(() => spawn(".snow", "❄️"), 300);
  setInterval(() => spawn(".hearts", "💗"), 600);
});
