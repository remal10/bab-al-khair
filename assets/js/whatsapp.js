/* ===================== WHATSAPP ===================== */

function sendWhatsApp(){
  const keys = Object.keys(cart);
  if(!keys.length){ showToast(t("Your cart is empty","سلتك فارغة")); return; }

  const building = $("building").value.trim();
  const apt      = $("apt").value.trim();
  const landmark = $("landmark").value.trim();
  const phone    = $("phone").value.trim();

  if(!building){
    showToast(t("Please enter building name","أدخل اسم المبنى"));
    $("building").focus();
    return;
  }
  if(!phone || phone.length < 6){
    showToast(t("Please enter your phone number","أدخل رقم هاتفك"));
    $("phone").focus();
    return;
  }

  let msg = `🍽️ *NEW ORDER — Bab Al Khair*\n`;
  msg += `━━━━━━━━━━━━━━━━━━━\n\n`;
  msg += `*🧾 ITEMS*\n`;
  let total = 0, i = 1;
  keys.forEach(id => {
    const a = ARTICLES.find(x => x.id === +id);
    const qty = cart[id];
    const sub = a.price * qty;
    total += sub;
    msg += `${i++}. ${a.name} × ${qty}  →  ${sub} AED\n`;
  });
  msg += `\n━━━━━━━━━━━━━━━━━━━\n`;
  msg += `💰 *TOTAL : ${total} AED*\n\n`;

  msg += `*📍 DELIVERY ADDRESS*\n`;
  msg += `🏢 Building : ${building}\n`;
  if(apt)      msg += `🚪 Apt/Floor : ${apt}\n`;
  if(landmark) msg += `📌 Landmark : ${landmark}\n`;
  if(userLocation){
    msg += `🗺️ GPS : ${userLocation.lat.toFixed(5)}, ${userLocation.lng.toFixed(5)}\n`;
    msg += `🔗 Map : https://maps.google.com/?q=${userLocation.lat},${userLocation.lng}\n`;
  }

  msg += `\n*📱 CONTACT*\n`;
  msg += `Phone : ${phone}\n`;

  msg += `\n🕐 ${new Date().toLocaleString()}\n`;
  msg += `\nThank you for choosing Bab Al Khair 🙏`;

  const url = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`;
  window.open(url, "_blank");
}
