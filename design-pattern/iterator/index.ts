
interface Agrigator {
    createIterator(): HadaIterator;
}

interface HadaIterator {
    hasNext(): boolean;
    // NOTE: Objectって型があるのがよきよね
    next(): HadaObject;
}

interface HadaObject {
    getName(): string;
}

// NOTE: type interface と type structとどっちがわかりやすきかね
class Book implements HadaObject {
    // HACK: getterでname使うからアンスコ使ってる
    private _name: string;

    // newがデフォであるのって幸せでない？
    constructor(name: string) {
        this._name = name
    }

    public getName(): string {
        return this._name
    }
}


class BookShelf implements Agrigator {
    private books: Book[] = [];
    private last: number = 0;

    public getBookAt(index: number): Book {
        return this.books[index]
    }

    public appendBook(book: Book): void {
        this.books.push(book)
        this.last++
    }

    public getLength(): number {
        return this.last
    }

    public createIterator():HadaIterator {
        return new BookShelfIterator(this)
    }
}

class BookShelfIterator implements HadaIterator {
    private bookShelf: BookShelf;
    private index: number;

    constructor(bookShelf: BookShelf) {
        this.bookShelf = bookShelf
        this.index = 0
    }

    public hasNext(): boolean {
        if (this.index < this.bookShelf.getLength()) {
            return true
        }

        return false
    }

    public next(): HadaObject {
        return this.bookShelf.getBookAt(this.index++)
    }
}

const bookShelf: BookShelf = new BookShelf()
bookShelf.appendBook(new Book('ペンギンハイウェイ'))
bookShelf.appendBook(new Book('夜は短し歩けよ乙女'))
bookShelf.appendBook(new Book('有頂天家族'))

const iterator: HadaIterator = bookShelf.createIterator()
while (iterator.hasNext()) {
    const book: HadaObject = iterator.next()
    console.log(book.getName())
}
