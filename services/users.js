const Promise = require('bluebird');
const CrudService = require('./crud');
const hash = require('../helpers/hash');

class UsersService extends CrudService {
    constructor(usersRepository, rolesRepository, errors) {
        super(usersRepository, errors);

        this.usersRepository = usersRepository;
        this.rolesRepository = rolesRepository;
    }

    async get(req) {
        const role = await this.rolesRepository.findOne({
            where: {
                id: req
            }
        });
        return role;
    }

    async update(data) {
        let user = {
            password: data.password && hash.get(data.password),
            firstname: data.firstname,
            lastname: data.lastname
        };

        return super.update(data.id, user);
    }

    async grant(userId, roleId) {
        const [ user, role ] = await Promise.all([
            this.repository.findByPk(userId),
            this.rolesRepository.findByPk(roleId),
        ]);

        if (!user || !role) {
            throw this.errors.invalidId;
        }

        await user.addRole(role);
    }

    async revoke(userId, roleId) {
        const [ user, role ] = await Promise.all([
            this.repository.findByPk(userId),
            this.rolesRepository.findByPk(roleId),
        ]);

        if (!user || !role) {
            throw this.errors.invalidId;
        }

        await user.removeRole(role);
    }
}

module.exports = UsersService;