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

  // ═══ Calcul du total ═══
  let total = 0;
  keys.forEach(id => {
    const a = ARTICLES.find(x => x.id === +id);
    total += a.price * cart[id];
  });

  const loc = RESTAURANT_LOCATION[lang] || RESTAURANT_LOCATION.en;

  // ═══ Message WhatsApp — Style mockup ═══
  let msg = "";

  if (lang === "ar") {
    msg += `👋 مرحبًا مطعم باب الخير!\n`;
    msg += `أود تقديم طلب. 🍽️\n\n`;

    msg += `🛒 *طلبي:*\n`;
    let i = 1;
    keys.forEach(id => {
      const a = ARTICLES.find(x => x.id === +id);
      const qty = cart[id];
      const sub = a.price * qty;
      msg += `${i++}. ${a.nameAr || a.name} × ${qty} → ${sub} د.إ\n`;
    });

    msg += `\n💰 *المجموع: ${total} د.إ*\n\n`;

    msg += `🚚 *تفاصيل التوصيل:*\n`;
    msg += `• المبنى: ${building}\n`;
    if(apt)      msg += `• الشقة / الطابق: ${apt}\n`;
    if(landmark) msg += `• علامة مميزة: ${landmark}\n`;

    msg += `\n📍 *موقعي:*\n`;
    if(userLocation){
      msg += `https://maps.google.com/?q=${userLocation.lat},${userLocation.lng}\n`;
    } else {
      msg += `[سيتم مشاركة رابط خرائط جوجل]\n`;
    }

    msg += `\n📱 *التواصل:*\n`;
    msg += `الهاتف: ${phone}\n`;

    msg += `\n✅ يرجى تأكيد طلبي والتوصيل.\n`;
    msg += `شكرًا لك! 😊\n`;

  } else {
    msg += `👋 Hello Bab Al Khair Restaurant!\n`;
    msg += `I would like to place an order. 🍽️\n\n`;

    msg += `🛒 *MY ORDER:*\n`;
    let i = 1;
    keys.forEach(id => {
      const a = ARTICLES.find(x => x.id === +id);
      const qty = cart[id];
      const sub = a.price * qty;
      msg += `${i++}. ${a.name} × ${qty} → AED ${sub}\n`;
    });

    msg += `\n💰 *Total: AED ${total}*\n\n`;

    msg += `🚚 *Delivery Details:*\n`;
    msg += `• Building / Villa: ${building}\n`;
    if(apt)      msg += `• Apartment / Floor: ${apt}\n`;
    if(landmark) msg += `• Landmark: ${landmark}\n`;

    msg += `\n📍 *My Location:*\n`;
    if(userLocation){
      msg += `https://maps.google.com/?q=${userLocation.lat},${userLocation.lng}\n`;
    } else {
      msg += `[Google Maps link will be shared]\n`;
    }

    msg += `\n📱 *Contact:*\n`;
    msg += `Phone: ${phone}\n`;

    msg += `\n✅ Please confirm my order and delivery.\n`;
    msg += `Thank you! 😊\n`;
  }

  // ═══ Signature Bab Al Khair ═══
  msg += `\n━━━━━━━━━━━━━━━━━━━\n`;
  msg += `🍽️ *Bab Al Khair Restaurant*\n`;
  msg += `📍 ${loc.full}\n`;
  msg += `🏛️ ${loc.landmark}\n`;
  msg += `🌍 ${loc.country}\n`;

  const url = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`;
  window.open(url, "_blank");
}
