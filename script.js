const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");

noBtn.addEventListener("mouseenter", moveButton);
noBtn.addEventListener("touchstart", moveButton);

function moveButton() {
  const x = Math.random() * 120 - 60;
  const y = Math.random() * 40 - 20;
  noBtn.style.transform = `translate(${x}px, ${y}px)`;
}

yesBtn.addEventListener("click", () => {
  document.querySelector(".card").innerHTML = `
    <h1>Yay ❤️</h1>
    <p>You made my day</p>
  `;
});
