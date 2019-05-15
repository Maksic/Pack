module.exports = (Sequelize, sequelize) => {
	return sequelize.define('note', {
		id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncremen: true
		},

		idUser: Sequelize.INTEGER,
		nameNote: Sequelize.STRING,
		timeCreate: Sequelize.STRING,
		mark: Sequelize.STRING,
		nextNote: Sequelize.STRING
	});
};