import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.6/firebase-app.js";

const firebaseConfig = {
    apiKey: "AIzaSyCSFwohsDgeCUfdVWh4n7xE4ArnCK-yWQk",
    authDomain: "lk-card-generator-85b88.firebaseapp.com",
    databaseURL: "https://lk-card-generator-85b88-default-rtdb.firebaseio.com",
    projectId: "lk-card-generator-85b88",
    storageBucket: "lk-card-generator-85b88.appspot.com",
    messagingSenderId: "460186348514",
    appId: "1:460186348514:web:afb604ec434fb15ad127bb"
};


const app = initializeApp(firebaseConfig);
const gallery = document.getElementById('gallery-box');

import { getStorage, ref as sRef, uploadBytesResumable, getDownloadURL }
from "https://www.gstatic.com/firebasejs/9.6.6/firebase-storage.js";

import { getDatabase, ref, set, child, get, update, remove }
from "https://www.gstatic.com/firebasejs/9.6.6/firebase-database.js";


const realdb = getDatabase();

let cards = [];

function getAllCards() {
    cards = [];
    const dbref = ref(realdb);

    get(child(dbref, "Cards"))
    .then((snapshot) => {
        console.log(snapshot)
        snapshot.forEach( card => {
            cards.push(card.val());
            console.log(cards)

            cardsToHTML(cards);
        });
    })
}

function cardsToHTML(cards) {
    gallery.innerHTML = '';
    const swiperContainer = document.createElement('div');
    swiperContainer.classList.add('swiper-container');
    const swiperWrapper = document.createElement('div');
    swiperWrapper.classList.add('swiper-wrapper');
    const swiperScroll = document.createElement('div');
    swiperScroll.classList.add('swiper-scroll-bar');

    const cardsSwiper = cards.map(card => `<div  class="swiper-slide card">
        <img loading="lazy" src="${card.image}" data-id="${card.id}">
        </div>`).join('');
        swiperWrapper.insertAdjacentHTML('beforeend', cardsSwiper);
        swiperContainer.append(swiperWrapper, swiperScroll);
        
        let postSwiper = new Swiper(swiperContainer, {
            slidesPerView: 'auto',
            spaceBetween: 10,
            loop: false, 
            autoplay: {
                delay: 2500
            }
    });

    gallery.append(swiperContainer);
}

window.addEventListener('load', getAllCards)