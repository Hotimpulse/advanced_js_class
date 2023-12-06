"use strict";

/*
###Задание 2
Вы разрабатываете систему отзывов для вашего веб-сайта. Пользователи могут 
оставлять отзывы, но чтобы исключить слишком короткие или слишком длинные 
сообщения, вы решаете установить ограничение, отзыв должен быть не менее 50 
символов в длину и не более 500. В случае неверной длины, необходимо выводить 
сообщение об ошибке, рядом с полем для ввода.

Создайте HTML-структуру. 
На странице должны отображаться товары, под каждым товаром должен быть список 
отзывов на данный товар. Под каждым списком отзывов должна быть форма, где можно
добавить отзыв для продукта.

При добавлении отзыва, он должен отображаться на странице под предыдущими 
отзывами, а не заменять их.
Массив initialData должен использоваться для начальной загрузки данных 
при запуске вашего приложения.

Каждый отзыв должен иметь уникальное числовое id.

ВНИМАНИЕ! Если вы не проходили на курсе работу с DOM, то можно это задание не 
делать, пока рано.
*/

const initialData = [
  {
    product: "Apple iPhone 13",
    reviews: [
      {
        id: 1,
        text: "Отличный телефон! Батарея держится долго.",
      },
      {
        id: 2,
        text: "Камера супер, фото выглядят просто потрясающе.",
      },
    ],
  },
  {
    product: "Samsung Galaxy Z Fold 3",
    reviews: [
      {
        id: 1,
        text: "Интересный дизайн, но дорогой.",
      },
    ],
  },
  {
    product: "Sony PlayStation 5",
    reviews: [
      {
        id: 1,
        text: "Люблю играть на PS5, графика на высоте.",
      },
    ],
  },
];

const JSONobj = JSON.stringify(initialData);


localStorage.setItem('initialData', JSONobj)
const main = document.createElement('main');
main.style.padding = `1rem`;
main.style.display = `flex`;
main.style.flexDirection = `column`;
main.style.gap = `1rem`;
main.textContent = `Shop items`;


const divWrapper = document.createElement('div');
divWrapper.style.display = `flex`;
divWrapper.style.gap = `1rem`;

document.body.append(main);
main.append(divWrapper);

const stringedData = localStorage.getItem('initialData');
const data = JSON.parse(stringedData);

data.forEach(obj => {
  // element creation
  const itemWrapper = document.createElement('div');
  itemWrapper.setAttribute('id', 'item-wrapper');
  itemWrapper.style.background = `red`;
  itemWrapper.style.width = `350px`;
  itemWrapper.style.padding = `1rem`;
  itemWrapper.style.textAlign = `center`;
  const itemImage = document.createElement('img');
  const itemName = document.createElement('p');
  itemWrapper.append(itemImage);
  itemWrapper.append(itemName);
  
  const reviewWrapper = document.createElement('div');
  reviewWrapper.setAttribute('id', 'review-wrapper');

  divWrapper.append(itemWrapper);
  itemWrapper.append(reviewWrapper);

  // data
  itemName.textContent = obj.product;
  let arrayOfReviews = obj.reviews;

  arrayOfReviews.forEach((review) => {
    if (review) {
      const itemReview = document.createElement('p');
      itemReview.textContent = ` Id: ${review.id}: ${review.text}`;
      reviewWrapper.append(itemReview);
    }
    return null;
  })

  const customForm = document.createElement('form');
  const input = document.createElement('input');
  input.placeholder = `Type your review`;
  const label = document.createElement('label');
  label.textContent = `Leave your review:`;
  const addReviewBtn = document.createElement('button');
  addReviewBtn.textContent = `Add`;

  customForm.style.display = `flex`;
  customForm.style.flexDirection = `column`;
  customForm.style.gap = `1rem`;
  customForm.style.width = `100%`;
  customForm.append(label);
  customForm.append(input);
  customForm.append(addReviewBtn);
  itemWrapper.append(customForm);
  
  addReviewBtn.addEventListener('click', (e) => {
    e.preventDefault();
    let errorMessage = document.createElement('p');
    errorMessage.setAttribute('id', 'error-msg');
    errorMessage.textContent = "Review must be between 50-500 characters long!";
    const reviewText = input.value.trim();

    if ((reviewText !== '') && (reviewText.length >= 3) && (reviewText.length <= 500) ) {
      let message = document.getElementById('error-msg');
      if (message) {
        message.remove();
      }
      const productId = data.findIndex(item => item.product === obj.product);
      const newReviewId = data[productId].reviews.length + 1;

      const newReview = {
        id: newReviewId,
        text: reviewText,
      };

      console.log(data[productId].reviews);
      data[productId].reviews.push(newReview);

      localStorage.setItem('initialData', JSON.stringify(data));

      input.value = '';

      const itemNewReview = document.createElement('p');
      itemNewReview.textContent = `Id: ${newReview.id}: ${newReview.text}`;
      reviewWrapper.append(itemNewReview);
    } else {
      input.insertAdjacentElement('afterend', errorMessage);
    }
  })
});
