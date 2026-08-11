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

    // Lưu ngôn ngữ người dùng chọn
    localStorage.setItem("language", language);

    // Lấy đường dẫn hiện tại
    const path = window.location.pathname;

    // Lấy tên file hiện tại
    let currentPage = path.split("/").pop();

    // Nếu đang ở dạng /en/ hoặc /en
    // thì xem là index.html
    if (!currentPage || currentPage === "") {
        currentPage = "index.html";
    }

    // Chuyển sang thư mục ngôn ngữ mới
    window.location.href = `/${language}/${currentPage}`;
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
