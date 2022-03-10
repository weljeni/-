const wordE1 = document.getElementById('word');
const wrongLettersE1 = document.getElementById('wrong-letters');
const playAgainBtn = document.getElementById('play-button');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');
const figureParts = document.querySelectorAll(".figure-part");
const podcast = document.getElementById("nn")


const words = ['облака', 'земля', 'школа', 'игра', 'сом'];

let selectedWord = words[Math.floor(Math.random() * words.length)];

const correctLetters = [];
const wrongLetters = [];


if (selectedWord === 'облака') {
    podcast.innerHTML = (`<h3>Как сахарная вата<h3>`)
} else if (selectedWord === 'земля') {
    podcast.innerHTML = (`<h3>Где все люди живут<h3>`)
} else if (selectedWord === 'школа') {
    podcast.innerHTML = (`<h3>Школьники ходят в ...<h3>`)
} else if (selectedWord === 'игра') {
    podcast.innerHTML = (`<h3>Это..<h3>`)
} else if (selectedWord === 'сом') {
    podcast.innerHTML = (`<h3>Киргизкая волюта<h3>`)
}
console.log(podcast)



function displayWord() {
    wordE1.innerHTML = `${selectedWord.split('').map(letter => `<span class="letter">${correctLetters.includes(letter) ? letter : '#'}</span>`).join('')}`;

    const innerWord = wordE1.innerText.replace(/\n/g, '');
    if (innerWord === selectedWord) {
        finalMessage.innerText = 'Поздравляем! Ты выиграл! 🥳👍';
        popup.style.display = 'flex';
    }
}




function updateWrongLetterE1() {

    wrongLettersE1.innerHTML = `
    ${wrongLetters.length > 0 ? '<p>Буквы которые уже вели </p>' : ''}
    ${wrongLetters.map(letter => `<span>${letter}</span>`)}
    `;


    figureParts.forEach((part, index) => {
        const errors = wrongLetters.length;

        if (index < errors) {
            part.style.display = 'block'
        }
        else {
            part.style.display = 'none';
        }
    });

    if (wrongLetters.length === figureParts.length) {
        finalMessage.innerText = 'К сожалению, вы проиграли. 😕';
        document.getElementById('finaly-massage1').innerHTML = 'Ответ был: ' + selectedWord;
        popup.style.display = 'flex';

    }
}


function showNotification() {
    notification.classList.add('show');

    setTimeout(() => {
        notification.classList.remove('show');
    }, 2000);
}


window.addEventListener('keydown', e => {
    if (e.keyCode >= 65 && e.keyCode <= 90) {
        const letter = e.key;

        if (selectedWord.includes(letter)) {
            if (!correctLetters.includes(letter)) {
                correctLetters.push(letter);

                displayWord();
            } else {
                showNotification();
            }
        } else {
            if (!wrongLetters.includes(letter)) {
                wrongLetters.push(letter);

                updateWrongLetterE1();
            } else {
                showNotification();
            }
        }
    }
});



playAgainBtn.addEventListener('click', () => {

    correctLetters.splice(0);
    wrongLetters.splice(0);

    selectedWord = words[Math.floor(Math.random() * words.length)];

    displayWord();

    updateWrongLetterE1();

    popup.style.display = 'none';
});

displayWord();