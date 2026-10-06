/* ═══════════════════════════════════════════════════════════
   BAB AL KHAIR — App Init + Toast + Transition + Welcome
   ═══════════════════════════════════════════════════════════ */

/* ===================== TOAST ===================== */

let toastTimer;

function showToast(text){
  const el = $("toast");
  if (!el) return;
  $("toastText").textContent = text;
  el.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove("show"), 2200);
}

/* ===================== LOADER + SON ORIENTAL ===================== */

let loaderSoundPlayed = false;

function playWelcomeSound() {
  if (loaderSoundPlayed) return;
  loaderSoundPlayed = true;

  const sound = $("welcomeSound");
  if (sound) {
    sound.volume = 0.4;
    sound.play().catch(() => {
      console.log("[Loader] Son non autorisé par le navigateur");
    });
  }
}

window.addEventListener("load", () => {
  const loader = $("loader");
  const sound = $("welcomeSound");

  // 🎵 Essayer de jouer le son immédiatement
  playWelcomeSound();

  // 🎵 Fallback : si bloqué, jouer à la 1ère interaction
  document.addEventListener("click", playWelcomeSound, { once: true });
  document.addEventListener("touchstart", playWelcomeSound, { once: true });

  // ⏱️ Cache le loader après 4.5 secondes
  setTimeout(() => {
    if (loader) loader.classList.add("hide");

    // 🎵 Fade out du son en parallèle
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

/* ===================== LOCATION INFO ===================== */

function showLocationInfo() {
  showToast(t(
    "Adnoc Housing · West Market · Al Dhana",
    "سكن أدنوك · السوق الغربي · الظفرة"
  ));
}

/* ===================== BOTTOM NAVIGATION ===================== */

function switchTab(tab) {
  document.querySelectorAll('.navItem').forEach(el => {
    el.classList.toggle('active', el.dataset.tab === tab);
  });

  if (tab === 'home') {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } else if (tab === 'menu') {
    const sectionHead = document.querySelector('.sectionHead');
    if (sectionHead) {
      sectionHead.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  } else if (tab === 'contact') {
    const loc = (typeof RESTAURANT_LOCATION !== 'undefined')
      ? (RESTAURANT_LOCATION[lang] || RESTAURANT_LOCATION.en)
      : { full: 'Al Dhana · Adnoc Housing · West Market', country: 'U.A.E' };
    showToast(`${loc.full} · ${loc.country}`);
  }
}

/* ===================== WELCOME TOAST (EN HAUT) ===================== */
/* ✨ Apparaît UNIQUEMENT après la 1ère interaction utilisateur
   → EN HAUT de l'écran (classe "welcome")
   → Ne touche JAMAIS la bottom nav */

let welcomeShown = false;

function showWelcomeOnce() {
  if (welcomeShown) return;
  welcomeShown = true;

  setTimeout(() => {
    const loc = (typeof RESTAURANT_LOCATION !== 'undefined')
      ? (RESTAURANT_LOCATION[lang] || RESTAURANT_LOCATION.en)
      : { short: 'Al Dhana' };

    const el = $("toast");
    if (!el) return;

    // Position HAUT pour le welcome
    el.classList.add("welcome");
    $("toastText").textContent = t(
      `Welcome to Bab Al Khair · ${loc.short}`,
      `أهلاً بك في باب الخير · ${loc.short}`
    );
    el.classList.add("show");

    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      el.classList.remove("show");
      // Retirer "welcome" après disparition
      setTimeout(() => el.classList.remove("welcome"), 400);
    }, 2600);
  }, 800);
}

// Déclenche après la 1ère interaction utilisateur UNIQUEMENT
document.addEventListener('click', showWelcomeOnce, { once: true });
document.addEventListener('touchstart', showWelcomeOnce, { once: true });

/* ===================== INIT ===================== */

renderChips();
render();
updateCart();
restoreAddress();

ADDR_FIELDS.forEach(id => {
  const el = $(id);
  if (el) el.addEventListener("input", saveAddress);
});
