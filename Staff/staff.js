
// ================= default data =================

const defaultStaff = [

   {
      employeeId: "0034",
      name: "Craig",
      surname: "Hathaway",
      password: "orangeway_4ward",
      admin: "Yes",
      salary: "R29000",
      position: "Owner",
      dateEmployed: "1997-01-15",
      employmentStatus: "Active",
      notes: "Responsible for overall management and decision-making. Flexible salary structure."
   },

   {
      employeeId: "0150",
      name: "Reuben",
      surname: "van Tonder",
      password: "lemmein",
      admin: "Yes",
      salary: "R20000",
      position: "Manager",
      dateEmployed: "2013-03-01",
      employmentStatus: "Active",
      notes: "Oversees daily operations, manages staff, and ensures smooth functioning of the business."
   },

   {
      employeeId: "0198",
      name: "Jane",
      surname: "Oberholzer",
      password: "06101982",
      admin: "Yes",
      salary: "R18500",
      position: "Supervisor",
      dateEmployed: "2015-05-13",
      employmentStatus: "Active",
      notes: "Supervises orchard workers, ensures quality control, and reports to the manager."
   },

   {
      employeeId: "0567",
      name: "Klasie",
      surname: "Brown",
      password: "heeljag",
      admin: "No",
      salary: "R6500",
      position: "Worker",
      dateEmployed: "2023-06-20",
      employmentStatus: "Active",
      notes: "Performs manual labor in the orchards, including planting and pruning."
   },

   {
      employeeId: "0573",
      name: "Emile",
      surname: "Brown",
      password: "KolSkoot",
      admin: "No",
      salary: "R6500",
      position: "Worker",
      dateEmployed: "2023-08-14",
      employmentStatus: "Active",
      notes: "Performs manual labor in the orchards, including planting and pruning."
   },

   {
      employeeId: "0976",
      name: "Gert",
      surname: "Rossouw",
      password: "BobTheBuilder",
      admin: "No",
      salary: "R10000",
      position: "Technician",
      dateEmployed: "1988-12-07",
      employmentStatus: "Active",
      notes: "Operates heavy machinery in the orchards, and helps with maintenance tasks."
   },

   {
      employeeId: "0865",
      name: "Sarah",
      surname: "Pieterse",
      password: "fruitlover",
      admin: "No",
      salary: "R4500",
      position: "Packer",
      dateEmployed: "2018-09-10",
      employmentStatus: "On Leave",
      notes: "Responsible for packing and preparing fruit for distribution."
   },

   {
      employeeId: "0806",
      name: "Michael",
      surname: "Ncube",
      password: "packratt",
      admin: "No",
      salary: "R4500",
      position: "Packer",
      dateEmployed: "2019-11-05",
      employmentStatus: "Active",
      notes: "Responsible for packing and preparing fruit for distribution."
   },

   {
      employeeId: "1159",
      name: "Christine",
      surname: "Coertze",
      password: "spOOOky87",
      admin: "No",
      salary: "R3000",
      position: "Temp Packer",
      dateEmployed: "2026-03-01",
      employmentStatus: "Active",
      notes: "Responsible for packing and preparing fruit for distribution. Working as a temporary employee during Sarah's leave."
   }

];


// ================= laai database =================

let staff = JSON.parse(localStorage.getItem("staff"));

if (!staff) {

   staff = defaultStaff;

   localStorage.setItem("staff", JSON.stringify(staff));
}


// ================= render tabel =================

function renderTable() {

   const tableBody = document.getElementById("staffTableBody");

   tableBody.innerHTML = "";

   staff.forEach((employee, index) => {

      const row = document.createElement("tr");

      row.innerHTML = `

         <td>${employee.employeeId}</td>
         <td>${employee.name}</td>
         <td>${employee.surname}</td>
         <td>${employee.password}</td>
         <td>${employee.admin}</td>
         <td>${employee.salary}</td>
         <td>${employee.position}</td>
         <td>${employee.dateEmployed}</td>
         <td>${employee.employmentStatus}</td>
         <td>${employee.notes}</td>

         <td>

            <div class="action-buttons">

               <button class="edit-btn"
                  onclick="editStaff(${index})">
                  ✎
               </button>

               <button class="delete-btn"
                  onclick="deleteStaff(${index})">
                  ✖
               </button>

            </div>

         </td>
      `;

      tableBody.appendChild(row);

   });

   localStorage.setItem("staff", JSON.stringify(staff));
}


// ================= save/create =================

document.getElementById("staffForm")
   .addEventListener("submit", function (e) {

   e.preventDefault();

   const staffData = {

      employeeId: document.getElementById("employeeId").value,
      name: document.getElementById("name").value,
      surname: document.getElementById("surname").value,
      password: document.getElementById("password").value,
      admin: document.getElementById("admin").value,
      salary: document.getElementById("salary").value,
      position: document.getElementById("position").value,
      dateEmployed: document.getElementById("dateEmployed").value,
      employmentStatus: document.getElementById("employmentStatus").value,
      notes: document.getElementById("notes").value

   };

   const editIndex = document.getElementById("editIndex").value;

   // update

   if (editIndex !== "") {

      staff[editIndex] = staffData;
   }

   // create

   else {

      staff.push(staffData);
   }

   renderTable();

   resetForm();

});


// ================= edit =================

function editStaff(index) {

   const employee = staff[index];

   document.getElementById("editIndex").value = index;

   document.getElementById("employeeId").value = employee.employeeId;
   document.getElementById("name").value = employee.name;
   document.getElementById("surname").value = employee.surname;
   document.getElementById("password").value = employee.password;
   document.getElementById("admin").value = employee.admin;
   document.getElementById("salary").value = employee.salary;
   document.getElementById("position").value = employee.position;
   document.getElementById("dateEmployed").value = employee.dateEmployed;
   document.getElementById("employmentStatus").value = employee.employmentStatus;
   document.getElementById("notes").value = employee.notes;

   window.scrollTo({
      top: 0,
      behavior: "smooth"
   });

}


// ================= delete =================

function deleteStaff(index) {

   const confirmed = confirm("Delete this staff member?");

   if (confirmed) {

      staff.splice(index, 1);

      renderTable();
   }
}


// ================= reset form =================

function resetForm() {

   document.getElementById("staffForm").reset();

   document.getElementById("editIndex").value = "";
}

renderTable();//begin laai
