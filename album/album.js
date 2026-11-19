(() => {
  const dialog = document.getElementById("cardDialog");
  if (!dialog || typeof dialog.showModal !== "function") return;

  const cards = Array.from(document.querySelectorAll("#atlasGrid .tc"));
  const flip = document.getElementById("flipCard");
  const front = document.getElementById("flipFront");
  const back = document.getElementById("flipBack");
  const flipBtn = document.getElementById("flipBtn");
  const prevBtn = document.getElementById("prevCard");
  const nextBtn = document.getElementById("nextCard");
  const closeBtn = document.getElementById("closeCard");
  const keys = document.getElementById("dialogKeys");
  const count = document.getElementById("atlasCount");
  const empty = document.getElementById("atlasEmpty");
  const dialogName = document.getElementById("dialogName");
  const dialogSummary = document.getElementById("dialogSummary");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const canInert = "inert" in HTMLElement.prototype;

  const starWord = { 1: "一星", 2: "二星", 3: "三星", 4: "四星", 5: "五星" };

  let star = "all";
  let type = "all";
  let current = null;
  let opener = null;

  const field = (card, name) => {
    const node = card.querySelector(`[data-field="${name}"]`);
    return node ? node.textContent.trim() : "";
  };

  const visibleCards = () => cards.filter((card) => !card.hidden);

  const applyFilters = () => {
    cards.forEach((card) => {
      const starOk = star === "all" || card.dataset.star === star;
      const typeOk = type === "all" || card.dataset.type === type;
      card.hidden = !(starOk && typeOk);
    });
    const shown = visibleCards().length;
    if (shown === cards.length) {
      count.textContent = `共 ${cards.length} 张`;
    } else if (shown === 0) {
      count.textContent = "正在看 0 张。这组条件下没有卡。";
    } else {
      count.textContent = `正在看 ${shown} 张，共 ${cards.length} 张`;
    }
    empty.hidden = shown !== 0;
    if (dialog.open) updateStepButtons();
  };

  const bindRadios = (root, onPick) => {
    const buttons = Array.from(root.querySelectorAll("[role='radio']"));
    const choose = (btn, focus) => {
      buttons.forEach((item) => {
        const on = item === btn;
        item.setAttribute("aria-checked", on ? "true" : "false");
        item.tabIndex = on ? 0 : -1;
      });
      onPick(btn.dataset.value);
      if (focus) btn.focus();
    };
    buttons.forEach((btn, index) => {
      btn.addEventListener("click", () => choose(btn, false));
      btn.addEventListener("keydown", (event) => {
        let next = null;
        if (event.key === "ArrowRight" || event.key === "ArrowDown") {
          next = buttons[(index + 1) % buttons.length];
        } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
          next = buttons[(index - 1 + buttons.length) % buttons.length];
        } else if (event.key === "Home") {
          next = buttons[0];
        } else if (event.key === "End") {
          next = buttons[buttons.length - 1];
        }
        if (!next) return;
        event.preventDefault();
        choose(next, true);
      });
    });
  };

  const setSide = (showBack, animate) => {
    if (!animate) flip.classList.add("no-anim");
    flip.classList.toggle("is-back", showBack);
    if (!animate) {
      void flip.offsetWidth;
      flip.classList.remove("no-anim");
    }
    const stacked = flip.classList.contains("is-stacked");
    const backShowing = showBack || stacked;
    if (canInert) {
      front.inert = !stacked && backShowing;
      back.inert = !stacked && !backShowing;
    }
    front.setAttribute("aria-hidden", !stacked && backShowing ? "true" : "false");
    back.setAttribute("aria-hidden", !stacked && !backShowing ? "true" : "false");
    flipBtn.hidden = stacked;
    keys.hidden = stacked;
    flipBtn.textContent = showBack ? "看正面" : "看背面";
  };

  const updateStepButtons = () => {
    const list = visibleCards();
    const index = list.indexOf(current);
    const prevCard = index > 0 ? list[index - 1] : null;
    const nextCard = index >= 0 && index < list.length - 1 ? list[index + 1] : null;
    prevBtn.disabled = !prevCard;
    nextBtn.disabled = !nextCard;
    const prevName = prevCard ? prevCard.querySelector(".tc-name").textContent.trim() : "";
    const nextName = nextCard ? nextCard.querySelector(".tc-name").textContent.trim() : "";
    prevBtn.setAttribute("aria-label", prevName ? `上一张：${prevName}` : "上一张");
    nextBtn.setAttribute("aria-label", nextName ? `下一张：${nextName}` : "下一张");
  };

  const addText = (parent, tag, className, text) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    parent.append(node);
    return node;
  };

  const render = (card, animateFlip) => {
    current = card;
    const starNum = card.dataset.star;
    const cardType = card.dataset.type;
    const name = card.querySelector(".tc-name").textContent.trim();
    const no = card.querySelector(".tc-no").textContent.trim();

    flip.className = `flip star-${starNum}`;
    flip.dataset.type = cardType;
    if (reduceMotion) flip.classList.add("is-stacked");

    const shell = card.querySelector(".tc-shell").cloneNode(true);
    const hint = shell.querySelector(".tc-hint");
    if (hint) hint.textContent = "正面";
    front.replaceChildren(shell);

    back.replaceChildren();
    const backShell = addText(back, "div", "tc-shell");
    const panel = addText(backShell, "div", "tc-back");
    const top = addText(panel, "p", "tc-top");
    addText(top, "span", null, no);
    const meta = document.createElement("span");
    meta.append(document.createTextNode(`${starWord[starNum] || ""} · `));
    addText(meta, "span", "tc-type", cardType);
    top.append(meta);
    const heading = addText(panel, "h3", "tc-name", name);
    heading.tabIndex = -1;
    heading.id = "dialogHeading";
    addText(panel, "p", "tc-kicker", "生效时机");
    addText(panel, "p", null, field(card, "when"));
    addText(panel, "p", "tc-kicker", "效果");
    const effect = addText(panel, "p", null, field(card, "effect"));
    effect.id = "dialogEffect";
    addText(panel, "p", "tc-kicker", "联动");
    addText(panel, "p", null, field(card, "combo"));
    addText(panel, "p", "tc-pub", "精进 · 理论卡册");

    dialogName.textContent = name;
    dialogSummary.textContent = `生效时机：${field(card, "when")} 效果：${field(card, "effect")} 联动：${field(card, "combo")}`;
    updateStepButtons();

    if (reduceMotion) setSide(true, false);
    else if (animateFlip) {
      setSide(false, false);
      requestAnimationFrame(() => setSide(true, true));
    } else {
      setSide(true, false);
    }
  };

  const openCard = (card) => {
    if (!card) return;
    const animate = !dialog.open;
    if (!dialog.open) opener = document.activeElement;
    render(card, animate);
    if (!dialog.open) {
      dialog.showModal();
      document.body.classList.add("card-open");
    }
    if (location.hash !== `#${card.id}`) {
      history.replaceState(null, "", `#${card.id}`);
    }
  };

  const step = (dir) => {
    const list = visibleCards();
    if (!list.length) return;
    let index = list.indexOf(current);
    if (index === -1) index = dir > 0 ? -1 : list.length;
    const next = list[index + dir];
    if (next) openCard(next);
  };

  cards.forEach((card) => {
    const summary = card.querySelector("summary");
    summary.setAttribute("aria-haspopup", "dialog");
    summary.addEventListener("click", (event) => {
      event.preventDefault();
      openCard(card);
    });
    card.addEventListener("toggle", () => {
      if (card.open) card.open = false;
    });
  });

  document.querySelectorAll("[data-open]").forEach((btn) => {
    btn.addEventListener("click", () => {
      openCard(document.getElementById(btn.dataset.open));
    });
  });

  bindRadios(document.getElementById("starFilters"), (value) => {
    star = value;
    applyFilters();
  });
  bindRadios(document.getElementById("typeFilters"), (value) => {
    type = value;
    applyFilters();
  });

  flipBtn.addEventListener("click", () => {
    setSide(!flip.classList.contains("is-back"), !reduceMotion);
  });
  prevBtn.addEventListener("click", () => step(-1));
  nextBtn.addEventListener("click", () => step(1));
  closeBtn.addEventListener("click", () => dialog.close());

  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });

  dialog.addEventListener("close", () => {
    document.body.classList.remove("card-open");
    if (location.hash) history.replaceState(null, "", location.pathname + location.search);
    const backTo = opener;
    opener = null;
    if (backTo && typeof backTo.focus === "function" && !backTo.closest("[hidden]")) {
      backTo.focus();
    }
  });

  dialog.addEventListener("keydown", (event) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      step(1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      step(-1);
    } else if ((event.key === "f" || event.key === "F") && !flip.classList.contains("is-stacked")) {
      event.preventDefault();
      setSide(!flip.classList.contains("is-back"), true);
    }
  });

  const hashId = decodeURIComponent(location.hash.replace(/^#/, ""));
  const hashed = hashId ? document.getElementById(hashId) : null;
  if (hashed && hashed.matches("#atlasGrid .tc")) openCard(hashed);
})();
