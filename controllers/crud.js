const express = require('express');

const wrap = require('../helpers/wrap');
const config = require('../config.json');

class CrudController {
    constructor(service) {
        this.service = service;

        this.readStatistics = this.readStatistics.bind(this);
        this.readUnivers = this.readUnivers.bind(this);
        this.readAll = this.readAll.bind(this);
        this.read = this.read.bind(this);
        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);

        this.router = express.Router();
        this.routes = {
            '/': [
                { method: 'get', cb: this.readAll },
                { method: 'post', cb: this.create }
            ],
            '/create': [{ method: 'post', cb: this.create }],
            '/univers': [{ method: 'get', cb: this.readUnivers }],
            '/statistics/:id': [{ method: 'get', cb: this.readStatistics }],
            '/:id': [
                { method: 'get', cb: this.read },
                { method: 'put', cb: this.update },
                { method: 'delete', cb: this.delete }
            ]
            /*
            '/': [{ method: 'get', cb: this.readAll }],
            '/:id': [{ method: 'get', cb: this.read }],
            '/create': [{ method: 'post', cb: this.create }],
            '/update': [{ method: 'put', cb: this.update }],
            '/delete': [{ method: 'delete', cb: this.delete }]
            */
        };
    }

    async readUnivers(req, res) {
        res.json(
            await this.service.readChunkUnivers(req.params)
        );
    }

    async readStatistics(req, res) {
        res.json(
            await this.service.readChunkStatistics(req.params.id, req.params, req.signedCookies[config.cookie.auth])
        );
    }

    async readAll(req, res) {
        res.json(
            await this.service.readChunk(req.signedCookies[config.cookie.auth], req.params)
        );
    }

    async read(req, res) {
        res.json(
            await this.service.read(req.params.id)
        );
    }

    async create(req, res) {
        res.json(
            await this.service.create(req.signedCookies[config.cookie.auth], req.body)
        );
    }

    async update(req, res) {
        res.json(
            await this.service.update(req.params.id, req.body)
        );
    }

    async delete(req, res) {
        res.json(
            await this.service.delete(req.params.id)
        );
    }

    registerRoutes() {
        Object.keys(this.routes).forEach(route => {
            let handlers = this.routes[route];

            if (!handlers || !Array.isArray(handlers)) return;

            for (let handler of handlers) {
                this.router[handler.method](route, wrap(handler.cb));
            }
        });
    }
}

module.exports = CrudController;