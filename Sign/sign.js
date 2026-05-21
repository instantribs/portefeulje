
/* 
   Hierdie bladsy aanvaar net sekere spesifieke gebruikers en wagwoorde
   Indien u die bladsy wil toets, gebruik gerus die volgende inligting:
   Vir admin toegang:         Naam: reuben     Wagwoord: lemmein
   Vir nie-admin toegang:     Naam: klasie     Wagwoord: heeljag
   Die ander gebruikers gelys in sign.js (hieronder) sal ook aanvaar word
*/

//Verklaar array van personeel met name, wagwoorde en admin status
const staff = [
   { name: "Craig", password: "orangeway__4ward", admin: true },
   { name: "Reuben", password: "lemmein", admin: true },
   { name: "Jane", password: "06101982", admin: true },
   { name: "Klasie", password: "heeljag", admin: false },
   { name: "Emile", password: "KolSkoot", admin: false },
   { name: "Gert", password: "BobTheBuilder", admin: false },
   { name: "Sarah", password: "fruitlover", admin: false },
   { name: "Michael", password: "packratt", admin: false },
   { name: "Christine", password: "spOOOky87", admin: false }
];
// Hierdie funksie hanteer die login proses
function login() {
   // Kry die naam en wagwoord van die invoervelde
   const name = document.getElementById("name").value.trim();
   const password = document.getElementById("password").value;

   // Soek na 'n personeel lid wat ooreenstem met die ingevoerde naam en wagwoord
   const user = staff.find(s => 
      s.name.toLowerCase() === name.toLowerCase() && s.password === password
   );

   // As 'n ooreenkoms gevind word, stoor die login status en admin status in localStorage en herlei na die portal
   if (user) {
      localStorage.setItem("loggedIn", "true");
      localStorage.setItem("isAdmin", user.admin);
      window.location.href = "../Portal/portal.html";
   } else {
      alert("Access denied. Invalid staff credentials.");
   }
}