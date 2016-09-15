function addUser(user){

	var select = $('#users-list');

	var option = $('<li class = "list-group-item "id="'+user.id+'"value="'+user.name+'"">'+user.name+'</li>');
//+'<span id = "'+user.id+'_score'+'"></span>'+user.score
	console.log('adding user : '+ user.name);

	select.append(option);
}
