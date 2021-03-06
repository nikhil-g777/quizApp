/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var quiz_started = false;

module.exports = {

	'quizStarted' : function(req,res){

		quiz_started = true;
	},

	'new':function(req,res){

		// User.destroy({name:/^nik/}).exec(function(err,records){
		// 	console.log(records)
		// });

		// User.create([{
		// 	name:"nik2",
		// 	email:"nik2@gmail.com"
		// },
		// {
		// 	name:"nik3",
		// 	email:"nik3@gmail.com"
		// }
		// ]).exec(function(err,records){
		// 	console.log(records);
		// })

		res.view();
	},

	updateScore: function(req,res){

			var socketId = sails.sockets.getId(req);
			console.log('updating score');

			User.findOne({socketId:socketId}).exec(
			function(err,record){
			console.log('old score:'+record.score);
			var newScore = record.score + 1;
			var correct = record.correct + 1;
			console.log('new Score :'+newScore);
			User.update({socketId:socketId},{score:newScore,correct:correct}).exec(function(err,updated){
																console.log('updated score:'+updated[0].score);
																res.json(updated);
															});
			});

	},

	announce : function(req,res){

		if(quiz_started){

			console.log('Quiz has already started !');
			var socketId = sails.sockets.getId(req);
			sails.sockets.broadcast(socketId,{identity:'quizStarted'});

		}

		else{

			var socketId = sails.sockets.getId(req);

			console.log('Creating User !!! \n \n');

			var session = req.session;

			session.users = session.users || {};

			User.create({ name:req.body.userName,
						  socketId:socketId
						}).exec(function(err,user){
				if (err) {
					return res.serverError(err);
				}

				console.log("user:"+user.name);

				session.users[socketId] = user;

				User.subscribe(req,user);

				User.watch(req);

				sails.sockets.join(req,'commonRoom');

		//		User.publishCreate(user,req);

				res.json(user)

				sails.log('response sent');
			});
		}
	},

	masterSubscribe : function(req,res){

		var socketId = sails.sockets.getId(req);

		sails.sockets.join(req,'masterRoom');

		User.watch(req);

		quiz_started = false;
	},

	subscribeToInstance : function(req,res){

		User.subscribe(req,req.body.data);

	},

	emitReady :function(req,res){

		var socketId = sails.sockets.getId(req);
		User.findOne({socketId:socketId}).exec(function(err,user){
		sails.sockets.broadcast('masterRoom',{identity:'ready',user:user});

		});
	},

	flushUsers : function(req,res){

		User.destroy({}).exec(function(err){	
			if(err){console.log("no previous records exist");}

			console.log("All Users Destroyed !");
		})
	}
}