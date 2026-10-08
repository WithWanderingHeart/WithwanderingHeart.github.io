(() => {
  const year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  const links = Array.from(document.querySelectorAll("[data-nav]"));
  const sections = links
    .map((a) => document.querySelector(a.getAttribute("href")))
    .filter(Boolean);

  const setActive = () => {
    let current = sections[0];
    for (const section of sections) {
      if (section.getBoundingClientRect().top <= 120) current = section;
    }
    links.forEach((a) => {
      a.classList.toggle("active", a.getAttribute("href") === `#${current.id}`);
    });
  };
  if (sections.length) {
    setActive();
    window.addEventListener("scroll", setActive, { passive: true });
  }

  const btn = document.getElementById("menuBtn");
  const nav = document.getElementById("mobileNav");
  if (btn && nav) {
    btn.addEventListener("click", () => {
      nav.hidden = !nav.hidden;
    });
    nav.querySelectorAll("a").forEach((a) => {
      a.addEventListener("click", () => { nav.hidden = true; });
    });
  }
})();
