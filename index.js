const myLibrary = []; //empty array to hold the library of key value pairs.
const showFormBtn = document.querySelector(".showFormBtn");
const modal = document.querySelector(".modal");
const closeBtn = document.querySelector(".close");
const changeStatus = document.querySelector(".changeStatus");
const status = document.querySelector(".haveRead");
const removeBtn = document.querySelector(".removeBtn");
let formData = document.querySelector(".formData");
const submitBtn = document.querySelector(".submitBtn")
const card = document.querySelector(".book-card");

// event listeners
submitBtn.addEventListener("click", submitForm);
showFormBtn.addEventListener("click", showForm); // displays the form when button clicked
closeBtn.addEventListener("click", closeModal); //closes the form dialog modal
card.addEventListener("click", changeReadStatus);
card.addEventListener("click", removeBook);

function showForm() {
  modal.style.display = "block";
}

function closeModal() {
  modal.style.display = "none";
}

function submitForm(e) {
  e.preventDefault();
  formData = new FormData(formData);
  const newBook = {
    title: formData.get("title"),
    author: formData.get("author"),
    pages: formData.get("pages"),
    haveRead: formData.get("haveRead"),
  }; // creates new object
  myLibrary.push(newBook); // pushes the new object key:values into the array
  addBookToLibrary([newBook]); // pass the new book as an array to the function
  e.target.reset(); // reset form data
  modal.style.display = "none"; // Close the modal after submission
}

// array of books
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
    title: "Snow Crash",
    author: "Neal Stephenson",
    pages: "480",
    haveRead: "not read",
  },
];
// Add books to the mylibrary array using a for loop. How? Push the object book to the library array.
for (let i = 0; i < books.length; i++) {
  myLibrary.push(books[i]);
  console.log(`pushed book into library: ${books[i].title}`);
}

//DOM Manipulation
function addBookToLibrary(library) {
  console.log("adding books to the library...");
  // loop through library array to the end of its length. create a variable to hold each library item.
  for (let i = 0; i < library.length; i++) {
    const book = library[i];

    // create a new div html element to display the books info on the html
    const bookInfo = document.createElement("div");
    bookInfo.classList.add("book-info");

    // add data attribute to the book info varibale with books index as the identifier
    bookInfo.dataset.bookIndex = i;

    // Populate the book info element content with the book information (title, author, etc.)
    bookInfo.innerHTML = `
      <h2>${book.title}</h2> 
      <p>Author: ${book.author}</p> 
      <p>Pages: ${book.pages}</p> 
      <p>Status: <span class='status'> ${book.haveRead}</span></p>
      <button class='changeStatus'>Change Status</button>
      <button class='removeBtn'>Remove Book</button>`;
    // Append the book info to the bottom of the card
    card.appendChild(bookInfo);
    console.log(`added book: ${book.title}`);
  }
}
//call function to display books
addBookToLibrary(myLibrary);

// changes the haveRead status.
// check if the clicked element is the change status button within the loop.
function changeReadStatus(event) {
  if (event.target.classList.contains("changeStatus")) {
    const bookInfo = event.target.parentElement;
    const bookIndex = bookInfo.dataset.bookIndex;
    //toggle the status
    myLibrary[bookIndex].haveRead =
      myLibrary[bookIndex].haveRead === "read" ? "not read" : "read";
    myLibrary[bookIndex].haveRead === "not read" ? "read" : "not read";
    //update the status
    statusElement.textContent = myLibrary[bookIndex].haveRead;
  }
}

// removes the book from the library - Need to fix.
// Listen for a click on button to Target the parent and remove the parent and any items with the data tag.
function removeBook(e) {
  if (e.target.classList.contains("removeBtn")) {
    const bookInfo = e.target.parentElement;
    const bookIndex = bookInfo.dataset.bookIndex;
    // Remove the book from the library array
    myLibrary.splice(bookIndex, 1);
    // Remove the book element from the DOM
    bookInfo.remove();
  }
}

// object constructor
// function Book(title, author, pages, haveRead) {
//   this.title = title;
//   this.author = author;
//   this.pages = pages;
//   this.haveRead = haveRead;
//   //   this.sayBook = function () {
//   //     return (this.title + " by " + this.author + ", " + this.pages + " pages, " + this.haveRead);};
// }
