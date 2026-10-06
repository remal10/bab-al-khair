/* ===================== CART ===================== */

function addItem(id){
  cart[id] = (cart[id] || 0) + 1;
  saveCart();
  updateCart(true);
  showToast(t("Added to cart ✓","أضيف إلى السلة ✓"));
}

function changeQty(id, d){
  cart[id] = (cart[id] || 0) + d;
  if(cart[id] <= 0) delete cart[id];
  saveCart();
  updateCart();
}

function removeItem(id) {
  delete cart[id];
  saveCart();
  updateCart();
}

function saveCart(){ localStorage.setItem("bak_cart", JSON.stringify(cart)); }

function updateCart(pulse){
  const count = Object.values(cart).reduce((s,n)=>s+n,0);
  const badge = $("count");
  badge.textContent = count;
  if(pulse){ badge.classList.remove("pulse"); void badge.offsetWidth; badge.classList.add("pulse"); }

  // Sync badge dans bottom nav
  const navBadge = $("navBadge");
  if (navBadge) {
    navBadge.textContent = count;
    navBadge.style.display = count > 0 ? 'inline-flex' : 'none';
  }

  const keys = Object.keys(cart);
  const items = $("cartItems");

  if(!keys.length){
    items.innerHTML = `
      <div class="empty">
        <svg viewBox="0 0 24 24" stroke-width="1.5" stroke-linecap="round">
          <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
          <path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6"/>
        </svg>
        <p>${t("Your cart is empty","سلتك فارغة")}</p>
        <small>${t("Add some delicious items","أضف بعض العناصر اللذيذة")}</small>
      </div>`;
    $("cartQty").textContent = `0 ${t("items","عنصر")}`;
    return;
  }

  let total = 0;
  items.innerHTML = keys.map(id => {
    const a = ARTICLES.find(x => x.id === +id);
    const name = lang === "ar" ? a.nameAr : a.name;
    const qty = cart[id];
    const sub = a.price * qty;
    total += sub;
    return `
      <div class="line">
        <img class="lineImg" src="${a.img}" alt="${name}">
        <div class="lineInfo">
          <div class="lname">${name}</div>
          <div class="lprice">${a.price} AED</div>
          <div class="qty">
            <button onclick="changeQty(${id},-1)">−</button>
            <span>${qty}</span>
            <button onclick="changeQty(${id},+1)">+</button>
          </div>
        </div>
        <button class="lineRemove" onclick="removeItem(${id})">✕</button>
      </div>`;
  }).join("");

  const deliveryFee = 0;
  const finalTotal = total + deliveryFee;

  items.innerHTML += `
    <div class="cartSummary">
      <div class="summaryRow">
        <span>${t("Subtotal","المجموع الفرعي")}</span>
        <span>${total.toFixed(2)} AED</span>
      </div>
      <div class="summaryRow">
        <span>${t("Delivery Fee","رسوم التوصيل")}</span>
        <span>${deliveryFee.toFixed(2)} AED</span>
      </div>
      <div class="summaryRow total">
        <span>${t("Total","المجموع")}</span>
        <span>${finalTotal.toFixed(2)} <small>AED</small></span>
      </div>
    </div>`;

  $("cartQty").textContent = `${count} ${t("items","عنصر")}`;
}

function openCart(){ $("drawer").classList.add("open"); }
function closeCart(){ $("drawer").classList.remove("open"); }
