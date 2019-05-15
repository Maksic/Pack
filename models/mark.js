module.exports = (Sequelize, sequelize) => {
	return sequelize.define('mark', {
		id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncremen: true
		},

		idUser: Sequelize.INTEGER,
		nameMark: Sequelize.STRING
	});
};