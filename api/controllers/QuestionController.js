/**
 * QuestionController
 *
 * @description :: Server-side logic for managing questions
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	startQuiz : function(req,res){



		var qn = Question.find({}).exec(function(err,record){

			if(err){
				return res.serverError(err);
			}

			// Create Records if questions are not present in database
			if(!record){
				console.log('records not found');

				console.log('Creating Questions');

				var qns = ['The day after the day after tomorrow is four days before Monday. What day is it today?',
						   'Forest is to tree as tree is to ?',
						   'At a conference, 12 members shook hands with each other before & after the meeting. How many total number of hand shakes occurred?'
						   ];
				var opts =[['Monday','Tuesday','Wednesday','Thursday'],
							['plant','leaf','branch','mangrove'],
							['100','132','145','144']];
				var ans = ['Monday','leaf','132'];


				for (var i = 0; i < qns.length ; i++) {
			
					Question.create({
					number : i,
					theQuestion : qns[i],
					options:[opts[i][0],opts[i][1],opts[i][2],opts[i][3]],
					answer : ans[i]
					}).exec(function(err,question){
							if(err){
							return res.serverError(err);
							}

							console.log('one question created');
						})
				}
			}
			else{

				console.log('Records Exist');

			}
		});

		// The reciever for this broadcast message is in app.js
		 Question.find({}).exec(function(err,records){

		 sails.sockets.broadcast('commonRoom',{identity:'question',record:records[req.body.qnum]});
		 console.log('broadcasting question');
		 });
	},

	nextQuestion : function(req,res){
		
		var socketId = sails.sockets.getId(req);
		console.log('next question by socketId :'+socketId+" with qnum :"+req.body.qnum);

		if(req.body.qnum<3){

			 Question.findOne({number:req.body.qnum}).exec(function(err,records){

			 sails.sockets.broadcast(socketId,{identity:'question',record:records,qnum:(req.body.qnum)});
			 console.log('broadcasting question');
		 	 });

		}

		else{
			console.log('complete\n\n');
			sails.sockets.broadcast(socketId,{identity:'complete'});


		}
	},

	submitted : function(req,res){	

		var socketId = sails.sockets.getId(req);
		console.log("submitted by "+ socketId);
		var userOption = req.body.selectedOption;
		console.log("Selected Option recieved:"+userOption);

		Question.findOne({number:req.body.qnum}).exec(function(err,record){

			console.log('\n\n record number : '+record.number);
			console.log('qnum: '+req.body.qnum);

			var answer = record.answer;	
			var userAnswer = record.options[parseInt(userOption)];

			console.log('\n\n User Answer : '+userAnswer);
			console.log('Correct Answer :'+answer);
			var result = (answer==userAnswer?true:false);

			User.findOne({
				socketId:socketId
			}).exec(function(err,record){

				console.log("submitted by user : "+record.id);

				sails.sockets.broadcast('commonRoom',
					{
						identity:'submitted',
						userId:record.id,
						result:result
					});


			});		

		});


	}	
};