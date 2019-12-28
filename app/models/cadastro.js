var ObjectID = require('mongodb').ObjectId;

function Cadastro(connection){
	this._connection = connection();
}

Cadastro.prototype.inserirUsuario = function(usuario){
	this._connection.open( function(err, mongoclient){
		mongoclient.collection("users_01", function(err, collection){
			collection.insert(usuario);
			mongoclient.close();
		});
	});
	console.log(usuario);
}
	



module.exports = function(){
	return Cadastro;
}