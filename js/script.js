const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const downloadBtn = document.getElementById('downloadBtn');
const fileInput = document.getElementById('fileInput');
const nameInput = document.getElementById('nameInput');
const positionInput = document.getElementById('positionInput');
const speedInput = document.getElementById('speedInput');
const passInput = document.getElementById('passInput');
const physicsInput = document.getElementById('physicsInput');
const shootingInput = document.getElementById('shootingInput');
const dribblingInput = document.getElementById('dribblingInput');
const defenseInput = document.getElementById('defenseInput');
const options = document.querySelectorAll('.option');
const inputsStats = document.querySelectorAll('.input-stats');
const uploadProgress = document.getElementById('uploadProgress');

let userImage = '';

let pngDataUrl = canvas.toDataURL('image/png');

inputsStats.forEach(input => {
    input.addEventListener('input', getInfo)
})

positionInput.addEventListener('change', setOption)

function setOption() {
    console.log('asas')
    const targetValue = positionInput.value;
    positionInput.dataset.value = targetValue;
    getInfo();
}

let card = new Image();
let logo = new Image();
card.src = "./images/card.png";
logo.src = './images/club.svg';
card.onload = function() {
    ctx.drawImage(card, 0, 0, canvas.width, canvas.height);
    getInfo();
}

logo.onload = function() {
    ctx.drawImage(logo, 125, 625, 60, 28);
}

nameInput.addEventListener('input', getInfo)

function getInfo() {
    // Очистить холст
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Отрисовать задний фон и логотип
    ctx.drawImage(card, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(logo, 125, 625, 60, 28);

    // Отрисовать изображение пользователя, если оно выбрано
    if (userImage) {
        let newWidth = 300; 
        let newHeight = 365; 
        
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(0, 16);
        ctx.lineTo(0, newHeight);
        ctx.lineTo(newWidth, newHeight);
        ctx.lineTo(newWidth, 16);
        ctx.arcTo(newWidth, 0, newWidth - 16, 0, 16);
        ctx.lineTo(16, 0);
        ctx.arcTo(0, 0, 0, 16, 16);
        ctx.clip();
        ctx.drawImage(userImage, 0, 0, userImage.width, userImage.height, 0, 0, newWidth, newHeight);
        ctx.restore();
    }

    ctx.fillStyle = 'white';
    ctx.font = '25px Arial';
    ctx.fillText(getRating(), 40, 415);
    ctx.font = '14px Arial';
    ctx.fillText('rating', 35, 440);
    ctx.font = '16px Arial';
    ctx.fillText(`${nameInput.value}`, 120, 415);
    ctx.font = '14px Arial';
    ctx.fillText(`${positionInput.dataset.value}`, 120, 440);

    ctx.strokeStyle = '#454545';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(90, 395); 
    ctx.lineTo(90, 445); 
    ctx.stroke();

    ctx.strokeStyle = '#BA5EFF';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(108, 485); 
    ctx.lineTo(108, 610); 
    ctx.stroke();

    ctx.strokeStyle = '#BA5EFF';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(205, 485); 
    ctx.lineTo(205, 610); 
    ctx.stroke();

    ctx.font = '25px Arial';
    ctx.fillText(`${speedInput.value}`, 40, 510);
    ctx.font = '14px Arial';
    ctx.fillText('Speed', 35, 530);

    ctx.font = '25px Arial';
    ctx.fillText(`${shootingInput.value}`, 40, 580);
    ctx.font = '14px Arial';
    ctx.fillText('Shooting', 30, 600);

    ctx.font = '25px Arial';
    ctx.fillText(`${passInput.value}`, 140, 510);
    ctx.font = '14px Arial';
    ctx.fillText('Pass', 140, 530);

    ctx.font = '25px Arial';
    ctx.fillText(`${dribblingInput.value}`, 140, 580);
    ctx.font = '14px Arial';
    ctx.fillText('Dribbling', 130, 600);

    ctx.font = '25px Arial';
    ctx.fillText(`${physicsInput.value}`, 240, 510);
    ctx.font = '14px Arial';
    ctx.fillText('Physics', 232, 530);

    ctx.font = '25px Arial';
    ctx.fillText(`${defenseInput.value}`, 240, 580);
    ctx.font = '14px Arial';
    ctx.fillText('Defense', 230, 600);

    pngDataUrl = canvas.toDataURL('image/png');
    downloadBtn.href = pngDataUrl;
}

function getRating() {
    return Math.round((Number(speedInput.value) + Number(passInput.value) + Number(defenseInput.value) + Number(shootingInput.value) + Number(dribblingInput.value) + Number(physicsInput.value)) / 6)
}

fileInput.addEventListener('change', function(e) {
    const file = e.target.files[0];
    const reader = new FileReader();
    
    reader.onload = function(event) {
        let img = new Image();
        img.src = event.target.result;
        
        img.onload = function() {
            let newWidth = 300; 
            let newHeight = 365; 
            
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(0, 16);
            ctx.lineTo(0, newHeight);
            ctx.lineTo(newWidth, newHeight);
            ctx.lineTo(newWidth, 16);
            ctx.arcTo(newWidth, 0, newWidth - 16, 0, 16);
            ctx.lineTo(16, 0);
            ctx.arcTo(0, 0, 0, 16, 16);
            ctx.clip();
            ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, newWidth, newHeight);
            ctx.restore();
            
            pngDataUrl = canvas.toDataURL('image/png');
            downloadBtn.href = pngDataUrl;
        }

        userImage = img;
    };
    
    reader.readAsDataURL(file);
});


import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.6/firebase-app.js";

const randomId = () => {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

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
const uploadToBaseBtn = document.getElementById('uploadToBase');

import { getStorage, ref as sRef, uploadBytesResumable, getDownloadURL }
from "https://www.gstatic.com/firebasejs/9.6.6/firebase-storage.js";

import { getDatabase, ref, set, child, get, update, remove }
from "https://www.gstatic.com/firebasejs/9.6.6/firebase-database.js";


const realdb = getDatabase();

let uploadingImage = '';

function sendImage(dataUrl, targetId) {
    const storage = getStorage(app);
    const storageRef = sRef(storage, 'images/' + targetId + '.png');
    const metadata = {
        contentType: 'image/png'
    };

    const bytes = dataURLToUint8Array(dataUrl);

   

    const uploadTask = uploadBytesResumable(storageRef, bytes, metadata);

    uploadTask.on('state_changed',
        (snapshot) => {
            // Функция обратного вызова для отслеживания прогресса загрузки
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            uploadProgress.innerHTML = `Загружено на ${progress}%`;

            if (progress == 100) {
                alert('Карточка загружена на сайт!!!');
                uploadProgress.innerHTML = `Загрузка не начата..`;
            }
        },
        (error) => {
            // Функция обратного вызова при ошибке загрузки
            console.error('Error uploading image: ', error);
        },
        () => {
            // Функция обратного вызова при успешной загрузке
            console.log('Image uploaded successfully');
            getDownloadURL(storageRef)
                .then((downloadURL) => {
                    console.log('File available at', downloadURL);
                    uploadingImage = downloadURL;

                    set(ref(realdb, "Cards/" + targetId), {
                        id: targetId,
                        image: uploadingImage
                        
                    });
                });
        }
    );
}

function dataURLToUint8Array(dataUrl) {
    const base64String = dataUrl.split(',')[1];
    const byteCharacters = atob(base64String);
    const byteArray = new Uint8Array(byteCharacters.length);

    for (let i = 0; i < byteCharacters.length; i++) {
        byteArray[i] = byteCharacters.charCodeAt(i);
    }

    return byteArray;
}

uploadToBaseBtn.addEventListener('click', uploadCard);

async function uploadCard() {
    const targetId = randomId();
    sendImage(pngDataUrl, targetId);
}
