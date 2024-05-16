const canvas = document.getElementById('ticTacToeCanvas');
const ctx = canvas.getContext('2d');
const cellSize = 100;
const board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
];
let currentPlayer = 'X';

canvas.addEventListener('click', handleCanvasClick);

function drawBoard() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

   
    ctx.beginPath();
    for (let i = 1; i < 3; i++) {
        ctx.moveTo(i * cellSize, 0);
        ctx.lineTo(i * cellSize, canvas.height);
        ctx.moveTo(0, i * cellSize);
        ctx.lineTo(canvas.width, i * cellSize);
    }
    ctx.stroke();

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            const cellValue = board[i][j];
            if (cellValue !== '') {
                const x = j * cellSize + cellSize / 2;
                const y = i * cellSize + cellSize / 2;

                ctx.font = '48px Arial';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(cellValue, x, y);
            }
        }
    }
}

function handleCanvasClick(event) {
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    const col = Math.floor(mouseX / cellSize);
    const row = Math.floor(mouseY / cellSize);

    if (board[row][col] === '') {
        board[row][col] = currentPlayer;
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        drawBoard();
        checkWinner();
    }
}

function checkWinner() {
   
    for (let i = 0; i < 3; i++) {
        if (board[i][0] !== '' && board[i][0] === board[i][1] && board[i][1] === board[i][2]) {
            alert(`${board[i][0]} wins!`);
            resetBoard();
            return;
        }
    }

   
    for (let j = 0; j < 3; j++) {
        if (board[0][j] !== '' && board[0][j] === board[1][j] && board[1][j] === board[2][j]) {
            alert(`${board[0][j]} wins!`);
            resetBoard();
            return;
        }
    }

  
    if (board[0][0] !== '' && board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
        alert(`${board[0][0]} wins!`);
        resetBoard();
        return;
    }
    if (board[0][2] !== '' && board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
        alert(`${board[0][2]} wins!`);
        resetBoard();
        return;
    }


    let isDraw = true;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i][j] === '') {
                isDraw = false;
                break;
            }
        }
    }
    if (isDraw) {
        alert("It's a draw!");
        resetBoard();
    }
}

function resetBoard() {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            board[i][j] = '';
        }
    }
    currentPlayer = 'X';
    drawBoard();
}

drawBoard();
