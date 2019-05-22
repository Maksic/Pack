const CrudController = require('./crud');
const config = require('../config.json');

class MarkController extends CrudController {
    constructor(markService, cahceService) {
        super(markService);

        this.cacheService = cahceService;

        this.readAll = this.readAll.bind(this);

        this.routes['/'] = [{ method: 'get', cb: this.readAll }];

        this.registerRoutes();
    }

    async readAll(req, res) {
        const marks = await this.service.readChunk(req.signedCookies[config.cookie.auth], req.params);

        this.cacheService.set(req, marks);

        res.json(marks);
    }
}

module.exports = (markService, cacheService) => {
    const controller = new MarkController(
        markService,
        cacheService
    );

    return controller.router;
};
