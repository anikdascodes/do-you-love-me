const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const result = document.getElementById('result');
const container = document.querySelector('.container');
const tryAgainBtn = document.getElementById('tryAgainBtn');

let isMoving = false;

yesBtn.addEventListener('click', () => {
    result.innerHTML = "I knew you love me! 😊😘💖";
    result.classList.add('show');
    yesBtn.style.display = 'none';
    noBtn.style.display = 'none';
    tryAgainBtn.style.display = 'inline-block';
    
    setTimeout(() => {
        result.classList.add('heartbeat');
    }, 500);

    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
    });
});

function moveButton(event) {
    if (!isMoving) return;

    const containerRect = container.getBoundingClientRect();
    const btnRect = noBtn.getBoundingClientRect();

    const maxX = containerRect.width - btnRect.width;
    const maxY = containerRect.height - btnRect.height;

    const buttonCenterX = btnRect.left + btnRect.width / 2;
    const buttonCenterY = btnRect.top + btnRect.height / 2;
    const distanceX = event.clientX - buttonCenterX;
    const distanceY = event.clientY - buttonCenterY;
    const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);

    if (distance < 100) {
        const newX = Math.random() * maxX;
        const newY = Math.random() * maxY;

        noBtn.style.position = 'absolute';
        noBtn.style.left = `${newX}px`;
        noBtn.style.top = `${newY}px`;
        noBtn.style.transition = 'all 0.2s ease-out';

        noBtn.classList.add('shake');
        setTimeout(() => {
            noBtn.classList.remove('shake');
        }, 500);
    }
}

noBtn.addEventListener('mouseover', () => {
    if (!isMoving) {
        isMoving = true;
        container.addEventListener('mousemove', moveButton);
    }
});

tryAgainBtn.addEventListener('click', () => {
    result.innerHTML = '';
    result.classList.remove('show', 'heartbeat');
    yesBtn.style.display = 'inline-block';
    noBtn.style.display = 'inline-block';
    tryAgainBtn.style.display = 'none';
    isMoving = false;
    noBtn.style.position = 'static';
    container.removeEventListener('mousemove', moveButton);
});