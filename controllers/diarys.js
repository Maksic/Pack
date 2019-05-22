const CrudController = require('./crud');
const config = require('../config.json');

class DiaryController extends CrudController {
    constructor(diaryService, cahceService) {
        super(diaryService);

        this.cacheService = cahceService;

        this.readAll = this.readAll.bind(this);

        this.routes['/'] = [{ method: 'get', cb: this.readAll }];

        this.registerRoutes();
    }

    async readAll(req, res) {
        const notes = await this.service.readChunk(req.signedCookies[config.cookie.auth], req.params);

        this.cacheService.set(req, notes);

        res.json(notes);
    }
}

module.exports = (diaryService, cacheService) => {
    const controller = new DiaryController(
        diaryService,
        cacheService
    );

    return controller.router;
};
