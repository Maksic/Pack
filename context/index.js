module.exports = (Sequelize, config) => {
    const options = {
        host: '127.0.0.1',
        dialect: 'mysql',
        logging: false,
        define: {
            timestamps: true,
            paranoid: true,
        }
    };

    const sequelize = new Sequelize(config.db.name, config.db.user, config.db.password, options);

    const User = require('../models/user')(Sequelize, sequelize);
    const Role = require('../models/role')(Sequelize, sequelize);
    const Post = require('../models/post')(Sequelize, sequelize);
    const Note = require('../models/note')(Sequelize, sequelize);
    const Mark = require('../models/mark')(Sequelize, sequelize);
    const Page = require('../models/page')(Sequelize, sequelize);
    const TimeBox = require('../models/timeBox')(Sequelize, sequelize);

    // User <-> Role
    User.belongsToMany(Role, { through: 'userRoles' });
    Role.belongsToMany(User, { through: 'userRoles' });

    // Post -> User
    Post.belongsTo(User);
    User.hasMany(Post);

    // Note -> User
    Note.belongsTo(User);
    User.hasMany(Note);

    // Mark -> User
    Mark.belongsTo(User);
    User.hasMany(Mark);

    // Page -> User
    Page.belongsTo(User);
    User.hasMany(Page);

    // TimeBox -> User
    TimeBox.belongsTo(User);
    User.hasMany(TimeBox);

    return {
        users: User,
        roles: Role,
        posts: Post,
        notes: Note,
        marks: Mark,
        pages: Page,
        timeBoxs: TimeBox,

        sequelize,
        Sequelize,
    };
};