class CrudService {
    constructor(repository, errors) {
        this.repository = repository;
        this.errors = errors;

        this.defaults = {
            readChunk: {
                limit: 10,
                page: 1,
                order: 'desc',
                orderField: 'updatedAt',
                like: ''
            }
        };
    }

    async readChunk(id, options) {
        options = Object.assign({}, this.defaults.readChunk, options);

        let limit = options.limit;
        let offset = (options.page - 1) * options.limit;

        return await this.repository.findAll({
            where: { userId: id },
            limit: limit,
            offset: offset,
            order: [[options.orderField, options.order.toUpperCase()]],
            raw: true
        });
    }

    async read(id) {
        id = parseInt(id);

        if (isNaN(id)) {
            throw this.errors.invalidId;
        }

        const item = await this.repository.findByPk(id, { raw: true });

        if (!item) {
            throw this.errors.notFound;
        }

        return item;
    }

    async create(id, data) {
        const item = await this.repository.create(id, data);

        return item.get({ plain: true });
    }

    async update(id, data) {
        await this.repository.update(data, { where: { id: id }, limit: 1 });

        return this.read(id);
    }

    async delete(id) {
        return this.repository.destroy({ where: { id: id } });
    }
}

module.exports = CrudService;