/* ===================== LANGUAGE ===================== */

function toggleLang(){
  lang = lang === "en" ? "ar" : "en";
  document.body.classList.toggle("rtl", lang === "ar");
  document.documentElement.lang = lang;
  $("langBtn").textContent = lang === "en" ? "AR" : "EN";
  renderChips();
  render();
  updateCart();
  updateStaticText();
}

function updateStaticText(){
  $("search").placeholder = t("Search for a dish or juice…", "ابحث عن طبق أو عصير…");
  document.querySelector(".sectionHead h2").innerHTML = t("Our <em>Menu</em>", "قائمتنا");
  document.querySelector(".hero p").textContent = t(
    "Where every dish tells a story. Order fresh, delivered warm.",
    "حيث يحكي كل طبق قصة. اطلب طازجًا، يوصل ساخنًا."
  );
  $("locBtnText").textContent = userLocation
    ? t("Location set ✓","تم تحديد الموقع ✓")
    : t("Use my precise location","استخدم موقعي الدقيق");
  document.querySelector(".wa").lastChild.textContent = " " + t("Order on WhatsApp","اطلب على واتساب");
}

/* ═══════════════════════════════════════════════════════════
   ✨ Localisation officielle — Bab Al Khair
   ═══════════════════════════════════════════════════════════ */

const RESTAURANT_LOCATION = {
  en: {
    short:    "Al Dhana",
    full:     "Al Dhana · Adnoc Housing · West Market",
    landmark: "Near Abu Dhabi Market",
    country:  "U.A.E"
  },
  ar: {
    short:    "الظفرة",
    full:     "الظفرة · سكن أدنوك · السوق الغربي",
    landmark: "بالقرب من سوق أبوظبي",
    country:  "الإمارات"
  }
};

function getLocationText(type) {
  const loc = RESTAURANT_LOCATION[lang] || RESTAURANT_LOCATION.en;
  return loc[type] || loc.short;
}
