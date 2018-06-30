$(document).ready(function() {
  var colorkey = { 0: "green", 1: "red", 2: "yellow", 3: "blue" };
  var count = 1;
  var cSeq = [];
  var uSeq = [];
  var wait;
  var gsnd = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3");
  var rsnd = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3");
  var ysnd = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3");
  var bsnd = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3");

  //function to light up buttons
  var ga = function(color) {
    wait = "on";
    $("#" + color).removeClass(color);
    $("#" + color).addClass(color + "-active");
    var snd = { green: gsnd, red: rsnd, yellow: ysnd, blue: bsnd };
    snd[color].play();

    setTimeout(function() {
      $("#" + color)
        .removeClass(color + "-active")
        .addClass(color);
    }, 700);
  };

  //
  //computer sequence
  var computerSeq = function(count) {
    $(".count-box").html(count);
    $(".container").addClass("unclickable");
    uSeq = [];
    var temp;
    if (cSeq.length + 1 === count) {
      temp = Math.floor(Math.random() * Math.floor(4));
      cSeq.push(colorkey[temp]);

      var i = 0;
      var f = function() {
        ga(cSeq[i]);
        i++;
        if (i < cSeq.length + 1) {
          setTimeout(f, 900);
        }
      };

      f();
      $(".container").removeClass("unclickable");
     
    } else if (cSeq.length === count) {
      var i = 0;
      var f = function() {
        ga(cSeq[i]);
        i++;
        if (i < cSeq.length + 1) {
          setTimeout(f, 900);
        }
      };

      f();
      $(".container").removeClass("unclickable");
    }
  };

  //
  //Start button functions
  $("#start").click(function() {
    //establishes reset button
    if ($("#start").hasClass("reset") === false) {
      computerSeq(count);
      $("#start").html('<i class="fa fa-refresh" aria-hidden="true"></i>');
      $("#start").addClass("reset"); //creates identifier for reseting game
      //prevents color buttons from working before clicking start
      //$(".container").removeClass("unclickable");
    } else {
      //resets game
      count = 1;
      cSeq = [];
      uSeq = [];
      $(".count-box").html("--");
      $("#start").removeClass("reset");
      $("#start").html("Start");
    }
  });

  //
  //strict mode code
  $("#strict").click(function() {
    if ($("#strict").hasClass("on") === false) {
      $("#strict")
        .html('<i class="fa fa-times" aria-hidden="true"></i>')
        .addClass("on");
    } else {
      $("#strict")
        .removeClass("on")
        .html("Strict");
    }
  });
  //
  //

  //
  //color button functions

  /*
  $("#green").click(function() {
   
    ga("green");
    uSeq.push("green");
    
  });

  $("#red").click(function() {
    ga("red");
    uSeq.push("red");
  });
  $("#blue").click(function() {
    ga("blue");
    uSeq.push("blue");
  });

  $("#yellow").click(function() {
    ga("yellow");
    uSeq.push("yellow");
  });
  */

  //compairs arrays
  var arraysEqual = function(arr1, arr2) {
    if (arr1.length !== arr2.length) return false;
    for (var i = arr1.length; i--; ) {
      if (arr1[i] !== arr2[i]) return false;
    }

    return true;
  };
  // checks if user satisfied sequence after each button press
  $(".container").click(function() {
    //
    if ($(this).hasClass("unclickable") === false) {
      var c = $(this).attr("id");
      ga(c);
      uSeq.push(c);
    }
    //

    console.log(uSeq);
    console.log(cSeq);
    if (arraysEqual(cSeq, uSeq)) {
      count++;
      var j = 0;
      var max = 2;
      var cont = function() {
        if (j > 0 && j < max) {
          computerSeq(count);
        } else if (j === 2) {
          j = 0;
        } else {
          setTimeout(cont, 1500);
          j++;
        }
      }; //very important otherwise computer turn will start before end of users's turn
      cont();
    } else if (
      uSeq.length >= cSeq.length &&
      arraysEqual(cSeq, uSeq) === false
    ) {
      if ($("#strict").hasClass("on")){
        count = 1;
        cSeq = [];
      }
      var j = 0;
      var max = 2;
      var cont = function() {
        if (j > 0 && j < max) {
          computerSeq(count);
        } else if (j === 2) {
          j = 0;
        } else {
          setTimeout(cont, 1500);
          j++;
        }
      }; //very important otherwise computer turn will start before end of users's turn
      cont();
      console.log("wrong");
    }
  });
});