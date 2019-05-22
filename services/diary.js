const CrudService = require('./crud');

class DiaryService extends CrudService {
    async create(id, data) {
        let note = {
            title: data.title,
            content: data.content,
            date: data.date,
            userId: id
        };

        return super.create(note);
    }

    async update(id, data) {
        let note = {
            title: data.title,
            content: data.content,
            date: data.date
        };

        return super.update(id, note);
    }

}

module.exports = DiaryService;