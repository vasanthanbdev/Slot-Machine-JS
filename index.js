const prompt = require("prompt-sync")();

// deposite money
const Deposite = () => {
    while (true) {
        const DepositeAmount = parseFloat(prompt("Enter a Deposite amount: "));
        
        if (isNaN(DepositeAmount) || DepositeAmount <= 0) {
            console.log("Invalid Deposite amount Try again!");
        } else {
            return DepositeAmount;
        }
    }
}


//get number of lines
const number_of_lines = () => {
    while (true) {
        const lines = parseFloat(prompt("Enter the number of lines you want to bet: "));

        if (isNaN(lines) || lines <= 0 || lines > 3) {
            console.log("Invalid number of lines Try again!");
        } else {
            return lines;
        }
    }
}


// get the bet amount
const getBet = (balance, lines) => {
    while (true) {
        const bet = parseFloat(prompt("Enter the amount you want to bet per line: "));

        if (isNaN(bet) || bet <= 0 || bet > (balance / lines)) {
            console.log("Invalid a valid bet Try again!");
        } else {
            return bet;
        }
    }
}


// spin the slot machine
const SYMBOLS_COUNT = {
    bell: 10,
    bar: 20,
    cherry: 30,  
    lemon: 40
};


const COLS = 3; // Number of reels 
const ROWS = 4; // Number of rows per reel

const spin = () => {
    const symbols = [];

    // Fill symbols array based on SYMBOLS_COUNT
    for (const [symbol, count] of Object.entries(SYMBOLS_COUNT)) {

        for (let i = 0; i < count; i++) {
            symbols.push(symbol);  
        }
    }

    const reels = [];

    // Populate each reel randomly
    for (let i = 0; i < COLS; i++) {
        reels.push([])
        reelSymbols = [...symbols]

        for (let j = 0; j < ROWS; j++) {  
            let randomIndex = Math.floor(Math.random() * reelSymbols.length);
            let selectedSymbol;
        
            // Keep generating a random symbol until we find an unused one
            while (true) {
                selectedSymbol = reelSymbols[randomIndex];  
                if (!reels[i].includes(selectedSymbol)) break; 
                randomIndex = Math.floor(Math.random() * reelSymbols.length);    
            }
        
            reels[i].push(selectedSymbol);
            reelSymbols.splice(randomIndex, 1);      
        }
    }

    return reels;
}


// transpose the values
const transpose = (reels) => {
    const rows = [];

    for (let i = 0; i < ROWS; i++) {
        rows.push([]);

        for (let j = 0; j < COLS; j++) {
            rows[i].push(reels[j][i]);
        }
    }

    return rows;
}



// check if the user won
const SYMBOLS_VALUES = {
    bell: 100,
    bar: 200,
    cherry: 300,  
    lemon: 400
};

const getWinnings = (rows, bet, lines) => {
    let winnings = 0;
  
    for (let row = 0; row < lines; row++) {
        const symbols = rows[row];
        let allSame = true;
    
        for (const symbol of symbols) {
            if (symbol != symbols[0]) {
                allSame = false;
                break;
            }
        }
    
        if (allSame) {
            winnings += bet * SYMBOLS_VALUES[symbols[0]];
        }
    }
  
    return winnings;
}


// game function
const game = () => {
    let balance = Deposite();

    while(true) {    
        console.log("Your balance amount is, $" + balance.toString());

        const lines = number_of_lines();
        const bet = getBet(balance, lines);
        balance -= bet * lines;

        const reels = spin();
        const rows = transpose(reels);
        console.log(rows);  

        const winnings = getWinnings(rows, bet, lines);
        balance += winnings;
        console.log("You Won, $" + winnings.toString());
        console.log("Your current balance is, $" + balance.toString());

        if (balance <= 0) {
            console.log("You ran out of Money!");
            break;
        }

        const playAgain = prompt("Do you wanna play again? (y/n): ");

        if (playAgain != 'y') {
            break;
        }
    }
}


// let's play the game
game();