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

//                              Email                     //
const form = document.getElementById("contactForm");

form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const data = {
        name: form.name.value,

        company: form.company.value,

        email: form.email.value,

        phone: form.phone.value,

        message: form.message.value,

        language: form.language.value,
    };

    try {
        // gửi cho QUT

        await emailjs.send(
            "service_qut",

            "template_admin",

            data,
        );

        // gửi cho khách

        await emailjs.send(
            "service_qut",

            "template_customer",

            data,
        );

        document.getElementById("successMessage").innerHTML =
            "Thank you! Your message has been sent.";

        gtag("event", "contact_form_submit", {
            language: document.querySelector("[name=language]").value,
        });

        form.reset();
    } catch (err) {
        console.error(err);

        document.getElementById("successMessage").innerHTML =
            "Unable to send message. Please check your information again";
    }
});
