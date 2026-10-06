/* ===================== UI : Chips + Grid + Modal ===================== */

function renderChips(){
  $("chips").innerHTML = CATS.map(c => {
    const label = lang === "ar" ? c.ar : c.en;
    const active = c.id === activeCat ? "active" : "";
    return `<button class="chip ${active}" onclick="setCat('${c.id}')">${label}</button>`;
  }).join("");
}

function setCat(c){ activeCat = c; renderChips(); render(); }

function render(){
  const q = ($("search").value || "").toLowerCase();
  const list = ARTICLES.filter(a => {
    const inCat = activeCat === "All" || a.cat === activeCat;
    const name = lang === "ar" ? a.nameAr : a.name;
    const inSearch = name.toLowerCase().includes(q) || a.name.toLowerCase().includes(q);
    return inCat && inSearch;
  });
  $("countItems").textContent = `${list.length} ${t("items","عنصر")}`;

  if(!list.length){
    $("grid").innerHTML = `
      <div style="grid-column:1/-1">
        <div class="empty">
          <svg viewBox="0 0 24 24" stroke-width="1.5" stroke-linecap="round">
            <circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>
          </svg>
          <p>${t("No items found","لا توجد نتائج")}</p>
          <small>${t("Try a different search","جرب بحثًا آخر")}</small>
        </div>
      </div>`;
    return;
  }

  $("grid").innerHTML = list.map((a,i) => {
    const name = lang === "ar" ? a.nameAr : a.name;
    const catObj = CATS.find(c => c.id === a.cat);
    const catLabel = lang === "ar" ? catObj.ar : catObj.en;
    const isFav = favorites.includes(a.id);
    const badgeHtml = a.badge ? `<div class="cardBadge">★ ${a.badge}</div>` : "";
    return `
      <div class="card" style="animation-delay:${i*30}ms" onclick="openProduct(${a.id})">
        <div class="cardImgWrap">
          <img src="${a.img}" alt="${name}" loading="lazy">
          ${badgeHtml}
          <button class="cardFav ${isFav?'on':''}" onclick="event.stopPropagation();toggleFav(${a.id})">
            <svg viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round">
              <path d="M12 21s-7-4.5-9.5-9C.5 8 2 4 6 4c2 0 3.5 1 4.5 2.5C11.5 5 13 4 15 4c4 0 5.5 4 3.5 8-2.5 4.5-9.5 9-9.5 9z"/>
            </svg>
          </button>
        </div>
        <div class="p">
          <div class="name">${name}</div>
          <div class="catRow">
            <span class="cat">${catLabel}</span>
            <span class="stars">
              <svg viewBox="0 0 24 24"><path d="M12 2l3 6.5 7 1-5 5 1.2 7L12 18l-6.2 3.5L7 14.5l-5-5 7-1z"/></svg>
              ${a.rating}
            </span>
          </div>
          <div class="row">
            <div class="price">${a.price}<small>AED</small></div>
            <button class="add" onclick="event.stopPropagation();addItem(${a.id})">+</button>
          </div>
        </div>
      </div>`;
  }).join("");
}

function toggleFav(id){
  const i = favorites.indexOf(id);
  if(i > -1) favorites.splice(i,1); else favorites.push(id);
  localStorage.setItem("bak_fav", JSON.stringify(favorites));
  render();
}

/* ===================== PRODUCT MODAL ===================== */
function openProduct(id){
  currentProduct = ARTICLES.find(a => a.id === id);
  const a = currentProduct;
  const name = lang === "ar" ? a.nameAr : a.name;
  const catObj = CATS.find(c => c.id === a.cat);
  const catLabel = lang === "ar" ? catObj.ar : catObj.en;

  $("modalSheet").innerHTML = `
    <div class="modalHero">
      <button class="modalClose" onclick="closeModal()">✕</button>
      <img src="${a.img}" alt="${name}">
    </div>
    <div class="modalBody">
      <h3>${name}</h3>
      <div class="modalMeta">
        <span>${catLabel}</span>
        <span>·</span>
        <span>★ ${a.rating}</span>
        ${a.badge ? `<span>·</span><span style="color:#c25a00">${a.badge}</span>` : ""}
      </div>
      <p class="modalDesc">${a.desc}</p>
      <div class="modalFooter">
        <div class="modalPrice">${a.price}<small>AED</small></div>
        <button class="modalAdd" onclick="addItem(${a.id});closeModal()">${t("Add to Cart","أضف إلى السلة")}</button>
      </div>
    </div>`;
  $("modal").classList.add("open");
}

function closeModal(){ $("modal").classList.remove("open"); }
