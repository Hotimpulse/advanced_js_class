"use strict";

const productList = document.getElementById('review-wrapper');
const jsonInStorage = localStorage.getItem('reviews');
const reviewsArray = JSON.parse(jsonInStorage) || [];

function runApp() {
    if (reviewsArray.length === 0) {
        let message = document.createElement('p');
        message.setAttribute('id', 'message');
        let link = document.createElement('button');
        link.textContent = 'Main';
        message.textContent = `Create a review first! Navigate to`;
        message.appendChild(link)
        document.body.append(message);
        link.addEventListener('click', () => {
            navigateToMain();
        })
    } else {
        reviewsArray.forEach(item => {
            createItems(item);
        })
    }
}

runApp();


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

        if (reviewsArray.length === 0) {
            runApp();
        }
    })

    productCard.append(productNameEl);
    productCard.append(productTextEl);
    productCard.append(toggleBtn);
    productCard.append(delBtn);

    productList.append(productCard);

}

function navigateToMain() {
    window.location.href = './main.html';
}