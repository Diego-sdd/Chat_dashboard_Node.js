module.exports.usuario = function(application, req, res){
	
	if (req.session.autorizado !== true) {
		res.render('erro/login');
		return;
	}
	res.render('cadastro_usuario', {validacao: {}, validacaoCadastro: {}, dadosForm: {}});
}



module.exports.cadastrar_usuario = function(application, req, res){

	if (req.session.autorizado !== true) {
		res.render('erro/login');
		return;
	}

	var dadosForm = req.body;
	
	req.assert('nm_usuario', 'nome').notEmpty();
	req.assert('ds_genero', 'genero').notEmpty();
	req.assert('dt_nascimento', 'nasci').notEmpty();
	req.assert('nm_pais', 'pais').notEmpty();
	req.assert('ds_email', 'email').notEmpty();
	
	req.assert('ds_perfil', 'Adicione aluno professor').notEmpty();
	

	var erros = req.validationErrors();

	if(erros){
		res.redirect('home?msg=A');
		return;
	}
	
	var connection = application.config.dbConnection;
	var Cadastro = new application.app.models.cadastro(connection);
	
	dadosForm.usuario = req.session.ds_email;
	
	Cadastro.inserirUsuario(dadosForm);
	
	
	res.redirect('home?msg=B');
}