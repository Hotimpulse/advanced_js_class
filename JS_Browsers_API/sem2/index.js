const prevBtn = document.querySelector('#prev-btn');
const nextBtn = document.querySelector('#next-btn');
const slider = document.querySelector('#slider');
const imgContainer = document.querySelector('#image-container');


const images = document.querySelectorAll('.slider-image');
const totalImgs = images.length;
const imageWidth = images[0].clientWidth;

const navigation = document.querySelector('#navigation');

let currentIndex = 0;

const updateSlider = () => {
    slider.style.transform = `translateX(${-currentIndex * imageWidth}px)`;
    updateNavigation();
}

function updateNavigation() {
    while (navigation.firstChild) {
        navigation.removeChild(navigation.firstChild);
    }
    for (let i = 0; i < totalImgs; i++) {
        const dot = document.createElement("div");
        dot.className = `nav-dot ${i === currentIndex ? 'active' : ''}`;
        dot.addEventListener("click", () => goToImage(i));
        navigation.appendChild(dot);
    }
}

updateNavigation()

function goToImage(index) {
    currentIndex = index;
    updateSlider();
}

function goToNextImage() {
    currentIndex = (currentIndex + 1) % totalImgs;
    updateSlider();
}

function goToPrevImage() {
    currentIndex = (currentIndex - 1 + totalImgs) % totalImgs;
    updateSlider();
}


prevBtn.addEventListener('click', () => {
    goToPrevImage();
});

nextBtn.addEventListener('click', () => {
    goToNextImage();
});

let autoPlayInterval = setInterval(goToNextImage, 2000);
imgContainer.addEventListener("mouseenter", () => clearInterval(autoPlayInterval));
imgContainer.addEventListener("mouseleave", () => autoPlayInterval = setInterval(goToNextImage, 2000));