const express = require('express');

module.exports = (
    postsService,
    diarysService,
    marksService,
    notesService,
    timeBoxsService,
    usersService,
    rolesService,
    authenticationService,
    cacheService,
    config,
) => {
    const router = express.Router();

    const postsController = require('./posts')(postsService, cacheService);
    const diarysController = require('./diarys')(diarysService, cacheService);
    const notesController = require('./notes')(notesService, cacheService);
    const marksController = require('./marks')(marksService, cacheService);
    const timeBoxsController = require('./timeBoxs')(timeBoxsService, cacheService);

    const usersController = require('./users')(usersService);
    const rolesController = require('./roles')(rolesService);
    const authController = require('./auth')(authenticationService, config);

    router.use('/posts', postsController);
    router.use('/diary', diarysController);
    router.use('/notes', notesController);
    router.use('/marks', marksController);
    router.use('/timebox', timeBoxsController);
    router.use('/users', usersController);
    router.use('/roles', rolesController);
    router.use('/auth', authController);

    return router;
};