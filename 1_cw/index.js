"use strict";

const reviewSymbol = Symbol('review');
const ratingSymbol = Symbol('rating');
const tagsSymbol = Symbol('tags');

class Book {
    constructor(title, author) {
        this.title = title;
        this.author = author;
    }

    getMetaData(metaDataType) {
        return this[metaDataType] ? this[metaDataType] : [];
    }

    addMetaData(metaDataType, data) {
        if(!this[metaDataType]) {
            this[metaDataType] = []
        }
        this[metaDataType].push(data);
    }

    getAverageRating() {
        if (!this[ratingSymbol]) {
            return 0;
        }
        let total = this[ratingSymbol].reduce((acc, count) => acc + count, 0);
        let avg = total / this[ratingSymbol].length;
        return Math.round(avg * 10) / 10;
    }

    hasTag(name) {
        return this[tagsSymbol].includes(name) ? true : false;
    }
}

const book = new Book('1984', 'George Orwell');
console.log(book);

book.addMetaData(reviewSymbol, 'Great book!');
book.addMetaData(reviewSymbol, 'This was trash!');
book.addMetaData(ratingSymbol, 5);
book.addMetaData(ratingSymbol, 5);
book.addMetaData(ratingSymbol, 4);

book.addMetaData(tagsSymbol, 'fiction');


console.log(`After adding`, book.getMetaData(ratingSymbol));
let ratings = book.getMetaData(ratingSymbol)
console.log(book.getAverageRating());