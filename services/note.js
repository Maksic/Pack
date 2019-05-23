const CrudService = require('./crud');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

class NoteService extends CrudService {
    async create(id, data) {
        let note = {
            title: data.title,
            content: data.content,
            date: data.date,
            userId: id,
            mark: data.mark
        };
        
        return super.create(note);
    }

    async readChunkStatistics(id, options, uId) {
        options = Object.assign({}, this.defaults.readChunk, options);
        let limit = options.limit;
        let offset = (options.page - 1) * options.limit;
        let like = '%'+id+'%';

        return await this.repository.findAll({
            where: { mark: {[Op.like]: like}, userId : 1 },
            limit: limit,
            offset: offset,
            order: [[options.orderField, options.order.toUpperCase()]],
            raw: true
        });
    }

    async update(id, data) {
        let note = {
            title: data.title,
            content: data.content,
            date: data.date,
            mark: data.mark
        };

        return super.update(id, note);
    }

}

module.exports = NoteService;