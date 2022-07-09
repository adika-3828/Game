var buttonColours = ["green", "red", "yellow", "blue"]
var ans = []
var pressd = []
var stat = "blm-a"
var gameov = "blm-kalah"

function nextSequence() {
  randomNumber = Math.floor(Math.random() * 4);
  return randomNumber;
}


function checkAns(i) {

  for (i; i < ans.length; i++) {
    if (ans[i] !== pressd[i] && i < pressd.length) {
      return gameOver();
    } else if (ans.length - 1 === i && ans[i] === pressd[i]){
      return start();
    }};
}

function start() {
  pressd = [];
  stat = "udh-a";
  gameov = "blm-kalah";
  $("#level-title").text("Level " + (ans.length + 1));
  var num = nextSequence()
  setTimeout(function() {
    var newList = buttonColours[num];
    $("#"+newList).animate({
      opacity: 0.5
    }).animate({
      opacity: 1
    });
  }, 400);
  setTimeout(function(){
    var sound = new Audio("sounds/"+ buttonColours[num] +".mp3");
    sound.play();
  }, 600);
  ans.push(buttonColours[num]);
  console.log("start berakhir, ans = " + ans);
}

function gameOver() {
ans = [];
pressd = [];
stat = "blm-a";
var sound = new Audio("sounds/wrong.mp3");
sound.play();
$("body").addClass("game-over");
setTimeout(function() {
  $("body").removeClass("game-over");
  }, 100);
$("#level-title").text("Game Over, Press Any Key to Restart");
gameov = "kalah"
}


$("body").keypress(function(ev) {
  if (ev.key === "a" && stat === "blm-a" || gameov === "kalah") {
    start();
  }
});

$(".btn").click(function() {
var $this = $(this);
  // pressd.push("#" + $this.attr("id"));
  pressd.push($this.attr("id"));
  $this.addClass("pressed")
  setTimeout(function() {
    $this.removeClass("pressed");
    }, 100);
  var sound = new Audio("sounds/"+ $this.attr("id") +".mp3");
  sound.play();
  checkAns(0);
});
