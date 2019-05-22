module.exports = (Sequelize, sequelize) => {
    return sequelize.define('posts', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        title: Sequelize.STRING,
        content: Sequelize.TEXT,
        date: Sequelize.DATEONLY,
        rating: Sequelize.INTEGER,

        draft: Sequelize.BOOLEAN
    });
};