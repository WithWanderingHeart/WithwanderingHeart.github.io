(() => {
  const year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  const links = Array.from(document.querySelectorAll("[data-nav]"));
  const sections = ["home", "about", "experience", "projects", "excerpt"]
    .map((id) => document.getElementById(id))
    .filter(Boolean);

  const setActive = () => {
    if (!sections.length) return;
    const line = window.innerHeight * 0.32;
    let current = sections[0];
    for (const section of sections) {
      const rect = section.getBoundingClientRect();
      if (rect.top <= line && rect.bottom > line) current = section;
    }
    const doc = document.documentElement;
    if (window.scrollY + window.innerHeight >= doc.scrollHeight - 2) {
      current = sections[sections.length - 1];
    }
    const hash = `#${current.id}`;
    links.forEach((a) => {
      const on = a.getAttribute("href") === hash;
      a.classList.toggle("active", on);
      if (on) a.setAttribute("aria-current", "true");
      else a.removeAttribute("aria-current");
    });
  };
  if (sections.length) {
    setActive();
    window.addEventListener("scroll", setActive, { passive: true });
    window.addEventListener("resize", setActive);
  }

  const btn = document.getElementById("menuBtn");
  const nav = document.getElementById("mobileNav");
  if (btn && nav) {
    const setOpen = (open) => {
      nav.hidden = !open;
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      btn.textContent = open ? "关闭" : "菜单";
      btn.setAttribute("aria-label", open ? "关闭菜单" : "打开菜单");
    };
    btn.addEventListener("click", () => setOpen(nav.hidden));
    nav.querySelectorAll("a").forEach((a) => {
      a.addEventListener("click", () => setOpen(false));
    });
  }

  /* Hex expand: hover + click toggle (matches Brittany offset expand) */
  document.querySelectorAll(".hex-logo").forEach((logo) => {
    logo.setAttribute("aria-expanded", "false");
    logo.addEventListener("click", () => {
      const expanded = logo.getAttribute("aria-expanded") === "true";
      document.querySelectorAll(".hex-logo").forEach((el) => {
        el.classList.remove("is-open");
        el.setAttribute("aria-expanded", "false");
      });
      if (!expanded) {
        logo.classList.add("is-open");
        logo.setAttribute("aria-expanded", "true");
      }
    });
  });

  /* Loader: draw hex stroke → fade letter → shrink away */
  const loader = document.getElementById("loader");
  const hex = document.getElementById("loader-hex");
  const letter = document.getElementById("loader-letter");
  if (loader && hex) {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      loader.classList.add("is-done");
      return;
    }
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
