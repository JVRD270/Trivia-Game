var mainMenu = $("#mainMenu");
var config = $("#config");
var gameSearch = $("#gameSearch");
var currentSlide = mainMenu;

jQuery(window).load(function() {
  if (sessionStorage.getItem("inGame") == "true") {
    $("#circle").css("z-index", "400");
    circleShrink();
    sessionStorage.setItem("inGame", "false");
  } else {
    $("#circle")
      .css("width", "30px")
      .css("height", "30px");
  }
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Main Menu

$(".menuChoices").on("click", function() {
  if ($(this).hasClass("configbtn")) {
    nextSlide(config);
  } else if ($(this).hasClass("novoJogo")) {
    nextSlide(gameSearch);
  }
});

$(".menuChoices").on("click", function() {
  if ($(this).hasClass("back")) {
    previousSlide(mainMenu);
  } else if ($(this).hasClass("procurarJogo")) {
    setTimeout(circleGrow(), 3000);
  }
});

function circleGrow() {
  $("h3").css("display", "block");
  setTimeout(function() {
    $("h3").text("Partida Encontrada!");
  }, 2000);
  setTimeout(function() {
    $("#circle").css("z-index", "10");
    $("#circle").animate({ width: "3000", height: "3000" }, 2000);
  }, 3000);
}

function circleShrink() {
  $("#circle").animate({ width: "30", height: "30" }, 1500);
  setTimeout(function() {
    $("#circle").css("z-index", "0");
  }, 800);
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function nextSlide(newSlide) {
  currentSlide.addClass("slideOutLeft");

  setTimeout(function() {
    currentSlide.css("display", "none");
    newSlide.css("display", "flex");
    newSlide.addClass("slideInLeft");
    currentSlide.css("pointer-events", "none");
  }, 50);
  setTimeout(function() {
    newSlide.removeClass("slideInLeft");
    currentSlide.removeClass("slideOutLeft");
  }, 500);
  setTimeout(function() {
    currentSlide = newSlide;
    currentSlide.css("pointer-events", "all");
  }, 510);
}

function previousSlide(previousSlide) {
  currentSlide.addClass("slideOutRight");
  setTimeout(function() {
    currentSlide.css("display", "none");
    previousSlide.css("display", "flex");
    previousSlide.addClass("slideInRight");
    currentSlide.css("pointer-events", "none");
  }, 50);
  setTimeout(function() {
    previousSlide.removeClass("slideInRight");
    currentSlide.removeClass("slideOutRight");
  }, 500);
  setTimeout(function() {
    currentSlide = previousSlide;
    currentSlide.css("pointer-events", "all");
  }, 510);
}
