"use strict";

const productList = document.getElementById('review-wrapper');
const jsonInStorage = localStorage.getItem('reviews');
const reviewsArray = JSON.parse(jsonInStorage) || [];

reviewsArray.forEach(item => {
    createItems(item);
})

function createItems(review) {
    const productCard = document.createElement('div');
    productCard.classList.add('product-card');

    const productNameEl = document.createElement('h3');
    productNameEl.textContent = review.productName;

    const productTextEl = document.createElement('p');
    productTextEl.textContent = review.productText;

    const toggleBtn = document.createElement('button');
    toggleBtn.textContent = "Toggle reviews";

    toggleBtn.addEventListener('click', () => {
        productTextEl.style.display = (productTextEl.style.display === 'none') ? 'block' : 'none';
    });

    const delBtn = document.createElement('button');
    delBtn.textContent = 'Delete';
    delBtn.addEventListener('click', () => {
        const index = reviewsArray.findIndex(item => item.productName === review.productName)
        if (index !== -1) {
            reviewsArray.splice(index, 1);

            localStorage.setItem('reviews', JSON.stringify(reviewsArray));

            productCard.remove();
        }

        if (reviewsArray.every(item => item.productName !== review.productName)) {
            productCard.remove();
        }
    })

    productCard.append(productNameEl);
    productCard.append(productTextEl);
    productCard.append(toggleBtn);
    productCard.append(delBtn);

    productList.append(productCard);

}