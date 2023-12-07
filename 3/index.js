"use strict";

const form = document.getElementById('productForm');
let productNameInput = document.getElementById('productName');
let productTextInput = document.getElementById('productText');
const btn = document.getElementById('product-btn');
const wrapper = document.getElementById('wrapper');
let error = document.createElement('p');
wrapper.append(error);
const reviewArray = [];

btn.addEventListener('click', (e) => {
    e.preventDefault();
    try {
        const productName = productNameInput.value.trim();
        const productText = productTextInput.value.trim();
        if ((productName !== '') || (productText !== '')) {
            error.textContent = '';
            let review = {
                productName: productName,
                productText: productText,
            }
            reviewArray.push(review);
            localStorage.setItem('reviews', JSON.stringify(reviewArray));
        } else {
            error.textContent = `Error! You need to fill in both fields.`
            throw new Error(`You need some text in your inputs!`)
        }
    } catch (err) {
        console.log(`Your inputs are empty!`, err);
    }

})

