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

/* ---------- Contact form ---------- */
// Free key from https://web3forms.com (sends form messages straight to your inbox).
// Leave empty to fall back to opening the visitor's email app.
const WEB3FORMS_KEY = "";
const EMAIL = "piyushverma2401@gmail.com";
const form = document.getElementById("contact-form");
const note = form.querySelector(".form-note");
const show = (msg, ok) => { note.textContent = msg; note.className = "form-note " + (ok ? "ok" : "err"); };

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const d = Object.fromEntries(new FormData(form));
  if (d.botcheck) return;
  const name = (d.name || "").trim(), email = (d.email || "").trim(), msg = (d.message || "").trim();
  const phone = (d.phone || "").trim(), company = (d.company || "").trim(), purpose = d.purpose || "";
  if (!name || !/^\S+@\S+\.\S+$/.test(email) || !msg) {
    show("Please fill in your name, a valid email and a message.", false);
    return;
  }
  const subject = purpose + " | " + name;
  if (WEB3FORMS_KEY) {
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ access_key: WEB3FORMS_KEY, subject, from_name: "Portfolio", name, email, phone, company, purpose, message: msg }),
      });
      const json = await res.json();
      if (!json.success) throw new Error();
      show("Message sent. I'll reply to " + email + " soon. Thank you!", true);
      form.reset();
    } catch {
      show("Could not send. Please email me directly at " + EMAIL + ".", false);
    }
    return;
  }
  const body = msg + "\n\n---\nName: " + name + "\nEmail: " + email +
    (phone ? "\nPhone: " + phone : "") + (company ? "\nCompany/College: " + company : "") + "\nPurpose: " + purpose;
  window.location.href = "mailto:" + EMAIL + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
  show("Opening your email app. Just press send. Thank you!", true);
});

const copyBtn = document.getElementById("copy-email");
copyBtn.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(EMAIL);
    copyBtn.innerHTML = '<i class="fa-solid fa-check"></i> Copied';
  } catch {
    copyBtn.textContent = EMAIL;
  }
  setTimeout(() => { copyBtn.innerHTML = '<i class="fa-regular fa-copy"></i> Copy'; }, 2000);
});

document.getElementById("year").textContent = new Date().getFullYear();
