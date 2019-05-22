const CrudService = require('./crud');

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