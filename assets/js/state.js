/* ===================== STATE ===================== */

let activeCat = "All";
let lang = "en";
let cart = JSON.parse(localStorage.getItem("bak_cart") || "{}");
let favorites = JSON.parse(localStorage.getItem("bak_fav") || "[]");
let currentProduct = null;
let userLocation = null;

/* ===================== HELPERS ===================== */
const $ = id => document.getElementById(id);
const t = (en, ar) => lang === "ar" ? ar : en;
