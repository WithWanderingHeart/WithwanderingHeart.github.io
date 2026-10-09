(() => {
  const year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const loader = document.getElementById("loader");
  const header = document.getElementById("siteHeader");

  const markReady = () => document.body.classList.add("is-ready");

  const restoreHash = () => {
    const id = decodeURIComponent(location.hash.replace(/^#/, ""));
    if (!id || id === "home") {
      if (id === "home") window.scrollTo(0, 0);
      return;
    }
    const target = document.getElementById(id);
    if (target) target.scrollIntoView({ block: "start" });
  };

  const finishLoader = () => {
    loader?.classList.add("is-done");
    document.body.classList.remove("loading");
    markReady();
    restoreHash();
  };

  let seen = false;
  try { seen = sessionStorage.getItem("yh-seen-loader") === "1"; } catch (err) { seen = false; }

  if (!loader || reduce || seen) {
    finishLoader();
  } else {
    document.body.classList.add("loading");
    try { sessionStorage.setItem("yh-seen-loader", "1"); } catch (err) { /* private mode */ }
    const hex = document.getElementById("loader-hex");
    const letter = document.getElementById("loader-letter");
    if (hex) {
      const length = typeof hex.getTotalLength === "function" ? hex.getTotalLength() : 300;
      hex.style.strokeDasharray = String(length);
      hex.style.strokeDashoffset = String(length);
      requestAnimationFrame(() => {
        hex.style.transition = "stroke-dashoffset 0.9s cubic-bezier(0.77, 0, 0.175, 1)";
        hex.style.strokeDashoffset = "0";
      });
    }
    window.setTimeout(() => {
      if (letter) {
        letter.style.transition = "opacity 0.45s ease";
        letter.style.opacity = "1";
      }
    }, 820);
    window.setTimeout(() => {
      const wrap = loader.querySelector(".logo-wrapper");
      if (wrap) {
        wrap.style.transition = "opacity 0.28s ease, transform 0.28s ease";
        wrap.style.opacity = "0";
        wrap.style.transform = "scale(0.92)";
      }
    }, 1400);
    window.setTimeout(finishLoader, 1720);
  }

  const onScroll = () => {
    header?.classList.toggle("is-scrolled", window.scrollY > 8);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  document.querySelectorAll('a[href="#home"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
    });
  });

  const btn = document.getElementById("menuBtn");
  const nav = document.getElementById("mobileNav");
  const main = document.querySelector("main");
  const footer = document.querySelector(".site-footer");

  if (btn && nav) {
    const setOpen = (open) => {
      nav.hidden = !open;
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      btn.setAttribute("aria-label", open ? "关闭菜单" : "打开菜单");
      document.body.classList.toggle("nav-open", open);
      if ("inert" in HTMLElement.prototype) {
        if (main) main.inert = open;
        if (footer) footer.inert = open;
      }
    };

    btn.addEventListener("click", () => {
      const open = nav.hidden;
      setOpen(open);
      if (open) {
        const first = nav.querySelector("a");
        if (first) first.focus();
      }
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => setOpen(false));
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && !nav.hidden) {
        setOpen(false);
        btn.focus();
      }
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 920 && !nav.hidden) setOpen(false);
    });
  }

  const revealNodes = Array.from(document.querySelectorAll(".reveal"));
  if (reduce || !("IntersectionObserver" in window)) {
    revealNodes.forEach((node) => node.classList.add("is-in"));
  } else {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-in");
        revealObserver.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    revealNodes.forEach((node) => revealObserver.observe(node));
  }
})();
