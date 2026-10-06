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

window.addEventListener("load", () => {
  setTimeout(() => $("loader").classList.add("hide"), 900);
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

window.addEventListener("load", () => {
  setTimeout(() => {
    const loc = RESTAURANT_LOCATION[lang] || RESTAURANT_LOCATION.en;
    showToast(t(
      `Welcome to Bab Al Khair · ${loc.short}`,
      `أهلاً بك في باب الخير · ${loc.short}`
    ));
  }, 1200);
});
