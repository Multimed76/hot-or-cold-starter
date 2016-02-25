//initialize variables
'use strict';
/*var nwBtn, //window
form , //window
input, //window
fdbk, //window
cntElnt, //window
gssLt,
game; //window*/
//separate window from the game and MVC
//define my Viewer to handle all of the feedback from the game (controller)
$(document).ready(preLoad);

	var wndwElmnts = {
	  //fetch dom objects
	  //these need to be :
	 nwBtn: $('a.new'),
	 form: $('form'),
	 input: $(document).find('#userGuess')[0],
	 fdbk: $('#feedback'),
	 cntElnt: $('#count'),
	 gssLt: $('#guessList'),
	 game: newGame()
	};
//

 function preLoad(){
	/*--- Display information modal box ---*/
  	$('.what').click(function(){
    	$('.overlay').fadeIn(1000);
  	});
  	
  	/*--- Hide information modal box ---*/
  	$('a.close').click(function(){
  		$('.overlay').fadeOut(1000);
  	});
  	
    //page load
    wndwElmnts.game.init();
    //event handlers
    wndwElmnts.form.submit(function(event){
      event.preventDefault();
      getUsrGss();
      event.target.querySelector("input").value = "";
    });
    wndwElmnts.nwBtn.click(newGame);
	}
	
	//viewer handler for the DOM
	function displayIt(values, cnt, gssHsty) {
		$(wndwElmnts.cntElnt).text(cnt);

		if(gssHsty && gssHsty.length) {
			//dom
			wndwElmnts.gssLt.empty();
			$.each(gssHsty,function(guess,value){
				wndwElmnts.gssLt.append('<li>' + value + '</li>');
			});
		}
		//winner rendering
		//what is won?
		if(values == "won") {
			$("h2").css('background','#F84E02');
		//	usrFdbk = 'Well Done! Select new game to replay';
			$('#guessButton').attr( 'disabled', true ); 
			$('#userGuess').attr( 'disabled', true ); 
		}
		//reset feedback values
		if(values == "startOver"){
		//	$("#newFdbk").text('');
			$("h2").css('background','#6b6b6b');
			values = 'Make your Guess!';
			$('#guessButton').attr( 'disabled', false ); 
			$('#userGuess').attr( 'disabled', false );
		}
		//check answers feedback
		if(values == "tpNmbr"){
			//feedback when your user uses only text chars not number
			values = "please input only numbers";
		}
		if(values == "tooFar"){
			//feedback to the user if they use numbers beyond 100 o negative numbers
			values = 'Try a number between 0 and 100';
		}
		if(values == "repeated"){
			//if the user repeats any number, they will get this feedback
			values = 'You already used this number';	
		}
		//feedback for boiling hot, hot, warm, little warm, cold and freezing
		if(values == "boiling") {
//			usrFdbk = 'Boiling Point';
			$("h2").css('background','#F84E02');
//			$("#newFdbk").text(values);
		}
		if(values == "hot"){
		//	usrFdbk = 'Hot';
			$("h2").css('background','#B51010');
		//	$("#newFdbk").text('');	
		}
		if(values == "warm"){
		//	usrFdbk = 'Warm';
			$("h2").css('background','#CFB81D');
		//	$("#newFdbk").text('');	
		}
		if(values == "little warm"){
		//	usrFdbk = 'Little Warm';
			$("h2").css('background','#D7902B');
		//	$("#newFdbk").text('');	
		}
		if(values == "cold"){
		//	usrFdbk = 'Cold';
			$("h2").css('background','#0A64CF');
		//	$("#newFdbk").text('');	
		}
		if(values == "freezing"){
		//	usrFdbk = 'Freezing';
			$("h2").css('background','#6E84EB');
		//	$("#newFdbk").text('');
		}
		$("#feedback").text(values);
	}
	
	//get the user guess
	function getUsrGss(){
		//get the user guess
		//alert($(wndwElmnts.input).val());
		wndwElmnts.game.getGuess($(wndwElmnts.input).val());
		//reset input value
		$(wndwElmnts.input).val('');
		//focus on input for next guess
		$(wndwElmnts.input).focus();
	}
	
	//annouce the user that they guess the number correctly
	//userFdbk needs to come from game
	function winner(){
		displayIt("won");
	}

	//new game function
	function newGame() {
		var scrtNmb,
		usrGss, 
		gssHsty = [],
		cnt,
		guessHtml,
		usrFdbk,
		gssed;
		alert(usrGss);
		//generate a secret number
		function genNmb(){
			scrtNmb = Math.floor(Math.random()*100)+1;//create a secret number by randomizing each time the game starts or restarts
			alert(scrtNmb)
	}

	//
	function resetVars() {
		cnt = 0;
		gssHsty = [];
		guessHtml='';
		usrGss = '';
		displayIt ("startOver");
	}

	//keep track of the users past guesses
	function trkGss(){
		//alert(usrGss)
		gssHsty.push(usrGss);
		guessHtml = '';
	}

	//check for valid input
	function chkAns(){
		
		if(usrGss % 1 !== 0){
			displayIt ("tpNmbr");
			return true;
		}
		if(usrGss < 0 || usrGss > 101){
			displayIt ("tooFar");
			return true;
		}
		
		if(gssHsty.length > 0) {
			$.each(gssHsty,function(guess,value){//loop through the entire guess history array to look for any number that has been repated by the user guess
				if(usrGss == value){//compare the equality of each value in the array
					gssed = true;//set that guessed value to true
				}
			}); 
		}
		if(gssed){//here we evaluate the guessed number previusly found as a repeated number input by the user
			gssed = false;
			displayIt("repeated");
			return true;
		}
		return false;
	}
	//keep track of guess count
	function gssCnt(){
		cnt++;
	}
	//generate user feedback
	function genFdbk(){
	//	alert(usrGss)
		if(scrtNmb == usrGss){
			//winner();
			usrFdbk = "won";
			
		} else if(Math.abs(scrtNmb - usrGss) < 5){
			usrFdbk = "boiling";

		} else if(Math.abs(scrtNmb - usrGss) < 10 && Math.abs(scrtNmb - usrGss) > 4){
			usrFdbk = "hot";

		} else if(Math.abs(scrtNmb - usrGss) < 20 && Math.abs(scrtNmb - usrGss) > 9){
			usrFdbk = "warm";

		} else if(Math.abs(scrtNmb - usrGss) < 30 && Math.abs(scrtNmb - usrGss) > 19){
			usrFdbk = "little warm";

		} else if(Math.abs(scrtNmb - usrGss) < 40 && Math.abs(scrtNmb - usrGss) > 29){
			usrFdbk = "cold";

		} else {
			usrFdbk = "freezing";

		}
		displayIt(usrFdbk);
	}
	
	return {
		init: function() {
			resetVars();
			displayIt(usrFdbk);
			genNmb();
		},
		getGuess: function(guess) {
			usrGss = guess;
			//ensure valid input
			if(chkAns()){return ;}
			//generate fdbk
			genFdbk();
			//track the past user guesses
			trkGss();
			//increment the count
			gssCnt();
			//draw changes to the page
			displayIt(usrFdbk, cnt, gssHsty);
		}
	};
}
