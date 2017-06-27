//NOTE: Use caution with eval(). eval() can cause security issues for more complex applications since it can run unauthorized code. 


$(document).ready(function(){

  //Declare variables
  var view = $("#view");
  var cond = true;
  //main button function
$("button").click(function(){
  //use let so that variable is not global
  let input = $(this).text();
  let viewtext = $("#view").text();
  //options for operators 
    switch(input) {
        //use fall-through for operators
      case "+":
      case "-":
      case "*":
      case "/":
        //makes sure operator can only be used after number (regex for digit in the last position of the string viewtext)
        if(/\d+$/.test(viewtext)){
        view.text(viewtext + input);
        }
        break;
    
      case "i":
        $("#info-popup").removeClass("hidden");
        break;
      case "Close":
        $("#info-popup").addClass("hidden");
        break;
      case "C":
        //deletes the last entered character
        view.text(viewtext.substring(0,viewtext.length-1));
        break;
      case "AC":
        view.text("");
        break;
      case "+/-":
        //can change sign only if there is a numerical value input
        if(viewtext && /\d+$/.test(viewtext)) {
        view.text(eval(viewtext)*-1);
        }
        break;
      case "=":
        view.text(eval(viewtext));
        break;
      default: 
        if(cond) {
          view.text(input);
          cond = false;
        } else {
          view.text(viewtext + input);
        };
                }
  
});
  
  
});