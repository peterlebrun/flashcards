/*const foo = {
  data: [
    {
      front: "&#1488;",
      back: "Aleph"
    },
    {
      front: "Black Scholes",
      back: "\(\partial V \over \partial t\) + \(1 \over 2\)\(\sigma^2\)\(S^2\)\(\partial^2 V \over \partial S^2\) + \(rS\)\(\partial V \over \partial S\) - \(rV\) = 0 <br><br> OR <br><br> \(\Theta\) + \(1 \over 2\)\(\sigma^2\)\(S^2\)\(\Gamma\) + \(rS\)\(\Delta\) - \(rV\) = 0"
    },
    {
      front: "你好",
      back: "Hello"
    },
    {
      front: "你",
      back: "Nǐ",
    },
    {
      front: "好",
      back: "Hǎo",
    },
    {
      front: "再见",
      back: "Goodbye",
    },
    {
      front: "再",
      back: "Zài",
    },
    {
      front: "见",
      back: "Jiàn",
    }
];
console.log(foo);*/

// Acho que preciso chamar mathjax quando uso o "Black Scholes" ou otro fórmulas matemáticas
//const flashCardData = require('./data.json');

let loadJSON = callback => {
  const xObj = new XMLHttpRequest();
  xObj.overrideMimeType('application/json');
  xObj.open('GET', 'data.json', true);
  xObj.onreadystatechange = () => {
    if (xObj.readyState == 4 && xObj.status == "200") {
      window.alert(xOjb.responseText);
    }
  };
  xObj.send(null);
};
//loadJSON();
fetch('./data.json', { mode: 'no-cors' });
//window.alert(flashCardData);

const flashCard = document.getElementById("flashCard");
const newCardButton = document.getElementById("newCardButton");
let currentCard;

let selectNewCard = () => {
  currentCard = flashCardData[Math.floor(Math.random()*flashCardData.length)];
  showFront();
};

let showFront = () => {
  flashCard.innerHTML = currentCard.front;
  currentCard.isFront = true;
};

let showBack = () => {
  flashCard.innerHTML = currentCard.back;
  currentCard.isFront = false;
};

let flipCard = () => {
  if (currentCard.isFront) {
    showBack();
  } else {
    showFront();
  }
};

flashCard.addEventListener('click', flipCard);
newCardButton.addEventListener('click', selectNewCard);
selectNewCard();

/*
    {
      front: "Black Scholes",
      back: "\(\partial V \over \partial t\) + \(1 \over 2\)\(\sigma^2\)\(S^2\)\(\partial^2 V \over \partial S^2\) + \(rS\)\(\partial V \over \partial S\) - \(rV\) = 0 <br><br> OR <br><br> \(\Theta\) + \(1 \over 2\)\(\sigma^2\)\(S^2\)\(\Gamma\) + \(rS\)\(\Delta\) - \(rV\) = 0"
    },
    {
      front: "你好",
      back: "Hello"
    },
    {
      front: "你",
      back: "Nǐ",
    },
    {
      front: "好",
      back: "Hǎo",
    },
    {
      front: "再见",
      back: "Goodbye",
    },
    {
      front: "再",
      back: "Zài",
    },
    {
      front: "见",
      back: "Jiàn",
    }
  ]
}
*/
