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



