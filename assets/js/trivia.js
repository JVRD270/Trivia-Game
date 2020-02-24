var random = Math.ceil(Math.random() * 4);
var points = 0;
var choices = $(".choices");
var answerChosen = false;

//Adds points, makes right answer green when selected, makes wrong answers red, makes "next question" button show up
$(".choices").on("click", function() {
  var rightChoice = $(".choices:nth-of-type(" + random.toString() + ")");
  //Making sure only 1 answer is chosen per question
  if (answerChosen === false) {
    //If clicked right answer add points and the class to make it green, also fills one progress bar
    if (!$(this).hasClass("correctAnswer") && $(this).is(rightChoice)) {
      points++;
      answerChosen = true;
      $(this).addClass("correctAnswer");
      $("#progress" + points.toString()).addClass("addPoint");
      $("#nextButton").css("display", "block");
      $("#nextButton").animate(
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
      $("#nextButton").css("display", "block");
      $("#nextButton").animate(
        {
          opacity: 1
        },
        20
      );
    }
    $("#choicesContainer").removeClass("slideOut");
  }
});

//"next question" button functionality
$("#nextButton").on("click", function() {
  random = Math.ceil(Math.random() * 4);
  var margin = $("#choicesContainer").css("marginLeft");
  var width = $("#choicesContainer").css("width");
  $("#choicesContainer").addClass("slideOut");

  choices.each(function() {
    if ($(this).hasClass("correctAnswer")) {
      $(this).removeClass("correctAnswer");
    } else {
      $(this).removeClass("wrongAnswer");
    }
  });
  answerChosen = false;
  $(this).css("display", "none");
});
