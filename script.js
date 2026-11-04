(() => {
  "use strict";
  const byId = (id) => document.getElementById(id);

  function openInvitation() {
    const opening = byId("opening");
    if (opening) opening.classList.add("closed");
    const song = byId("weddingSong");
    const musicButton = byId("musicToggle");
    if (song) {
      song.play().then(() => {
        if (musicButton) musicButton.innerHTML = "♫ <span>Pause music</span>";
      }).catch(() => {
        if (musicButton) musicButton.innerHTML = "♫ <span>Play music</span>";
      });
    }
  }

  function updateCountdown() {
    // JavaScript months are zero-based: 10 = November.
    const target = new Date(2026, 10, 15, 6, 0, 0).getTime();
    const distance = Math.max(0, target - Date.now());
    const values = {
      days: Math.floor(distance / 86400000),
      hours: Math.floor((distance % 86400000) / 3600000),
      minutes: Math.floor((distance % 3600000) / 60000),
      seconds: Math.floor((distance % 60000) / 1000)
    };
    Object.entries(values).forEach(([id, value]) => {
      const node = byId(id);
      if (node) node.textContent = String(value).padStart(2, "0");
    });
  }

  function shareInvitation() {
    const message = "You're warmly invited to the wedding of Divyabharathi & Jegachandar!\nWedding: 15 November 2026, 6:00 AM onwards at Sri Chengalamma Temple, Sulurpetta.\nReception: 20 November 2026, 6:00 PM onwards at Suganya Marriage Hall, Neelankarai.\nWe look forward to celebrating with you!";
    const shareText = message + "\n" + window.location.href;
    const whatsappUrl = "https://wa.me/?text=" + encodeURIComponent(shareText);
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  }

  document.addEventListener("DOMContentLoaded", () => {
    const openButton = byId("openInvite");
    const shareButton = byId("shareInvite");
    const musicButton = byId("musicToggle");
    const song = byId("weddingSong");
    // Create a light, continuous shower of rose petals without blocking taps.
    const petalLayer = byId("petalLayer");
    if (petalLayer && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      for (let i = 0; i < 16; i++) {
        const petal = document.createElement("span");
        petal.className = "rose-petal";
        petal.style.setProperty("--left", `${(i * 37 + 8) % 100}%`);
        petal.style.setProperty("--size", `${9 + (i % 4) * 3}px`);
        petal.style.setProperty("--duration", `${13 + (i % 6) * 2}s`);
        petal.style.setProperty("--delay", `${-(i * 1.7)}s`);
        petal.style.setProperty("--drift", `${((i % 5) - 2) * 34}px`);
        petal.style.setProperty("--turn", `${i * 29}deg`);
        petalLayer.appendChild(petal);
      }
    }
    if (openButton) openButton.addEventListener("click", openInvitation);
    if (musicButton && song) musicButton.addEventListener("click", () => {
      if (song.paused) {
        song.play().then(() => { musicButton.innerHTML = "♫ <span>Pause music</span>"; }).catch(() => {});
      } else {
        song.pause();
        musicButton.innerHTML = "♫ <span>Play music</span>";
      }
    });
    if (shareButton) shareButton.addEventListener("click", shareInvitation);
    updateCountdown();
    window.setInterval(updateCountdown, 1000);
  });
})();
