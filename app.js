const menuTabs = document.querySelectorAll(".menu-tab");
const menuCards = document.querySelectorAll(".menu-card");
const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector(".site-nav");
const reservationForm = document.querySelector(".reservation-form");
const reservationMessage = document.querySelector(".form-message");
const dateInput = document.querySelector('input[name="date"]');

if (dateInput) {
  const today = new Date();
  dateInput.min = new Date(today.getTime() - today.getTimezoneOffset() * 60_000)
    .toISOString()
    .slice(0, 10);
}

menuTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const category = tab.dataset.category;
    menuTabs.forEach((item) => {
      const selected = item === tab;
      item.classList.toggle("is-active", selected);
      item.setAttribute("aria-pressed", String(selected));
    });
    menuCards.forEach((card) => {
      card.hidden = category !== "tous" && card.dataset.category !== category;
    });
  });
});

menuToggle?.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") !== "true";
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Fermer le menu" : "Ouvrir le menu");
  siteNav?.classList.toggle("is-open", isOpen);
});

siteNav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    menuToggle?.setAttribute("aria-expanded", "false");
    menuToggle?.setAttribute("aria-label", "Ouvrir le menu");
    siteNav.classList.remove("is-open");
  });
});

reservationForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!reservationForm.reportValidity()) return;
  const formData = new FormData(reservationForm);
  const guests = formData.get("guests");
  const guestsText = guests === "1 personne" ? guests : guests;
  reservationMessage.textContent = `Merci ${formData.get("name")} ! Votre demande pour ${guestsText}, le ${formData.get("date")} à ${formData.get("time")} est prête. Cette démonstration ne la transmet pas au restaurant.`;
  reservationForm.reset();
  dateInput.min = new Date(Date.now() - new Date().getTimezoneOffset() * 60_000)
    .toISOString()
    .slice(0, 10);
});
