// Import our custom CSS
import "../scss/styles.scss";

// Import Bootstrap Icons
import "bootstrap-icons/font/bootstrap-icons.css";

// Import all of Bootstrap’s JS
import * as bootstrap from "bootstrap";

document.addEventListener("DOMContentLoaded", () => {
  const navigation = document.querySelector("#main-navigation");

  if (!navigation) return;

  const navigationLinks = navigation.querySelectorAll("a[href^='#']");

  navigationLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (!targetSection) return;

      event.preventDefault();

      const isMobile = window.innerWidth < 992;
      const isOpen = navigation.classList.contains("show");

      const scrollToSection = () => {
        const navbar = document.querySelector(".navbar-dentex");
        const navbarHeight = navbar ? navbar.offsetHeight : 0;

        const targetPosition =
          targetSection.getBoundingClientRect().top +
          window.scrollY -
          navbarHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      };

      if (isMobile && isOpen) {
        navigation.addEventListener("hidden.bs.collapse", scrollToSection, {
          once: true,
        });

        bootstrap.Collapse.getOrCreateInstance(navigation, {
          toggle: false,
        }).hide();
      } else {
        scrollToSection();
      }
    });
  });
});

const contactForm = document.querySelector("#contact-form");
const formResult = document.querySelector("#form-result");

if (contactForm && formResult) {
  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.textContent;

    submitButton.disabled = true;
    submitButton.textContent = "ENVIANDO...";
    formResult.className = "form-result mt-3";
    formResult.textContent = "Enviando mensaje...";

    try {
      const formData = new FormData(contactForm);
      const formObject = Object.fromEntries(formData);

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formObject),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Submission failed");
      }

      formResult.classList.add("form-result--success");
      formResult.textContent = "Gracias. Tu mensaje fue enviado correctamente.";

      contactForm.reset();
    } catch (error) {
      formResult.classList.add("form-result--error");
      formResult.textContent =
        "No fue posible enviar el mensaje. Inténtalo nuevamente o escríbenos a cepilleradentalmonterrey@gmail.com.";

      console.error("Form submission error:", error);
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = originalButtonText;
    }
  });
}
