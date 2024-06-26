

const test = [
  {
    img:
      "https://i.guim.co.uk/img/media/f81bb42a3314f5c4702cd08406c1bd89fa1f4fe8/0_2_2500_1499/master/2500.jpg?width=1200&height=900&quality=85&auto=format&fit=crop&s=00fdca93446c99792cfc81e7074072bc",
    title: "Marsha P Johnson",
    info: "good",
    alt: "test here",
  },
  {
    img:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/LGBT_flag_square.svg/2048px-LGBT_flag_square.svg.png",
    title: "Person 2",
    info: "shit",
    alt: "test here",
  },
  {
    img:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsno7c9dEv5Ce96wGKhEnflTfc0nX6hEiiluueIR0CJQ&s",
    title: "Event 1",
    info: "bad",
    alt: "test here",
  },
  {
    img:
      "https://www.pointofpride.org/hubfs/Imported_Blog_Media/PointOfPride_Blog_HistoryOfTheTransFlag.png#keepProtocol",
    title: "Event 2",
    info: "great",
    alt: "test here",
  },
  {
    img: "https://i.kym-cdn.com/entries/icons/facebook/000/039/484/cover7.jpg",
    title: "Person 3",
    info: "ahhhh",
    alt: "test here",
  },
  {
    img:
      "https://www.unco.edu/gender-sexuality-resource-center/images/pride-flags/Lesbian-Pride.jpg",
    title: "Event 3",
    info: "kiss kiss",
    alt: "test here",
  },
  {
    img:
      "https://upload.wikimedia.org/wikipedia/commons/7/75/Nonbinary_flag.svg",
    title: "Person 4",
    info: "mwah",
    alt: "test here",
  },
  {
    img:
      "https://upload.wikimedia.org/wikipedia/commons/2/2a/Bisexual_Pride_Flag.svg",
    title: "Event 4",
    info: "sup",
    alt: "test here",
  },
  {
    img:
      "https://www.northwestern.edu/civil-rights-office/images/progressprideflag-danielquasar-highrez.png",
    title: "Event 5",
    info: "dying",
    alt: "test here",
  },
  {
    img:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Asexual_Pride_Flag.svg/1280px-Asexual_Pride_Flag.svg.png",
    title: "Person 5",
    info: "bro",
    alt: "test here",
  },
  {
    img:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Pansexuality_Pride_Flag.svg/1200px-Pansexuality_Pride_Flag.svg.png",
    title: "Person 6",
    info: "good shit",
    alt: "test here",
  },
  {
    img:
      "https://assets.volvo.com/is/image/VolvoInformationTechnologyAB/image14?qlt=82&wid=1024&ts=1670911241536&dpr=off&fit=constrain&fmt=png-alpha",
    title: "Event 6",
    info: "bruh",
    alt: "test here",
  },
];

let infoArr = [];

let selected1 = null;
let selected2 = null;

let defaultColor = "azure";
let selectedColor = "#bbe0ff";
let successColor = "#56ae57";

let totalTime = 0;
let minute = 0;
let second = 0;

let interval;
let matches = 0;

const giimmeComkie = () => {
  var cookie = localStorage.getItem('token');
  console.log(cookie)
  if(cookie) document.cookie = `token=${cookie}`;
}

window.onload = async function () {
  giimmeComkie();
  const logoutBtn = document.getElementById("logoutButton");
	logoutBtn.onclick = () => {
		document.cookie = "token= ; expires = Thu, 01 Jan 1970 00:00:00 GMT"
		window.location = "/"
		return false
	}	
  const gameboard = document.getElementById("gameboard");
  gameboard.style.display = "none";
  const play = document.getElementById("playagain");
  play.style.display = "none";
  play.onclick = restart
  const startBtn = document.getElementById("startButton");
  startBtn.onclick = start;
  if (document.cookie) {
    console.log(document.cookie)
    const response = await fetch("/auth/test", {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${document.cookie.substring(6)}`,
      },
    }).then(response => response.text).then(response => console.log(response));
  } else {
		logoutBtn.innerHTML = "Log In"
	}


};

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

async function start() {
  const logoutBtn = document.getElementById("logoutButton")
  logoutBtn.parentElement.style.paddingTop = "0px"

  const startBtn = document.getElementById("startButton");
  startBtn.style.display = "none";

  const gameboard = document.getElementById("gameboard");
  gameboard.style.display = "flex";

  showLeaderboard();
  const response = await fetch("/load", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  })
  const resp = await response.json();
  console.log(resp)
  shuffle(resp);
  for (let i = 0; i < resp.length; i++) {
    addCell(resp[i]);
  }

  interval = setInterval(stopWatch, 1000);
  startBtn.style.display = "none";
  //setInterval(stopWatch, 1000);
}

function addCell(content) {
    infoArr.push({title: content.name, info: content.info})

    let grid = document.getElementById("grid")
    let cell = makeElem("div", "cell", "", grid)
    cell.id = content.name
    cell.addEventListener("click", select)
    cell.addEventListener("mouseenter", showInfo)
    let card = makeElem("div", "card has-text-weight-bold has-text-black", "", cell)
    let imgCard = makeElem("div", "card-image", "", card)
    let imgWrap = makeElem("figure", "image is-4by3", "", imgCard)
    let img = makeElem("img", "", null, imgWrap)
    img.src = content.img
    img.alt = content.alt
    img.title = content.alt
    let cont = makeElem("p", "is-size-7 has-text-black", content.name, card)
}

function makeElem(type, classType, inner, parent) {
  let item = document.createElement(type);
  item.className = classType;
  item.innerHTML = inner;
  parent.appendChild(item);
  return item;
}

async function select(event) {
  let elem = this.childNodes[0];
  elem.addEventListener("animationend", (e) => {
    elem.classList.remove("apply-shake");
  });
  let id = this.id;
  if (!elem.className.includes("inactive")) {
    if (id != selected1 && selected2 == null) {
      if (selected1 == null) {
        elem.style.backgroundColor = selectedColor;
        elem.style.filter = "drop-shadow(1px 1px 0.1rem black)";
        selected1 = id;
      } else {
        selected2 = id;
        let score = document.getElementById("score").innerHTML;
        let body = JSON.stringify({
          item1: selected1,
          item2: selected2,
          timeElapsed: totalTime,
          score: score,
        });
        const response = await fetch("/select", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body,
        });
        const resp = await response.json();
        handleGuess(resp);
        // handleGuess({score: 1000, validMatch: true}) //For testing purposes
      }
    } else if (id == selected1) {
      let oldSelected = document.getElementById(selected1).childNodes[0];
      oldSelected.style.backgroundColor = defaultColor;
      oldSelected.style.filter = ""
      selected1 = selected2;
      selected2 = null;
    }
  }
}

function showInfo(event) {
  let id = this.id;
  let infoSection = document.getElementById("info");
  let info = infoArr.find((element) => element.title === id).info;
  infoSection.innerHTML = info;
}

function stopWatch() {
	if(matches < 6) {
		totalTime++;
		second++;
		if (second == 60) {
			minute++;
			second = 0;
		}
		let minString = minute;
		let secString = second;

		if (minute < 10) {
			minString = "0" + minString;
		}

		if (second < 10) {
			secString = "0" + secString;
		}

		document.getElementById("min").innerHTML = minString;
		document.getElementById("sec").innerHTML = secString;        
	} else {
    console.log("game ended")
		gameover();
		matches = 0;

    clearInterval(interval)
    const play = document.getElementById("playagain");
    play.style.display = "";
	}
}

function handleGuess(resp) {
  let score = resp.score;
  let match = !(score < 0);
  if (match) {matches++}

  displayScore(score);

  let oldSelected = document.getElementById(selected1).childNodes[0];
  oldSelected.style.backgroundColor = defaultColor;
  oldSelected.style.filter = ""
  handleDisplay(selected1, match);
  handleDisplay(selected2, match);
  selected1 = null;
  selected2 = null;
}

function handleDisplay(itemID, match) {
  let item = document.getElementById(itemID).childNodes[0];
  if (match) {
    item.style.border = "2px solid " + successColor;
    item.style.backgroundColor = successColor;
    item.style.filter = ""
    item.className = item.className + " inactive";
  } else {
    item.classList.add("apply-shake")
  }
}

function displayScore(score) {
  let scoreboard = document.getElementById("score");
  let currentScore = parseInt(scoreboard.innerHTML) + score > 0 ?parseInt(scoreboard.innerHTML) + score: 0 ;
  scoreboard.innerHTML = currentScore;
}

async function showLeaderboard() {
  let board = document.getElementById("leaderboard");
  board.innerHTML='';
  const response = await fetch("/leaderboard", {
    method: "POST",
    headers: { "Content-Type": "application/json",
                
              },
  });
  const resp = await response.json();
  for (let i = 0; i < resp.length; i++) {
    let row = makeElem("tr", "", "", board);
    makeElem("td", "", resp[i].username, row);
    makeElem("td", "", resp[i].score, row);
  }
}

async function gameover(){
  console.log("game over")
	let score = document.getElementById("score").innerHTML;
	let body = JSON.stringify({score: score, time: totalTime})
	const response = await fetch("/auth/add-leaderboard-entry", {
		method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${document.cookie.substring(6)}`,
    },
		body
	}).finally(async()=>{
    console.log('fetching lb after game over event')
    await showLeaderboard()
  });
	//const resp = await response.json();
}

function restart() {
  window.location = "/play-game"
  return false
}
