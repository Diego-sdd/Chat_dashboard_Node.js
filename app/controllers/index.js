module.exports.index = function(application, req, res){
	res.render('index', {validacao: {}, validacaoCadastro: {}, dadosForm: {}});
}

module.exports.cadastrar = function(application, req, res){

	var dadosForm = req.body;

	req.assert('nm_adm', 'Nome não pode ser vazio').notEmpty();
	req.assert('ds_email', 'Usuário não pode ser vazio').notEmpty();
	req.assert('cd_senha', 'Senha não pode ser vazio').notEmpty();
	

	var erros = req.validationErrors();

	if(erros){
		res.render('index', {validacao: erros, dadosForm: dadosForm});
		return;
	}

	var connection = application.config.dbConnection;
	var UsuariosDAO = new application.app.models.UsuariosDAO(connection);


	UsuariosDAO.inserirUsuario(dadosForm);
	req.assert('', 'Você foi cadastrado, acesse sua conta').notEmpty();
	var confirma = req.validationErrors();
	//geração dos parametros
	res.render('index', {validacao: confirma});
}




module.exports.autenticar = function(application, req, res){
	
	var dadosForm = req.body;

	req.assert('ds_email', 'Usuário não de ser vazio').notEmpty();
	req.assert('cd_senha', 'Senha não de ser vazia').notEmpty();
	
	var erros = req.validationErrors();

	if(erros){
		res.render("index", {validacao:erros});
		return;
	}

	var connection = application.config.dbConnection;
	var UsuariosDAO = new application.app.models.UsuariosDAO(connection);

	UsuariosDAO.autenticar(dadosForm, req, res);

	//res.send('tudo ok para criar a sessão');
}

