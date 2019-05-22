module.exports = (Sequelize, sequelize) => {
	return sequelize.define('note', {
		id: {
			type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
		},

		title: Sequelize.STRING,
		date: Sequelize.STRING,
		mark: Sequelize.STRING,
		content: Sequelize.TEXT
	});
};