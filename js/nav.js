(function () {
  var header = document.querySelector(".site-header");
  if (!header) return;

  var toggle = header.querySelector(".nav-toggle");
  var nav = header.querySelector("#site-nav-menu");
  var backdrop = header.querySelector(".nav-backdrop");
  if (!toggle || !nav) return;

  var mq = window.matchMedia("(min-width: 769px)");

  function setOpen(open) {
    header.classList.toggle("site-header--nav-open", open);
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    document.body.classList.toggle("nav-menu-open", open);
    if (backdrop) {
      backdrop.setAttribute("aria-hidden", open ? "false" : "true");
    }
  }

  toggle.addEventListener("click", function () {
    setOpen(!header.classList.contains("site-header--nav-open"));
  });

  if (backdrop) {
    backdrop.addEventListener("click", function () {
      setOpen(false);
    });
  }

  nav.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      setOpen(false);
    });
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") setOpen(false);
  });

  function onViewportChange() {
    if (mq.matches) setOpen(false);
  }

  if (typeof mq.addEventListener === "function") {
    mq.addEventListener("change", onViewportChange);
  } else {
    mq.addListener(onViewportChange);
  }
})();
