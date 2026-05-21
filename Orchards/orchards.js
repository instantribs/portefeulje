// ================= default data ================= 
const defaultOrchards = [
   {
      orchard: "1",
      fruitType: "Valencia Oranges",
      hectares: "15",
      healthStatus: "Good",
      nitrogen: "2025-11-18",
      phosphate: "2025-11-20",
      potassium: "2025-11-22",
      micronutrients: "2025-07-28",
      pesticides: "2026-01-22",
      irrigation: "Active",
      soilTest: "2026-02-18",
      notes: "No issues reported."
   },
   {
      orchard: "2",
      fruitType: "Navel Oranges",
      hectares: "15",
      healthStatus: "Fair",
      nitrogen: "2025-10-12",
      phosphate: "2025-10-14",
      potassium: "2025-10-16",
      micronutrients: "2025-06-25",
      pesticides: "2025-12-18",
      irrigation: "Active",
      soilTest: "2026-02-02",
      notes: "Some pest issues, monitoring closely."
   },
   {
      orchard: "3",
      fruitType: "Midknight Valencias",
      hectares: "20",
      healthStatus: "Good",
      nitrogen: "2025-11-23",
      phosphate: "2025-11-24",
      potassium: "2025-11-26",
      micronutrients: "2025-05-09",
      pesticides: "2026-01-10",
      irrigation: "Active, maintenance required",
      soilTest: "2026-02-12",
      notes: "Soil test revealed low magnesium levels. Also service required for irrigation system."
   },
   {
      orchard: "4",
      fruitType: "Valencia Oranges",
      hectares: "10",
      healthStatus: "Good",
      nitrogen: "2025-10-02",
      phosphate: "2025-10-03",
      potassium: "2025-10-04",
      micronutrients: "2025-05-18",
      pesticides: "2025-11-22",
      irrigation: "Inactive, being serviced",
      soilTest: "2026-01-27",
      notes: "No issues reported."
   },
   {
      orchard: "5",
      fruitType: "Cara Cara Navels",
      hectares: "10",
      healthStatus: "Excellent",
      nitrogen: "2025-11-12",
      phosphate: "2025-11-13",
      potassium: "2025-11-15",
      micronutrients: "2025-07-02",
      pesticides: "2026-01-18",
      irrigation: "Active",
      soilTest: "2026-02-22",
      notes: "Thriving. Should still be protected from neighboring orchards' pests."
   },
   {
      orchard: "6",
      fruitType: "Blood Oranges",
      hectares: "10",
      healthStatus: "Poor",
      nitrogen: "2025-10-07",
      phosphate: "2025-10-08",
      potassium: "2025-10-09",
      micronutrients: "2025-05-28",
      pesticides: "2025-12-12",
      irrigation: "Active",
      soilTest: "2026-01-29",
      notes: "Major pest issues, intervention required."
   },
   {
      orchard: "7",
      fruitType: "Naartjies",
      hectares: "10",
      healthStatus: "Good",
      nitrogen: "2025-11-27",
      phosphate: "2025-11-28",
      potassium: "2025-11-30",
      micronutrients: "2025-05-12",
      pesticides: "2026-01-08",
      irrigation: "Active, maintenance required",
      soilTest: "2026-02-13",
      notes: "No issues reported."
   },
   {
      orchard: "8",
      fruitType: "Naartjies",
      hectares: "15",
      healthStatus: "Fair",
      nitrogen: "2025-09-27",
      phosphate: "2025-09-28",
      potassium: "2025-09-30",
      micronutrients: "2025-05-22",
      pesticides: "2025-11-12",
      irrigation: "Inactive, nutrient treatment in progress",
      soilTest: "2026-01-24",
      notes: "Slow growth observed. Nutrient deficiency suspected."
   }
];

// ================= laai database =================
let orchards = JSON.parse(localStorage.getItem("orchards"));

if (!orchards) {
   orchards = defaultOrchards;
   localStorage.setItem("orchards", JSON.stringify(orchards));
}


// ================= render tabel =================
function renderTable() {

   const tableBody = document.getElementById("orchardTableBody");
   tableBody.innerHTML = "";

   orchards.forEach((orchard, index) => {

      const row = document.createElement("tr");

      row.innerHTML = `
         <td data-label="Orchard">${orchard.orchard}</td>
         <td data-label="Fruit Type">${orchard.fruitType}</td>
         <td data-label="Hectares">${orchard.hectares}</td>
         <td data-label="Health Status">${orchard.healthStatus}</td>
         <td data-label="Nitrogen">${orchard.nitrogen}</td>
         <td data-label="Phosphate">${orchard.phosphate}</td>
         <td data-label="Potassium">${orchard.potassium}</td>
         <td data-label="Micronutrients">${orchard.micronutrients}</td>
         <td data-label="Pesticides">${orchard.pesticides}</td>
         <td data-label="Irrigation">${orchard.irrigation}</td>
         <td data-label="Soil Test">${orchard.soilTest}</td>
         <td data-label="Notes">${orchard.notes}</td>

         <td data-label="Actions">
            <div class="action-buttons">
               <button class="edit-btn" onclick="editOrchard(${index})">✎</button>
               <button class="delete-btn" onclick="deleteOrchard(${index})">✖</button>
            </div>
         </td>
      `;

      tableBody.appendChild(row);
   });

   localStorage.setItem("orchards", JSON.stringify(orchards));
}

// ================= save/create =================
document.getElementById("orchardForm").addEventListener("submit", function(e) {

   e.preventDefault();

   const orchardData = {
      orchard: document.getElementById("orchard").value,
      fruitType: document.getElementById("fruitType").value,
      hectares: document.getElementById("hectares").value,
      healthStatus: document.getElementById("healthStatus").value,
      nitrogen: document.getElementById("nitrogen").value,
      phosphate: document.getElementById("phosphate").value,
      potassium: document.getElementById("potassium").value,
      micronutrients: document.getElementById("micronutrients").value,
      pesticides: document.getElementById("pesticides").value,
      irrigation: document.getElementById("irrigation").value,
      soilTest: document.getElementById("soilTest").value,
      notes: document.getElementById("notes").value
   };

   const editIndex = document.getElementById("editIndex").value;

   // update
   if (editIndex !== "") {
      orchards[editIndex] = orchardData;
   }

   // create
   else {
      orchards.push(orchardData);
   }

   renderTable();
   resetForm();
});


// ================= edit =================
function editOrchard(index) {

   const orchard = orchards[index];

   document.getElementById("editIndex").value = index;

   document.getElementById("orchard").value = orchard.orchard;
   document.getElementById("fruitType").value = orchard.fruitType;
   document.getElementById("hectares").value = orchard.hectares;
   document.getElementById("healthStatus").value = orchard.healthStatus;
   document.getElementById("nitrogen").value = orchard.nitrogen;
   document.getElementById("phosphate").value = orchard.phosphate;
   document.getElementById("potassium").value = orchard.potassium;
   document.getElementById("micronutrients").value = orchard.micronutrients;
   document.getElementById("pesticides").value = orchard.pesticides;
   document.getElementById("irrigation").value = orchard.irrigation;
   document.getElementById("soilTest").value = orchard.soilTest;
   document.getElementById("notes").value = orchard.notes;

   window.scrollTo({
      top: 0,
      behavior: "smooth"
   });
}


// ================= delete =================
function deleteOrchard(index) {

   const confirmed = confirm("Delete this orchard record?");

   if (confirmed) {
      orchards.splice(index, 1);
      renderTable();
   }
}

// ================= reset form =================
function resetForm() {

   document.getElementById("orchardForm").reset();
   document.getElementById("editIndex").value = "";
}

renderTable();//begin laai