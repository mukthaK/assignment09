// CREATE AN ARRAY OF EMPLOYEES
let employees = [['89763453', 'William Smith ', '4532', 'william@yahoo.com', 'Administrative'],
                ['15834421', 'Rhea Rao', '6419', 'rhea@gmail.com', 'Executive'],
                ['67341211', 'Maria Garcia', '1290', 'maria@gmail.com', 'Marketing'],
                ['78785634', 'James Johnson', '9067', 'james@gmail.com', 'Engineering'],
                ['10902080', 'Katie Bell', '8712', 'katie@gmail.com', 'Sales']];

// CHECK TO SEE IF STORAGE OBJECT EXISTS WHEN THE PAGE LOADS
let storage = JSON.parse(localStorage.getItem('employees')) || '';
// IF DOES, RETURN STORAGE OBJECT INTO ARRAY INSTEAD OF POPULATED ARRAY
if (storage.length > 0) {
    employees = storage;
}

// GET DOM ELEMENTS
const $ = (id) => document.getElementById(id);

// BUILD THE EMPLOYEES TABLE WHEN THE PAGE LOADS
buildGrid();

let empTable = document.querySelector('#employees');
let form = document.forms[0];
// ADD EMPLOYEE
form.addEventListener('submit', (e) => {
    // PREVENT FORM SUBMISSION
    e.preventDefault();
    // GET THE VALUES FROM THE TEXT BOXES
    let id = document.querySelector('#id').value;
    let name = document.querySelector('#name').value;
    let extension = document.querySelector('#extension').value;
    let email = document.querySelector('#email').value;
    let department = document.querySelector('#department').value;

    // ADD THE NEW EMPLOYEE TO A NEW ARRAY OBJECT
    let newEmployee = [id, name, extension, email, department];
    // PUSH THE NEW ARRAY TO THE *EXISTING* EMPLOYEES ARRAY
    employees.push(newEmployee);
    // BUILD THE GRID
    buildGrid();
    // RESET THE FORM
    form.reset();
    // SET FOCUS BACK TO THE ID TEXT BOX
    document.querySelector('#id').focus();
});

// DELETE EMPLOYEE
empTable.addEventListener('click', (e) => {
    // CONFIRM THE DELETE
    if(confirm(`Are you sure you want to delete?`)) {
        // GET THE SELECTED ROWINDEX FOR THE TR (PARENTNODE.PARENTNODE)
        let indexToDelete = e.target.parentNode.parentNode.rowIndex;
        // CALL DELETEROW() METHOD TO DELETE SPECIFIC ROW IN THE TABLE
        empTable.deleteRow(indexToDelete);
        // REMOVE EMPLOYEE FROM ARRAY
        employees.splice(indexToDelete-1, 1);
        // BUILD THE GRID
        buildGrid();
    }
});

// BUILD THE EMPLOYEES GRID
function buildGrid() {
    // REMOVE THE EXISTING SET OF ROWS BY REMOVING THE ENTIRE TBODY SECTION
    document.querySelector('tbody').innerHTML = '';
    // REBUILD THE TBODY FROM SCRATCH
    let entry = '';
    // LOOP THROUGH THE ARRAY OF EMPLOYEES
    // REBUILDING THE ROW STRUCTURE
    for (let emp of employees) {
        entry += `<tr><td>${emp[0]}</td><td>${emp[1]}</td><td>${emp[2]}</td><td>${emp[3]}</td><td>${emp[4]}</td><td><button class='btn btn-danger btn-sm float-right'>X</button></td>`;
    }
    // BIND THE TBODY TO THE EMPLOYEE TABLE
    document.querySelector('tbody').innerHTML = entry;
    // UPDATE EMPLOYEE COUNT
    document.querySelector('#empCount').innerHTML = employees.length;
    // STORE THE ARRAY IN STORAGE
    localStorage.setItem('employees', JSON.stringify(employees));
};