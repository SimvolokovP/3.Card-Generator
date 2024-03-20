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

inputsStats.forEach(input => {
    input.addEventListener('input', getInfo)
})

function setOption() {
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
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(card, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(logo, 125, 625, 60, 28);

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
}

function getRating() {
    
    return Math.round((Number(speedInput.value) + Number(passInput.value) + Number(defenseInput.value) + Number(shootingInput.value) + Number(dribblingInput.value) + Number(physicsInput.value)) / 6)
}

fileInput.addEventListener('change', function(e) {
    const file = e.target.files[0];
    const reader = new FileReader();
    
    reader.onload = function(event) {
        let userImage = new Image();
        userImage.src = event.target.result;
        
        userImage.onload = function() {
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
            
            const pngDataUrl = canvas.toDataURL('image/png');
            downloadBtn.href = pngDataUrl;
        }
    };
    
    reader.readAsDataURL(file);
});
