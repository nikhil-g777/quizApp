

function addUser(user){

	var select = $('#users-list');

	var option = $('<li class = "list-group-item "id="'+user.id+'"value="'+user.name+'"">'+user.name+'</li>');
//+'<span id = "'+user.id+'_score'+'"></span>'+user.score
	console.log('adding user : '+ user.name);

	select.append(option);
}

function removeUser(user){
	console.log('removing:'+user.id);
	var id = user.id;
	$('#'+id).remove();
}


function updateUserList(users){
	users.forEach(function(user){
		addUser(user);
	});
}

function displayUserName(user){
	$('#username').html(user.name);
}

function displayScore(user){
	$('#score').html(user.score);
}

