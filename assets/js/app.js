/* ===================== TOAST ===================== */

let toastTimer;

function showToast(text){
  const el = $("toast");
  $("toastText").textContent = text;
  el.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove("show"), 2200);
}

/* ===================== LOADER ===================== */

/* ═══════════════════════════════════════════════════════════
   ✨ TRANSITION D'ENTRÉE ORIENTALE + SON (avec interaction)
   ═══════════════════════════════════════════════════════════ */

let loaderSoundPlayed = false;

function playWelcomeSound() {
  if (loaderSoundPlayed) return;
  loaderSoundPlayed = true;

  const sound = $("welcomeSound");
  if (sound) {
    sound.volume = 0.4;
    sound.play().catch(() => {
      console.log("[Loader] Son non autorisé");
    });
  }
}

window.addEventListener("load", () => {
  const loader = $("loader");
/* ═══════════════════════════════════════════════════════════
   ✨ WELCOME TOAST — apparaît après 1ère interaction
   ═══════════════════════════════════════════════════════════ */

let welcomeShown = false;

function showWelcomeOnce() {
  if (welcomeShown) return;
  welcomeShown = true;

  setTimeout(() => {
    const loc = (typeof RESTAURANT_LOCATION !== 'undefined')
      ? (RESTAURANT_LOCATION[lang] || RESTAURANT_LOCATION.en)
      : { short: 'Al Dhana' };

    showToast(t(
      `Welcome to Bab Al Khair · ${loc.short}`,
      `أهلاً بك في باب الخير · ${loc.short}`
    ));
  }, 800);
}

// Déclenche après la 1ère interaction utilisateur UNIQUEMENT
// → Ne bloque JAMAIS la bottom nav au chargement
document.addEventListener('click', showWelcomeOnce, { once: true });
document.addEventListener('touchstart', showWelcomeOnce, { once: true });
  // Essayer de jouer immédiatement
  playWelcomeSound();

  // Fallback : si bloqué, jouer à la 1ère interaction
  document.addEventListener("click", playWelcomeSound, { once: true });
  document.addEventListener("touchstart", playWelcomeSound, { once: true });

  // ⏱️ Cache le loader après 4.5 secondes
  setTimeout(() => {
    if (loader) loader.classList.add("hide");

    const sound = $("welcomeSound");
    if (sound) {
      const fadeOut = setInterval(() => {
        if (sound.volume > 0.02) {
          sound.volume -= 0.02;
        } else {
          sound.volume = 0;
          sound.pause();
          clearInterval(fadeOut);
        }
      }, 60);
    }
  }, 4500);
});
/* ===================== PATCH 1 — Location info ===================== */

function showLocationInfo() {
  showToast(t(
    "Adnoc Housing · West Market · Al Dhana",
    "سكن أدنوك · السوق الغربي · الظفرة"
  ));
}

/* ===================== PATCH 3 — Bottom navigation ===================== */

function switchTab(tab) {
  document.querySelectorAll('.navItem').forEach(el => {
    el.classList.toggle('active', el.dataset.tab === tab);
  });

  if (tab === 'home') {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } else if (tab === 'menu') {
    document.querySelector('.sectionHead').scrollIntoView({ behavior: 'smooth', block: 'start' });
  } else if (tab === 'contact') {
    const loc = RESTAURANT_LOCATION[lang] || RESTAURANT_LOCATION.en;
    showToast(`${loc.full} · ${loc.country}`);
  }
}

/* ===================== INIT ===================== */

renderChips();
render();
updateCart();
restoreAddress();

ADDR_FIELDS.forEach(id => {
  const el = $(id);
  if(el) el.addEventListener("input", saveAddress);
});

/* ===================== WELCOME TOAST ===================== */

/* ═══════════════════════════════════════════════════════════
   ✨ WELCOME TOAST — après interaction (ne bloque PAS la nav)
   ═══════════════════════════════════════════════════════════ */

let welcomeShown = false;

function showWelcomeOnce() {
  if (welcomeShown) return;
  welcomeShown = true;

  // Attendre la fin du loader (4.5s) + petit délai
  setTimeout(() => {
    const loc = RESTAURANT_LOCATION[lang] || RESTAURANT_LOCATION.en;
    showToast(t(
      `Welcome to Bab Al Khair · ${loc.short}`,
      `أهلاً بك في باب الخير · ${loc.short}`
    ));
  }, 800);
}

// Déclenche après la 1ère interaction utilisateur UNIQUEMENT
// → Le toast ne s'affiche pas tant que l'utilisateur ne touche rien
document.addEventListener('click', showWelcomeOnce, { once: true });
document.addEventListener('touchstart', showWelcomeOnce, { once: true });
