$(document).ready(function() {
  //start canvas js
  var canvas = document.querySelector("canvas");
  canvas.width = $("#outclock").innerWidth();
  canvas.height = $("#outclock").innerHeight();
  var c = canvas.getContext("2d");

  var fac = 0;
  c.beginPath();
  c.arc(155, 155, 150, 0 - Math.PI / 2, Math.PI * 2 - Math.PI / 2, false); //just creates outline
  c.lineWidth = 10;
  c.strokeStyle = "white";
  c.stroke();

  //end canvas js
  var sound = new Audio("http://soundbible.com/grab.php?id=1598&type=wav");

  var plset;
  var wvali = $("#wvalue").val();
  //$("#view").text(wvali + " min");
  $("button").click(function() {
    //fix bug when user types a value
    var wval = $("#wvalue").val();

    var rval = $("#rvalue").val();

    var timeremaining1 = parseInt(wval) * 60;
    var timeremaining2 = parseInt(rval) * 60;
    var index = 0;
    //countdown function
    function playfunc() {
      var colors = [
        "#FF0000",
        "#FF0000",
        "#FF7F00",
        "#FFFF00",
        "#00FF00",
        "#0000FF",
        "#4B0082",
        "#9400D3"
      ];
      var colorsb = [
        "#FF0000",
        "#FF7F00",
        "#FFFF00",
        "#00FF00",
        "#0000FF",
        "#4B0082",
        "#9400D3"
      ];
      var colors2 = [
        "#996666",
        "#997366",
        "#998066",
        "#998c66",
        "#999966",
        "#8c9966",
        "#809966",
        "#739966",
        "#669966",
        "#669973",
        "#669980",
        "#66998c",
        "#669999",
        "#668c99",
        "#668099",
        "#667399",
        "#666699",
        "#736699",
        "#806699",
        "#8c6699",
        "#996699",
        "#99668c",
        "#996680",
        "#996673",
        "#996666"
      ];
      if (index >= colors.length) {
        index = 0;
      }

      //$("body").css("background-color", colorsb[index]);
      index++;
      $("#view").addClass("inProgress");
      if (timeremaining1 > 0) {
        $("#comm").text("Work!");
        timeremaining1 = timeremaining1 - 1;
        $("#view").text(
          (timeremaining1 - timeremaining1 % 60) / 60 +
            " min " +
            timeremaining1 % 60 +
            " sec"
        );
        var fc = (parseInt(wval) - timeremaining1) / 60 / parseInt(wval);

        //moving canvas circle
        c.beginPath();
        c.arc(
          155,
          155,
          150,
          0 - Math.PI / 2,
          Math.PI * 2 * fc - Math.PI / 2,
          false
        ); //just creates outline
        c.lineTo(155, 155);
        c.closePath();
        c.fillStyle = "#004d4d";
        c.fill();
        c.lineWidth = 1;
        c.strokeStyle = "#004d4d";
        c.stroke();
      } else if (timeremaining1 === 0) {
        //moving canvas circle
        c.beginPath();
        c.arc(
          155,
          155,
          150,
          0 - Math.PI / 2,
          Math.PI * 2 * 1 - Math.PI / 2,
          false
        ); //just creates outline
        c.lineTo(155, 155);
        c.closePath();
        c.fillStyle = "#004d4d";
        c.fill();
        c.lineWidth = 1;
        c.strokeStyle = "#004d4d";
        c.stroke();

        sound.play();
        timeremaining1--;
      } else if (timeremaining1 < 0 && timeremaining2 > 0) {
        $("#comm").text("Break!");
        timeremaining2 = timeremaining2 - 1;
        $("#view").text(
          (timeremaining2 - timeremaining2 % 60) / 60 +
            " min " +
            timeremaining2 % 60 +
            " sec"
        );

        var fc2 = (parseInt(rval) - timeremaining2) / 60 / parseInt(rval);
        //moving canvas circle
        c.beginPath();
        c.arc(
          155,
          155,
          153,
          0 - Math.PI / 2,
          Math.PI * 2 * fc2 - Math.PI / 2,
          false
        ); //just creates outline
        c.lineTo(155, 155);
        c.closePath();
        c.fillStyle = "white";
        c.fill();
        c.lineWidth = 1;
        c.strokeStyle = "white";
        c.stroke();
      } else if (timeremaining2 === 0) {
        //moving canvas circle
        c.beginPath();
        c.arc(
          155,
          155,
          153,
          0 - Math.PI / 2,
          Math.PI * 2 * 1 - Math.PI / 2,
          false
        ); //just creates outline
        c.lineTo(155, 155);
        c.closePath();
        c.fillStyle = "white";
        c.fill();
        c.lineWidth = 1;
        c.strokeStyle = "white";
        c.stroke();

        sound.play();
        timeremaining2--;
        $("#view").removeClass("inProgress");
        // $("#view").text(wval + " min");
        $("#comm").text("");
        clearInterval(plset);
      }
    }
    //button functions
    var selector = $(this).prop("id"); //have to hse var instrad of let--this ifentified the id of the button
    switch (selector) {
      case "wplus":
        wval++;
        $("#wvalue").attr("value", wval);
        //$("#view").text(wval + " min");
        break;
      case "wminus":
        if (wval === "0") {
          wval = 0;
        } else {
          wval--;
        }
        $("#wvalue").attr("value", wval);
        //$("#view").text(wval + " min");
        break;
      case "rplus":
        rval++;
        $("#rvalue").attr("value", rval);
        break;
      case "rminus":
        if (rval === "0") {
          rval = 0;
        } else {
          rval--;
        }
        $("#rvalue").attr("value", rval);
        break;
      case "play":
        //avoids being able to call playfunc more than one at a time
        if ($("#view").hasClass("inProgress") === false) {
          plset = setInterval(playfunc, 1000);
        }
        break;
      case "stop":
        clearInterval(plset);
        //moving canvas circle
        c.beginPath();
        c.arc(
          155,
          155,
          153,
          0 - Math.PI / 2,
          Math.PI * 2 * 1 - Math.PI / 2,
          false
        ); //just creates outline
        c.lineTo(155, 155);
        c.closePath();
        c.fillStyle = "white";
        c.fill();
        c.lineWidth = 1;
        c.strokeStyle = "white";
        c.stroke();
        $("#comm").text("");
        $("#view").text("");
        $("#view").removeClass("inProgress");
        break;
    }
  });
});