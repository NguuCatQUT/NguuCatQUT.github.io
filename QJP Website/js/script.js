//                              Navigator                         //
function initMenu() {
    const toggle = document.querySelector(".nav-toggle");
    const menu = document.querySelector(".nav-links");
    const lang = document.querySelector(".lang-switch");

    if (toggle) {
        toggle.addEventListener("click", () => {
            toggle.classList.toggle("active");
            menu.classList.toggle("active");
            lang.classList.toggle("active");
        });
    }

    // Đóng menu khi click vào link
    document.querySelectorAll(".nav-links a").forEach((link) => {
        link.addEventListener("click", () => {
            toggle.classList.remove("active");
            menu.classList.remove("active");
            lang.classList.remove("active");
        });
    });
}

function switchLanguage(language) {
  localStorage.setItem("language", language);

  let path = window.location.pathname;

  // Loại bỏ slash đầu và cuối
  path = path.replace(/^\/+|\/+$/g, "");

  const parts = path.split("/");

  // Bỏ language hiện tại
  if (["en", "ja", "vi"].includes(parts[0])) {
    parts.shift();
  }

  // Nếu đang ở trang root của language
  if (parts.length === 0 || parts[0] === "index.html") {
    window.location.href = `/${language}/`;
    return;
  }

  // Giữ nguyên toàn bộ đường dẫn còn lại
  const currentPath = parts.join("/");

  window.location.href = `/${language}/${currentPath}`;
}









const sections = [...document.querySelectorAll("main > section")];
const navDots = [...document.querySelectorAll(".section-nav a")];
const reveals = [...document.querySelectorAll(".reveal")];
const cursorGlow = document.querySelector(".cursor-glow");

// Reveal content as each section enters the viewport.
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
    }
  });
}, {
  threshold: 0.12,
  rootMargin: "0px 0px -8% 0px"
});

reveals.forEach((element) => revealObserver.observe(element));

// Highlight the current section in the right-side navigation.
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;

    const index = sections.indexOf(entry.target);

    navDots.forEach((dot, i) => {
      dot.classList.toggle("active", i === index);
    });
  });
}, {
  threshold: 0.45
});

sections.forEach((section) => sectionObserver.observe(section));

// Small cursor light on desktop.
if (window.matchMedia("(pointer:fine)").matches) {
  window.addEventListener("pointermove", (event) => {
    cursorGlow.style.opacity = "1";
    cursorGlow.style.left = `${event.clientX}px`;
    cursorGlow.style.top = `${event.clientY}px`;
  });

  window.addEventListener("pointerleave", () => {
    cursorGlow.style.opacity = "0";
  });
}

// Very subtle parallax for the opening mark.
const hero = document.querySelector(".hero");
const logo = document.querySelector(".hero-logo");

window.addEventListener("scroll", () => {
  if (!hero || !logo) return;

  const y = window.scrollY;
  const progress = Math.min(y / window.innerHeight, 1);

  logo.style.transform =
    `translateY(${progress * -55}px) scale(${1 - progress * .08})`;
}, { passive: true });
