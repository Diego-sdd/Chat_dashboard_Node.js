
function UsuariosDAO(connection){
	this._connection = connection();
	
}


UsuariosDAO.prototype.inserirUsuario = function(usuario, req){

	

	this._connection.open( function(err, mongoclient){
		mongoclient.collection("users", function(err, collection){
			collection.insert(usuario);
			mongoclient.close();
		});
	});


}

UsuariosDAO.prototype.autenticar = function(usuario, req, res){
	this._connection.open( function(err, mongoclient){
		mongoclient.collection("users", function(err, collection){
			collection.find(usuario).toArray(function(err, result){

				if(result[0] != undefined){

					req.session.autorizado = true;

					req.session.ds_email = result[0].ds_email;
					req.session.cd_senha= result[0].cd_senha;
					
				}

				if(req.session.autorizado){
					res.redirect("home");
				
				} 
				else {
					req.assert('', 'Login ou senha incorreto').notEmpty();
	
					var erro = req.validationErrors();
					res.render("index", {validacao:erro});
					
				}

			});
			mongoclient.close();
		});
	});
}


module.exports = function(){
	return UsuariosDAO;
}