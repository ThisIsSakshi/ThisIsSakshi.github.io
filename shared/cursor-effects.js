(function attachSparkleCursorSetup() {
  function setupSparkleCursor(options = {}) {
    if (!window.matchMedia || !window.matchMedia("(pointer: fine)").matches) {
      return null;
    }

    if (document.body.dataset.sparkleCursorInitialized === "true") {
      return null;
    }
    document.body.dataset.sparkleCursorInitialized = "true";

    const cfg = {
      heartCursor: "assets/cursor-heart.gif",
      pointerCursor: "assets/pointer.png",
      cursorClassName: "cursor-sparkle",
      starClassName: "cursor-trail-star",
      bodyClassName: "custom-cursor-active",
      clickableSelector: "button, a, input, textarea, select, .clickable",
      maxTrailStars: 30,
      starMinIntervalMs: 22,
      cursorSize: 30,
      ...options
    };

    const cursor = document.createElement("div");
    cursor.className = cfg.cursorClassName;
    cursor.style.width = `${cfg.cursorSize}px`;
    cursor.style.height = `${cfg.cursorSize}px`;
    cursor.style.backgroundImage = `url("${cfg.heartCursor}")`;
    document.body.appendChild(cursor);
    document.body.classList.add(cfg.bodyClassName);

    const trail = [];
    let pointerX = 0;
    let pointerY = 0;
    let pointerMoved = false;
    let lastStarTimestamp = 0;
    let rafId = 0;
    let isPointerMode = false;

    const setPointerMode = (active) => {
      if (isPointerMode === active) return;
      isPointerMode = active;
      cursor.style.backgroundImage = `url("${active ? cfg.pointerCursor : cfg.heartCursor}")`;
    };

    const onMouseMove = (event) => {
      pointerX = event.clientX;
      pointerY = event.clientY;
      pointerMoved = true;
      cursor.style.left = `${pointerX - cfg.cursorSize / 2}px`;
      cursor.style.top = `${pointerY - cfg.cursorSize / 2}px`;
      if (!(event.target instanceof Element)) {
        setPointerMode(false);
        return;
      }

      // Resolve hover target using viewport coords because cursor is fixed-position.
      const hovered = document.elementFromPoint(event.clientX, event.clientY);
      const clickable = hovered instanceof Element ? hovered.closest(cfg.clickableSelector) : null;
      setPointerMode(Boolean(clickable));
    };

    const onMouseLeave = () => {
      setPointerMode(false);
    };

    const spawnStar = (x, y) => {
      const star = document.createElement("div");
      star.className = cfg.starClassName;
      star.style.left = `${x}px`;
      star.style.top = `${y}px`;
      document.body.appendChild(star);
      trail.push(star);

      if (trail.length > cfg.maxTrailStars) {
        const oldestStar = trail.shift();
        if (oldestStar) {
          oldestStar.remove();
        }
      }
    };

    const animateTrail = (timestamp) => {
      if (pointerMoved && timestamp - lastStarTimestamp >= cfg.starMinIntervalMs) {
        spawnStar(pointerX, pointerY);
        pointerMoved = false;
        lastStarTimestamp = timestamp;
      }

      rafId = window.requestAnimationFrame(animateTrail);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);
    rafId = window.requestAnimationFrame(animateTrail);

    return {
      destroy() {
        window.cancelAnimationFrame(rafId);
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseleave", onMouseLeave);
        cursor.remove();
        trail.forEach((star) => star.remove());
        document.body.classList.remove(cfg.bodyClassName);
        delete document.body.dataset.sparkleCursorInitialized;
      }
    };
  }

  window.setupSparkleCursor = setupSparkleCursor;
})();
