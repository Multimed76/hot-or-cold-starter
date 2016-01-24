//initialize variables
'use strict';
var scrtNmb, 
usrGss, 
gssHsty = [], 
cnt,
guessHtml, 
usrFdbk,
gssed,
nwBtn,
form ,
input,
fdbk,
cntElnt,
gssLt;

//
$(document).ready(preLoad);

 function preLoad(){
	
	/*--- Display information modal box ---*/
  	$('.what').click(function(){
    	$('.overlay').fadeIn(1000);
  	});
  	/*--- Hide information modal box ---*/
  	$('a.close').click(function(){
  		$('.overlay').fadeOut(1000);
  	});

  	//fetch dom objects
  	nwBtn = $('a.new');
  	form = $('form');
  	input = form.find('#userGuess');
  	fdbk = $('#feedback');
  	cntElnt = $('#count');
  	gssLt = $('#guessList');

    //page load
    newGame();
    //event handlers
    form.submit(function(event){
      event.preventDefault();
      getUsrGss();
    });
    nwBtn.click(newGame);
}

//keep track of guess count
function gssCnt(){
	cnt++;
}

//keep track of the users past guesses
function trkGss(){
	gssHsty.push(usrGss);
	guessHtml = '';
	if(gssHsty[0].length) {
		$.each(gssHsty,function(guess,value){
			guessHtml += '<li>' + value + '</li>';
		});
	}
}

//get the user guess
function getUsrGss(){
	//get the user guess
	usrGss = input.val();
	//reset input value
	input.val('');
	//focus on input for next guess
	input.focus();
	//ensure valid input
	if(chkAns()){return ;}
	//generate fdbk
	genFdbk();
	//track the past user guesses
	trkGss();
	//increment the count
	gssCnt();
	//draw changes to the page
	drw();
}

//generate user feedback
function genFdbk(){
	if(scrtNmb == usrGss){
		winner();
	} else if(Math.abs(scrtNmb - usrGss) < 5){
		usrFdbk = 'Boiling Point';
		$("h2").css('background','#F84E02');
		$("#newFdbk").text('');
	} else if(Math.abs(scrtNmb - usrGss) < 10 && Math.abs(scrtNmb - usrGss) > 4){
		usrFdbk = 'Hot';
		$("h2").css('background','#B51010');
		$("#newFdbk").text('');
	} else if(Math.abs(scrtNmb - usrGss) < 20 && Math.abs(scrtNmb - usrGss) > 9){
		usrFdbk = 'Warm';
		$("h2").css('background','#CFB81D');
		$("#newFdbk").text('');
	} else if(Math.abs(scrtNmb - usrGss) < 30 && Math.abs(scrtNmb - usrGss) > 19){
		usrFdbk = 'Little Warm';
		$("h2").css('background','#D7902B');
		$("#newFdbk").text('');
	} else if(Math.abs(scrtNmb - usrGss) < 40 && Math.abs(scrtNmb - usrGss) > 29){
		usrFdbk = 'Cold';
		$("h2").css('background','#0A64CF');
		$("#newFdbk").text('');
	} else {
		usrFdbk = 'Freezing';
		$("h2").css('background','#6E84EB');
		$("#newFdbk").text('');
	}
}

//check for valid input
function chkAns(){
	if(usrGss % 1 !== 0){
		//feedback when your user uses only text chars not number
		$("#newFdbk").text("please input only numbers");
		return true;
	}
	if(usrGss < 0 || usrGss > 101){
		//feedback to the user if they use numbers beyond 100 o negative numbers
		$("#newFdbk").text('Try a number between 0 and 100');
		return true;
	}
	if(gssHsty.length > 0){
		$.each(gssHsty,function(guess,value){//loop through the entire guess history array to look for any number that has been repated by the user guess
			if(usrGss == value){//compare the equality of each value in the array
				gssed = true;//set taht guessed value to true
			}
		}); 
	}
	if(gssed){//here we evaluate the guessed number previusly found as a repeated number input by the user
		gssed = false;
		//if the user repeats any number, they will get this feedback
		$("#newFdbk").text('You already used this number');
		return true;
	}
return false;
}

//annouce the user that they guess the number correctly
function winner(){
	$("h2").css('background','#F84E02');
	usrFdbk = 'Well Done! Select new game to replay';
	$('#guessButton').attr( 'disabled', true ); 
	$('#userGuess').attr( 'disabled', true ); 
}

//reset variable 
function resetVars(){
	cnt = 0;
	gssHsty = [];
	guessHtml='';
	usrGss = '';
	$("#newFdbk").text('');
	$("h2").css('background','#6b6b6b');
	usrFdbk = 'Make your Guess!';
	$('#guessButton').attr( 'disabled', false ); 
	$('#userGuess').attr( 'disabled', false );
}

//new game function
function newGame(){
	resetVars();
	drw();
	genNmb();
}

//page draw function
function drw(){
	gssLt.html(guessHtml);
	cntElnt.html(cnt);
	fdbk.html(usrFdbk);
}
  	
//generate a secret number
function genNmb(){
	scrtNmb = Math.floor(Math.random()*100)+1;//create a secret number by randomizing each time the game starts or restarts
}
