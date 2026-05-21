// Kry die cart uit localStorage
// As daar geen cart bestaan nie, begin met 'n leë array.
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Kry nodige HTML elemente
const cartItems = document.getElementById("cart-items");
const submitButton = document.querySelector('button[type="submit"]');
const totalPrice = document.getElementById("total-price");

// Hierdie funksie wys die cart items op die checkout bladsy.
function renderCart() {

   // Maak huidige inhoud leeg
   cartItems.innerHTML = "";

   // Hou totale prys
   let total = 0;

   // Gaan deur elke item in die cart
   cart.forEach((item, index) => {

      // Bereken totaal
      total += item.price * item.quantity;

      // Skep nuwe div vir item
      const div = document.createElement("div");
      div.classList.add("cart-item");

      // Voeg item se HTML inhoud by
      div.innerHTML = `
         <span>${item.name}</span>

         <div class="quantity-controls">
            <button onclick="decreaseQuantity(${index})">-</button>

            <span>x${item.quantity}</span>

            <button onclick="increaseQuantity(${index})">+</button>
         </div>

         <span>R${item.price * item.quantity}</span>
      `;

      // Voeg item by die bladsy
      cartItems.appendChild(div);
   });

   // Wys totale prys
   totalPrice.textContent = "R" + total;

   // Stoor opgedateerde cart
   localStorage.setItem("cart", JSON.stringify(cart));

   // As die cart leeg is
   if (cart.length === 0) {

   // Vervang submit knoppie met shopping knoppie
   submitButton.outerHTML = `
      <a href="grove.html" class="continue-btn">
         Your Cart is Empty - Continue Shopping
      </a>
   `;

   } else {

      // Kyk of submit button bestaan
      const buttonCheck = document.querySelector('button[type="submit"]');

      // As dit nie bestaan nie
      if (!buttonCheck) {

         // Kry continue button
         const continueBtn = document.querySelector('.continue-btn');

         // Vervang dit met Place Order button
         continueBtn.outerHTML = `
            <button type="submit">
               Place Order
            </button>
         `;
      }
   }
}

// Hierdie funksie vermeerder item hoeveelheid.
function increaseQuantity(index) {
   cart[index].quantity++;
   renderCart();
}

// Hierdie funksie verminder item hoeveelheid.
function decreaseQuantity(index) {

   cart[index].quantity--;

   // Verwyder item indien hoeveelheid 0 of minder is
   if (cart[index].quantity <= 0) {
      cart.splice(index, 1);
   }

   // Werk cart op die skerm by
   renderCart();
}

// Wys cart wanneer bladsy laai
renderCart();

// ================== Checkout Form Validasie =================

// Kry checkout form
const form = document.getElementById("checkout-form");

// Lys van velde wat validation gebruik
const fields = [
   {
      id: "name",
      error: "Please enter your full name"
   },
   {
      id: "email",
      error: "Invalid email address"
   },
   {
      id: "phone",
      error: "Please enter a valid cellphone number"
   },
   {
      id: "street",
      error: "Please enter your street address"
   },
   {
      id: "suburb",
      error: "Please enter your suburb"
   },
   {
      id: "city",
      error: "Please enter your city"
   },
   {
      id: "province",
      error: "Please select a province"
   }
];

// Voeg error boodskap elemente by elke input veld
fields.forEach(field => {

   const input = document.getElementById(field.id);

   const errorElement = document.createElement("small");
   errorElement.classList.add("error-message");

   input.insertAdjacentElement("afterend", errorElement);

   field.errorElement = errorElement;
});

// Wanneer die form submit word
form.addEventListener("submit", function(event) {

   // Stop normale form submit
   event.preventDefault();

   let isValid = true;

   // Validate elke veld
   fields.forEach(field => {

      const input = document.getElementById(field.id);
      const value = input.value.trim();

      // Maak vorige errors leeg
      field.errorElement.textContent = "";
      input.classList.remove("input-error");

      // Kyk of veld leeg is
      if (value === "") {

         field.errorElement.textContent = field.error;
         input.classList.add("input-error");

         isValid = false;
         return;
      }

      // Email validation
      if (field.id === "email") {

         const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

         // Kyk of email formaat korrek is
         if (!value.match(emailPattern)) {

            field.errorElement.textContent = "Invalid email address";
            input.classList.add("input-error");

            isValid = false;
         }
      }

      // Phone validation
      if (field.id === "phone") {

         const phonePattern = /^[0-9]{10}$/;

         // Kyk of nommer 10 syfers het
         if (!value.match(phonePattern)) {

            field.errorElement.textContent = "Phone number must be 10 digits";
            input.classList.add("input-error");

            isValid = false;
         }
      }
   });

   // Stop indien validation misluk
   if (!isValid) return;

   // ================= Wys bestelling op orders databasis =================

   // Kry bestaande orders uit localStorage
   let orders = JSON.parse(localStorage.getItem("orders")) || [];

   // Bou customer address
   const fullAddress = `
      ${document.getElementById("street").value},
      ${document.getElementById("suburb").value},
      ${document.getElementById("city").value},
      ${document.getElementById("province").value}
   `;

   // Voeg elke cart item as 'n order by
   cart.forEach(item => {

      const orderData = {

         product: item.name,

         units: item.quantity,

         time: new Date().toISOString(),

         customerName:
            document.getElementById("name").value,

         cell:
            document.getElementById("phone").value,

         address: fullAddress,

         notes: ""

      };

      // Stoor order
      orders.push(orderData);

   });

   // Save terug na localStorage
   localStorage.setItem(
      "orders",
      JSON.stringify(orders)
   );

   // Wys sukses boodskap
   alert("Order placed successfully!");

   // Maak cart leeg
   localStorage.removeItem("cart");

   // Stuur gebruiker terug na winkel bladsy
   window.location.href = "grove.html";
});