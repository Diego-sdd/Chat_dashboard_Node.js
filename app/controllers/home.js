module.exports.index = function (application, req, res) {
	if (req.session.autorizado !== true) {
		res.render('erro/login');
		return;
	}

	var msg = '';
	if (req.query.msg != '') {
		msg = req.query.msg;
	}
	var ds_email = req.session.ds_email;
	var connection = application.config.dbConnection;
	var JogoDAO = new application.app.models.home(connection);
	JogoDAO.home(res, ds_email, msg);
}
module.exports.views = function (application, req, res){
	if (req.session.autorizado !== true) {
		res.render('erro/login');
		return;
	}
	var ds_email = req.session.ds_email;
	var connection = application.config.dbConnection;
	var JogoDAO = new application.app.models.home(connection);
	JogoDAO.view(res, ds_email);
};
module.exports.dados = function (application, req, res){
	if (req.session.autorizado !== true) {
		res.render('erro/login');
		return;
	}
	var ds_email = req.session.ds_email;
	var connection = application.config.dbConnection;
	var JogoDAO = new application.app.models.home(connection);
	JogoDAO.dados(res, ds_email);
};
module.exports.remover_usuario = function (application, req, res){
	var url_query = req.query;
	var connection = application.config.dbConnection;
	var JogoDAO = new application.app.models.home(connection);
	var _id = url_query.id_acao;
	JogoDAO.remover_usuario(_id, res);
};
module.exports.iniciaChat = function(application, req, res){
	var dadosForm = req.session.ds_email;
	
	var connection = application.config.dbConnection;

	application.get('io').emit(
		'msgParaCliente',
		{apelido: dadosForm , mensagem: ' Acabou de entrar no chat'}
	)

	res.render("chat", {dadosForm : dadosForm});
}
module.exports.sair = function(application, req, res){

	req.session.destroy( function(err){
		res.render("index", {validacao: {}});
	});
}