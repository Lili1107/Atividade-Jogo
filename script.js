let score = 0;
let target = document.getElementById('target');
let intervalId;
let timerId;

function moveTarget() {
    const newX = Math.random() * (window.innerWidth - target.offsetWidth);
    const newY = Math.random() * (window.innerHeight - target.offsetHeight);

    target.style.left = newX + 'px';
    target.style.top = newY + 'px';
}

function startGame() {
    score = 0;
    document.getElementById('score').textContent = score;
    startMoving();
    startTimer();
}

function startMoving() {
    intervalId = setInterval(moveTarget, 2000); // Move o alvo a cada 2 segundos (2000 milissegundos)
}

function stopMoving() {
    clearInterval(intervalId);
}

function startTimer() {
    let seconds = 60;
    timerId = setInterval(() => {
        seconds--;
        if (seconds === 0) {
            clearInterval(timerId);
            stopMoving();
            endGame();
        }
    }, 1000); // Atualiza o temporizador a cada segundo (1000 milissegundos)
}

function endGame() {
    let message;
    if (score >= 150) {
        message = "Parabéns! Você venceu!";
    } else {
        message = "Não foi dessa vez. Tente novamente!";
    }
    alert(message);
}

function handleClick(event) {
    const x = event.clientX;
    const y = event.clientY;

    const centerX = target.offsetLeft + target.offsetWidth / 2;
    const centerY = target.offsetTop + target.offsetHeight / 2;

    const distanceSquared = (x - centerX) ** 2 + (y - centerY) ** 2;

    if (distanceSquared <= (target.offsetWidth / 2) ** 2) {
        score += 10;
        document.getElementById('score').textContent = score;
    }
}

document.getElementById('startButton').addEventListener('click', startGame);
document.addEventListener('click', handleClick);

