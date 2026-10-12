/* ---------- Gallery photos (images/gallery/ folder me rakho, yahan edit karo) ---------- */
const gallery = [
  { src: "images/gallery/1.jpg", title: "SIH internal hackathon" },
  { src: "images/gallery/2.jpg", title: "Team work" },
  { src: "images/gallery/3.jpg", title: "Project demo" },
  { src: "images/gallery/4.jpg", title: "Coding sessions" },
  { src: "images/gallery/5.jpg", title: "College life" },
  { src: "images/gallery/6.jpg", title: "Events" },
];

/* ---------- Certificates (file = image ya PDF, certificates/ folder me rakho) ---------- */
const certificates = [
  { title: "Smart India Hackathon (Internal), 3rd Position", issuer: "SIH internal round", date: "", file: "certificates/sih-internal.jpg" },
  // { title: "Course / contest name", issuer: "Issued by", date: "2025", file: "certificates/name.jpg" },
];

const $ = (s) => document.querySelector(s);

/* ---------- Mobile menu ---------- */
const menuBtn = $(".menu-btn"), links = $("#links");
const setMenu = (open) => {
  links.classList.toggle("open", open);
  menuBtn.setAttribute("aria-expanded", String(open));
  menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  menuBtn.firstElementChild.className = open ? "fa-solid fa-xmark" : "fa-solid fa-bars";
};
menuBtn.addEventListener("click", () => setMenu(!links.classList.contains("open")));
links.addEventListener("click", (e) => { if (e.target.closest("a")) setMenu(false); });
document.addEventListener("keydown", (e) => { if (e.key === "Escape") setMenu(false); });
$("#year").textContent = new Date().getFullYear();

/* ---------- Gallery + lightbox ---------- */
const galGrid = $("#gallery-grid");
if (galGrid) {
  const dlg = $("#lightbox"), big = $("#lb-img"), cap = $("#lb-cap");
  let cur = 0;
  const tiles = gallery.map((g, i) => {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "shot";
    b.setAttribute("aria-label", "Open photo: " + g.title);
    const img = new Image();
    img.alt = g.title;
    img.loading = "lazy";
    img.onerror = () => {               // photo abhi nahi rakhi to placeholder dikhao
      img.remove();
      b.classList.add("empty");
      b.disabled = true;
      b.insertAdjacentHTML("afterbegin", '<i class="fa-regular fa-image"></i>');
    };
    img.src = g.src;
    const label = document.createElement("span");
    label.textContent = g.title;
    b.append(img, label);
    b.addEventListener("click", () => show(i));
    galGrid.append(b);
    return b;
  });
  const available = () => tiles.map((t, i) => (t.disabled ? -1 : i)).filter((i) => i >= 0);
  function show(i) {
    cur = i;
    big.src = gallery[i].src;
    big.alt = gallery[i].title;
    cap.textContent = gallery[i].title;
    if (!dlg.open) dlg.showModal();
  }
  function step(d) {
    const l = available();
    if (l.length < 2) return;
    show(l[(l.indexOf(cur) + d + l.length) % l.length]);
  }
  $("#lb-close").addEventListener("click", () => dlg.close());
  $("#lb-prev").addEventListener("click", () => step(-1));
  $("#lb-next").addEventListener("click", () => step(1));
  dlg.addEventListener("click", (e) => { if (e.target === dlg) dlg.close(); });
  dlg.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") step(-1);
    if (e.key === "ArrowRight") step(1);
  });
}

/* ---------- Certificates ---------- */
const certGrid = $("#cert-grid");
if (certGrid) {
  certificates.forEach((c) => {
    const card = document.createElement("article");
    card.className = "cert";
    card.innerHTML =
      '<div class="cert-preview"><i class="fa-solid fa-award"></i></div>' +
      '<div class="cert-body"><h3></h3><p class="issuer"></p><p class="date"></p>' +
      '<a class="proj-link" target="_blank" rel="noopener"><i class="fa-solid fa-arrow-up-right-from-square"></i> View certificate</a></div>';
    card.querySelector("h3").textContent = c.title;
    card.querySelector(".issuer").textContent = c.issuer;
    const d = card.querySelector(".date");
    c.date ? (d.textContent = c.date) : d.remove();
    card.querySelector("a").href = c.file;
    const preview = card.querySelector(".cert-preview");
    const img = new Image();             // image ho to preview dikhao, PDF ho to icon hi rahe
    img.alt = c.title;
    img.onload = () => { preview.textContent = ""; preview.append(img); };
    img.src = c.file;
    certGrid.append(card);
  });
}
