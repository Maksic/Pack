module.exports = (Sequelize, sequelize) => {
	return sequelize.define('timeBox', {
		id: {
			type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
		},
		
		title: Sequelize.STRING,
		date: Sequelize.STRING,
		content: Sequelize.STRING
	});
};