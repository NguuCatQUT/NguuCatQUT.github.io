const COOKIE_KEY = "cookieConsent";

const text = {
  en: {
    title: "We value your privacy",
    message:
      "We use cookies to improve your browsing experience and analyze website traffic.",
    accept: "Accept",
    reject: "Reject",
    privacy: "Privacy Policy",
  },

  ja: {
    title: "プライバシーについて",
    message:
      "当サイトでは、サービス向上およびアクセス解析のためCookieを使用しています。",
    accept: "同意する",
    reject: "拒否する",
    privacy: "プライバシーポリシー",
  },

  vi: {
    title: "Chúng tôi tôn trọng quyền riêng tư của bạn",
    message:
      "Website sử dụng cookie để cải thiện trải nghiệm và phân tích lưu lượng truy cập.",
    accept: "Đồng ý",
    reject: "Từ chối",
    privacy: "Chính sách bảo mật",
  },
};

/* ================================
   APPLY LANGUAGE
================================ */

function applyCookieLanguage() {
  let lang = document.documentElement.lang.toLowerCase();

  /*
   * Nếu lang là "en-US", "ja-JP", "vi-VN"
   * thì chỉ lấy phần đầu.
   */
  lang = lang.split("-")[0];

  /*
   * Nếu không có ngôn ngữ tương ứng
   * thì mặc định English.
   */
  if (!text[lang]) {
    lang = "en";
  }

  const currentText = text[lang];

  const title = document.getElementById("cookieTitle");
  const message = document.getElementById("cookieMessage");
  const accept = document.getElementById("cookieAccept");
  const reject = document.getElementById("cookieReject");
  const privacy = document.getElementById("cookiePrivacy");

  if (title) {
    title.textContent = currentText.title;
  }

  if (message) {
    message.textContent = currentText.message;
  }

  if (accept) {
    accept.textContent = currentText.accept;
  }

  if (reject) {
    reject.textContent = currentText.reject;
  }

  if (privacy) {
    privacy.textContent = currentText.privacy;
  }
}

/* ================================
   GOOGLE ANALYTICS
================================ */

function loadGoogleAnalytics() {
  if (window.GA_INITIALIZED) {
    return;
  }

  window.GA_INITIALIZED = true;

  const GA_ID = "G-RVG7J5NLTV";

  const script = document.createElement("script");

  script.async = true;

  script.src = "https://www.googletagmanager.com/gtag/js?id=" + GA_ID;

  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];

  function gtag() {
    dataLayer.push(arguments);
  }

  window.gtag = gtag;

  gtag("js", new Date());

  gtag("config", GA_ID);
}

/* ================================
   INITIALIZE
================================ */

document.addEventListener("DOMContentLoaded", function () {
  /* ================================
   COOKIE BANNER
================================ */

  const banner = document.getElementById("cookieBanner");
  const accept = document.getElementById("cookieAccept");
  const reject = document.getElementById("cookieReject");

  // Apply EN / JA / VI
  applyCookieLanguage();

  const consent = localStorage.getItem(COOKIE_KEY);

  if (consent === "accepted") {
    loadGoogleAnalytics();

  } else if (consent === "rejected") {
    // Do nothing

  } else {
    banner.style.display = "block";

  }

  /* ================================
   ACCEPT
================================ */

  if (accept) {
    accept.addEventListener("click", function () {
      localStorage.setItem(COOKIE_KEY, "accepted");

      banner.style.display = "none";

      loadGoogleAnalytics();
    });
  }

  /* ================================
   REJECT
================================ */

  if (reject) {
    reject.addEventListener("click", function () {
      localStorage.setItem(COOKIE_KEY, "rejected");

      banner.style.display = "none";
    });
  }
});
