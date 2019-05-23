const CrudService = require('./crud');

class PostsService extends CrudService {
    async create(id, data) {
        let post = {
            title: data.title,
            content: data.content,
            date: data.date,
            draft: data.draft,
            userId: id,
            rating: 0
        };

        return super.create(post);
    }

    async update(id, data) {
        let post = {
            title: data.title,
            content: data.content,
            date: data.date,
            draft: data.draft
        };

        return super.update(id, post);
    }

    async readChunkUnivers(options) {
        options = Object.assign({}, this.defaults.readChunk, options);
        let limit = options.limit;
        let offset = (options.page - 1) * options.limit;

        return await this.repository.findAll({
            limit: limit,
            offset: offset,
            order: [[options.orderField, options.order.toUpperCase()]],
            raw: true
        });
    }

    async upvote(id) {
        const post = await this.repository.findByPk(id);

        if (!post) {
            throw this.errors.notFound;
        }

        return post.increment({ rating: 1 });
    }

    async downvote(id) {
        const post = await this.repository.findByPk(id);

        if (!post) {
            throw this.errors.notFound;
        }

        return post.increment({ rating: -1 });
    }

}

module.exports = PostsService;