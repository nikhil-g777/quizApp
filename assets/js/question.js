	// function create(){

	// }

	// function startQuiz(){
	// 	console.log("Quiz started by : "+window.me.id);
	// 	displayQuestion(1);

	// 	sails.sockets.broadcast('commonRoom',{question:'First one!'});
	// }

	// function submitted(){
	// 	console.log("Submitted by : "+window.me.id);
	// }

	function displayQuestion(qnum){

		$('#question').html('Question Number:'+qnum+') '+'favourite club ?');

	}


function appendQuestion(prevQuestion,qnum){

	$('#completedQuestions').append('<br><form>');
	$('#completedQuestions').append('Question '+(qnum) +') ');
	$('#completedQuestions').append('<input type = "text" value = "'+prevQuestion.theQuestion+'" disabled><br>');
	$('#completedQuestions').append('option 1 )<input type = "text" value = "'+prevQuestion.options[0]+'" disabled><br>');
	$('#completedQuestions').append('option 2 )<input type = "text" value = "'+prevQuestion.options[1]+'" disabled><br>');
	$('#completedQuestions').append('option 3 )<input type = "text" value = "'+prevQuestion.options[2]+'" disabled><br>');
	$('#completedQuestions').append('option 4 )<input type = "text" value = "'+prevQuestion.options[3]+'" disabled><br>');
	$('#completedQuestions').append('Answer : <div id="answer_'+(qnum-1)+'">hello</div><br>');
	$('#completedQuestions').append('</form><br>');


}
