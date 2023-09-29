const myLibrary = []; //empty array to hold the library of key value pairs.
const showFormBtn = document.querySelector(".showFormBtn");
const modal = document.querySelector(".modal");
const closeBtn = document.querySelector(".close");
const changeStatus = document.querySelector(".changeStatus");
const readStatus = document.querySelector(".haveRead");
const removeBtn = document.querySelector(".removeBtn");
let formData = document.querySelector(".formData");
const submitBtn = document.querySelector(".submitBtn");
const card = document.querySelector(".bookCard");

// event listeners
submitBtn.addEventListener("click", submitForm);
showFormBtn.addEventListener("click", showForm);
closeBtn.addEventListener("click", closeModal);
card.addEventListener("click", changeReadStatus);
card.addEventListener("click", removeBook);

// display form
function showForm() {
  modal.style.display = "block";
}

// close form
function closeModal() {
  modal.style.display = "none";
}

// submit form
function submitForm(e) {
  e.preventDefault();
  formData = new FormData(formData);
  const newBook = {
    title: formData.get("title"),
    author: formData.get("author"),
    pages: formData.get("pages"),
    haveRead: formData.get("haveRead"),
  };
  myLibrary.push(newBook);
  addBookToLibrary([newBook]);
  formData = "";
  modal.style.display = "none";
}

// default books
const books = [
  {
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    pages: "259",
    haveRead: "not read",
  },

  {
    title: "Dune",
    author: "Frank Herbert",
    pages: "896",
    haveRead: "read",
  },

  {
    title: "The Three Body Problem",
    author: "Liu Cixin",
    pages: "302",
    haveRead: "read",
  },

  {
    title: "Shantaram",
    author: "Gregory David Roberts",
    pages: "936",
    haveRead: "read",
  },
];
// Add default books
for (let i = 0; i < books.length; i++) {
  myLibrary.push(books[i]);
  console.log(`pushed book into library: ${books[i].title}`);
}

//DOM Manipulation
// go through an a collection of books (i) 

function addBookToLibrary(library) {
  console.log("adding books to the library...");
  for (let i = 0; i < library.length; i++) {
    const book = library[i];
    const bookInfo = document.createElement("div");
    bookInfo.classList.add("bookInfo");
    bookInfo.dataset.bookIndex = i;
    bookInfo.innerHTML = `
      <h2>${book.title}</h2> 
      <p>Author: ${book.author}</p> 
      <p>Pages: ${book.pages}</p> 
      <p>Status: <span class='readStatus'> ${book.haveRead}</span></p>
      <div class='btnDiv'>
      <button class='changeStatus'>Change Status</button>
      <button class='removeBtn'>Remove Book</button>
      </div>`;
    card.appendChild(bookInfo);
    console.log(`added book: ${book.title}`);
  }
}
addBookToLibrary(myLibrary);

function changeReadStatus(event) {
  if (event.target.classList.contains("changeStatus")) {
    const bookInfo = event.target.parentElement;
    const bookIndex = bookInfo.dataset.bookIndex;
    myLibrary[bookIndex].haveRead =
      myLibrary[bookIndex].haveRead === 'read' ? 'not read' : 'read';
    const statusElement = bookInfo.querySelector(".readStatus");
    statusElement.textContent = myLibrary[bookIndex].haveRead;
  }
}

function removeBook(e) {
  if (e.target.classList.contains("removeBtn")) {
    const bookInfo = e.target.parentElement;
    const bookIndex = bookInfo.dataset.bookIndex;
    myLibrary.splice(bookIndex, 0);
    bookInfo.remove();
  }
}
