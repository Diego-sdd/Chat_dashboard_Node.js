var ObjectID = require('mongodb').ObjectId;

function JogoDAO(connection) {
	this._connection = connection();
}


JogoDAO.prototype.home = function (res, ds_email, msg) {

	this._connection.open(function (err, mongoclient) {
		mongoclient.collection("users", function (err, collection) {
			collection.find({ ds_email: ds_email }).toArray(function (err, result) {
				res.render("home", { jogo: result[0], msg: msg });
				mongoclient.close();
			});

		});

	});

}


JogoDAO.prototype.view = function (res, ds_email, msg) {

	this._connection.open(function (err, mongoclient) {
		mongoclient.collection("users_01", function (err, collection) {
			collection.find({ usuario: ds_email }).toArray(function (err, result) {
				res.render("views_user", { jogo: result, msg: msg });
				mongoclient.close();
			});

		});

	});

}

JogoDAO.prototype.dados = function (res, ds_email, msg) {

	this._connection.open(function (err, mongoclient) {
		mongoclient.collection("users_01", function (err, collection) {
			collection.find({ usuario: ds_email }).toArray(function (err, result) {
				res.render("dados", { jogo: result, msg: msg });
				mongoclient.close();
			});

		});

	});

}

JogoDAO.prototype.remover_usuario = function (_id, res) {

	this._connection.open(function (err, mongoclient) {
		mongoclient.collection("users_01", function (err, collection) {
			collection.remove({ _id: ObjectID(_id) },
				function (err, result) {
					res.redirect("home?msg=D");
					mongoclient.close();
				}
			);
		});

	});

}


module.exports = function () {
	return JogoDAO;
}