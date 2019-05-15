module.exports = (Sequelize, sequelize) => {
	return sequelize.define('timeBox', {
		id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncremen: true
		},
		
		idUser: Sequelize.INTEGER,
		nameTimeBox: Sequelize.STRING,
		timeCreate: Sequelize.STRING,
		textTime: Sequelize.STRING
	});
};