module.exports = function (application) {
	application.get('/', function (req, res) {
		application.app.controllers.index.index(application, req, res);
	});

	application.post('/autenticar', function (req, res) {
		application.app.controllers.index.autenticar(application, req, res);
	});
	application.post('/cadastrar', function (req, res) {
		application.app.controllers.index.cadastrar(application, req, res);
	});
	application.get('/home', function (req, res) {
		application.app.controllers.home.index(application, req, res);
	});
	application.get('/erro/login', function (req, res) {
		application.app.controllers.home.index(application, req, res);
	});
	application.get('/cadastro_usuario', function (req, res) {
		application.app.controllers.cadastro.usuario(application, req, res);
	});
	const multer = require('multer');
	const storage = multer.diskStorage({
		destination: (req, file, cb) => {
			cb(null, 'app/public/img_users02')
		},
		filename: (req, file, cb) => {
			cb(null, 'imgUsers_' + file.originalname);
		}
	})
	const upload = multer({ storage })
	application.post('/cadastro_usuario', upload.single('nm_img'), function (req, res) {
		application.app.controllers.cadastro.cadastrar_usuario(application, req, res);
	});
	application.get('/views_user', function (req, res) {
		application.app.controllers.home.views(application, req, res);
	});
	application.get('/dados', function (req, res) {
		application.app.controllers.home.dados(application, req, res);
	});
	application.get('/remover_usuario', function (req, res) {
		application.app.controllers.home.remover_usuario(application, req, res);
	});
	application.post('/chat', function (req, res) {
		application.app.controllers.home.iniciaChat(application, req, res);
	});

	application.get('/chat', function (req, res) {
		application.app.controllers.home.iniciaChat(application, req, res);
	});
	application.get('/sair', function (req, res) {
		application.app.controllers.home.sair(application, req, res);
	});
}