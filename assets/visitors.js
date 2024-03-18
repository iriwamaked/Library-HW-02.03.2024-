class Visitor {
  static #idCounter = parseInt(localStorage.getItem("idCounterVisitors")) || 0;
  id;
  surname;
  name;

  lastname;
  phoneNumber;

  constructor(surname, name, lastname, phoneNumber) {
    this.id = Visitor.generateId();
    this.surname = surname;
    this.name = name;
    this.lastname = lastname;
    this.phoneNumber = phoneNumber;
    this.saveToLocalStorage();
  }

  saveToLocalStorage() {
    localStorage.setItem("idCounterVisitors", Visitor.#idCounter);
    const data = JSON.stringify({
      id: this.id,
      name: this.name,
      surname: this.surname,
      lastname: this.lastname,
      phoneNumber: this.phoneNumber,
    });
    localStorage.setItem(`visitor${this.id}`, data);
  }

  static generateId() {
    return ++Visitor.#idCounter;
  }

  static getIdCount() {
    return this.#idCounter;
  }

  static Initialization() {
    return [
      new Visitor("Николаев", "Николай", "Николаевич", "+38063555555"),
      new Visitor("Афанасьев", "Артем", "Петрович", "+38063555555"),
      new Visitor("Германов", "Петр", "Григорьевич", "+38063555555"),
    ];
  }
}

function InitializationVisitorsList() {
  const keys = Object.keys(localStorage);
  const hasVisitorKey = keys.some((key) => key.startsWith("visitor"));
  if (hasVisitorKey) {
    updateVisitorsList();
  } else {
    localStorage.setItem("Visitors", Visitor.getIdCount());
    Visitor.Initialization();
  }
}

function getVisitorsArrayFromLocalStorage() {
  const visitorsArray = [];
  const keys = Object.keys(localStorage);

  keys.forEach((key) => {
    if (key.startsWith("visitor")) {
      const visitor = JSON.parse(localStorage.getItem(key));
      visitorsArray.push(visitor);
    }
  });

  return visitorsArray;
}

function updateVisitorsList() {
  // Получаем данные о книгах из локального хранилища
  const visitors = getVisitorsArrayFromLocalStorage().sort(
    (a, b) => a.id - b.id
  );

  // Находим таблицу, в которой отображаются книги
  const visitorsTable = document.getElementById("visitorsList");

  visitorsTable.innerHTML = "";

  const row0 = visitorsTable.insertRow();
  const cell0 = row0.insertCell(0);
  const cell01 = row0.insertCell(1);
  const cell02 = row0.insertCell(2);
  const cell03 = row0.insertCell(3);

  cell0.textContent = "ID";
  cell01.textContent = "Имя посетителя";
  cell02.textContent = "Номер телефона";
  cell02.style.textAlign = "center";
  cell03.textContent = "Редактировать";

  // Проходимся по массиву посетителей и создаем строки таблицы для каждого
  visitors.forEach(function (visitor) {
    const row = document.createElement("tr");

    // Добавляем ячейки для каждого свойства посетителя
    const idCell = document.createElement("td");
    idCell.textContent = visitor.id;
    row.appendChild(idCell);

    const nameCell = document.createElement("td");
    nameCell.textContent =
      visitor.surname + " " + visitor.name + " " + visitor.lastname;
    row.appendChild(nameCell);

    const phoneCell = document.createElement("td");
    phoneCell.textContent = visitor.phoneNumber;
    row.appendChild(phoneCell);

    const editCell = document.createElement("td");
    editCell.style.textAlign = "center";
    const editButton = document.createElement("button");
    const dymamicId = "buttonVisitor" + visitor.id;
    editButton.setAttribute("id", dymamicId);
    editButton.textContent = "Редактировать";
    // editButtons.push(editButton);
    editButton.addEventListener("click", function () {
      console.log(
        "Нажата кнопка редактирования для посетителя с id:",
        dymamicId
      );
      EditVisitor(visitor.id);
    });
    editCell.appendChild(editButton);
    row.appendChild(editCell);

    // Добавляем строку в таблицу
    visitorsTable.appendChild(row);
  });
}

document.addEventListener("DOMContentLoaded", InitializationVisitorsList());

function createInput(name, id, value) {
  const input = document.createElement("input");
  input.setAttribute("name", name);
  input.setAttribute("id", id);
  input.value = value;
  return input;
}

function createLabel(forAttr, text) {
  const label = document.createElement("label");
  label.setAttribute("for", forAttr);
  label.innerText = text;
  return label;
}

function createAndAppendInputAndLabel(
  container,
  labelFor,
  labelText,
  inputName,
  inputId,
  inputValue
) {
  const label = createLabel(labelFor, labelText);
  const input = createInput(inputName, inputId, inputValue);
  container.appendChild(label);
  container.appendChild(input);
}

function EditVisitor(visitorId) {
  const key = `visitor${visitorId}`;
  const originalVisitor = JSON.parse(localStorage.getItem(key));
  const visitor = JSON.parse(JSON.stringify(originalVisitor));
  const modalWindow = document.createElement("div");
  modalWindow.classList.add("modal");

  const editVisitorForm = document.createElement("form");
  editVisitorForm.classList.add("modal-content");

  createAndAppendInputAndLabel(
    editVisitorForm,
    "visitorSurnameLabel",
    "Фамилия:",
    "visitorSurname",
    "visitorSurname",
    visitor.surname
  );
  createAndAppendInputAndLabel(
    editVisitorForm,
    "visitorNameLabel",
    "Имя:",
    "visitorName",
    "visitorName",
    visitor.name
  );
  createAndAppendInputAndLabel(
    editVisitorForm,
    "visitorLastnameLabel",
    "Отчество:",
    "visitorLastname",
    "visitorLastname",
    visitor.lastname
  );
  createAndAppendInputAndLabel(
    editVisitorForm,
    "phoneLabel",
    "Номер телефона:",
    "phone",
    "phone",
    visitor.phoneNumber
  );

  const submitButton = document.createElement("input");
  submitButton.setAttribute("type", "submit");
  submitButton.setAttribute("value", "Сохранить");
  submitButton.style.marginTop = "1rem";
  submitButton.style.padding = "0.5rem";
  submitButton.style.width = "150px";
  editVisitorForm.appendChild(submitButton);

  submitButton.addEventListener("click", function (event) {
    event.preventDefault();
    const newSurName = document.getElementById("visitorSurname").value;
    const newName = document.getElementById("visitorName").value;
    const newLastName = document.getElementById("visitorLastname").value;
    const newPhone = document.getElementById("phone").value;

    visitor.surname = newSurName;
    visitor.name = newName;
    visitor.lastname = newLastName;
    visitor.phoneNumber = newPhone;

    localStorage.setItem(key, JSON.stringify(visitor));
    updateVisitorsList();
    modalWindow.style.display = "none";
  });

  modalWindow.appendChild(editVisitorForm);
  document.body.appendChild(modalWindow);
  modalWindow.style.display = "block";
}

document.getElementById("sortButton").addEventListener("click", () => {
  const sortBy = document.getElementById("listForSort").value;
  sortVisitors(sortBy);
});

//   document.getElementById("listForSort").addEventListener("change", () => {
//     const sortBy = document.getElementById("listForSort").value;
//     sortVisitors(sortBy);
//   });

function sortVisitors(sortBy) {
  const visitorsTable = document.getElementById("visitorsList");
  const rows = Array.from(visitorsTable.querySelectorAll("tr"));

  rows.shift(); // Удаляем заголовок таблицы из массива строк

  rows.sort((rowA, rowB) => {
    const cellA =
      sortBy === "ID"
        ? parseInt(rowA.cells[0].textContent.trim())
        : rowA.cells[1].textContent.trim();
    const cellB =
      sortBy === "ID"
        ? parseInt(rowB.cells[0].textContent.trim())
        : rowB.cells[1].textContent.trim();

    if (sortBy === "ID") {
      return parseInt(cellA) - parseInt(cellB);
    } else {
      return cellA.localeCompare(cellB);
    }
  });

  // Очищаем таблицу перед сортировкой
  while (visitorsTable.rows.length > 1) {
    visitorsTable.deleteRow(1);
  }

  // Добавляем отсортированные строки обратно в таблицу
  rows.forEach((row) => visitorsTable.appendChild(row));
}

document.getElementById("searchButton").addEventListener("click", function () {
    const searchQuery = document
      .getElementById("search")
      .value.trim()
      .toLowerCase();
    searchVisitors(searchQuery);
  });
  
  function searchVisitors(query) {
    const visitorsTable = document.getElementById("visitorsList");
    const rows = Array.from(visitorsTable.querySelectorAll("tr"));
  
    rows.shift();
  
    rows.forEach((row) => {
      const visitorName = row.cells[1].textContent.toLowerCase();
      const phoneNumber = row.cells[2].textContent.toLowerCase();
  
      if (
        visitorName.includes(query) ||
        phoneNumber.includes(query)
      ) {
        row.style.display = "";
      } else {
        row.style.display = "none";
      }
    });
  }

  const openModalButton = document.getElementById("addNewVisitor");
  const modal = document.getElementById("addVisitorModal");
  
  openModalButton.addEventListener("click", function () {
    modal.style.display = "block";
  });
  
  window.addEventListener("click", function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  });
  

  document.getElementById("addVisitorForm").addEventListener("submit", function (event) {
    event.preventDefault(); 

    const surname = document.getElementById("surname").value.trim();
    const name = document.getElementById("name").value.trim();
    const lastname = document.getElementById("lastname").value.trim();
    const phone = document.getElementById("phone").value.trim();

    const newVisitor = new Visitor(surname, name, lastname, phone);

    addVisitorToList(newVisitor);
  
  });
  
  function addVisitorToList(visitor) {
    const visitorsTable = document.getElementById("visitorsList");

    const row = document.createElement("tr");

    const idCell = document.createElement("td");
    idCell.textContent = visitor.id;
    row.appendChild(idCell);
  
    const nameCell = document.createElement("td");
    nameCell.textContent = `${visitor.surname} ${visitor.name} ${visitor.lastname}`;
    row.appendChild(nameCell);
  
    const phoneCell = document.createElement("td");
    phoneCell.textContent = visitor.phoneNumber;
    row.appendChild(phoneCell);
  
    const editCell = document.createElement("td");
    const editButton = document.createElement("button");
    editButton.textContent = "Редактировать";
    editButton.style.textAlign="center";
    editButton.addEventListener("click", function () {
      EditVisitor(visitor.id);
    });
    editCell.appendChild(editButton);
    row.appendChild(editCell);

    visitorsTable.appendChild(row);
  }