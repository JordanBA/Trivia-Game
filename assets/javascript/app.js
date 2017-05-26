var triviaQuestions = [{
	question: "Which of these players is a running back for the Dallas Cowboys?",
	answerList: ["Ezekiel Elliot", "Reggie Bush", "Marshall Faulk", "Arian Foster"],
	answer: 1
},{
	question: "Which of these players is the quarterback of the New England Patriots?",
	answerList: ["Brett Favre", "Aaron Rogers", "Tom Brady", "Mark Sanchez"],
	answer: 0
},{
	question: "Which of these players is a cornerback for the Seattle Seahawks?",
	answerList: ["Terrence Newman", "Richard Sherman", "Marcus Peters", "Desmond Trufant"],
	answer: 0
},{
	question: "Which of these players is a linebacker for the Greenbay Packers?",
	answerList: ["John Lynch", "Sean Lee", "Rolando McClain", "Clay Matthews"],
	answer: 2
},{
	question: "Which of these players is the quarterback of the Carolina Panthers?",
	answerList: ["Matthew Stafford", "Joe Flacco", "Collin Kapernick", "Cam Newton"],
	answer: 3
},{
	question: "Which of these players is a cornerback for the Minnesota Vikings?",
	answerList: ["Darrel Revis", "Brandon Carr", "Xavier Rhodes", "Jimmy Smith"],
	answer: 0
},{
	question: "Which of these players is a wide receiver for the New York Giants?",
	answerList: ["Odell Beckham Jr.", "Desean Jackson", "Michael Crabtree", "Terrell Owens"],
	answer: 1
},{
	question: "Which of these players is an offensive lineman for the Philadelphia Eagles?",
	answerList: ["King Dunlap", "Travis Frederick", "Zach Martin", "Jason Peters"],
	answer: 2
},{
	question: "Which of these players is a defensive lineman for the Houston Texans?",
	answerList: ["Aaron Donald", "Gino Atkins", "Demarcus Ware", "JJ Watt"],
	answer: 1
},{
	question: "Which of these players is a wide receiver on the Oakland Raiders",
	answerList: ["Terrance Williams", "Calvin Johnson", "Roy Williams", "Amari Cooper"],
	answer: 3
},{
	question: "Which of these players is a running back for the Tennessee Titans?",
	answerList: ["Demarco Murray", "Eddie Lacy", "Marshawn Lynch", "Latavius Murray"],
	answer: 0
},{
	question: "Which of these players is the quarterback of the Atlanta Falcons?",
	answerList: ["Tony Romo", "Jay Cutler", "Drew Brees", "Matt Ryan"],
	answer: 1
},{
	question: "Which of these players is a tight end for the Detroit Lions",
	answerList: ["Jason Witten", "Jared Cooks", "Eric Ebron", "Tony Gonzalez"],
	answer: 3
},{
	question: "Which of these players is a running back for the Cincinatti Bengals?",
	answerList: ["Jeremy Hill", "Joseph Randle", "Doug Martin", "Adrian Peterson"],
	answer: 0
},{
	question: " Which of these players is a receiver for the Los Angeles Rams?",
	answerList: ["Tavon Austin", "Jerry Rice", "Dez Bryant", "AJ Green"],
	answer: 2
}];

var gifArray = ['question1', 'question2', 'question3', 'question4', 'question5', 'question6', 'question7', 'question8', 'question9', 'question10', 'question11', 'question12', 'question13','question14','question15'];
var currentQuestion; var correctAnswer; var incorrectAnswer; var unanswered; var seconds; var time; var answered; var userSelect;
var messages = {
	correct: "Yes, that's right!",
	incorrect: "No, that's not it.",
	endTime: "Out of time!",
	finished: "Alright! Let's see how well you did."
}

$('#startBtn').on('click', function(){
	$(this).hide();
	newGame();
});

$('#startOverBtn').on('click', function(){
	$(this).hide();
	newGame();
});

function newGame(){
	$('#finalMessage').empty();
	$('#correctAnswers').empty();
	$('#incorrectAnswers').empty();
	$('#unanswered').empty();
	currentQuestion = 0;
	correctAnswer = 0;
	incorrectAnswer = 0;
	unanswered = 0;
	newQuestion();
}

function newQuestion(){
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#gif').empty();
	answered = true;
	
	//sets up new questions & answerList
	$('#currentQuestion').html('Question #'+(currentQuestion+1)+'/'+triviaQuestions.length);
	$('.question').html('<h2>' + triviaQuestions[currentQuestion].question + '</h2>');
	for(var i = 0; i < 4; i++){
		var choices = $('<div>');
		choices.text(triviaQuestions[currentQuestion].answerList[i]);
		choices.attr({'data-index': i });
		choices.addClass('thisChoice');
		$('.answerList').append(choices);
	}
	countdown();
	//clicking an answer will pause the time and setup answerPage
	$('.thisChoice').on('click',function(){
		userSelect = $(this).data('index');
		clearInterval(time);
		answerPage();
	});
}

function countdown(){
	seconds = 15;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	answered = true;
	//sets timer to go down
	time = setInterval(showCountdown, 1000);
}

function showCountdown(){
	seconds--;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	if(seconds < 1){
		clearInterval(time);
		answered = false;
		answerPage();
	}
}

function answerPage(){
	$('#currentQuestion').empty();
	$('.thisChoice').empty(); //Clears question page
	$('.question').empty();

	var rightAnswerText = triviaQuestions[currentQuestion].answerList[triviaQuestions[currentQuestion].answer];
	var rightAnswerIndex = triviaQuestions[currentQuestion].answer;
	$('#gif').html('<img src = "assets/images/'+ gifArray[currentQuestion] +'.gif" width = "400px">');
	//checks to see correct, incorrect, or unanswered
	if((userSelect == rightAnswerIndex) && (answered == true)){
		correctAnswer++;
		$('#message').html(messages.correct);
	} else if((userSelect != rightAnswerIndex) && (answered == true)){
		incorrectAnswer++;
		$('#message').html(messages.incorrect);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
	} else{
		unanswered++;
		$('#message').html(messages.endTime);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
		answered = true;
	}
	
	if(currentQuestion == (triviaQuestions.length-1)){
		setTimeout(scoreboard, 5000)
	} else{
		currentQuestion++;
		setTimeout(newQuestion, 5000);
	}	
}

function scoreboard(){
	$('#timeLeft').empty();
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#gif').empty();

	$('#finalMessage').html(messages.finished);
	$('#correctAnswers').html("Correct Answers: " + correctAnswer);
	$('#incorrectAnswers').html("Incorrect Answers: " + incorrectAnswer);
	$('#unanswered').html("Unanswered: " + unanswered);
	$('#startOverBtn').addClass('reset');
	$('#startOverBtn').show();
	$('#startOverBtn').html('Start Over?');
}