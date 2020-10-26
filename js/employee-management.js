/*eslint-env browser*/

/* Organising employee data where each row is an employee data according to the indices */
var employeeData = [
  [
     "0",
     "Ben Affleck",
     "Actor/Producer",
     '004'
  ],
  [
     "1",
     "Vin Diesel",
     "Actor/Producer",
     '005'
  ],
  [
     "2",
     "Elizabeth Olsen",
     "Actress",
     '006'
  ],
  [
     "3",
     "Roger Federer",
     "Sportsperson",
     '007'    
  ],
  [
     "4",
     "Zack Snyder",
     "Director",
     '008'
  ]
]


// Reads the employee data and updates he employee table UI
function loadEmployeeData() {
  var table = document.getElementById('employee_table');
  var header = table.firstElementChild.firstElementChild;
  var rows = [header.innerHTML].concat(employeeData.map(function(emp) {
    return emp.reduce(function(row, col, index){
      if(!index)
        row.push(`<tr id = ${col}>`);
      else
        row.push(`<td> ${col || ''} </td>`);
      return row;
    },[]).concat([`<td> <input type=\"button\" value=\"Delete\"> </td> </tr>`]);
  }).map(function(r) { return r.join(''); }));
  table.innerHTML = rows.join('');
  attachDeleteEvents(); // Attach delete events to all the delete butons in the employee table
  document.getElementById('count').innerText = rows.length - 1; // Remove header from count
}

// Deletes the an employee and updates the UI
function deleteEmployee(event) {
  var employee_id = event.target.parentNode.parentNode.getAttribute("id") || '';
  if(!employee_id.length)
    return;
  var emp_index = -1;
  employeeData.forEach(function(emp, index) {
    if(emp[0] === employee_id) {  // Find the employee and remove it from the list
      emp_index = index;
    }
  });
  if(emp_index == -1) {
    window.alert("Employee id not found in the list");
    return;
  }
  employeeData.splice(emp_index,1);
  loadEmployeeData();
}

//Attach delete events
function attachDeleteEvents() {
  var deleteButtons = document.querySelectorAll('#employee_table tbody tr td input[type=button]') || [];
  deleteButtons.forEach(function (ele) {
    ele.addEventListener('click', deleteEmployee)
  });
}

function $(id) {
  return document.getElementById(id);
}

// Validates the user input and returns if valid and errorMsg in case of invalid data
function isVaild(ele) {
  var id = ele.id || '';
  var val = ele.value || '';
  var sts = {
    'isValid': true,
    'errorMsg': ''
  }
  // Name and title validator
  if(id === 'name' || id === 'title') {
    if(!val.length) {
      sts['isValid'] = false;
      sts['errorMsg'] = `Empty ${id}!!`
    }
  }
  else if(id === 'extension') { // Extension validator
    var ext = Number(val);
    if(isNaN(ext) || ext < 0) {
      sts['isValid'] = false;
      sts['errorMsg'] = `Invalid ext!!`
    }
  }
  return sts;
}

// Adds an employee info to the table and updates UI
function addEmployee() {
  var inputFields = [$('name'), $('title'), $('extension')];
  var isValidData = true;
  inputFields.forEach(function(ele) {
    var id = ele.id || '';
    if(id.length) {
      var sts = isVaild(ele);
      isValidData = isValidData && sts['isValid'];
      ele.nextElementSibling.innerText = sts['errorMsg'];
    }
  });
  if(!isValidData)
    return;
  var emp_id = String(Math.round(Math.random() * Math.pow(10,10))); // Generate an unique id for each employee
  var newEmployee = [];
  newEmployee.push(emp_id);
  inputFields.forEach(function(ele){
    newEmployee.push(ele.value);
    ele.value = '';
  });
  employeeData.push(newEmployee);
  loadEmployeeData();
}

function init() {
  loadEmployeeData();
  document.getElementById('add').addEventListener('click', addEmployee);
}

window.addEventListener('load', init);