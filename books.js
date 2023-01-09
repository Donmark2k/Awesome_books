const booksList = [];
const addBtn = document.getElementById('add-btn');

class Display {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }

  static addBook() {
    const Title = document.getElementById('title').value;
    const Author = document.getElementById('author').value;
    // if (Title === '' || Author === '') {
    //   document.getElementById('message').innerHTML = "*Please fill the required space.";
    // } else {
    //   document.getElementById('message').innerHTML = "*Book added successfully.";
    const list = document.getElementById('book-list');
    const addDiv = document.createElement('div');
    addDiv.classList.add('book');
    const newBook = new Display(Title, Author);
    booksList.push(newBook);
    addDiv.innerHTML += `
    <div>"${newBook.title}"</div> 
    <div> ${newBook.author}</div>
    <button class= "delete button ${newBook.id}">Remove</button> 
    `;
    list.appendChild(addDiv);
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
  }
  //   }

  static addToLocalStorage() {
    localStorage.setItem('books', JSON.stringify(booksList));
  }

  static removeBook(e) {
    e.preventDefault();
    if (e.target.innerHTML === 'Remove') {
      e.target.parentElement.remove();
    }
  }

  static removeFromLocalStorage(e) {
    booksList.forEach((newBook, i) => {
      if (e.target.parentElement.lastElementChild.classList.contains(newBook.id)) {
        booksList.splice(i, 1);
      }
    });
    localStorage.setItem('books', JSON.stringify(booksList));
  }

  static keepLocalStorage() {
    const stores = JSON.parse(localStorage.getItem('books'));
    stores.forEach((store) => {
      const addDiv = document.createElement('div');
      addDiv.classList.add('book');
      booksList.push(store);
      addDiv.innerHTML += `
      <div>"${store.title}" </div>
      <div> ${store.author}</div>
      <button class= "delete button ${store.id}">Remove</button> <hr>
      `;
      const list = document.getElementById('book-list');
      list.appendChild(addDiv);
    });
  }
}

addBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const bookList = document.getElementById('book-list');
  bookList.style.display = 'flex';
  bookList.style.flexDirection = 'column';
  Display.addBook();
  Display.addToLocalStorage();
});
document.getElementById('book-list').addEventListener('click', (e) => {
  e.preventDefault();
  Display.removeBook(e);
  Display.removeFromLocalStorage(e);
});
window.addEventListener('load', () => {
  Display.keepLocalStorage();
  const bookList = document.getElementById('book-list');
  if (bookList.innerHTML === '') {
    bookList.style.display = 'none';
  } else {
    bookList.style.display = 'flex';
    bookList.style.flexDirection = 'column';
  }
});