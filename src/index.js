import './style.css';
const MathJax = require("mathjax3").MathJax;
const MathJax_TeX = require("mathjax3/mathjax3/input/tex").TeX;
const MathJax_AllPackages = require('mathjax3/mathjax3/input/tex/AllPackages').AllPackages;
const MathJax_SVG = require("mathjax3/mathjax3/output/svg").SVG;
const liteAdaptor = require('mathjax3/mathjax3/adaptors/liteAdaptor.js').liteAdaptor;
const RegisterHTMLHandler = require('mathjax3/mathjax3/handlers/html.js').RegisterHTMLHandler;
RegisterHTMLHandler(liteAdaptor());
const tmpObj = MathJax.document(document, {
  InputJax: new MathJax_TeX({
    packages: MathJax_AllPackages
  }),
  OutputJax: new MathJax_SVG({})
});

const flashCard = document.getElementById("flashCard");
const newCardButton = document.getElementById("newCardButton");
let current;
let flashCardData;

let selectNewCard = () => {
  current = flashCardData[Math.floor(Math.random() * flashCardData.length)];
  showFront();
};

let showFront = () => {
  flashCard.innerHTML = current.front;
  current.isFront = true;
};

let showBack = () => {
  flashCard.innerHTML = current.back;
  current.isFront = false;
  MathJax.typeset();
};

let flipCard = () => {
  if (current.isFront) {
    showBack();
  } else {
    showFront();
  }
};

flashCard.addEventListener('click', flipCard);
newCardButton.addEventListener('click', selectNewCard);

fetch('api/flashcards')
  .then(response => response.json())
  .then(data => {
    flashCardData = data.data;
    selectNewCard();
});
