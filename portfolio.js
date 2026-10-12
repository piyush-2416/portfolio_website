/* ---------- Projects data (yahan edit / add karo) ---------- */
const GITHUB = "https://github.com/piyushs-2416";
const projects = [
  { name: "CarePoint", featured: true,
    text: "Healthcare appointment and patient management platform with doctor-patient scheduling and a secure backend with role-based access.",
    tags: ["MERN", "Role-based access", "Scheduling"] },
  { name: "MERN Authentication System",
    text: "JWT login and signup, password reset by email and protected routes.",
    tags: ["JWT", "Node.js", "MongoDB"] },
  { name: "E-Commerce Website",
    text: "Product management, cart, user accounts and an admin dashboard.",
    tags: ["React", "Express", "Admin"] },
  { name: "Portfolio / Blog Application",
    text: "CRUD blog backed by MongoDB with a fully responsive layout.",
    tags: ["CRUD", "MongoDB", "Responsive"] },
  { name: "MyCommunity",
    text: "Community discussion platform with posts, groups, notifications and real-time interaction.",
    tags: ["Real-time", "Groups"] },
  { name: "Creators_Mart",
    text: "Marketplace where creators sell digital and physical products, with a seller dashboard, orders, cart and secure payments.",
    tags: ["Marketplace", "Payments"] },
  { name: "Events_Handling",
    text: "Event creation, booking and attendee tracking with an admin panel for organizers.",
    tags: ["Booking", "Admin panel"] },
  { name: "Religious_Portals",
    text: "Portal for religious communities with event and announcement listings, donations and community updates.",
    tags: ["Listings", "Donations"] },
  { name: "Shopkeeper Delivery Portal",
    text: "Order and delivery management for local shopkeepers with real-time tracking and an inventory dashboard.",
    tags: ["Tracking", "Inventory"] },
  { name: "Neighbour Helping Portal",
    text: "Neighbours post and answer help requests, matched by location.",
    tags: ["Location-based", "Community"] },
];

const grid = document.getElementById("project-grid");
projects.forEach((p) => {
  const card = document.createElement("article");
  card.className = "project" + (p.featured ? " featured" : "");
  const head = document.createElement("h3");
  head.textContent = p.name;
  if (p.featured) {
    const b = document.createElement("span");
    b.className = "badge";
    b.textContent = "Featured";
    head.append(b);
  }
  const text = document.createElement("p");
  text.textContent = p.text;
  const tags = document.createElement("ul");
  tags.className = "chips";
  p.tags.forEach((t) => {
    const li = document.createElement("li");
    li.textContent = t;
    tags.append(li);
  });
  const link = document.createElement("a");
  link.className = "proj-link";
  link.href = GITHUB;
  link.target = "_blank";
  link.rel = "noopener";
  link.innerHTML = '<i class="fa-brands fa-github"></i> View on GitHub';
  card.append(head, text, tags, link);
  grid.append(card);
});

/* ---------- Mobile menu ---------- */
const menuBtn = document.querySelector(".menu-btn");
const links = document.getElementById("links");
const setMenu = (open) => {
  links.classList.toggle("open", open);
  menuBtn.setAttribute("aria-expanded", String(open));
  menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  menuBtn.firstElementChild.className = open ? "fa-solid fa-xmark" : "fa-solid fa-bars";
};
menuBtn.addEventListener("click", () => setMenu(!links.classList.contains("open")));
links.addEventListener("click", (e) => { if (e.target.closest("a")) setMenu(false); });
document.addEventListener("keydown", (e) => { if (e.key === "Escape") setMenu(false); });

/* ---------- Highlight current section in nav ---------- */
const navLinks = [...links.querySelectorAll("a")];
const io = new IntersectionObserver((entries) => {
  entries.forEach((en) => {
    if (en.isIntersecting) {
      navLinks.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === "#" + en.target.id));
    }
  });
}, { rootMargin: "-45% 0px -50% 0px" });
document.querySelectorAll("main section[id]").forEach((s) => io.observe(s));

/* ---------- Contact form: opens the visitor's email app ---------- */
const form = document.getElementById("contact-form");
const note = form.querySelector(".form-note");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const d = Object.fromEntries(new FormData(form));
  const name = (d.name || "").trim(), email = (d.email || "").trim(), msg = (d.message || "").trim();
  if (!name || !/^\S+@\S+\.\S+$/.test(email) || !msg) {
    note.textContent = "Please fill in your name, a valid email and a message.";
    note.className = "form-note err";
    return;
  }
  const subject = encodeURIComponent("Portfolio message from " + name);
  const body = encodeURIComponent(msg + "\n\nFrom: " + name + " (" + email + ")");
  window.location.href = "mailto:piyushverma2401@gmail.com?subject=" + subject + "&body=" + body;
  note.textContent = "Opening your email app. Thanks for reaching out!";
  note.className = "form-note ok";
  form.reset();
});

document.getElementById("year").textContent = new Date().getFullYear();
