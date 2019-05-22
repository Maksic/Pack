module.exports = (Sequelize, sequelize) => {
	return sequelize.define('mark', {
		id: {
			type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
		},

		title: Sequelize.STRING
	});
};