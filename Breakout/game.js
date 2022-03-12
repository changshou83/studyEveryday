const grid = document.querySelector('.grid');
const scoreDisplay = document.querySelector('#score');
const blockWidth = 100;
const blockHeight = 20;
const boardWidth = 560;
const boardHeight = 300;
let xDirection = -2;
let yDirection = 2;
let score = 0;
let timeId;

class Block {
    constructor(x, y) {
        this.bottomLeft = [x, y];
        this.bottomRight = [x + blockWidth, y];
        this.topRight = [x + blockWidth, y + blockHeight];
        this.topLeft = [x, y + blockHeight];
    }
}

//all my blocks
const blocks = [
    new Block(10, 270),
    new Block(120, 270),
    new Block(230, 270),
    new Block(340, 270),
    new Block(450, 270),
    new Block(10, 240),
    new Block(120, 240),
    new Block(230, 240),
    new Block(340, 240),
    new Block(450, 240),
    new Block(10, 210),
    new Block(120, 210),
    new Block(230, 210),
    new Block(340, 210),
    new Block(450, 210),
];

(function addBlocks() {
    blocks.forEach((block, index) => {
        const div = document.createElement('div');

        div.classList.add('block');
        div.style.left = block.bottomLeft[0] + 'px';
        div.style.bottom = block.bottomLeft[1] + 'px';

        grid.appendChild(div);
    });
})();

// user
const userStart = [230, 10];
let userPosition = userStart;
const user = document.createElement('div');

user.classList.add('user');
grid.appendChild(user);
drawBlocks(user, userStart);
document.addEventListener('keydown', moveBlocks('user', userPosition));

// ball
const ballDiameter = 20;
const ballStart = [270, 40];
let ballPosition = ballStart;
const ball = document.createElement('div');

ball.classList.add('ball');
grid.appendChild(ball);
drawBlocks(ball, ballStart);
timeId = setInterval(moveBlocks('ball', ballPosition), 17);

// behavior
function drawBlocks(who, position) {
    who.style.left = position[0] + 'px';
    who.style.bottom = position[1] + 'px';
}

function moveBlocks(who, position) {
    if (who === 'ball') {
        return function () {
            position[0] += xDirection;
            position[1] += yDirection;
            drawBlocks(ball, position);
            checkForCollisions();
        };
    } else if (who === 'user') {
        return function (e) {
            switch (e.key) {
                case 'ArrowLeft':
                    if (position[0] > 0) position[0] -= 10;
                    break;
                case 'ArrowRight':
                    if (position[0] < boardWidth - blockWidth)
                        position[0] += 10;
                    break;
            }
            drawBlocks(user, position);
        };
    }
}

// check for collisions
function checkForCollisions() {
    // check ball
    blocks.forEach((block, index) => {
        if (
            ballPosition[0] > block.bottomLeft[0] &&
            ballPosition[0] < block.bottomRight[0] &&
            ballPosition[1] + ballDiameter > block.bottomLeft[1] &&
            ballPosition[1] < block.topLeft[1]
        ) {
            const allBlocks = Array.from(document.querySelectorAll('.block'));
            // delete block
            allBlocks[index].classList.remove('block');
            blocks.splice(index, 1);
            // change ball direction
            changeDirection();
            // update score
            score += 1;
            scoreDisplay.innerHTML = `Score: ${score}`;
            // user win
            if (blocks.length === 0) {
                clearInterval(timeId);
                document.removeEventListener(
                    'keydown',
                    moveBlocks('user', userPosition)
                );
                scoreDisplay.innerHTML = 'You Win!';
                const dog = document.querySelector('.dog');
                dog.style.display = 'block';
            }
        }
    });
    // check wall
    if (
        ballPosition[0] >= boardWidth - ballDiameter || // right wall
        ballPosition[0] <= 0 || // left wall
        ballPosition[1] >= boardHeight - ballDiameter // top wall
    )
        changeDirection();
    // check user
    if (
        ballPosition[1] > userPosition[1] &&
        ballPosition[1] < userPosition[1] + blockHeight &&
        ballPosition[0] + ballDiameter / 2 >= userPosition[0] &&
        ballPosition[0] - ballDiameter / 2 <= userPosition[0] + blockWidth
    )
        changeDirection();

    // game over
    if (ballPosition[1] <= 0) {
        clearInterval(timeId);
        document.removeEventListener(
            'keydown',
            moveBlocks('user', userPosition)
        );
        scoreDisplay.innerHTML = 'You Lose!';
    }
}

function changeDirection() {
    // ↗ -> ↘
    if (xDirection === 2 && yDirection === 2) {
        yDirection = -2;
        return;
    }
    // ↘ -> ↙
    if (xDirection === 2 && yDirection === -2) {
        xDirection = -2;
        return;
    }
    // ↙ -> ↖
    if (xDirection === -2 && yDirection === -2) {
        yDirection = 2;
        return;
    }
    // ↗ -> ↖
    if (xDirection === -2 && yDirection === 2) {
        xDirection = 2;
        return;
    }
}
