module.exports = (Sequelize, sequelize) => {
	return sequelize.define('diary', {
		id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncremen: true
		},
		
		idAuthor: Sequelize.INTEGER,
		namePage: Sequelize.STRING,
		timeCreate: Sequelize.STRING,
		textPage: Sequelize.STRING
	});
};