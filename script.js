/* =========================================================
   CONFIGURACIÓN — editá acá tu número y tus productos
   ========================================================= */
const WHATSAPP_NUMBER = "5491178942794"; // formato: código país + área + número, sin +, espacios ni guiones

// Para poner tus fotos reales: reemplazá cada objeto "img: null"
// por "img: 'ruta-o-url-de-tu-foto.jpg'" y el placeholder se cambia solo por la imagen.
//
// TODO PARA VOS: esta es la estructura por fandom. "soy-luna" ya tiene tus
// productos reales. Para sumar un fandom nuevo, copiá un bloque {...} entero
// (con sus productos adentro) y cambiá el id, el nombre y los productos.
const fandoms = [
  {
    id: "soy-luna",
    nombre: "Soy Luna",
    productos: [
      { id:"sl1", nombre:"Buzo Soy Luna", categoria:"Intervenidos", precio:45000, antes:null, badge:null, img:null },
      { id:"sl2", nombre:"Vaso Soy Luna", categoria:"Bijou fandom", precio:8500, antes:null, badge:null, img:null },
      { id:"sl3", nombre:"Pack dijes Soy Luna", categoria:"Bijou fandom", precio:4500, antes:null, badge:"Nuevo", img:null },
      { id:"sl4", nombre:"Llavero Soy Luna", categoria:"Bijou fandom", precio:3200, antes:null, badge:null, img:null },
    ],
  },
  {
    // 👉 EJEMPLO: duplicá este bloque para cada fandom nuevo (Stranger Things, Harry Potter, etc.)
    // y reemplazá "id", "nombre" y los productos por los reales.
    id: "fandom-2",
    nombre: "Ejemplo: nombre de tu 2do fandom",
    productos: [
      { id:"f2-1", nombre:"Producto de ejemplo 1", categoria:"Bijou fandom", precio:5000, antes:null, badge:null, img:null },
      { id:"f2-2", nombre:"Producto de ejemplo 2", categoria:"Intervenidos", precio:12000, antes:null, badge:null, img:null },
    ],
  },
];

const combos = [
  { id:"c1", nombre:"1 buzo + 1 collar + 1 llavero (a elección)", precio:58990, antes:65281, off:"10% OFF" },
  { id:"c2", nombre:"1 remera + pack 5 dijes púa (a elección)", precio:19000, antes:22400, off:"15% OFF" },
  { id:"c3", nombre:"Tres collares púa (a elección)", precio:17200, antes:19500, off:"12% OFF" },
];

/* ========================================================= */

function formatARS(n){
  return "$" + n.toLocaleString("es-AR");
}

function placeholderSlot(label){
  return `<div class="placeholder" data-slot="${label}">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="9" cy="9" r="2"/><path d="M21 15l-5-5-9 9"/></svg>
    <small>Subí tu foto acá</small>
  </div>`;
}

function buildWhatsAppLink(productName){
  const texto = `¡Hola! Quiero pedir: *${productName}*.%0ACantidad: %0AZona / localidad: `;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${texto}`;
}

function productCard(p){
  return `
    <div class="prod-card">
      <div class="prod-media">
        ${p.badge ? `<span class="prod-badge">${p.badge}</span>` : ""}
        ${p.img ? `<img src="${p.img}" alt="${p.nombre}">` : placeholderSlot(p.id)}
      </div>
      <div class="prod-body">
        <div class="prod-cat">${p.categoria}</div>
        <div class="prod-name">${p.nombre}</div>
        <div class="prod-price">
          <span class="now">${formatARS(p.precio)}</span>
          ${p.antes ? `<span class="before">${formatARS(p.antes)}</span>` : ""}
        </div>
        <button class="btn-buy" data-nombre="${p.nombre}">
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.28-1.38a9.9 9.9 0 0 0 4.76 1.21h.01c5.46 0 9.9-4.45 9.9-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm0 18.12h-.01a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.13.82.84-3.05-.2-.31a8.22 8.22 0 0 1-1.26-4.34c0-4.54 3.7-8.24 8.25-8.24 2.2 0 4.27.86 5.83 2.42a8.18 8.18 0 0 1 2.41 5.83c0 4.55-3.7 8.2-8.25 8.2z"/></svg>
          Comprar
        </button>
      </div>
    </div>
  `;
}

/* ---------- Home: previews por fandom ---------- */
function renderFandomPreviews(){
  const container = document.getElementById("fandom-previews");
  container.innerHTML = fandoms.map(f => `
    <div class="fandom-block">
      <div class="fandom-block-head">
        <div>
          <h3>Productos de ${f.nombre}</h3>
          <span class="count">${f.productos.length} producto${f.productos.length===1?"":"s"}</span>
        </div>
        <a class="ver-todo" href="#/fandom/${f.id}">Ver todo
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
        </a>
      </div>
      <div class="prod-grid">
        ${f.productos.slice(0,4).map(productCard).join("")}
      </div>
    </div>
  `).join("");
}

/* ---------- Página de un fandom (todos sus productos) ---------- */
function renderFandomView(fandomId){
  const view = document.getElementById("view-fandom");
  const f = fandoms.find(x => x.id === fandomId);
  if(!f){
    view.innerHTML = `
      <div class="page-hero">
        <div class="wrap">
          <a class="back-link" href="#/">← Volver al catálogo</a>
          <h2>No encontramos ese fandom</h2>
        </div>
      </div>`;
    return;
  }
  view.innerHTML = `
    <div class="page-hero">
      <div class="wrap">
        <a class="back-link" href="#/">← Volver al catálogo</a>
        <h2>Productos de ${f.nombre}</h2>
        <p>${f.productos.length} producto${f.productos.length===1?"":"s"} disponible${f.productos.length===1?"":"s"}</p>
      </div>
    </div>
    <div class="wrap">
      <div class="prod-grid">${f.productos.map(productCard).join("")}</div>
    </div>
  `;
}

/* ---------- Página de resultados de búsqueda ---------- */
function renderSearchView(query){
  const view = document.getElementById("view-search");
  const q = query.trim().toLowerCase();
  let resultados = [];
  fandoms.forEach(f => {
    f.productos.forEach(p => {
      const texto = (p.nombre + " " + p.categoria + " " + f.nombre).toLowerCase();
      if(!q || texto.includes(q)) resultados.push(p);
    });
  });

  view.innerHTML = `
    <div class="page-hero">
      <div class="wrap">
        <a class="back-link" href="#/">← Volver al catálogo</a>
        <h2>Resultados para "${query}"</h2>
        <p>${resultados.length} producto${resultados.length===1?"":"s"} encontrado${resultados.length===1?"":"s"}</p>
      </div>
    </div>
    <div class="wrap">
      ${resultados.length
        ? `<div class="prod-grid">${resultados.map(productCard).join("")}</div>`
        : `<div class="empty-state">No encontramos nada con eso. Probá con el nombre de un fandom o un producto.</div>`
      }
    </div>
  `;
}

/* ---------- Router (páginas sin recargar) ---------- */
function router(){
  const hash = location.hash.replace(/^#/, "");
  const parts = hash.split("/").filter(Boolean);
  document.querySelectorAll(".view").forEach(v => v.hidden = true);

  if(parts[0] === "fandom" && parts[1]){
    renderFandomView(decodeURIComponent(parts[1]));
    document.getElementById("view-fandom").hidden = false;
  } else if(parts[0] === "buscar"){
    const q = decodeURIComponent(parts[1] || "");
    renderSearchView(q);
    document.getElementById("view-search").hidden = false;
  } else {
    document.getElementById("view-home").hidden = false;
  }
  window.scrollTo({ top: 0, behavior: "auto" });
}
window.addEventListener("hashchange", router);

/* ---------- Buscador ---------- */
document.getElementById("search-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const q = document.getElementById("search-input").value.trim();
  if(!q) return;
  location.hash = "#/buscar/" + encodeURIComponent(q);
});

function renderCombos(){
  const grid = document.getElementById("combo-grid");
  grid.innerHTML = combos.map(c => `
    <div class="combo-card">
      <div class="combo-top">
        <h3>${c.nombre}</h3>
        <span class="combo-off">${c.off}</span>
      </div>
      <div class="combo-media">
        ${placeholderSlot(c.id + "-a")}
        ${placeholderSlot(c.id + "-b")}
        ${placeholderSlot(c.id + "-c")}
      </div>
      <div class="prod-price">
        <span class="now">${formatARS(c.precio)}</span>
        <span class="before">${formatARS(c.antes)}</span>
      </div>
      <button class="btn-buy" data-nombre="${c.nombre}">
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.28-1.38a9.9 9.9 0 0 0 4.76 1.21h.01c5.46 0 9.9-4.45 9.9-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm0 18.12h-.01a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.13.82.84-3.05-.2-.31a8.22 8.22 0 0 1-1.26-4.34c0-4.54 3.7-8.24 8.25-8.24 2.2 0 4.27.86 5.83 2.42a8.18 8.18 0 0 1 2.41 5.83c0 4.55-3.7 8.2-8.25 8.2z"/></svg>
        Comprar combo
      </button>
    </div>
  `).join("");
}

function showToast(){
  const toast = document.getElementById("toast");
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2200);
}

document.addEventListener("click", (e) => {
  const btn = e.target.closest(".btn-buy");
  if(!btn) return;
  const link = buildWhatsAppLink(btn.dataset.nombre);
  showToast();
  window.open(link, "_blank");
});

// General contact buttons
const generalLink = buildWhatsAppLink("consulta general");
document.getElementById("cta-whatsapp").href = generalLink;
document.getElementById("foot-whatsapp").href = generalLink;
document.getElementById("wa-float").href = generalLink;

renderFandomPreviews();
renderCombos();
router();

/* =========================================================
   Menú hamburguesa (mobile): abre/cierra el panel deslizable
   ========================================================= */
(function mobileNav(){
  const toggle = document.getElementById("burger-toggle");
  const drawer = document.getElementById("nav-drawer");
  const overlay = document.getElementById("nav-drawer-overlay");
  const closeBtn = document.getElementById("nav-drawer-close");
  if(!toggle || !drawer) return;

  function openDrawer(){
    drawer.classList.add("open");
    if(overlay) overlay.classList.add("open");
    document.body.classList.add("nav-open");
    toggle.setAttribute("aria-expanded", "true");
  }
  function closeDrawer(){
    drawer.classList.remove("open");
    if(overlay) overlay.classList.remove("open");
    document.body.classList.remove("nav-open");
    toggle.setAttribute("aria-expanded", "false");
  }

  toggle.addEventListener("click", () => {
    drawer.classList.contains("open") ? closeDrawer() : openDrawer();
  });
  if(overlay) overlay.addEventListener("click", closeDrawer);
  if(closeBtn) closeBtn.addEventListener("click", closeDrawer);
  drawer.querySelectorAll("a").forEach(a => a.addEventListener("click", closeDrawer));
  window.addEventListener("hashchange", closeDrawer);

  // Si se agranda la pantalla (celular -> tablet / rotar), se cierra el panel
  // para que no quede el fondo oscuro ni el scroll bloqueado.
  window.matchMedia("(min-width: 561px)").addEventListener("change", (e) => {
    if(e.matches) closeDrawer();
  });
})();

/* =========================================================
   Nav activo: subraya en el menú la sección que estás viendo
   ========================================================= */
(function activeNavSection(){
  const navLinks = Array.from(document.querySelectorAll(".navlinks a"));
  if(!navLinks.length) return;

  const sectionMap = {
    "top": "#top",
    "categorias": "#categorias",
    "destacados": "#destacados",
    "combos": "#combos",
    "contacto": "#contacto",
  };

  function setActive(href){
    navLinks.forEach(a => a.classList.toggle("active", a.getAttribute("href") === href));
  }

  const sections = Object.keys(sectionMap)
    .map(id => document.getElementById(id))
    .filter(Boolean);

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        setActive(sectionMap[entry.target.id]);
      }
    });
  }, { rootMargin: "-45% 0px -50% 0px", threshold: 0 });

  sections.forEach(sec => observer.observe(sec));

  // Cuando estás viendo un fandom puntual o resultados de búsqueda,
  // ninguna de estas secciones del inicio está a la vista.
  window.addEventListener("hashchange", () => {
    const hash = location.hash.replace(/^#/, "");
    if(hash.startsWith("/fandom") || hash.startsWith("/buscar")){
      navLinks.forEach(a => a.classList.remove("active"));
    }
  });

  setActive("#top");
})();

/* =========================================================
   Nav que se achica al scrollear (progresivo)
   - Inicio, arriba de todo: nav en tamaño grande.
   - Apenas empezás a bajar (se empieza a ver la foto del hero),
     el nav se achica de a poco hasta llegar a su tamaño chico.
   - Al volver arriba de todo: vuelve al tamaño grande.
   - En páginas de fandom / búsqueda: va siempre achicado.
   ========================================================= */
(function navShrink(){
  const header = document.querySelector("header");
  const homeView = document.getElementById("view-home");
  if(!header || !homeView) return;

  const RANGE = 100; // px de scroll hasta que el nav llega a su tamaño chico
  let ticking = false;

  function update(){
    ticking = false;
    const isHome = !homeView.hidden;
    document.body.classList.toggle("not-home", !isHome);

    const p = isHome ? Math.min(Math.max(window.scrollY / RANGE, 0), 1) : 1;
    header.style.setProperty("--s", p.toFixed(3));
  }

  function onScroll(){
    if(ticking) return;
    ticking = true;
    requestAnimationFrame(update);
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("hashchange", update);
  update();
})();