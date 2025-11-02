const cake = document.getElementById('cake');
const flame = document.querySelector('.flame');
const message = document.getElementById('message');
const blowSound = document.getElementById('blowSound');
const confettiCanvas = document.getElementById('confetti');
const ctx = confettiCanvas.getContext('2d');
const cardScreen = document.querySelector('.card-screen');
const wishButton = document.getElementById('wishButton');
const tarotCard = document.querySelector('.tarot-card');
const cardText = document.querySelector('.card-text');
const giftCard = document.getElementById('giftCard');

// ===== Saat klik lilin / kue =====
cake.addEventListener('click', () => {
    blowSound.play();
    flame.style.animation = 'none';
    flame.style.opacity = 0;

    document.querySelector('.cake-container').style.opacity = 0;
    document.querySelector('.birthday-text').style.display = 'none';

    startConfetti();

    setTimeout(() => {
        document.querySelector('.cake-container').style.display = 'none';
        message.style.display = 'block';
    }, 800);
});

// ===== Saat klik tombol "Make a wish" =====
wishButton.addEventListener('click', () => {
    message.style.display = 'none';
    cardScreen.style.display = 'flex';
    setTimeout(() => {
        cardScreen.style.opacity = 1; // Fade in halus setelah tombol diklik
    }, 100);
});


// ===== Confetti Animation =====
let confettis = [];
const colors = ['#FFC0CB', '#FF69B4', '#FFD700', '#ADFF2F', '#87CEFA'];

function resizeCanvas() {
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

function createConfetti() {
    confettis = [];
    for (let i = 0; i < 150; i++) {
        confettis.push({
            x: Math.random() * confettiCanvas.width,
            y: Math.random() * confettiCanvas.height - confettiCanvas.height,
            r: Math.random() * 6 + 2,
            d: Math.random() * 2 + 1,
            color: colors[Math.floor(Math.random() * colors.length)],
            tilt: Math.random() * 10 - 10
        });
    }
}

function drawConfetti() {
    ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    confettis.forEach(c => {
        ctx.beginPath();
        ctx.lineWidth = c.r;
        ctx.strokeStyle = c.color;
        ctx.moveTo(c.x + c.tilt, c.y);
        ctx.lineTo(c.x, c.y + c.tilt + c.r);
        ctx.stroke();
    });
    updateConfetti();
}

function updateConfetti() {
    confettis.forEach(c => {
        c.y += c.d;
        c.x += Math.sin(c.y * 0.02);
        c.tilt += Math.random() * 2 - 1;

        if (c.y > confettiCanvas.height) {
            c.y = -10;
            c.x = Math.random() * confettiCanvas.width;
        }
    });
}

function startConfetti() {
    createConfetti();
    const interval = setInterval(drawConfetti, 20);
    setTimeout(() => clearInterval(interval), 10000);
}

// Saat klik tarot card
tarotCard.addEventListener('click', () => {
    // Hilangkan tarot card & teks
    tarotCard.style.opacity = 0;
    cardText.style.opacity = 0;
    setTimeout(() => {
        tarotCard.style.display = 'none';
        cardText.style.display = 'none';
        // Tampilkan gift card
        giftCard.style.display = 'flex';
        setTimeout(() => {
            giftCard.style.opacity = 1;
        }, 100);
    }, 800);
});