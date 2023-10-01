class Library {
  // consolidates multiply libraries so others can add their books in the future.
  constructor() {
    this.books = [];
    this.form = document.querySelector(".formData");
    this.showFormBtn = document.querySelector(".showFormBtn");
    this.modal = document.querySelector(".modal");
    this.closeBtn = document.querySelector(".close");
    this.readBtn = document.querySelector(".read");
    this.removeBtn = document.querySelector(".removeBtn");
    this.submitBtn = document.querySelector(".submitBtn");
    this.cardContainer = document.querySelector(".cardContainer");

    // event listeners to add new book, show the form and close the form.
    this.showFormBtn.addEventListener("click", () => this.showForm());
    this.closeBtn.addEventListener("click", () => this.closeModal());
    this.submitBtn.addEventListener("click", (e) => this.submitForm(e));
  }
  addNewBook(title, author, pages, read) {
    const newBook = new Book(
      title,
      author,
      pages,
      read,
      this.cardContainer,
      this.removeBook
    );
    this.books.push(newBook);
  }
  render() {
    this.cardContainer.innerHTML = "";
    console.log("mylibrary data:");
    for (let i = 0; i < this.books.length; i++) {
      this.books[i].renderBook();
      console.log("re rendering library");
    }
  }
  submitForm(e) {
    e.preventDefault();
    const title = this.form.querySelector("#title").value;
    const author = this.form.querySelector("#author").value;
    const pages = this.form.querySelector("#pages").value;
    const read = this.form.querySelector("#read").checked;
    this.closeModal();
    this.addNewBook(title, author, pages, read);
    this.form.reset();
  }
  removeBook = (id) => {
    console.log(this);
    const modifyLibrary = this.books.filter((book) => book.id !== id);
    console.log(modifyLibrary);
    this.books = modifyLibrary;
    this.render();
  };
  showForm() {
    console.log(this.modal);
    this.modal.style.display = "block";
  }
  closeModal() {
    this.modal.style.display = "none";
  }
}

// Book constructor // have function render book and have functions built in to this.
class Book {
  constructor(title, author, pages, read, cardContainer, removeBook) {
    this.title = title;
    this.author = author;
    this.pages = pages + " pages";
    this.read = read;
    this.id = Date.now();
    this.cardContainer = cardContainer;
    this.removeBook = removeBook;
    console.log(this.id);
    console.log("adding books to the library...");
    this.renderBook();
  }
  renderBook() {
    this.bookDiv = document.createElement("div");
    this.titleDiv = document.createElement("div");
    this.authDiv = document.createElement("div");
    this.pageDiv = document.createElement("div");
    this.removeBtn = document.createElement("button");
    this.readBtn = document.createElement("button");
    this.bookDiv.classList.add("book");
    this.bookDiv.setAttribute("data-book-index", this.id);
    this.titleDiv.textContent = this.title;
    this.titleDiv.setAttribute("id", "title");
    this.bookDiv.appendChild(this.titleDiv);
    this.authDiv.textContent = this.author;
    this.authDiv.setAttribute("id", "author");
    this.bookDiv.appendChild(this.authDiv);
    this.pageDiv.textContent = this.pages;
    this.pageDiv.setAttribute("id", "pages");
    this.bookDiv.appendChild(this.pageDiv);
    this.readBtn.classList.add("readBtn");
    this.bookDiv.appendChild(this.readBtn);
    this.readBtn.textContent = this.read ? "Read" : "Not Read";
    this.removeBtn.textContent = "Remove";
    this.removeBtn.classList.add("removeBtn");
    this.bookDiv.appendChild(this.removeBtn);
    this.cardContainer.appendChild(this.bookDiv);

    this.removeBtn.addEventListener("click", () => this.removeBook(this.id));
    this.readBtn.addEventListener("click", () => this.toggleRead());
  }
  toggleRead() {
    this.read = !this.read;
    this.readBtn.textContent = this.read ? "Read" : "Not Read";
  }
}

// load library
const myLibrary = new Library();

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
function addDefaultBooksToLibrary() {
  for (let i = 0; i < defaultBooks.length; i++) {
    const { title, author, pages, read } = defaultBooks[i];
    myLibrary.addNewBook(title, author, pages, read);
    console.log(`pushed book into library: ${defaultBooks[i].title}`);
  }
}
addDefaultBooksToLibrary();
