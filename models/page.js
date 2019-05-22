module.exports = (Sequelize, sequelize) => {
	return sequelize.define('page', {
		id: {
			type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
		},

		title: Sequelize.STRING,
		date: Sequelize.STRING,
		content: Sequelize.TEXT
	});
};