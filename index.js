var playing = false;
var score;
var trialsLeft;
var step;
var action;
var fruits = ['0', '1', '2', '3', '4', '5', '6', '7', '8'];
$(function(){

$("#startreset").click(function(){

    if(playing == true){

        location.reload();
    }else{

        playing = true; 

        score = 0; 
        $("#scorevalue").html(score);
       
        $("#trialsLeft").show();
        trialsLeft = 3;
        addHearts();
        
        $("#gameOver").hide();
        $("#startreset").html("Reset Game");

        startAction();
    }
});

$("#fruit1").mouseover(function(){
    score++;
    $("#scorevalue").html(score); 

    $("#slicesound")[0].play();

    clearInterval(action);

    $("#fruit1").hide("explode", 500); 

    setTimeout(startAction, 800);
});

function addHearts(){
    $("#trialsLeft").empty();
    for(i = 0; i < trialsLeft; i++){
        $("#trialsLeft").append('<img src="images/heart.jpeg" class="life">');
    }
}

function startAction(){

    $("#fruit1").show();
    chooseFruit(); 
    $("#fruit1").css({'left' : Math.round(550*Math.random()), 'top' : -50}); 

    step = 1+ Math.round(5*Math.random()); 

    action = setInterval(function(){

        $("#fruit1").css('top', $("#fruit1").position().top + step);

        if($("#fruit1").position().top > $("#fruitsContainer").height()){
           
            if(trialsLeft > 1 ){
               
                $("#fruit1").show();
                chooseFruit();
                $("#fruit1").css({'left' : Math.round(550*Math.random()), 'top' : -50}); 

                step = 1+ Math.round(5*Math.random()); 

                trialsLeft --;

                addHearts();

            }else{ 
                playing = false; 
                $("#startreset").html("Start Game"); 
                $("#gameOver").show();
                $("#gameOver").html('<p>Game Over!</p><p>Your score is '+ score +'</p>');
                $("#trialsLeft").hide();
                stopAction();
            }
        }
        if (score > 25) {
            // Double the speed of falling fruit when the score is more than 30
            step = 1 + Math.round(20 * Math.random());
        } else if (score > 15) {
            // Increase the speed of falling fruit when the score is more than 15
            step = 1 + Math.round(15 * Math.random());
        } else {
            step = 1 + Math.round(5 * Math.random());
        }
    }, 10);
}

function chooseFruit(){
    var randomFruit = fruits[Math.floor(Math.random() * fruits.length)];
    $("#fruit1").attr('src' , 'images/' + randomFruit + '.jpeg');
}

function stopAction(){
    clearInterval(action);
    $("#fruit1").hide();
}
});