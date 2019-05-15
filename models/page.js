module.exports = (Sequelize, sequelize) => {
	return sequelize.define('page', {
		id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncremen: true
		},

		idUser: Sequelize.INTEGER,
		namePage: Sequelize.STRING,
		timeCreate: Sequelize.STRING,
		textPage: Sequelize.STRING
	});
};