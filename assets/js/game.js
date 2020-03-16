var points = 0;
var choices = $(".choices");
var answerChosen = false;
var rightChoice;
var wheelSlide = $("#wheelContainer .slider");
var questionSlide = $("#choicesContainer .slider");
var backToMenuSlide = $("#backToMenuMsg .slider");
var trophySelectionSlide = $("#trophySelection .slider");
var WCselectionSlide = $("#WCselection .slider");
var currentSlide = wheelSlide;
var nextSlide = questionSlide;
var options = ["option 1", "option 2", "option 3", "option 4"];
var themeChosen = false;
var trophyChosen;
var trophyCount = 0;

function Player(username, profilePic, trofeus, pontos) {
  this.username = username;
  this.profilePic = profilePic;
  this.trofeus = trofeus;
  this.pontos = pontos;
}

var samplePlayer1 = new Player(
  "Dantas",
  "./assets/img/blank-profile-picture-973460_1280.png",
  ["UCL", "Libertadores"],
  2
);
var samplePlayer1 = new Player(
  "Xande",
  "./assets/img/blank-profile-picture-973460_1280.png",
  ["BR", "Mundial", "UCL"],
  1
);

function Question(theme, question, arrOfAnswers, img) {
  this.theme = theme;
  this.question = question;
  this.options = arrOfAnswers;
  this.image = img;
  this.correctAnswer = arrOfAnswers[0];
  this.randomize = function() {
    shuffle(arrOfAnswers);
    return arrOfAnswers;
  };
}

var wcQ = new Question(
  "Copa do Mundo",
  "Quem venceu a Copa do Mundo de 1938?",
  ["Itália", "Alemanha", "Brasil", "Uruguai"]
);

var LibertadoresQ = new Question(
  "Libertadores",
  "Quem ganhou a Libertadores de 1967?",
  ["Racing de Avellaneda", "Santos", "Peñarol", "Independiente de Avellaneda"]
);

var CincoGLQ = new Question(
  "ligas",
  "Qual o maior vencedor do campeonato Francês?",
  [
    "Saint-Etiénne",
    "Olympique Lyonnais",
    "Olympique De Marseille",
    "Paris Saint-Germain"
  ]
);

var UCLQ = new Question(
  "UCL",
  "Qual destes clubes já venceu uma liga dos campeões?",
  ["Celtic Glasgow", "Arsenal-ING", "Atlético de Madrid", "Manchester City"]
);

var WorldQ = new Question("Rest of World", "Qual clube Zico treina no Japão?", [
  "Kashima Antlers",
  "Yokohama Marinos",
  "Vissel Kobe",
  "Gamba Osaka"
]);

var BrQ = new Question(
  "Brasileiro",
  "Quantas vezes o Grêmio foi campeão de torneios nacionais da primeira divisão?",
  ["8", "5", "2", "7"]
);

var currentQuestion = UCLQ;
var nextQuestion = LibertadoresQ;
var questions = [LibertadoresQ, CincoGLQ, UCLQ, WorldQ, BrQ];

function shuffle(arr) {
  for (var i = arr.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
  return arr;
}

// //Adds points, makes right answer green when selected, makes wrong answers red, makes "next question" button show up
$(".choices").on("click", function() {
  //Making sure only 1 answer is chosen per question
  if (answerChosen === false) {
    if (!$(this).hasClass("correctAnswer") && $(this).text() === rightChoice) {
      points++;
      if (points === 3) {
        if (trophyCount === 5) {
          nextSlide = WCselectionSlide;
        } else {
          nextSlide = trophySelectionSlide;
        }
      } else if (points === 4) {
        addTrophy(trophyChosen);
        points = 0;
        nextSlide = wheelSlide;
        $("#progress1").removeClass("addPoint");
        $("#progress2").removeClass("addPoint");
        $("#progress3").removeClass("addPoint");
        trophyCount++;
      }
      answerChosen = true;
      $(this).addClass("correctAnswer");
      $("#progress" + points.toString()).addClass("addPoint");
      $(".nextButton").css("display", "block");
      $(".nextButton").animate(
        {
          opacity: 1
        },
        20
      );
    }
    //If it's wrong, make it red
    else {
      $(this).addClass("wrongAnswer");
      answerChosen = true;
      nextSlide = backToMenuSlide;
      $(".nextButton").css("display", "block");
      $(".nextButton").animate(
        {
          opacity: 1
        },
        20
      );
    }
  }
});

function setQuestion(Question) {
  $("h1").text(Question.question);
  var choices = Question.randomize();
  for (i = 1; i < 5; i++) {
    var li = $("#choicesContainer li:nth-of-type(" + i + ")");
    li.text(choices[i - 1]);
  }
  rightChoice = Question.correctAnswer;
}

/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
//Spinning wheel

var rot = 0;
var spinCounter = 0;
var roll = document.getElementsByClassName("roll_inner")[0];
var rollContaerin = document.getElementsByClassName("roll")[0];
var btn = $(".wheelBtn");
var spinDelay = 2;
var interval;
var random = Math.ceil(Math.random() * 6) * 60;
var colors = [
  "rgb(26, 59, 128)",
  "rgb(7, 174, 255)",
  "rgb(23, 35, 34)",
  "rgb(222, 22, 59)",
  "rgb(0, 89, 168)",
  "rgb(253, 43, 124"
];

var spinFunction = function() {
  clearInterval(interval);
  roll.style.transform = "rotateX(" + (rot + random + "deg)");
  rot = rot + 60;
  spinCounter++;

  spinDelay = parseInt(Math.log(spinCounter) * Math.log(spinCounter) * 15, 10);
  console.log(spinDelay);

  if (spinDelay < 200) {
    interval = setInterval(spinFunction, spinDelay);
  } else {
    if (random === 1 * 60) {
      $("body").css("background-color", colors[0]);
      currentQuestion = WorldQ;
    } else if (random === 2 * 60) {
      $("body").css("background-color", colors[5]);
      currentQuestion = LibertadoresQ;
    } else if (random === 3 * 60) {
      $("body").css("background-color", colors[4]);
      currentQuestion = UCLQ;
    } else if (random === 4 * 60) {
      $("body").css("background-color", colors[3]);
      currentQuestion = BrQ;
    } else if (random === 5 * 60) {
      $("body").css("background-color", colors[2]);
      currentQuestion = wcQ;
    } else if (random === 6 * 60) {
      $("body").css("background-color", colors[1]);
      currentQuestion = CincoGLQ;
    }
    rollContaerin.classList.add("active");
    btn.classList.remove("loading");
    btn.removeAttribute("disabled");
  }
};

var loading = function(e) {
  if (themeChosen === false) {
    e.preventDefault();
    e.stopPropagation();
    e.target.classList.add("loading");
    e.target.setAttribute("disabled", "disabled");
    rollContaerin.classList.remove("active");
    rot = 0;
    spinDelay = 2;
    spinCounter = 0;
    interval = setInterval(spinFunction, spinDelay);
  } else {
    nextPage();
  }
  themeChosen = !themeChosen;
  random = Math.ceil(Math.random() * 6) * 60;
};

btn.addEventListener("click", loading);

/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
//Back to menu Slide

$("#backToMenu").on("click", function() {});

/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////

//"next question" button functionality
$(".nextButton").on("click", function() {
  console.log("clicked");
  nextPage();
  setTimeout(reset(), 150);
  $(this).css("opacity", "0");
  $(this).css("display", "none");
});

function nextPage() {
  var displaySlide = currentSlide;
  console.log(displaySlide);
  console.log(currentSlide);
  console.log(nextSlide);
  $(currentSlide).addClass("slideOutLeft");
  setTimeout(function() {
    setQuestion(currentQuestion);
    currentSlide.removeClass("slideOutLeft");
    currentSlide.toggleClass("notShowing");
    nextSlide.toggleClass("notShowing");
    nextSlide.addClass("slideInLeft");
    $(" .wrapper").css("pointer-events", "none");
    currentSlide.parent().css("z-index", "-1");
    nextSlide.parent().css("z-index", "100");
  }, 100);
  setTimeout(function() {
    nextSlide.removeClass("slideInLeft");
    $(".wrapper").css("pointer-events", "all");
    $(".wrapper").css("pointer-events", "all");
  }, 500);
  setTimeout(function() {
    currentSlide = nextSlide;
    nextSlide = displaySlide;
  }, 700);
}

function reset() {
  $(".nextButton").css("display", "none");
  $(".choices")
    .removeClass("correctAnswer")
    .removeClass("wrongAnswer");
  answerChosen = false;
}

////////////////////////////// add trophies functionality

let trophies = [
  "PLTrophy",
  "LibTrophy",
  "UCLTrophy",
  "CWCTrophy",
  "BRTrophy",
  "WCTrophy"
];

function addTrophy(trophy) {
  if ($("." + trophy).hasClass("addTrophy")) {
    return 0;
  } else if (trophy === trophies[0]) {
    $("." + trophy).addClass("addTrophy");
    $("." + trophy).attr(
      "src",
      "./assets/img/Premier_league_trophy_icon_(adjusted).png"
    );
  } else if (trophy === trophies[1]) {
    $("." + trophy).addClass("addTrophy");

    $("." + trophy).attr("src", "./assets/img/libertadores.png");
  } else if (trophy === trophies[2]) {
    $("." + trophy).addClass("addTrophy");

    $("." + trophy).attr(
      "src",
      "./assets/img/champions-league-trophy-png-2.png"
    );
  } else if (trophy === trophies[3]) {
    $("." + trophy).addClass("addTrophy");

    $("." + trophy).attr(
      "src",
      "./assets/img/pngfind.com-world-cup-trophy-png-6265504.png"
    );
  } else if (trophy === trophies[4]) {
    $("." + trophy).addClass("addTrophy");

    $("." + trophy).attr(
      "src",
      "./assets/img/200px-Liga_Brasileira_(2014-).png"
    );
  } else if (trophy === trophies[5]) {
    $("." + trophy).addClass("addTrophy");

    $("." + trophy).attr("src", "./assets/img/worldcup.png");
  }
}

//////////////////////////////////////////////
//////////////////////////////////////////////
//////////////////////////////////////////////
// Trophy selection page

$(".trophyBtn").on("click", function() {
  if ($(this).hasClass("PL")) {
    $(this).css("background-color", colors[1]);
    $("body").css("background-color", colors[1]);
    trophyChosen = trophies[0];
    currentQuestion = CincoGLQ;
    $(this).css("pointer-events", "none");
  } else if ($(this).hasClass("Libertadores")) {
    $(this).css("background-color", colors[5]);
    $("body").css("background-color", colors[5]);
    trophyChosen = trophies[1];
    currentQuestion = LibertadoresQ;
    $(this).css("pointer-events", "none");
  } else if ($(this).hasClass("UCL")) {
    $(this).css("background-color", colors[4]);
    $("body").css("background-color", colors[4]);
    trophyChosen = trophies[2];
    currentQuestion = UCLQ;
    $(this).css("pointer-events", "none");
    $(this).css("pointer-events", "none");
  } else if ($(this).hasClass("CWC")) {
    $(this).css("background-color", colors[0]);
    $("body").css("background-color", colors[0]);
    trophyChosen = trophies[3];
    currentQuestion = WorldQ;
    $(this).css("pointer-events", "none");
  } else if ($(this).hasClass("BR")) {
    $(this).css("background-color", colors[3]);
    $("body").css("background-color", colors[3]);
    trophyChosen = trophies[4];
    currentQuestion = BrQ;
    $(this).css("pointer-events", "none");
  } else if ($(this).hasClass("WC")) {
    $(this).css("background-color", colors[2]);
    $("body").css("background-color", colors[2]);
    trophyChosen = trophies[5];
    currentQuestion = wcQ;
    $(this).css("pointer-events", "none");
  }
  nextSlide = questionSlide;
  setTimeout(function() {
    nextPage();
  }, 500);
});
