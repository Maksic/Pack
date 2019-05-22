const CrudController = require('./crud');
const config = require('../config.json');

class TimeBoxController extends CrudController {
    constructor(timeBoxService, cahceService) {
        super(timeBoxService);

        this.cacheService = cahceService;

        this.readAll = this.readAll.bind(this);
        this.readStatistics = this.readStatistics.bind(this);

        this.routes['/'] = [{ method: 'get', cb: this.readAll }];
        this.routes['/statistics'] = [{ method: 'get', cb: this.readStatistics }];

        this.registerRoutes();
    }

    async readAll(req, res) {
        const notes = await this.service.readChunk(req.signedCookies[config.cookie.auth], req.params);

        this.cacheService.set(req, notes);

        res.json(notes);
    }

    async readStatistics(req, res) {
        const notes = await this.service.readChunkStatistics(req.params.id, req.params, req.signedCookies[config.cookie.auth],);

        this.cacheService.set(req, notes);

        res.json(notes);
    }
}

module.exports = (timeBoxService, cacheService) => {
    const controller = new TimeBoxController(
        timeBoxService,
        cacheService
    );

    return controller.router;
};
