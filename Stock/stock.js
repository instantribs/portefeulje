// ================= admin check en kontroles =================
const isAdmin =
   localStorage.getItem("isAdmin") === "true";

if(!isAdmin){
   document
      .getElementById("adminPanel")
      .style.display = "none";
}

if(!isAdmin){

   document
      .getElementById("actionHeader")
      .style.display = "none";
}

// ================= default data =================
const defaultStock = [

   {
      productName: "Valencia Oranges",
      quantity: 11426,
      category: "Fruits",
      stockTake: "2026-02-01"
   },

   {
      productName: "Navel Oranges",
      quantity: 1679,
      category: "Fruits",
      stockTake: "2026-02-02"
   },

   {
      productName: "Midknight Valencia Oranges",
      quantity: 8483,
      category: "Fruits",
      stockTake: "2026-02-02"
   },

   {
      productName: "Cara Cara Navel Oranges",
      quantity: 1993,
      category: "Fruits",
      stockTake: "2026-02-03"
   },

   {
      productName: "Blood Oranges",
      quantity: 873,
      category: "Fruits",
      stockTake: "2026-02-03"
   },

   {
      productName: "Naartjies",
      quantity: 1835,
      category: "Fruits",
      stockTake: "2026-02-03"
   },

   {
      productName: "Nitrate Treatment",
      quantity: 10,
      category: "Treatments",
      stockTake: "2026-02-04"
   },

   {
      productName: "Sulphate Treatment",
      quantity: 15,
      category: "Treatments",
      stockTake: "2026-02-04"
   },

   {
      productName: "Phosphate Treatment",
      quantity: 20,
      category: "Treatments",
      stockTake: "2026-02-04"
   },

   {
      productName: "Micronutrients Treatment",
      quantity: 10,
      category: "Treatments",
      stockTake: "2026-02-04"
   },

   {
      productName: "Pesticides",
      quantity: 15,
      category: "Treatments",
      stockTake: "2026-02-04"
   }

];

// ================= laai databasis =================

let stockItems = JSON.parse(localStorage.getItem("stockItems"));

if (!stockItems) {

   stockItems = defaultStock;

   localStorage.setItem(
      "stockItems",
      JSON.stringify(stockItems)
   );
}

// ================= render tabel =================

function renderTable(){

   const tableBody =
      document.getElementById("stockTableBody");

   tableBody.innerHTML = "";

   stockItems.forEach((item, index) => {

      const row = document.createElement("tr");

      // Action knoppies word net getoon as die gebruiker 'n admin is
      row.innerHTML = `
         <td>${item.productName}</td>
         <td>${item.quantity}</td>
         <td>${item.category}</td>
         <td>${item.stockTake}</td>

         ${isAdmin ? `
            <td>
               <div class="action-buttons">

                  <button
                     class="edit-btn"
                     onclick="editItem(${index})">
                     ✎
                  </button>

                  <button
                     class="delete-btn"
                     onclick="deleteItem(${index})">
                     ✖
                  </button>

               </div>
            </td>
         ` : ""}
      `;

      tableBody.appendChild(row);

   });

   localStorage.setItem(
      "stockItems",
      JSON.stringify(stockItems)
   );
}

// ================= skep/udpate =================

document.getElementById("stockForm")
.addEventListener("submit", function(e){

   e.preventDefault();

   const itemData = {

      productName:
         document.getElementById("productName").value,

      quantity:
         document.getElementById("quantity").value,

      category:
         document.getElementById("category").value,

      stockTake:
         document.getElementById("stockTake").value
   };

   const editIndex =
      document.getElementById("editIndex").value;

   // UPDATE

   if(editIndex !== ""){

      stockItems[editIndex] = itemData;
   }

   // CREATE

   else{

      stockItems.push(itemData);
   }

   renderTable();
   resetForm();

});

// ================= edit =================

function editItem(index){

   const item = stockItems[index];

   document.getElementById("editIndex").value = index;

   document.getElementById("productName").value =
      item.productName;

   document.getElementById("quantity").value =
      item.quantity;

   document.getElementById("category").value =
      item.category;

   document.getElementById("stockTake").value =
      item.stockTake;

   window.scrollTo({
      top: 0,
      behavior: "smooth"
   });

}

// ================= delete =================

function deleteItem(index){

   const confirmed =
      confirm("Delete this stock item?");

   if(confirmed){

      stockItems.splice(index, 1);

      renderTable();
   }
}

// ================= reset form =================

function resetForm(){

   document.getElementById("stockForm").reset();

   document.getElementById("editIndex").value = "";

}

renderTable();//begin laai
