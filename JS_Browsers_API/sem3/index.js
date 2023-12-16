const unsplashApiKey = '4IL7MLNQPc_a1IsltB0jzTvHAxdASVref8LWoT4wixk';
const wrapper = document.getElementById('wrapper');
const photoElement = document.getElementById('photo');
const photographerText = document.getElementById('photographer');
const likeButton = document.getElementById('like-btn');
const likeCounter = document.getElementById('like-counter');

let likes = parseInt(localStorage.getItem('likes')) || 1;

function getRandomNumber(max) {
    return Math.floor(Math.random() * max);
}


const getPhoto = async () => {
    try {
        const rand = getRandomNumber(10);
        const response = await fetch(`https://api.unsplash.com/photos/?client_id=${unsplashApiKey}`);
        const data = await response.json();
        photoElement.src = data[rand].urls.small;
        likeCounter.textContent = likes || data[rand].likes;
        photographerText.textContent = data[rand].user.name;
    } catch (error) {
        console.error('Error fetching photo:', error);
    }
}


function updateLikes() {
    let likeNum = ++likeCounter.textContent;
    localStorage.setItem('likes', likeNum);
}

likeButton.addEventListener('click', updateLikes);

getPhoto();