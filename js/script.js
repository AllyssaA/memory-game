/*jslint browser: true, devel: true, eqeq: true, plusplus: true, sloppy: true, vars: true, white: true*/
/*eslint-env browser*/
/*eslint 'no-console':0*/

// alle kaarten worden in opgslagen
var kaarten = document.querySelectorAll('.memory-kaart');
var kaartOmgedraaid = false;
var eersteKaart, tweedeKaart;
var bordSlot = false;
var restart = document.querySelector('button');
var gegevens = ['Allyssa Alimoestar', '500779082'];
var moves = 0;
var openKaarten = 0;
var counter = document.querySelector(".moves");


function gegevensHer(klas) {
    document.querySelector('.gegevens').textContent = "Gemaakt door: " + gegevens[0] + " Studentennummer: " + gegevens[1] + klas;

}
gegevensHer();
gegevensHer(" Klas: p12 Goud");

function kaartOmdraaien() {
    //zorgt ervoor dat logic niet crashed
    if (bordSlot) {
        return;
    }
    if (this == eersteKaart) {
        return;
    }

    // class omdraaien wordt toegevoegd aan een kaart
    this.classList.add('omdraaien');

    if (!kaartOmgedraaid) {
        //eerste kaart omdraaien
        kaartOmgedraaid = true;
        eersteKaart = this;
    } else {
        // tweede kaart omdraaien
        tweedeKaart = this;
        moveCounter();
        checkMatch();
    }
}

function checkMatch() {
    // check match
    if (eersteKaart.dataset.img == tweedeKaart.dataset.img) {
        kaartOpen();
    } else {
        geenMatch();
    }
}

// kaarten blijven open als het een match is
function kaartOpen() {
    eersteKaart.removeEventListener('click', kaartOmdraaien);
    tweedeKaart.removeEventListener('click', kaartOmdraaien);

    //telt aantal opgengedraaide kaarten bij elkaar op
    openKaarten++;
    // als alle kaarten zijn gematched krijg je dit bericht te zien
    if (openKaarten >= 6) {
        document.querySelector('.gefeliciteerd').textContent = "Gefeliciteerd! Het is je gelukt om alle paren te vinden. Je hebt " + moves + " paar kaarten omgedraaid.";
    }
    resetBord();
}

//geen match? kaarten worden weer omgedraaid
function geenMatch() {
    bordSlot = true;
    // setTimeout zodat je de tweede kaart te zien krijgt
    // source: https://www.w3schools.com/jsref/met_win_settimeout.asp
    setTimeout(function () {
        eersteKaart.classList.remove('omdraaien');
        tweedeKaart.classList.remove('omdraaien');

        resetBord();
    }, 1500);

}

//source: https://marina-ferreira.github.io/tutorials/js/memory-game/
function resetBord() {
    kaartOmgedraaid = false;
    bordSlot = false;
    eersteKaart = null;
    tweedeKaart = null;
}

function shuffle() {
    kaarten.forEach(function (kaart) {
        // genereert een random integer
        var random = Math.floor(Math.random() * 12);
        // kaarten krijgen een nummer
        kaart.style.order = random;
    });
}

// shuffle gebeurt bij het laden van de pagina
// source https://mkyong.com/javascript/javascript-call-funtion-after-page-load/
window.onload = shuffle();

// restart de game
function restartKnop() {
    restart = window.location.reload();
}
restart.addEventListener('click', restartKnop);

// teller van  de aantal keren dat een paar kaarten worden omgedraaid
function moveCounter() {
    moves++;
    counter.innerHTML = moves + " paar kaarten omgedraaid.";

}

//kaarten worden in een loop gezet, aan elke kaart wordt een eventlistener toegepast
//als er op een kaart wordt geklikt wordt de functie kaartOmdraaien geexecute
kaarten.forEach(function (kaart) {
    kaart.addEventListener('click', kaartOmdraaien);
});
