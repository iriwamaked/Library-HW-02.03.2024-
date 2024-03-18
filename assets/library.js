import { Book } from "./book.js";

var currentActiveElement = null;

function changeActive(element) {
  if (currentActiveElement) {
    currentActiveElement.classList.remove("active");
  }

  element.classList.add("active");

  currentActiveElement = element;
}
const arrBooks = [];
const editButtons = [];
// localStorage.clear();

function InitializationBookList() {
  const keys = Object.keys(localStorage);
  const hasBookKey = keys.some((key) => key.startsWith("book"));

  if (hasBookKey) {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);

      // Проверяем, является ли ключ ключом для книги
      if (key.startsWith("book")) {
        // Получаем объект книги из localStorage
        // const book = JSON.parse(localStorage.getItem(key));

        // // Создаем строку в таблице для каждой книги
        // createTableRow(book);
        // //   ButtonsListener();
        updateBooksList();
      }
    }
  } else {
    localStorage.setItem("idCounter", Book.getIdCount());
    Book.Initialization();
  }
}

InitializationBookList();

function createTableRow(book) {
  const booksTable = document.getElementById("booksList");
  const row = booksTable.insertRow();
  row.setAttribute("data-id", book.id); // Устанавливаем атрибут data-id для строки таблицы
  const cell1 = row.insertCell(0);
  const cell2 = row.insertCell(1);
  const cell3 = row.insertCell(2);
  const cell4 = row.insertCell(3);
  const cell5 = row.insertCell(4);

  cell1.textContent = book.id + ".";
  cell2.textContent = book.name;
  cell3.textContent = book.author;
  cell4.textContent = book.count;

  cell4.style.textAlign = "center";
  cell5.style.textAlign = "center";

  const editButton = document.createElement("button");
  const dymamicId = "buttonBook" + book.id;
  editButton.setAttribute("id", dymamicId);
  editButton.textContent = "Редактировать";
  editButtons.push(editButton);
  editButton.addEventListener("click", function () {
    console.log("Нажата кнопка редактирования для книги с id:", book.id);
    EditBook(book.id);
  });
  cell5.appendChild(editButton);

  return row;
}

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

function UpdateCells(key) {
  // const key = `book${bookId}`;
  const book = JSON.parse(localStorage.getItem(key));
  console.log(book);

  const bookId = key.replace("book", "");
  // Находим строку с соответствующим data-id
  const rowToUpdate = document.querySelector(`tr[data-id="${bookId}"]`);
  console.log("Редактируется строка с айдишником", rowToUpdate);

  // Обновляем содержимое ячеек строки
  rowToUpdate.cells[1].textContent = book.name;
  rowToUpdate.cells[2].textContent = book.author;
  rowToUpdate.cells[3].textContent = book.count;
}

function EditBook(bookId) {
  const key = `book${bookId}`;
  const originalBook = JSON.parse(localStorage.getItem(key)); // Загружаем оригинальный объект книги из localStorage
  const book = JSON.parse(JSON.stringify(originalBook));
  //   const book = JSON.parse(localStorage.getItem(key));
  console.log(book);
  const modalWindow = document.createElement("div");
  modalWindow.classList.add("modal");

  const editBookForm = document.createElement("form");
  editBookForm.classList.add("modal-content");

  // createAndAppendInputAndLabel(editBookForm, "idBook", "ID", "idBook", "idBook", book.id);
  createAndAppendInputAndLabel(
    editBookForm,
    "bookname",
    "Название книги:",
    "bookname",
    "bookname",
    book.name
  );
  createAndAppendInputAndLabel(
    editBookForm,
    "bookAuthor",
    "Автор:",
    "bookAuthor",
    "bookAuthor",
    book.author
  );
  createAndAppendInputAndLabel(
    editBookForm,
    "year",
    "Год выпуска:",
    "year",
    "year",
    book.year
  );
  createAndAppendInputAndLabel(
    editBookForm,
    "publish",
    "Издательство:",
    "publish",
    "publish",
    book.publisher
  );
  createAndAppendInputAndLabel(
    editBookForm,
    "pages",
    "Количество страниц:",
    "pages",
    "pages",
    book.pages
  );
  createAndAppendInputAndLabel(
    editBookForm,
    "booksCount",
    "Количество в наличии:",
    "booksCount",
    "booksCount",
    book.count
  );

  const submitButton = document.createElement("input");
  submitButton.setAttribute("type", "submit");
  submitButton.setAttribute("value", "Сохранить");
  submitButton.style.marginTop = "1rem";
  submitButton.style.padding = "0.5rem";
  submitButton.style.width = "150px";
  editBookForm.appendChild(submitButton);

  submitButton.addEventListener("click", function (event) {
    event.preventDefault(); // предотвращаем отправку формы по умолчанию

    // Получаем новые значения из формы
    //   const newId = document.getElementById("idBook").value;
    const newName = document.getElementById("bookname").value;
    const newAuthor = document.getElementById("bookAuthor").value;
    const newYear = document.getElementById("year").value;
    const newPublisher = document.getElementById("publish").value;
    const newPages = document.getElementById("pages").value;
    const newCount = document.getElementById("booksCount").value;

    // Обновляем значения книги
    book.name = newName;
    book.author = newAuthor;
    book.year = newYear;
    book.publisher = newPublisher;
    book.pages = newPages;
    book.count = newCount;

    console.log(book);
    localStorage.setItem(key, JSON.stringify(book));
    // UpdateCells(key);
    updateBooksList();
    modalWindow.style.display = "none";
  });

  modalWindow.appendChild(editBookForm);
  document.body.appendChild(modalWindow);
  console.log(book);
  modalWindow.style.display = "block";
}

function getBooksArrayFromLocalStorage() {
  const booksArray = [];
  const keys = Object.keys(localStorage);

  keys.forEach((key) => {
    if (key.startsWith("book")) {
      const book = JSON.parse(localStorage.getItem(key));
      booksArray.push(book);
    }
  });

  return booksArray;
}

// Пример использования:
const booksArray = getBooksArrayFromLocalStorage();
console.log(booksArray);

document.getElementById("sortButton").addEventListener("click", () => {
  const sortBy = document.getElementById("listForSort").value;
  sortBooks(sortBy);
});

function sortBooks(sortBy) {
  const booksTable = document.getElementById("booksList");
  const rows = Array.from(booksTable.querySelectorAll("tr"));

  rows.shift(); // Удаляем заголовок таблицы из массива строк

  rows.sort((rowA, rowB) => {
    const cellA =
      rowA.cells[
        sortBy === "Name" ? 1 : sortBy === "AuthorName" ? 2 : 3
      ].textContent.trim();
    const cellB =
      rowB.cells[
        sortBy === "Name" ? 1 : sortBy === "AuthorName" ? 2 : 3
      ].textContent.trim();

    return cellA.localeCompare(cellB);
  });

  // Очищаем таблицу перед сортировкой
  while (booksTable.rows.length > 1) {
    booksTable.deleteRow(1);
  }

  // Добавляем отсортированные строки обратно в таблицу
  rows.forEach((row) => booksTable.appendChild(row));
}

document.getElementById("searchButton").addEventListener("click", function () {
  const searchQuery = document
    .getElementById("search")
    .value.trim()
    .toLowerCase();
  searchBooks(searchQuery);
});

function searchBooks(query) {
  const booksTable = document.getElementById("booksList");
  const rows = booksTable.querySelectorAll("tr");

  rows.forEach((row) => {
    const bookName = row.cells[1].textContent.trim().toLowerCase();
    const authorName = row.cells[2].textContent.trim().toLowerCase();
    const bookCount = row.cells[3].textContent.trim().toLowerCase();

    if (
      bookName.includes(query) ||
      authorName.includes(query) ||
      bookCount.includes(query)
    ) {
      row.style.display = ""; // Показываем строку, если книга соответствует запросу
    } else {
      row.style.display = "none"; // Скрываем строку, если книга не соответствует запросу
    }
  });
}

const openModalButton = document.getElementById("addNewBook");
const modal = document.getElementById("addBookModal");
//   const closeModalButton = document.getElementById("closeModalButton");

openModalButton.addEventListener("click", function () {
  modal.style.display = "block";
});

//   closeModalButton.addEventListener("click", function() {
//     modal.style.display = "none";
//   });

window.addEventListener("click", function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
});

function isNumeric(value) {
  return !isNaN(value);
}

document
  .getElementById("addBookForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    // Получаем значения из полей формы
    const title = document.getElementById("title").value.trim();
    const author = document.getElementById("author").value.trim();
    const year = document.getElementById("year").value.trim();
    const publisher = document.getElementById("publisher").value.trim();
    const pagesCount = document.getElementById("pagesCount").value.trim();
    const count = document.getElementById("count").value.trim();

    // Проверяем, что все поля заполнены
    if (
      title === "" ||
      author === "" ||
      year === "" ||
      publisher === "" ||
      pagesCount === "" ||
      count === ""
    ) {
      alert("Пожалуйста, заполните все поля формы.");
      return;
    }
    if (!isNumeric(year) && !isNumeric(pagesCount) && !isNumeric(count)) {
      alert(
        "Пожалуйста, заполните поля года, страниц и количества книг в наличии формы цифрами."
      );
      return;
    }
    if (year < 1500 && year <= new Date().getFullYear()) {
      alert(
        "Год издния книги указан некорректно. Год должен быть больше 1500 и менше текущего года"
      );
      return;
    }

    // Создаем объект книги и сохраняем его
    const book = new Book(title, author, year, publisher, pagesCount, count);
    console.log(book.id);
    // const key = `book${book.id}`;
    // localStorage.setItem(key, JSON.stringify(book));
    // saveBook(book);

    // Очищаем поля формы
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("count").value = "";
    alert("Книга успешно добавлена");
    // Закрываем модальное окно
    modal.style.display = "none";
    updateBooksList();
  });

//   console.log(Book.getIdCount());

function updateBooksList() {
  // Получаем данные о книгах из локального хранилища
  const books = getBooksArrayFromLocalStorage().sort((a, b) => a.id - b.id);

  // Находим таблицу, в которой отображаются книги
  const booksTable = document.getElementById("booksList");

  booksTable.innerHTML = "";

const row0 = booksTable.insertRow();
const cell0 = row0.insertCell(0);
const cell01 = row0.insertCell(1);
const cell02 = row0.insertCell(2);
const cell03 = row0.insertCell(3);
const cell04 = row0.insertCell(4);

cell0.textContent = "ID";
cell01.textContent = "Название книги";
cell02.textContent = "Автор";
cell03.innerHTML = "Количество книг <br> в наличии";
cell03.style.textAlign = "center";
cell04.textContent = "Редактировать";

// Проходимся по массиву книг и создаем строки таблицы для каждой книги
books.forEach(function (book) {
  const row = document.createElement("tr");

  // Добавляем ячейки для каждого свойства книги
  const idCell = document.createElement("td");
  idCell.textContent = book.id;
  row.appendChild(idCell);

  const titleCell = document.createElement("td");
  titleCell.textContent = book.name;
  row.appendChild(titleCell);

  const authorCell = document.createElement("td");
  authorCell.textContent = book.author;
  row.appendChild(authorCell);

  const countCell = document.createElement("td");
  countCell.textContent = book.count;
  countCell.style.textAlign = "center";
  row.appendChild(countCell);

  const editCell = document.createElement("td");
  editCell.style.textAlign="center";
  const editButton = document.createElement("button");
  const dymamicId = "buttonBook" + book.id;
  editButton.setAttribute("id", dymamicId);
  editButton.textContent = "Редактировать";
  editButtons.push(editButton);
  editButton.addEventListener("click", function () {
    console.log("Нажата кнопка редактирования для книги с id:", book.id);
    EditBook(book.id);
  });
  editCell.appendChild(editButton);
  row.appendChild(editCell);

  // Добавляем строку в таблицу
  booksTable.appendChild(row);
  });
}
