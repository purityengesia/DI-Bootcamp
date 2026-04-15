//defining interface and class for library
interface Book {
    title: string;
    author: string;
    isbn: string;
    publishedYear: number;
    genre?: string; // Optional property
}

class Library {
    // Encapsulation: 'books' is private, so it cannot be accessed directly from outside
    private books: Book[] = [];

    public addBook(book: Book): void {
        this.books.push(book);
    }

    public getBookDetails(isbn: string): Book | string {
        const book = this.books.find(b => b.isbn === isbn);
        return book ? book : `Book with ISBN ${isbn} not found.`;
    }

    // We make this protected so the child class DigitalLibrary can access the array
    protected getAllBooks(): Book[] {
        return this.books;
    }
}

class DigitalLibrary extends Library {
    // Readonly: Once set in the constructor, the website cannot be changed
    public readonly website: string;

    constructor(website: string) {
        super();
        this.website = website;
    }

    public listBooks(): string[] {
        // Accessing the inherited method to get the book list
        return this.getAllBooks().map(book => book.title);
    }
}

//creating instant and testing the library
// Create an instance of the DigitalLibrary
const myLibrary = new DigitalLibrary("https://city-digital-archives.org");

// Add books using the interface structure
myLibrary.addBook({
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    isbn: "978-0743273565",
    publishedYear: 1925,
    genre: "Classic Literature"
});

myLibrary.addBook({
    title: "Clean Code",
    author: "Robert C. Martin",
    isbn: "978-0132350884",
    publishedYear: 2008,
    // genre is omitted here as it is optional
});

// Print details of a specific book
console.log("--- Book Lookup ---");
console.log(myLibrary.getBookDetails("978-0132350884"));

// List all book titles
console.log("\n--- Library Catalog ---");
console.log(myLibrary.listBooks());

// Check readonly property
console.log(`\nVisit us at: ${myLibrary.website}`);
// myLibrary.website = "https://new-url.com"; // ❌ Error: Cannot assign to 'website' because it is a read-only property.
