// Import custom styles
import "../scss/styles.scss";

// Import Bootstrap Icons
import "bootstrap-icons/font/bootstrap-icons.css";

// Import only the Bootstrap component used by the website
import Collapse from "bootstrap/js/dist/collapse";

// ========================================
// Mobile navigation
// ========================================

const mainNavigation = document.querySelector("#main-navigation");

if (mainNavigation) {
  const navigationCollapse = Collapse.getOrCreateInstance(mainNavigation, {
    toggle: false,
  });

  const navigationLinks = mainNavigation.querySelectorAll("a[href^='#']");

  navigationLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (mainNavigation.classList.contains("show")) {
        navigationCollapse.hide();
      }
    });
  });
}

// ========================================
// Contact form
// ========================================

const contactForm = document.querySelector("#contact-form");
const formResult = document.querySelector("#form-result");

if (contactForm && formResult) {
  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const submitButton = contactForm.querySelector('button[type="submit"]');

    if (!submitButton) return;

    const originalButtonText = submitButton.textContent;

    submitButton.disabled = true;
    submitButton.textContent = "ENVIANDO...";

    formResult.className = "form-result mt-3";
    formResult.textContent = "Enviando mensaje...";

    try {
      const formData = new FormData(contactForm);
      const formObject = Object.fromEntries(formData.entries());

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
        throw new Error(result.message || "The form could not be submitted.");
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
