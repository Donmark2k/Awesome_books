let shelf = [];

// class books {
//     constructor(title, author) {
//         this.title = title;
//         this.author = author;
//     }
// }

class Library {

  constructor(title, author) {
    this.title = title;
    this.author = author;
}
     addBook(Booktitle, Bookauthor) {
        if (Booktitle && Bookauthor) {
            const newBook = new Library(Booktitle, Bookauthor)
            shelf.push(newBook)
        } 
    }

    removeBook(index) {
        shelf.splice(index, 1);
    }
}

const booklist = document.querySelector('#list');
const inputTitle = document.getElementById('title');
const inputAuthor = document.getElementById('author');
const buttonAdd = document.getElementById('add-btn');

const stringShelf = localStorage.getItem('shelf');
const obj = new Library();

if (stringShelf) {
  const parsedShelf = JSON.parse(stringShelf);
  // if (parsedShelf !== null) {
    shelf = parsedShelf;
  // }
}

function printBooks() {
  let innerhtml = '';

  shelf.forEach((book, index) => {
    innerhtml += `
    <div>
        <div>"${Library.title}" </div><div> ${Library.author} </div>
        <button id="remove-btn${index}">Remove</button>
            </div>
            <hr>
        `;
  });

  booklist.innerHTML = innerhtml;

  shelf.forEach((book, index) => {
    const removeBtn = document.getElementById(`remove-btn${index}`);
    removeBtn.addEventListener('click', () => {
      obj.removeBook(index);
      printBooks();
    });
  });

  localStorage.setItem('shelf', JSON.stringify(shelf));
}

printBooks();

buttonAdd.addEventListener('click', (event) => {
  event.preventDefault();
  obj.addBook(inputTitle.value, inputAuthor.value);
  printBooks();

  // inputTitle.value = '';
  // inputAuthor.value = '';
});
