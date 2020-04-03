var mainMenu = $("#mainMenu");
var config = $("#config");
var gameSearch = $("#gameSearch");
var currentMenu = mainMenu;
var bigMenu = $(".menuContainer");
var gameMenu = $(".gameContainer");
var points = 0;
var choices = $(".choices");
var answerChosen = false;
var rightChoice;
var wheelSlide = $("#wheelContainer .slider");
var questionSlide = $("#choicesContainer .slider");
var backToMenuSlide = $("#backToMenuMsg .slider");
var trophySelectionSlide = $("#trophySelection .slider");
var WCselectionSlide = $("#WCselection .slider");
var currentSlide;
var nextSlide = wheelSlide;
var options = ["option 1", "option 2", "option 3", "option 4"];
var themeChosen = false;
var trophyChosen;
var trophyCount = 0;
var menuOpen = true;
var backToMenu = false;

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
  ["Itália (Correct)", "Alemanha (Wrong)", "Brasil (Wrong)", "Uruguai (Wrong)"]
);

var LibertadoresQ = new Question(
  "Libertadores",
  "Quem ganhou a Libertadores de 1967?",
  [
    "Racing de Avellaneda (Correct)",
    "Santos (Wrong)",
    "Peñarol (Wrong)",
    "Independiente de Avellaneda (Wrong)"
  ]
);

var CincoGLQ = new Question(
  "ligas",
  "Qual o maior vencedor do campeonato Francês?",
  [
    "Saint-Etiénne (Correct)",
    "Olympique Lyonnais (Wrong)",
    "Olympique De Marseille (Wrong)",
    "Paris Saint-Germain (Wrong)"
  ]
);

var UCLQ = new Question(
  "UCL",
  "Qual destes clubes já venceu uma liga dos campeões?",
  [
    "Celtic Glasgow (Correct)",
    "Arsenal-ING (Wrong)",
    "Atlético de Madrid (Wrong)",
    "Manchester City (Wrong)"
  ]
);

var WorldQ = new Question("Rest of World", "Qual clube Zico treina no Japão?", [
  "Kashima Antlers (Correct)",
  "Yokohama Marinos (Wrong)",
  "Vissel Kobe (Wrong)",
  "Gamba Osaka (Wrong)"
]);

var BrQ = new Question(
  "Brasileiro",
  "Quantas vezes o Grêmio foi campeão de torneios nacionais da primeira divisão?",
  ["8 (Correct)", "5 (Wrong)", "2 (Wrong)", "7 (Wrong)"]
);

var currentQuestion = UCLQ;
var nextQuestion = LibertadoresQ;
var questions = [CincoGLQ, LibertadoresQ, WorldQ, UCLQ, BrQ, wcQ];

function shuffle(arr) {
  for (var i = arr.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
  return arr;
}

function setQuestion(Question) {
  $("h1").text(Question.question);
  var choices = Question.randomize();
  for (i = 1; i < 5; i++) {
    var li = $("#choicesContainer li:nth-of-type(" + i + ")");
    li.text(choices[i - 1]);
  }
  rightChoice = Question.correctAnswer;
}

start();

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Main Menu

$(".menuChoices").on("click", function() {
  if ($(this).hasClass("configbtn")) {
    nextMenu(config);
  } else if ($(this).hasClass("novoJogo")) {
    nextMenu(gameSearch);
  }
});

$(".menuChoices").on("click", function() {
  if ($(this).hasClass("back")) {
    previousMenu(mainMenu);
  } else if ($(this).hasClass("procurarJogo")) {
    $(".loading").css("display", "block");
    setTimeout(function() {
      $(".player1").addClass("slideInPlayer1");
      $(".player2").addClass("slideInPlayer2");
      $(".player1").removeClass("slideOutPlayer1");
      $(".player2").removeClass("slideOutPlayer2");
      $(".loading").css("display", "none");
    }, 3500);
    setTimeout(function() {
      mainMenu.toggleClass("fadeOut");
      gameSearch.toggleClass("fadeOut");
      config.toggleClass("fadeOut");
      setTimeout(function() {
        bigMenu.toggleClass("close");
      }, 200);
      setTimeout(function() {
        bigMenu.css("z-index", "-1");
      }, 1000);
      nextPage();
    }, 3000);
  }
});

function reset() {
  $(".nextButton").css("display", "none");
  $(".choices")
    .removeClass("correctAnswer")
    .removeClass("wrongAnswer");
  answerChosen = false;
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function nextMenu(newMenu) {
  currentMenu.addClass("slideOutLeft");

  setTimeout(function() {
    currentMenu.css("display", "none");
    newMenu.css("display", "flex");
    newMenu.addClass("slideInLeft");
    currentMenu.css("pointer-events", "none");
  }, 50);
  setTimeout(function() {
    newMenu.removeClass("slideInLeft");
    currentMenu.removeClass("slideOutLeft");
  }, 800);
  setTimeout(function() {
    currentMenu = newMenu;
    currentMenu.css("pointer-events", "all");
  }, 810);
}

function previousMenu(previousMenu) {
  currentMenu.addClass("slideOutRight");
  setTimeout(function() {
    currentMenu.css("display", "none");
    previousMenu.css("display", "flex");
    previousMenu.addClass("slideInRight");
    currentMenu.css("pointer-events", "none");
  }, 50);
  setTimeout(function() {
    previousMenu.removeClass("slideInRight");
    currentMenu.removeClass("slideOutRight");
  }, 800);
  setTimeout(function() {
    currentMenu = previousMenu;
    currentMenu.css("pointer-events", "all");
  }, 810);
}

function changeMenu() {}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//QUESTIONS CODE

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
        $(".myProgress").removeClass("completed");
      } else if (points === 4) {
        addTrophy(trophyChosen);
        points = 0;
        nextSlide = wheelSlide;
        trophyCount++;
        $(".myProgress1").removeClass("completed");
        $(".myProgress2").removeClass("completed");
        $(".myProgress3").removeClass("completed");
      }
      answerChosen = true;
      $(this).addClass("correctAnswer");
      $(".myProgress" + points).addClass("completed");
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
      nextSlide = wheelSlide;
      if (points === 3) {
        $.each(trophies, function(index) {
          if (trophyChosen === trophies[index]) {
            $(
              ".trophyBtn:nth-of-type(" + (index + 1).toString() + ")"
            ).addClass("resetTrophyColors");
          }
        });
      }
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

$(".nextButton").on("click", function() {
  console.log("clicked");
  nextPage();
  setTimeout(reset(), 150);
  $(this).css("opacity", "0");
  $(this).css("display", "none");
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//WHEEL CODE

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
      // $("body").css("background-color", colors[0]);
      currentQuestion = WorldQ;
    } else if (random === 2 * 60) {
      // $("body").css("background-color", colors[5]);
      currentQuestion = LibertadoresQ;
    } else if (random === 3 * 60) {
      // $("body").css("background-color", colors[4]);
      currentQuestion = UCLQ;
    } else if (random === 4 * 60) {
      // $("body").css("background-color", colors[3]);
      currentQuestion = BrQ;
    } else if (random === 5 * 60) {
      // $("body").css("background-color", colors[2]);
      currentQuestion = wcQ;
    } else if (random === 6 * 60) {
      // $("body").css("background-color", colors[1]);
      currentQuestion = CincoGLQ;
    }
    rollContaerin.classList.add("active");
    btn.removeClass("loading");
    btn.removeAttr("disabled");
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
    setTimeout(function() {
      btn.attr("data-label", "Seguir");
    }, 200);
  } else {
    nextPage();
    setTimeout(function() {
      btn.attr("data-label", "Rodar!");
    }, 200);
  }
  themeChosen = !themeChosen;
  random = Math.ceil(Math.random() * 6) * 60;
};

btn.on("click", loading);

function nextPage() {
  var displaySlide = currentSlide;
  $(currentSlide).addClass("slideOutLeft");
  if (menuOpen) {
    if (points == 3) {
      nextSlide = trophySelectionSlide;
    }
    setTimeout(function() {
      nextSlide.toggleClass("notShowing");
      nextSlide.addClass("slideInLeft");
      $(" .wrapper").css("pointer-events", "none");
      nextSlide.parent().css("z-index", "100");
    }, 800);
    setTimeout(function() {
      if (currentSlide) {
        currentSlide.removeClass("slideOutLeft");
      }
      nextSlide.removeClass("slideInLeft");
      $(".wrapper").css("pointer-events", "all");
      $(".wrapper").css("pointer-events", "all");
    }, 1650);
    setTimeout(function() {
      currentSlide = nextSlide;
      nextSlide = questionSlide;
    }, 1750);
    menuOpen = !menuOpen;
  } else {
    if (backToMenu) {
      setTimeout(function() {
        currentSlide.toggleClass("notShowing");
        $(" .wrapper").css("pointer-events", "none");
        nextSlide.parent().css("z-index", "100");
        nextSlide = wheelSlide;
      }, 700);
      setTimeout(function() {
        currentSlide.removeClass("slideOutLeft");
        $(".wrapper").css("pointer-events", "all");
        $(".wrapper").css("pointer-events", "all");
      }, 750);
      menuOpen = !menuOpen;
      backToMenu = !backToMenu;
    } else {
      setTimeout(function() {
        setQuestion(currentQuestion);
        currentSlide.removeClass("slideOutLeft");
        currentSlide.toggleClass("notShowing");
        nextSlide.toggleClass("notShowing");
        nextSlide.addClass("slideInLeft");
        $(" .wrapper").css("pointer-events", "none");
        currentSlide.parent().css("z-index", "-1");
        nextSlide.parent().css("z-index", "100");
      }, 50);
      setTimeout(function() {
        nextSlide.removeClass("slideInLeft");
        $(".wrapper").css("pointer-events", "all");
        $(".wrapper").css("pointer-events", "all");
      }, 800);
      setTimeout(function() {
        currentSlide = nextSlide;
        nextSlide = displaySlide;
      }, 850);
    }
  }
}

/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////

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
  $(this).removeClass("resetTrophyColors");
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

//////////////////////////////////////////////
//////////////////////////////////////////////
//////////////////////////////////////////////
// Back to Menu

// $(".backToMenuBtn").click(function() {
//   nextMenu(mainMenu);
//   bigMenu.css("z-index", "100");
//   bigMenu.toggleClass("close");
//   bigMenu.toggleClass("open");
//   mainMenu.toggleClass("fadeOut");
//   gameSearch.toggleClass("fadeOut");
//   config.toggleClass("fadeOut");
//   mainMenu.toggleClass("fadeIn");
//   gameSearch.toggleClass("fadeIn");
//   config.toggleClass("fadeIn");
//   backToMenu = true;
//   nextPage();
//   setTimeout(function() {
//     bigMenu.removeClass("open");
//     mainMenu.removeClass("fadeIn");
//     gameSearch.removeClass("fadeIn");
//     config.removeClass("fadeIn");
//   }, 900);
//   $(".player1").addClass("slideOutPlayer1");
//   $(".player2").addClass("slideOutPlayer2");
//   setTimeout(function() {
//     $(".player1").removeClass("slideInPlayer1");
//     $(".player1").removeClass("slideInPlayer2");
//   }, 1000);
// });

function start() {
  nextPage();
  $(".player1").addClass("slideInPlayer1");
  $(".player2").addClass("slideInPlayer2");
  setTimeout(function() {
    $(".player1").removeClass("slideOutPlayer1");
    $(".player2").removeClass("slideOutPlayer2");
  }, 100);
}
