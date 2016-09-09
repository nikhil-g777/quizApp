

//Things to do :
// Display the questions
//Accept response and evaluate score accordingly
//Go to next question
//Display results at the end of the quiz

//var schedule = require('node-schedule');

io.socket.on('connect',function socketConnected(){
			
			var qnum = 0;

			io.socket.get('/user/announce',function(data){

			window.me = data;

			io.socket.get('/user',updateUserList);

			displayUserId(data.id);

			displayScore(data.score);
//
// Coding Practice ???
// pass the object or the value
//

		});



io.socket.on('user', function messageRecieved(message){

	io.socket.get('/user',function(users){

	});


	switch(message.verb){

		case 'created':
			addUser(message.data);
			console.log('Message:'+message+'\n\n');
			break;

		case 'destroyed':
			removeUser(message);
			console.log('removing:'+message.id);
			break;

		default:
			console.log('default case');
			break;
	}

});

io.socket.on('message',function(data){

	switch(data.identity){

		case 'question':

			$('#opt0').removeAttr('disabled');
    		$('#opt1').removeAttr('disabled');
    		$('#opt2').removeAttr('disabled');
    		$('#opt3').removeAttr('disabled');
			

			$('#question').html((data.qnum+1)+" / "+data.numOfQuestions+" ) "+data.record.theQuestion);
			$('#option0').html(data.record.options[0]);
			$('#option1').html(data.record.options[1]);
			$('#option2').html(data.record.options[2]);
			$('#option3').html(data.record.options[3]);

			$('#submit').prop('disabled',false);
			$('#result').html('');

			console.log('On Message');

			var time = 20;
		    var countdown = setInterval(function(){

			 	$('#timer').html(time);

				if(time == 0){

					clearInterval(countdown);
					qnum+=1;
					io.socket.put('/question/nextQuestion',{qnum:qnum,numOfQuestions:data.numOfQuestions});
				
				}

				time-=1;

			},1000);

			break;

		case 'submitted':
			console.log('\n\nAnswered by userid:'+data.userId);
			console.log('result:'+data.result);

			if(data.result){
				    $('#opt0').attr('disabled','disabled');
    				$('#opt1').attr('disabled','disabled');
    				$('#opt2').attr('disabled','disabled');
    				$('#opt3').attr('disabled','disabled');
				if(window.me.id == data.userId){
					$('#result').html('Correct!');
					io.socket.put('/user/updateScore',function(updated){
						displayScore(updated[0].score);
					});


				}
				else{
					$('#result').html('Answered first correctly by : '+data.userId);
				}
			}
			else{
				if(window.me.id == data.userId){
					$('#opt0').attr('disabled','disabled');
    				$('#opt1').attr('disabled','disabled');
    				$('#opt2').attr('disabled','disabled');
    				$('#opt3').attr('disabled','disabled');
					$('#result').html('Wrong!');
				}
			}
			break;

		case 'complete':
			console.log('Reached Complete case');
			var highestScore = 0;
			var winner;
			io.socket.get('/user',function(records){
				console.log('\n\nGetting user data to compare scores\n\n');
				records.forEach(function(data){
					if(data.score>highestScore){
						highestScore = data.score;
						winner = data.id;
						console.log('winner is' + winner);
						console.log('score:'+highestScore);
					}
				});
				$('#result').html('winner is '+winner);

			});
			break;
	}
		
})

$('#startQuiz').click(function(){
	$('#startQuiz').prop('disabled',true);
	io.socket.put('/question/startQuiz',{qnum:qnum});
});

$(".btn-group button").on("click", function(){
    var num = $(this).attr('value');
    io.socket.put('/question/submitted',{selectedOption:num,qnum:qnum});
    $('#opt0').attr('disabled','disabled');
    $('#opt1').attr('disabled','disabled');
    $('#opt2').attr('disabled','disabled');
    $('#opt3').attr('disabled','disabled');
});

// $('#submit').click(function(){

// 	var sel = $('input[name = opt]:checked','#radioButtonsForm').val();
// 	console.log('Selected Option:'+sel);
// 	io.socket.put('/question/submitted',{selectedOption:sel,qnum:qnum});

// });



});

//$('#update-name').click(updateUserName);

// io.socket.on('disconnect',function socketDisconnected(){

// 	console.log('User Disconnected');
// 	alert('User has disconnected');

// })

