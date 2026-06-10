export interface Book {
  id: string;
  title: string;
  author: string;
  category: string;
  isRead: boolean;
  dateAdded: number;
}

// Using a class as requested to demonstrate OOP patterns in TS
export class BookItem implements Book {
  id: string;
  title: string;
  author: string;
  category: string;
  isRead: boolean;
  dateAdded: number;

  constructor(title: string, author: string, category: string) {
    this.id = Date.now().toString() + Math.random().toString(36).substr(2, 9);
    this.title = title;
    this.author = author;
    this.category = category;
    this.isRead = false;
    this.dateAdded = Date.now();
  }

  // Getter for formatted date
  get formattedDate(): string {
    return new Date(this.dateAdded).toLocaleDateString();
  }

  // Serialization method
  serialize(): string {
    return JSON.stringify(this);
  }

  // Static method to deserialize
  static deserialize(jsonString: string): BookItem {
    const obj = JSON.parse(jsonString);
    const book = new BookItem(obj.title, obj.author, obj.category);
    book.id = obj.id;
    book.isRead = obj.isRead;
    book.dateAdded = obj.dateAdded;
    return book;
  }
}