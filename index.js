const myLibrary = [];
let newBook;
const showFormBtn = document.querySelector(".showFormBtn");
const modal = document.querySelector(".modal");
const closeBtn = document.querySelector(".close");
const changeStatus = document.querySelector(".changeStatus");
const readBtn = document.querySelector(".read");
const removeBtn = document.querySelector(".removeBtn");
let form = document.querySelector(".formData");
const submitBtn = document.querySelector(".submitBtn");
const cardContainer = document.querySelector(".cardContainer");

// event listeners to add new book, show the form and close the form.
submitBtn.addEventListener("click", addBookToLibrary);
showFormBtn.addEventListener("click", showForm);
closeBtn.addEventListener("click", closeModal);

// display form
function showForm() {
  modal.style.display = "block";
}

// close form
function closeModal() {
  modal.style.display = "none";
}

// Book constructor
class Book {
  constructor(title, author, pages, read) {
    this.title = form.title.value;
    this.author = form.author.value;
    this.pages = form.pages.value + 'pages';
    this.read = form.read.checked;
  }
}

// submit form
function addBookToLibrary(e) {
  e.preventDefault();
  const title = form.querySelector('#title').value;
  const author = form.querySelector('#author').value;
  const pages = form.querySelector('#pages').value;
  const read = form.querySelector('#read').checked;

  newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
  modal.style.display = "none";
  render();
  form.reset();
}

// create book in html
function render() {
  for (let i = 0; i < myLibrary.length; i++) {
    createBook(myLibrary[i]);
    console.log(`pushed book into library: ${myLibrary[i].title}`);
  }
}

//DOM elements to be used in render()
function createBook(book) {
  console.log("adding books to the library...");
  const bookDiv = document.createElement("div");
  const titleDiv = document.createElement("div");
  const authDiv = document.createElement("div");
  const pageDiv = document.createElement("div");
  const removeBtn = document.createElement("button");
  const readBtn = document.createElement("button");
  bookDiv.classList.add("book");
  titleDiv.textContent = book.title; 
  titleDiv.setAttribute("id", "title");
  bookDiv.appendChild(titleDiv);
  authDiv.textContent = book.author; 
  authDiv.setAttribute("id", "author");
  bookDiv.appendChild(authDiv);
  pageDiv.textContent = book.pages; 
  pageDiv.setAttribute("id", "pages");
  bookDiv.appendChild(pageDiv);
  readBtn.classList.add("readBtn");
  bookDiv.appendChild(readBtn);
  book.read = readBtn.textContent === "read" ? "not read" : "read"; 
  removeBtn.textContent = "Remove"; 
  removeBtn.classList.add("removeBtn");
  bookDiv.appendChild(removeBtn);
  cardContainer.appendChild(bookDiv);


  removeBtn.addEventListener("click", removeBook);
  readBtn.addEventListener("click", changeReadStatus);
}

function changeReadStatus(book) {
  book.read = !book.read;
  render();
  console.log(`changed status of ${bookDiv[i].title}`);
}

function removeBook(index) {
  myLibrary.splice(index, 1);
  render();
  console.log(`removed book: ${bookDiv[i].title}`);
}