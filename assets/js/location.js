/* ===================== LOCATION & ADDRESS ===================== */

async function getLocation(){
  if(!navigator.geolocation){
    setLocStatus("error", "❌ Geolocation not supported on this device.");
    return;
  }

  const btn = $("locBtn");
  const btnText = $("locBtnText");
  btn.classList.add("loading");
  btnText.textContent = t("Locating…","جارٍ التحديد…");
  setLocStatus("", "");

  navigator.geolocation.getCurrentPosition(
    async (pos) => {
      const lat = pos.coords.latitude;
      const lng = pos.coords.longitude;
      const acc = Math.round(pos.coords.accuracy);
      userLocation = {lat, lng, acc};

      let addressLine = "";
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`,
          {headers:{"Accept-Language": lang === "ar" ? "ar" : "en"}}
        );
        const data = await res.json();
        const a = data.address || {};
        const parts = [
          a.building || a.house_number,
          a.road,
          a.suburb || a.neighbourhood || a.quarter,
          a.city || a.town || a.village || a.county || a.state_district,
        ].filter(Boolean);
        addressLine = parts.join(", ");
        if(!addressLine && data.display_name) addressLine = data.display_name;
      } catch(e){}

      // ✨ Fallback Al Dhana
      if (!addressLine) {
        addressLine = "Al Dhana, Adnoc Housing, West Market";
      }

      const buildingInput = $("building");
      if(!buildingInput.value && addressLine){
        buildingInput.value = addressLine;
      }
      saveAddress();

      const delta = 0.003;
      $("mapFrame").src =
        `https://www.openstreetmap.org/export/embed.html?bbox=${lng-delta},${lat-delta},${lng+delta},${lat+delta}&layer=mapnik&marker=${lat},${lng}`;
      $("mapPreview").style.display = "block";

      setLocStatus(
        "success",
        `✅ ${t("Position confirmed","تم تأكيد الموقع")} (${t("accuracy","دقة")} ±${acc}m)${addressLine ? " · " + addressLine : ""}`
      );

      btn.classList.remove("loading");
      btnText.textContent = t("Location set ✓","تم تحديد الموقع ✓");
      showToast(t("Location confirmed ✓","تم تأكيد الموقع ✓"));
    },
    (err) => {
      btn.classList.remove("loading");
      btnText.textContent = t("Use my precise location","استخدم موقعي الدقيق");
      let msg = t("Unable to get your location. Please enter manually.","تعذر الحصول على موقعك. أدخل العنوان يدويًا.");
      if(err.code === 1) msg = "❌ " + t("Location permission denied.","تم رفض إذن الموقع.");
      if(err.code === 2) msg = "❌ " + t("Location unavailable.","الموقع غير متاح.");
      if(err.code === 3) msg = "❌ " + t("Location request timed out.","انتهت مهلة طلب الموقع.");
      setLocStatus("error", msg);
    },
    {enableHighAccuracy:true, timeout:12000, maximumAge:0}
  );
}

function setLocStatus(type, msg){
  const el = $("locStatus");
  el.className = "locStatus" + (type ? " " + type : "");
  el.textContent = msg;
}

/* ===================== SAVE / RESTORE ADDRESS ===================== */
const ADDR_FIELDS = ["building","apt","landmark","phone"];

function saveAddress(){
  const data = {};
  ADDR_FIELDS.forEach(id => { const el = $(id); if(el) data[id] = el.value; });
  localStorage.setItem("bak_address", JSON.stringify(data));
}

function restoreAddress(){
  try{
    const data = JSON.parse(localStorage.getItem("bak_address") || "{}");
    ADDR_FIELDS.forEach(id => { const el = $(id); if(el && data[id]) el.value = data[id]; });
  }catch(e){}
}
