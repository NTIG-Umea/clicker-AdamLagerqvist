/* Med document.queryselector(selector) kan vi hämta
* de element som vi behöver från html dokumentet.
* Vi spearar elementen i const variabler då vi inte kommer att
* ändra dess värden.
* Läs mer: 
* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const
* https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector
* Viktigt: queryselector ger oss ett html element eller flera om det finns.
*/
const clickerButton = document.querySelector('#click');
const moneyTracker = document.querySelector('#money');
const mpsTracker = document.querySelector('#mps');
const followerTracker = document.querySelector('#followers');
const upgradeList = document.querySelector('#upgradelist');
const upgradeList2 = document.querySelector('#upgradelist2');
const msgbox = document.querySelector('#msgbox');

/* Följande variabler använder vi för att hålla reda på hur mycket pengar som
 * spelaren, har och tjänar.
 * last används för att hålla koll på tiden.
 * För dessa variabler kan vi inte använda const, eftersom vi tilldelar dem nya
 * värden, utan då använder vi let.
 * Läs mer: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let
 */
let money = 0;
let moneyPerClick = 1;
let moneyPerSecond = 0;
let last = 0;
let F = "placeholder";

/* Med ett valt element, som knappen i detta fall så kan vi skapa listeners
 * med addEventListener så kan vi lyssna på ett specifikt event på ett html-element
 * som ett klick.
 * Detta kommer att driva klickerknappen i spelet.
 * Efter 'click' som är händelsen vi lyssnar på så anges en callback som kommer
 * att köras vi varje klick. I det här fallet så använder vi en anonym funktion.
 * Koden som körs innuti funktionen är att vi lägger till moneyPerClick till 
 * money.
 * Läs mer: https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
 */
clickerButton.addEventListener('click', () => {
  // vid click öka score med 1
  money += moneyPerClick;
  // console.log(clicker.score);
}, false);

/* För att driva klicker spelet så kommer vi att använda oss av en metod som heter
 * requestAnimationFrame.
 * requestAnimationFrame försöker uppdatera efter den refresh rate som användarens
 * maskin har, vanligtvis 60 gånger i sekunden.
 * Läs mer: https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame
 * funktionen step används som en callback i requestanaimationframe och det är 
 * denna metod som uppdaterar webbsidans text och pengarna.
 * Sist i funktionen så kallar den på sig själv igen för att fortsätta uppdatera.
 */
function step(timestamp) {
  if(money >= 1000000){
    moneyTracker.textContent = (money/1000000).toFixed(2) + ' miljoner'
  }else if(money >= 1000){
    moneyTracker.textContent = (money/1000).toFixed(2) + ' tusen'
  }else{
    moneyTracker.textContent = Math.round(money);
  }
  mpsTracker.textContent = moneyPerSecond;
  followerTracker.textContent = moneyPerClick;

  upgrades.forEach(upgrade => {
    document.getElementById(upgrade.name + ' total').textContent = 'You have ' + upgrade.count + ' making a total of ' + upgrade.amount * upgrade.count + '  PPS'
    if(upgrade.cost <= money){
     document.getElementById(upgrade.name + ' cost').style.color = 'limegreen'
    }else{
      document.getElementById(upgrade.name + ' cost').style.color = 'Firebrick'
    }
  });

  if (timestamp >= last + 10) {
    money += moneyPerSecond * 0.01;
    last = timestamp;
  }
  window.requestAnimationFrame(step);
}

/* Här använder vi en listener igen. Den här gången så lyssnar iv efter window
 * objeket och när det har laddat färdigt webbsidan(omvandlat html till dom)
 * När detta har skett så skapar vi listan med upgrades, för detta använder vi 
 * en forEach loop. För varje element i arrayen upgrades så körs metoden upgradeList
 * för att skapa korten. upgradeList returnerar ett kort som vi fäster på webbsidan
 * med appendChild.
 * Läs mer:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
 * https://developer.mozilla.org/en-US/docs/Web/API/Node/appendChild
 * Efter det så kallas requestAnimationFrame och spelet är igång.
 */
window.addEventListener('load', (event) => {
  console.log('page is fully loaded');
  upgrades.forEach(upgrade => {
    upgradeList.appendChild(createCard(upgrade));
  });
  upgrades2.forEach(upgrade2 => {
    upgradeList2.appendChild(createCard2(upgrade2));
  });
  window.requestAnimationFrame(step);
});

/* En array med upgrades. Varje upgrade är ett objekt med egenskaperna name, cost
 * och amount. Önskar du ytterligare text eller en bild så går det utmärkt att 
 * lägga till detta.
 * Läs mer:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer
 */
upgrades = [
  {
    name: '"Friends"',
    cost: 10,
    amount: 1,
    count: 0,
    up: 1,
    index: 0
  },
  {
    name: 'Luberjack',
    cost: 110,
    amount: 10,
    count: 0,
    up: 1,
    index: 1
  },
  {
    name: 'Chain saw',
    cost: 1210,
    amount: 100,
    count: 0,
    up: 1,
    index: 2
  },
  {
    name: 'Pen shredder',
    cost: 13310,
    amount: 1000,
    count: 0,
    up: 1,
    index: 3
  },
  {
    name: 'Harvester',
    cost: 146410,
    amount: 10000,
    count: 0,
    up: 1,
    index: 4
  }
]

upgrades2 = [];

/* createCard är en funktion som tar ett upgrade objekt som parameter och skapar
 * ett html kort för det.
 * För att skapa nya html element så används document.createElement(), elementen
 * sparas i en variabel så att vi kan manipulera dem ytterligare.
 * Vi kan lägga till klasser med classList.add() och text till elementet med
 * textcontent = 'värde'.
 * Sedan skapas en listener för kortet och i den hittar vi logiken för att köpa
 * en uppgradering.
 * Funktionen innehåller en del strängar och konkatenering av dessa, det kan göras
 * med +, variabel + 'text'
 * Sist så fäster vi kortets innehåll i kortet och returnerar elementet.
 * Läs mer:
 * https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement
 * https://developer.mozilla.org/en-US/docs/Web/API/Element/classList
 * https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent
 * https://developer.mozilla.org/en-US/docs/Web/API/Node/appendChild
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String
 */

function createCard2(upgrade2) {
  const card2 = document.createElement('div');
  card2.setAttribute("id", upgrade2.tag);
  card2.classList.add('card');
  const header2 = document.createElement('p');
  header2.classList.add('title');
  const cost2 = document.createElement('p');
  cost2.setAttribute("id", upgrade2.name + ' cost2')
  cost2.style.fontWeight = 900
  cost2.style.fontSize = "x-large"
  cost2.style.margin = "10px"


  header2.textContent = upgrade2.name2;
  cost2.textContent = upgrade2.cost2 + ' P';

  card2.addEventListener('click', (e) => {
    if (money >= upgrade2.cost2) {
      money -= upgrade2.cost2;
      moneyPerSecond = 0;
      upgrades[upgrade2.upFor].amount = upgrades[upgrade2.upFor].amount * upgrade2.upAmount;
    for (i = 0; i < upgrades.length; i++){
      moneyPerSecond += upgrades[i].amount * upgrades[i].count;
    }
    document.getElementById(upgrades[upgrade2.upFor].name).textContent = upgrades[upgrade2.upFor].name + ', +' + upgrades[upgrade2.upFor].amount + ' PPS.';
    document.getElementById(upgrade2.tag).remove();
    F = upgrade2.tag;
    upgrades2 = upgrades2.filter(i => i.tag != F)
    }
  });

  card2.appendChild(header2);
  card2.appendChild(cost2);
  window.requestAnimationFrame(step);
  return card2;
}

function createCard(upgrade) {
  const card = document.createElement('div');
  card.classList.add('card');
  const header = document.createElement('p');
  header.classList.add('title');
  header.setAttribute("id", upgrade.name)
  const total = document.createElement('p');
  total.setAttribute("id", upgrade.name + ' total')
  const cost = document.createElement('p');
  cost.setAttribute("id", upgrade.name + ' cost')
  cost.style.fontWeight = 900
  cost.style.fontSize = "x-large"
  cost.style.margin = "10px"

  header.textContent = upgrade.name + ', +' + upgrade.amount + ' PPS.';
  cost.textContent = upgrade.cost + ' P';
  total.textContent = 0;

  card.addEventListener('click', (e) => {
    if (money >= upgrade.cost) {
      followers++;
      moneyPerClick++;
      money -= upgrade.cost;
      upgrade.cost = Math.round(upgrade.cost * 1.15);
      cost.textContent = upgrade.cost + ' P';
      moneyPerSecond = 0;
      upgrade.count++
      for (i = 0; i < upgrades.length; i++){
        moneyPerSecond += upgrades[i].amount * upgrades[i].count;
      }
      if(upgrade.up * 10 <= upgrade.count){
        let upgrade2 = {upFor: upgrade.index,tag: upgrade.name + upgrade.count, upAmount: 2, name2: upgrade.name + " x" + 2, cost2: upgrade.cost * 5} ;
        upgrades2.push(upgrade2);
        upgrade.up++;
        upgradeList2.appendChild(createCard2(upgrade2));
        window.requestAnimationFrame(step);
      } 
    }
  });

  card.appendChild(header);
  card.appendChild(total);
  card.appendChild(cost);
  return card;
}

/* Message visar hur vi kan skapa ett html element och ta bort det.
 * appendChild används för att lägga till och removeChild för att ta bort.
 * Detta görs med en timer.
 * Läs mer: 
 * https://developer.mozilla.org/en-US/docs/Web/API/Node/removeChild
 * https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setTimeout
 */
function message(text, type) {
  const p = document.createElement('p');
  p.classList.add(type);
  p.textContent = text;
  msgbox.appendChild(p);
  setTimeout(() => {
    p.parentNode.removeChild(p);
  }, 2000);
}