"use strict";

/*
###Задание 1
Необходимо создать класс Library. Конструктор класса, должен принимать начальный 
список книг (массив) в качестве аргумента. Убедитесь, что предоставленный массив 
не содержит дубликатов; в противном случае необходимо выбросить ошибку.
1. Класс должен содержать приватное свойство #books, которое должно хранить 
книги, переданные при создании объекта.
2. Реализуйте геттер-функцию allBooks, которая возвращает текущий список книг.
3. Реализуйте метод addBook(title), который позволяет добавлять книгу в список. 
Если книга с таким названием уже существует в списке, выбросьте ошибку с 
соответствующим сообщением.
4. Реализуйте метод removeBook(title), который позволит удалять книгу из списка 
по названию. Если книги с таким названием нет в списке, выбросьте ошибку с 
соответствующим сообщением.
5. Реализуйте метод hasBook(title), который будет проверять наличие книги в 
библиотеке и возвращать true или false в зависимости от того, есть ли такая 
книга в списке или нет.
*/

// class Library {
//     constructor(bookArray) {
//         if (new Set(bookArray)) {
//             this.#books = [...bookArray];
//         } else {
//             throw new Error("Your list of books contains duplicates.");
//         }
//     }

//     #books;

//     getAllBooks() {
//         return this.#books;
//     }

//     addBook(title) {
//         if (!this.#books.includes(title)) {
//             this.#books.push(title);
//             return this.#books;
//         } else {
//             throw new Error(`This book already exists in the list.`)
//         }
//     }

//     removeBook(title) {
//         if (this.#books.includes(title)) {
//             const index = this.#books.indexOf(title);
//             this.#books.splice(index, 1);
//             return this.#books;
//         } else {
//             throw new Error(`This book is not in the list.`)
//         }
//     }

//     hasBook(title) {
//         if (this.#books.includes(title)) {
//             return true;
//         }
//         return false;
//     }
// }

// const lib = new Library(['Dune', 'Harry Potter', 'The Martian Chronicles']);
// console.log(lib.getAllBooks());
// console.log(lib.addBook('Dune 2'));
// console.log(lib.removeBook('Harry Potter'));
// console.log(lib.hasBook('Dune'));
