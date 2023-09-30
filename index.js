const myLibrary = [];
let newBook;
const showFormBtn = document.querySelector(".showFormBtn");
const modal = document.querySelector(".modal");
const closeBtn = document.querySelector(".close");
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
    this.pages = form.pages.value + " pages";
    this.read = form.read.checked;
  }
}

// submit form
function addBookToLibrary(e) {
  e.preventDefault();
  const title = form.querySelector("#title").value;
  const author = form.querySelector("#author").value;
  const pages = form.querySelector("#pages").value;
  const read = form.querySelector("#read").checked;

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
function createBook(book, index) {
  console.log("adding books to the library...");
  const bookDiv = document.createElement("div");
  const titleDiv = document.createElement("div");
  const authDiv = document.createElement("div");
  const pageDiv = document.createElement("div");
  const removeBtn = document.createElement("button");
  const readBtn = document.createElement("button");
  bookDiv.classList.add("book");
  bookDiv.setAttribute('data-book-index',index);
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
  readBtn.textContent = book.read ? "Read" : "Not Read";
  removeBtn.textContent = "Remove";
  removeBtn.classList.add("removeBtn");
  bookDiv.appendChild(removeBtn);
  cardContainer.appendChild(bookDiv);

  removeBtn.addEventListener("click", () => removeBook(index));
  readBtn.addEventListener("click", () => changeReadStatus(index));
}

function changeReadStatus(index) {
  myLibrary[index].read = !myLibrary[index].read;
  console.log(`changed status of ${myLibrary[index].title}`);
  render()
}

function removeBook(index) {
  myLibrary.splice(index, 1);
  book.dataset.remove();
  console.log(`removed book: ${myLibrary[index].title}`);
  render()
}


//couldnt get this to work: load default books on page load. Because the Book constructor was pulling data from the form. And the above is an array of objects. 
// array of books
const defaultBooks = [
  {
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    pages: "259",
    read: "read",
  },

  {
    title: "Dune",
    author: "Frank Herbert",
    pages: "896",
    read: "read",
  },

  {
    title: "The Three Body Problem",
    author: "Liu Cixin",
    pages: "302",
    read: "read",
  },

  {
    title: "Snow Crash",
    author: "Neal Stephenson",
    pages: "480",
    read: "read",
  },
];
// // Add placeholder books to the mylibrary array using a for loop. How? Push the object book to the library array.
// function addDefaultBooksToLibrary() {
//   for (let i = 0; i < defaultBooks.length; i++) {
//     const { title, author, pages, read } = defaultBooks[i];
//     const newDefaultBooks = new Book(title, author, pages, read);
//     myLibrary.push(newDefaultBooks[i]);
//     createBook(newDefaultBooks, myLibrary.length);
//     console.log(`pushed book into library: ${defaultBooks[i].title}`);
//   }
// }
// addDefaultBooksToLibrary();
