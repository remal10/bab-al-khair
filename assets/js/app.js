/* ═══════════════════════════════════════════════════════════
   BAB AL KHAIR — App Init + Toast + Transition + Welcome Overlay
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
      : { full: 'Al Dhana · Adnoc Housing · West Market', country: 'U.AE' };
    showToast(`${loc.full} · ${loc.country}`);
  }
}

/* ═══════════════════════════════════════════════════════════
   ✨ WELCOME OVERLAY PREMIUM ORIENTAL
   S'affiche une seule fois après la 1ère interaction
   Fade in → reste 3s → fade out → disparaît complètement
   Ne bloque JAMAIS la bottom nav
   ═══════════════════════════════════════════════════════════ */

let welcomeShown = false;

function showWelcomeOverlay() {
  if (welcomeShown) return;
  welcomeShown = true;

  const overlay = $("welcomeOverlay");
  if (!overlay) return;

  // Textes bilingues selon la langue actuelle
  const isAr = (lang === "ar");

  const title = $("welcomeTitle");
  const subtitle = $("welcomeSubtitle");
  const message = $("welcomeMessage");

  if (title) {
    title.textContent = isAr ? "أهلاً وسهلاً" : "WELCOME";
    if (isAr) title.style.fontSize = "36px";
  }
  if (subtitle) {
    subtitle.textContent = isAr ? "باب الخير · مطعم" : "BAB AL KHAIR · RESTAURANT";
  }
  if (message) {
    message.textContent = isAr
      ? "طعام لذيذ · لحظات رائعة"
      : "Delicious Food · Great Moments";
  }

  // Affiche l'overlay
  overlay.classList.remove("hide");
  overlay.classList.add("show");

  // Attend 3 secondes → fade out
  setTimeout(() => {
    overlay.classList.remove("show");
    overlay.classList.add("hide");

    // Après fade out → cache complètement
    setTimeout(() => {
      overlay.style.display = "none";
    }, 900);
  }, 3000);
}

// Déclenche UNIQUEMENT après la 1ère interaction utilisateur
document.addEventListener('click', showWelcomeOverlay, { once: true });
document.addEventListener('touchstart', showWelcomeOverlay, { once: true });

// Fallback : si aucune interaction, afficher après 5s
window.addEventListener('load', () => {
  setTimeout(() => {
    if (!welcomeShown) {
      showWelcomeOverlay();
    }
  }, 5000);
});

/* ===================== INIT ===================== */

renderChips();
render();
updateCart();
restoreAddress();

ADDR_FIELDS.forEach(id => {
  const el = $(id);
  if (el) el.addEventListener("input", saveAddress);
});
