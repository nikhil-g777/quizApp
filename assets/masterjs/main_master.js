io.socket.on('connect',function socketConnected(){
	
	var master_qnum = 0;

	$('#startQuestions').click(function(){	

		$('#startQuestions').prop('disabled',true);

		$('#main').append('<form>');
		$('#main').append('Question '+master_qnum +') ');
		$('#main').append('<input type = "text" id = "master_'+master_qnum+'_q"><br>');
		$('#main').append('option 1 )<input type = "text" id = "master_'+master_qnum+'_opt1"><br>');
		$('#main').append('option 2 )<input type = "text" id = "master_'+master_qnum+'_'+'opt2"><br>');
		$('#main').append('option 3 )<input type = "text" id = "master_'+master_qnum+'_'+'opt3"><br>');
		$('#main').append('option 4 )<input type = "text" id = "master_'+master_qnum+'_'+'opt4"><br>');
		$('#main').append('Answer : <input type = "text" id = "master_'+master_qnum+'_'+'ans"><br>');

//		$('#main').append('<input type = "submit" value = "Submit" id="submit_'+master_qnum+'">');

		$('#main').append('</form><br><br>');

		$('#footer').append('<button type="button" id="next">Next</button>')
		master_qnum+=1;

	});	


	$('#footer').on('click','#next',function(){

		var qnum = master_qnum-1;

		 var question = {

		 	qnumber : qnum,
		    qn : $('#master_'+qnum+'_q').val(),
		 	opt1 : $('#master_'+qnum+'_opt1').val(),
		 	opt2 : $('#master_'+qnum+'_opt2').val(),
		 	opt3 : $('#master_'+qnum+'_opt3').val(),
		 	opt4 : $('#master_'+qnum+'_opt4').val(),
		 	ans : $('#master_'+qnum+'_ans').val()

		 };

		 io.socket.put('/question/createQuestion',question);

		console.log('clicked next !');

		$('#main').append('<form>');
		$('#main').append('Question '+master_qnum +') ');
		$('#main').append('<input type = "text" id = "master_'+master_qnum+'_'+'q"><br>');
		$('#main').append('option 1 )<input type = "text" id = "master_'+master_qnum+'_'+'opt1"><br>');
		$('#main').append('option 2 )<input type = "text" id = "master_'+master_qnum+'_'+'opt2"><br>');
		$('#main').append('option 3 )<input type = "text" id = "master_'+master_qnum+'_'+'opt3"><br>');
		$('#main').append('option 4 )<input type = "text" id = "master_'+master_qnum+'_'+'opt4"><br>');
		$('#main').append('Answer : <input type = "text" id = "master_'+master_qnum+'_'+'ans"><br>');

//		$('#main').append('<input type = "submit" value = "Submit" id="submit_'+master_qnum+'">');

		$('#main').append('</form><br><br>');

		master_qnum+=1;

	});

});
