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

  /* Hex expand: hover + click toggle (matches Brittany offset expand) */
  document.querySelectorAll(".hex-logo").forEach((logo) => {
    logo.setAttribute("aria-expanded", "false");
    logo.addEventListener("click", (e) => {
      const expanded = logo.getAttribute("aria-expanded") === "true";
      document.querySelectorAll(".hex-logo").forEach((el) => {
        el.classList.remove("is-open");
        el.setAttribute("aria-expanded", "false");
      });
      if (!expanded) {
        logo.classList.add("is-open");
        logo.setAttribute("aria-expanded", "true");
      }
      /* keep in-page anchor navigation */
    });
  });

  /* Loader: draw hex stroke → fade letter → shrink away */
  const loader = document.getElementById("loader");
  const hex = document.getElementById("loader-hex");
  const letter = document.getElementById("loader-letter");
  if (loader && hex) {
    document.body.classList.add("loading");
    const length = hex.getTotalLength ? hex.getTotalLength() : 300;
    hex.style.strokeDasharray = String(length);
    hex.style.strokeDashoffset = String(length);
    requestAnimationFrame(() => {
      hex.style.transition = "stroke-dashoffset 1.5s cubic-bezier(0.77, 0, 0.175, 1)";
      hex.style.strokeDashoffset = "0";
    });
    setTimeout(() => {
      if (letter) {
        letter.style.transition = "opacity 0.7s cubic-bezier(0.77, 0, 0.175, 1)";
        letter.style.opacity = "1";
      }
    }, 1500);
    setTimeout(() => {
      const wrap = loader.querySelector(".logo-wrapper");
      if (wrap) {
        wrap.style.transition = "opacity 0.3s ease, transform 0.3s ease";
        wrap.style.opacity = "0";
        wrap.style.transform = "scale(0.1)";
      }
    }, 2700);
    setTimeout(() => {
      loader.classList.add("is-done");
      document.body.classList.remove("loading");
    }, 3000);
  }
})();
