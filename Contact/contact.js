const form = document.getElementById("contactForm");

const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");

const emailError = document.getElementById("emailError");
const messageError = document.getElementById("messageError");

// Email validasie patroon
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

form.addEventListener("submit", function (e) {

   // Verhoed dat die form normaal submit en die bladsy herlaai
   e.preventDefault();

   // Clear previous errors
   emailError.textContent = "";
   messageError.textContent = "";

   // Kry die waardes van die invoervelde
   const email = emailInput.value.trim();
   const message = messageInput.value.trim();

   // Boodskap validasie
   if (message === "") {

      messageError.textContent =
         "Please enter a message.";

      return;
   }

   // Email validasie
   if (!emailPattern.test(email)) {

      emailError.textContent =
         "Please enter a valid email address.";

      return;
   }

   // Sukses boodskap
   alert("✅ Your message has been sent!");

   // Reset form
   form.reset();
});