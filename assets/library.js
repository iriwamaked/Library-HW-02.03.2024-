import { Book } from "./book.js";

var currentActiveElement = null;

function changeActive(element) {
  if (currentActiveElement) {
    currentActiveElement.classList.remove("active");
  }

  element.classList.add("active");

  currentActiveElement = element;
}

const arrBooks = Book.Initialization();
console.log(arrBooks);

const editButtons = [];

document.addEventListener("DOMContentLoaded", () => {
  const booksTable = document.getElementById("booksList");
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
  cell04.textContent = "";

  arrBooks.forEach((book) => {
    const row = booksTable.insertRow();
    const cell1 = row.insertCell(0); // Ячейка для айдишника
    const cell2 = row.insertCell(1); // Ячейка для имени
    const cell3 = row.insertCell(2); //ячейка для автора
    const cell4 = row.insertCell(3); //ячейка для количества книг
    const cell5 = row.insertCell(4); //ячейка для кнопки "изменить"
    cell1.textContent = book.getId() + ".";
    cell2.textContent = book.getName();
    cell3.textContent = book.getAuthorName();
    cell4.textContent = book.getCountOfBooks();

    cell4.style.textAlign = "center";
    cell5.style.textAlign = "center";

    const editButton = document.createElement("button");
    editButton.textContent = "Редактировать";

    const img = document.createElement("img");
    img.src = "./images/edit.png";
    img.style.width = "15px";
    img.style.paddingLeft = "5px";
    img.alt = "изображение для кнопки редактирования";
    editButton.appendChild(img);

    editButtons.push(editButton);
    // editButton.addEventListener("click", EditBook.bind(null, book));
    cell5.appendChild(editButton); // Добавляем кнопку в ячейку
    
  });

  editButtons.forEach((editButton, index) => {
    editButton.addEventListener("click", () => EditBook(index));
});
});

// console.log(editButtons);


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
  
  function createAndAppendInputAndLabel(container, labelFor, labelText, inputName, inputId, inputValue) {
    const label = createLabel(labelFor, labelText);
    const input = createInput(inputName, inputId, inputValue);
    container.appendChild(label);
    container.appendChild(input);
  }
  
  function EditBook(index) {
    // console.log(book);
    console.log(index);
    const tmp=arrBooks[index];
    console.log(arrBooks[index], typeof(arrBooks[index] ));
for (let key of tmp){
    console.log(`${key}: ${tmp[key]}`)
}
    const book=Object.assign({}, arrBooks[index]);
    // const book=structuredClone(arrBooks[index]);
//     const myObject = Object.create(arrBooks[index]);
// for (let key in myObject) {
    
//         console.log(`${key}: ${myObject[key]}`);
    
// }

    // const book = deepClone(arrBooks[index]);
    // for (let key in arrBooks[index]) {
    //     if (Object.prototype.hasOwnProperty.call(arrBooks[index], key)) {
    //         book[key] = arrBooks[index][key];
    //     }
    // }
    

    console.log(book);
    const modalWindow = document.createElement("div");
    modalWindow.classList.add("modal");
  
    const editBookForm = document.createElement("form");
    editBookForm.classList.add("modal-content");
  
    createAndAppendInputAndLabel(editBookForm, "idBook", "ID", "idBook", "idBook", book.getId());
    createAndAppendInputAndLabel(editBookForm, "bookname", "Название книги:", "bookname", "bookname", book.getName());
    createAndAppendInputAndLabel(editBookForm, "bookAuthor", "Автор:", "bookAuthor", "bookAuthor", book.getAuthorName());
    createAndAppendInputAndLabel(editBookForm, "year", "Год выпуска:", "year", "year", book.getYear());
    createAndAppendInputAndLabel(editBookForm, "publish", "Издательство:", "publish", "publish", book.getPublisher());
    createAndAppendInputAndLabel(editBookForm, "pages", "Количество страниц:", "pages", "pages", book.getPagesNumber());
    createAndAppendInputAndLabel(editBookForm, "booksCount", "Количество в наличии:", "booksCount", "booksCount", book.getCountOfBooks());
  
    const submitButton = document.createElement("input");
    submitButton.setAttribute("type", "submit");
    submitButton.setAttribute("value", "Сохранить");
    submitButton.style.marginTop = "1rem";
    submitButton.style.padding = "0.5rem";
    submitButton.style.width = "150px";
    editBookForm.appendChild(submitButton);
  
    submitButton.addEventListener("click", function(event) {
      event.preventDefault(); // предотвращаем отправку формы по умолчанию
      
      // Получаем новые значения из формы
      const newId = document.getElementById("idBook").value;
      const newName = document.getElementById("bookname").value;
      const newAuthor = document.getElementById("bookAuthor").value;
      const newYear = document.getElementById("year").value;
      const newPublisher = document.getElementById("publish").value;
      const newPages = document.getElementById("pages").value;
      const newCount = document.getElementById("booksCount").value;
      
      // Обновляем значения книги
      book.setName(newName);
      book.setAuthorName(newAuthor);
      book.setYear(newYear);
      book.setPublisher(newPublisher);
      book.setPagesNumber(newPages);
      book.setCountOfBooks(newCount);

    //   const index = arrBooks.findIndex(item => item.getId() === book.getId());

        // Обновляем данные книги в массиве arrBooks
        arrBooks[index] = { ...book };

        // Обновляем строки в таблице, чтобы отразить внесенные изменения
        const booksTable = document.getElementById("booksList");
        const rowToUpdate = booksTable.rows[index + 1]; // +1 для учета заголовка таблицы
        rowToUpdate.cells[1].textContent = book.getName();
        rowToUpdate.cells[2].textContent = book.getAuthorName();
        rowToUpdate.cells[3].textContent = book.getCountOfBooks();
        
      modalWindow.style.display = "none";
    //   console.log(book);
      
    //   // Сохраняем обновленные данные в локальное хранилище
    //   localStorage.setItem(`${book.getId()}`, JSON.stringify(book));
      
    //   // Получаем сохраненную строку JSON из localStorage
    //   const storedBook = localStorage.getItem(`${book.getId()}`);
      
    //   // Преобразуем строку JSON обратно в объект JavaScript
    //   const parsedBook = JSON.parse(storedBook);
    //   parsedBook.__proto__=Book;
    //   console.log("Достали объект и перевели из JSON:", parsedBook);
    //   console.log(parsedBook.getName());
    //   modalWindow.display.none;

    
    });
  
    modalWindow.appendChild(editBookForm);
    document.body.appendChild(modalWindow);
    console.log(book);
    modalWindow.style.display = "block";
    
    // return book;
  }

  function deepClone(obj) {
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }

    let clone = Array.isArray(obj) ? [] : {};

    for (let key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            if (typeof obj[key] === 'function') {
                clone[key] = obj[key].bind(clone); // Привязываем метод к копии объекта
            } else {
                clone[key] = deepClone(obj[key]);
            }
        }
    }

    return clone;
}