
// ================= default data =================

const defaultOrders = [

   {
      product: "Valencia Oranges",
      units: 3,
      time: "2026-03-17T19:35",
      customerName: "Scott Marlowe",
      cell: "082 555 1234",
      address: "183 Orange Street, Cape Town",
      notes: ""
   },

   {
      product: "Blood Oranges",
      units: 1,
      time: "2026-03-17T19:35",
      customerName: "Scott Marlowe",
      cell: "082 555 1234",
      address: "183 Orange Street, Cape Town",
      notes: ""
   },

   {
      product: "Midknight Valencia Oranges",
      units: 4,
      time: "2026-03-16T08:23",
      customerName: "Jane Smith",
      cell: "052 8442 1226",
      address: "7 Schoeman Street, Bloemfontein",
      notes: "Knock loudly"
   }

];


// ================= laai storage =================

let orders = JSON.parse(localStorage.getItem("orders"));

if (!orders) {

   orders = defaultOrders;

   localStorage.setItem(
      "orders",
      JSON.stringify(orders)
   );
}


// ================= render tabel =================

function renderTable(){

   const tableBody =
      document.getElementById("ordersTableBody");

   tableBody.innerHTML = "";

   orders.forEach((order, index) => {

      const row = document.createElement("tr");

      row.innerHTML = `

         <td>${order.product}</td>

         <td>${order.units}</td>

         <td>${formatDate(order.time)}</td>

         <td>${order.customerName}</td>

         <td>${order.cell}</td>

         <td>${order.address}</td>

         <td>${order.notes}</td>

         <td>

            <div class="action-buttons">

               <button
                  class="edit-btn"
                  onclick="editOrder(${index})">
                  ✎
               </button>

               <button
                  class="delete-btn"
                  onclick="deleteOrder(${index})">
                  ✖
               </button>

            </div>

         </td>
      `;

      tableBody.appendChild(row);

   });

   localStorage.setItem(
      "orders",
      JSON.stringify(orders)
   );
}


// ================= format datum =================

function formatDate(dateString){

   const date = new Date(dateString);

   return date.toLocaleString("en-GB", {

      day: "2-digit",
      month: "2-digit",
      year: "numeric",

      hour: "2-digit",
      minute: "2-digit"

   });
}


// ================= save/create =================

document
   .getElementById("orderForm")
   .addEventListener("submit", function(e){

   e.preventDefault();

   const orderData = {

      product:
         document.getElementById("product").value,

      units:
         document.getElementById("units").value,

      time:
         document.getElementById("time").value,

      customerName:
         document.getElementById("customerName").value,

      cell:
         document.getElementById("cell").value,

      address:
         document.getElementById("address").value,

      notes:
         document.getElementById("notes").value

   };

   const editIndex =
      document.getElementById("editIndex").value;


   // update

   if(editIndex !== ""){

      orders[editIndex] = orderData;
   }

   // create

   else{

      orders.push(orderData);
   }

   renderTable();
   resetForm();

});


// ================= edit =================

function editOrder(index){

   const order = orders[index];

   document.getElementById("editIndex").value = index;

   document.getElementById("product").value =
      order.product;

   document.getElementById("units").value =
      order.units;

   document.getElementById("time").value =
      order.time;

   document.getElementById("customerName").value =
      order.customerName;

   document.getElementById("cell").value =
      order.cell;

   document.getElementById("address").value =
      order.address;

   document.getElementById("notes").value =
      order.notes;

   window.scrollTo({

      top: 0,
      behavior: "smooth"

   });

}


// ================= delete =================

function deleteOrder(index){

   const confirmed =
      confirm("Delete this order?");

   if(confirmed){

      orders.splice(index, 1);

      renderTable();
   }
}


// ================= reset form =================

function resetForm(){

   document.getElementById("orderForm").reset();

   document.getElementById("editIndex").value = "";
}

renderTable();//begin laai
