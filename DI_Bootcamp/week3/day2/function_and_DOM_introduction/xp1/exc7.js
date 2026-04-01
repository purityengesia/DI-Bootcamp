//exc7.book list
const allBooks = [
    {
        title: "The Hobbit",
        author: "J.R.R. Tolkien",
        image: "https://example.com/hobbit.jpg",
        alreadyRead: true
    },
    {
        title: "1984",
        author: "George Orwell",
        image: "https://example.com/1984.jpg",
        alreadyRead: false
    }
];

const section = document.querySelector('.listBooks');

allBooks.forEach(book => {
    const bookDiv = document.createElement('div');
    const bookInfo = document.createElement('p');
    const bookImg = document.createElement('img');

    bookInfo.textContent = `${book.title} written by ${book.author}`;
    bookImg.src = book.image;
    bookImg.style.width = "100px";

    if (book.alreadyRead) {
        bookInfo.style.color = "red";
    }

    bookDiv.appendChild(bookInfo);
    bookDiv.appendChild(bookImg);
    section.appendChild(bookDiv);
});

