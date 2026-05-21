// Hierdie funksie kry die cart (mandjie) uit localStorage.
// As daar geen cart bestaan nie, gee dit 'n leë array terug.
function getCart() {
   return JSON.parse(localStorage.getItem("cart")) || [];
}

// Hierdie funksie stoor die cart terug in localStorage.
function saveCart(cart) {
   localStorage.setItem("cart", JSON.stringify(cart));
}

// Hierdie funksie verander die hoeveelheid van 'n produk.
// "change" veranderlike bepaal of die hoeveelheid vermeerder of verminder word.
function changeQuantity(name, price, change) {

   // Kry huidige cart
   let cart = getCart();

   // Soek of die item reeds in die cart bestaan
   let existingItem = cart.find(item => item.name === name);

   // As die item bestaan
   if (existingItem) {

      // Verander die hoeveelheid
      existingItem.quantity += change;

      // As hoeveelheid 0 of minder is, verwyder die item
      if (existingItem.quantity <= 0) {
         cart = cart.filter(item => item.name !== name);
      }

   // As item nog nie bestaan nie
   } else {

      // Voeg nuwe item by die cart
      cart.push({
         name: name,
         price: price,
         quantity: 1
      });
   }

   // Stoor opgedateerde cart
   saveCart(cart);

   // Werk hoeveelhede op die skerm by
   updateQuantityDisplays();
}

// Hierdie funksie wys die huidige hoeveelhede van produkte op die bladsy.
function updateQuantityDisplays() {

   // Kry huidige cart
   const cart = getCart();

   // Lys van alle produkte
   const products = [
      "Valencia Orange",
      "Navel Orange",
      "Midknight Valencia Orange",
      "Blood Orange",
      "Cara Cara Navel Orange",
      "Ruby Grapefruit",
      "Lemon",
      "Lime",
      "Naartjie"
   ];

   // Gaan deur elke produk
   products.forEach(product => {

      // Soek produk in die cart
      const item = cart.find(i => i.name === product);

      // Kry hoeveelheid of gebruik 0 indien nie in cart nie
      const quantity = item ? item.quantity : 0;

      // Maak die ID naam vir die HTML element
      const id = "qty-" + product.replaceAll(" ", "-");

      // Kry die HTML element
      const display = document.getElementById(id);

      // As element bestaan
      if (display) {

         // Wys hoeveelheid op die skerm
         display.textContent = quantity;

         // Kry die quantity controls element
         const controls =
            display.closest(".quantity-controls");

         // Voeg "active" klas by indien hoeveelheid groter as 0
         if (quantity > 0) {
            controls.classList.add("active");
         } else {
            controls.classList.remove("active");
         }
      }
   });
}

// Wanneer die bladsy laai, wys die korrekte hoeveelhede.
window.onload = updateQuantityDisplays;