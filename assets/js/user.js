

function addUser(user){

	var select = $('#users-list');

	var option = $('<li class = "list-group-item "id="'+user.id+'"value="'+user.id+'"">'+user.id+'</li>');

	console.log('adding user : '+ user.id);

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

function displayUserId(str){
	$('#username').html(str);
}

function displayScore(score){
	$('#score').html(score);
}
