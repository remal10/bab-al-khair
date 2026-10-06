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

/* ===================== INIT ===================== */

renderChips();
render();
updateCart();
restoreAddress();

ADDR_FIELDS.forEach(id => {
  const el = $(id);
  if(el) el.addEventListener("input", saveAddress);
});
