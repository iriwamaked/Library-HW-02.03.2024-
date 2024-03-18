export class Book {
  static #idCounter = parseInt(localStorage.getItem('idCounter')) || 0;

  id;
  name;
  author_name;
  year;
  publisher_name;
  pages_number;
  count_exist;

  constructor(
    name,
    author_name,
    year,
    publisher_name,
    pages_number,
    count_exist
  ) {
    this.id = Book.generateId();
    this.name = name;
    this.author_name = author_name;
    this.year = year;
    this.publisher_name = publisher_name;
    this.pages_number = pages_number;
    this.count_exist = count_exist;
    this.saveToLocalStorage()
    
  }

  saveToLocalStorage() {
    localStorage.setItem('idCounter', Book.#idCounter);
    // Преобразуем объект в строку JSON
    const data = JSON.stringify({ id: this.id, name: this.name, author: this.author_name, year: this.year, publisher: this.publisher_name, pages: this.pages_number, count: this.count_exist  });
    // console.log(data);
    // Записываем данные в localStorage
    localStorage.setItem(`book${this.id}`, data);
  }

  static generateId() {
    return ++Book.#idCounter;
  }

  static getIdCount(){
    return this.#idCounter;
  }
  
  static setIdCount(){
    this.#idCounter=0;
  }

  getId() {
    return this.id;
  }

  getName() {
    return this.name;
  }

  setName(value) {
    if (value.length > 0 && value !== this.name) {
      this.name = value;
    }
  }

  getAuthorName() {
    return this.author_name;
  }

  setAuthorName(value) {
    if (value.length > 0 && value !== this.author_name) {
      this.author_name = value;
    }
  }

  getYear() {
    return this.year;
  }

  setYear(value) {
    this.year = value;
  }

  getPublisher() {
    return this.publisher_name;
  }

  setPublisher(value) {
    this.publisher_name = value;
  }

  getPagesNumber() {
    return this.pages_number;
  }

  setPagesNumber(value) {
    if (isNaN(value) && value > 0) {
      console.log("Error. Incorrect value of pages number, try again");
      return;
    } else {
      this.pages_number = value;
    }
  }

  getCountOfBooks() {
    return this.count_exist;
  }

  setCountOfBooks(value) {
    if (isNaN(value) && value > 0) {
      console.log("Error. Incorrect value of books count, try again");
      return;
    } else {
      this.count_exist = value;
    }
  }

  static fromJSON(json, book) {
    const parsedData = JSON.parse(json);
    const book1 = new Book(); // Создаем пустой экземпляр Book
    // Используем сеттеры для установки значений
    book.setName(parsedData.name);
    book.setAuthorName(parsedData.author_name);
    book.setYear(parsedData.year);
    book.setPublisher(parsedData.publisher_name);
    book.setPagesNumber(parsedData.pages_number);
    book.setCountOfBooks(parsedData.count_exist);
    return book1;
  }

  static Initialization() {
    return [
      new Book(
        "Гарри Поттер и философский камень",
        "Джоан Роулинг",
        1997,
        "Bloomsbury",
        432,
        4
      ),
      new Book(
        "Гарри Поттер и тайная комната",
        "Джоан Роулинг",
        1998,
        "Bloomsbury",
        431,
        6
      ),
      new Book(
        "Гарри Поттер и узник Азкабана",
        "Джоан Роулинг",
        1999,
        "Bloomsbury",
        480,
        7
      ),
      new Book(
        "Гарри Поттер и кубок Огня",
        "Джоан Роулинг",
        2002,
        "Bloomsbury",
        672,
        6
      ),
      new Book(
        "Гарри Поттер и орден Феникса",
        "Джоан Роулинг",
        2003,
        "Bloomsbury",
        816,
        4
      ),
      new Book(
        "Гарри Поттер и принц Полукровка",
        "Джоан Роулинг",
        2005,
        "Bloomsbury",
        672,
        4
      ),
      new Book(
        "Гарри Поттер и дары Смерти",
        "Джоан Роулинг",
        2007,
        "Bloomsbury",
        704,
        8
      ),
    ];
  }

}
