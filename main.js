const books = [];
const RENDER_EVENT = 'render-book';

document.addEventListener('DOMContentLoaded', function(){
    const submitBook = document.getElementById('inputBook');
    submitBook.addEventListener('submit', function(event){
        event.preventDefault();
        addBook();
    });
});

document.addEventListener(RENDER_EVENT, function(){
    const uncompletedBOOKList = document.getElementById('incompleteBookshelfList')
    uncompletedBOOKList.innerHTML = '';

    for (const bookItem of books){
        const bookElement = makeBook(bookItem);
        if (!bookItem.isCompleted){
            uncompletedBOOKList.append(bookElement);
        }
    }
});



function addBook(){
    const bookTittle = document.getElementById('inputBookTitle').value;
    const bookAuthor = document.getElementById('inputBookAuthor').value;
    const bookYear = document.getElementById('inputBookYear').value;
    const isCompleted = document.getElementById("inputBookIsComplete").checked;

    const generateID = generateId();
    const bookObject = generatebookObject(generateID, bookTittle, bookAuthor, bookYear, false);
    books.push(bookObject);

    document.dispatchEvent(new Event(RENDER_EVENT));
}

function generateId(){
    return +new Date();
}

function generatebookObject(id, book, author, year, isCompleted){
    return{
        id,
        book,
        author,
        year,
        isCompleted
    }
}

function makeBook(bookObject){
    const textBook = document.createElement('h3');
    textBook.innerText = bookObject.book;

    const textAuthor = document.createElement('p');
    textAuthor.innerText = 'Penulis : ' + bookObject.author;

    const textYear = document.createElement('p');
    textYear.innerText = 'Tahun : ' + bookObject.year;

    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('action');

    const bookContainer = document.createElement('div');
    bookContainer.classList.add('book_item');
    bookContainer.append(textBook, textAuthor, textYear, buttonContainer);
    bookContainer.setAttribute('id', `book-${bookObject.id}`);

    if (makeBook.isCompleted){
        const greenButton = document.createElement('button');
        greenButton.classList.add('green');
        greenButton.innerText = 'Belum Selesai Dibaca';

        greenButton.addEventListener('click', function(){
            undoBookFromCompleted(bookObject.id);
        });

        const redButton = document.createElement('button');
        redButton.classList.add('red');
        redButton.innerText = 'Hapus Buku';

        redButton.addEventListener('click', function(){
            removeBookFromCompleted(bookObject.id);
        });

        buttonContainer.append(greenButton, redButton);

    } else {
        const greenButton = document.createElement('button');
        greenButton.classList.add('green');
        greenButton.innerText = 'Selesai Dibaca';

        greenButton.addEventListener('click', function(){
            addBookToCompleted(bookObject.id);
        });

        const redButton = document.createElement('button');
        redButton.classList.add('red');
        redButton.innerText = 'Hapus Buku';

        redButton.addEventListener('click', function(){
            removeBookFromCompleted(bookObject.id);
        });

        buttonContainer.append(greenButton, redButton);
    }

    return bookContainer;
}

function addBookToCompleted(bookId){
    const bookTarget = findBook(bookId);

    if (bookTarget == null) return;

    bookTarget.isCompleted = true;
    document.dispatchEvent(new Event(RENDER_EVENT));
}

function findBook(bookId){
    for (const bookItem of books){
        if (bookItem.id === bookId){
            return bookItem;
        }
    }
    return null;
}


