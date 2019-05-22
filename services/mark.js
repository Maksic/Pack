const CrudService = require('./crud');

class MarkService extends CrudService {
    async create(id, data) {
        let mark = {
            title: data.title,
            userId: id
        };
        
        return super.create(mark);
    }

    async update(id, data) {
        let mark = {
            title: data.title
        };

        return super.update(id, mark);
    }

}

module.exports = MarkService;