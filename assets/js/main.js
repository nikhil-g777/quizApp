
io.socket.on('connect',function socketConnected(){
			

			var qnum = 0;
			var previousAnswer ='';

			var userName = prompt("Enter your Name");


			io.socket.put('/user/announce',{userName:userName},function(data){

				window.me = data;

				io.socket.get('/user',function(users){
					users.forEach(function(user){
						if(user.ready == true){
							addUser(user);
						}
					});

				});
			if(userName!=='master'){

				displayUserName(data);

				displayScore(data);
			}
				
				});


io.socket.on('user', function messageRecieved(message){

	io.socket.get('/user',function(users){

	});

	switch(message.verb){

		case 'created':
			 addUser(message.data);
			break;

		case 'destroyed':
			removeUser(message);
			console.log('removing:'+message.id);
			break;

		case 'updated':
			addUser(message.data);
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
			

			$('#question').html((data.qnum+1)+' ) '+data.record.theQuestion);

			$('#option0').html(data.record.options[0]);
			$('#option1').html(data.record.options[1]);
			$('#option2').html(data.record.options[2]);
			$('#option3').html(data.record.options[3]);

			if(data.qnum!=0){

				appendQuestion(data.prevQuestion,qnum);
				 $("#answer_"+(qnum-1)).html(previousAnswer);
				 previousAnswer = '';

			}

			$('#result').html('');

			console.log('On Question');

			var time = 15;
		    var countdown = setInterval(function(){

			 	$('#timer').html(time);

				if(time == 0){
				    $('#opt0').attr('disabled','disabled');
				    $('#opt1').attr('disabled','disabled');
				    $('#opt2').attr('disabled','disabled');
				    $('#opt3').attr('disabled','disabled');


					clearInterval(countdown);
					qnum+=1;
					io.socket.put('/user/emitReady');
				}

				time-=1;

			},1000);

			break;

		case 'submitted':
			console.log('\n\nAnswered by userid:'+data.userId);
			console.log('result:'+data.result);
			previousAnswer = data.userAnswer;
			// $("#answer_0").html('efwf');
			if(data.result){
				  	$('#opt0').attr('disabled','disabled');
    				$('#opt1').attr('disabled','disabled');
    				$('#opt2').attr('disabled','disabled');
    				$('#opt3').attr('disabled','disabled');
//					$('#result').html('Correct!');
					io.socket.put('/user/updateScore',function(updated){
//						displayScore(updated[0]);

					});
			}
			// else{
			// 		$('#result').html('Wrong!');
			// }
			
			break;

		case 'quizStarted' :
				$('.row').remove();
				$('#main').append('<p>Quiz has already Started ! </p>');
				break;

		case 'complete':
				console.log('Reached Complete case for user');

				console.log('totalQuestions'+data.totalQuestions);
				appendQuestion(data.prevQuestion,qnum);
				$("#answer_"+(qnum-1)).html(previousAnswer);

			var userId = window.me.id;
			io.socket.get('/user/'+userId,function(records){

				$('#result').html('Quiz is Complete ! \n\n');
				$('#result').append('Your score is : '+records.score+' / '+data.totalQuestions);
		 	});

			break;
	}
		
})

$('#ready').click(function(){
	$('#ready').prop('disabled',true);
	io.socket.put('/question/ready',{qnum:qnum});
});

$(".btn-group-vertical button").on("click", function(){
    var num = $(this).attr('value');
    io.socket.put('/question/submitted',{selectedOption:num,qnum:qnum});

    $('#opt0').attr('disabled','disabled');
    $('#opt1').attr('disabled','disabled');
    $('#opt2').attr('disabled','disabled');
    $('#opt3').attr('disabled','disabled');
});

});


