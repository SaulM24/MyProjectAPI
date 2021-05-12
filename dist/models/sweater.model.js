"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class Sweater {
    constructor(norm) {
        this.model = [{
                id: { type: Number, key: 'primary' },
                brand: { type: String, maxlength: 24 },
                model: { type: String, maxlength: 24 },
                color: { type: String, maxlength: 24 },
                size: { type: String, maxlength: 24 },
                image_url: { type: String, maxlength: 1000 },
                user_id: {
                    type: Number,
                    key: 'foreign',
                    references: { table: 'User', foreignKey: 'id' },
                    onDelete: 'cascade',
                    onUpdate: 'cascade'
                },
            }, 'A table to store user sweater model',
            [
                {
                    route: '/get-all-sweaters',
                    method: 'POST',
                    callback: this.getAllSweaters,
                    requireToken: true,
                },
                {
                    route: '/get-sweater-by-id/:id',
                    method: 'POST',
                    callback: this.getSweaterById,
                    requireToken: true,
                },
                {
                    route: '/create-sweater',
                    method: 'POST',
                    callback: this.createSweater,
                    requireToken: true,
                },
                {
                    route: '/update-sweater/id/:id',
                    method: 'PUT',
                    callback: this.updateSweater,
                    requireToken: true,
                },
                {
                    route: '/delete-sweater/id/:id',
                    method: 'DELETE',
                    callback: this.deleteSweater,
                    requireToken: true,
                }
            ]
        ];
    }
    deleteSweater(model) {
        return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            let sweaterCtrl = model.controller;
            let resp = yield sweaterCtrl.remove(req, null, null);
            res.json({ message: 'success', resp });
        });
    }
    updateSweater(model) {
        return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            let sweaterCtrl = model.controller;
            let resp = yield sweaterCtrl.update(req, null, null);
            res.json({ message: 'success', resp });
        });
    }
    createSweater(model) {
        return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            let sweaterCtrl = model.controller;
            let resp = yield sweaterCtrl.insert(req, null, null);
            res.json({ message: 'success', resp });
        });
    }
    getAllSweaters(model) {
        return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            req.body = {
                get: ['*']
            };
            let sweaterCtrl = model.controller;
            let resp = yield sweaterCtrl.get(req, null, null);
            res.json({ message: 'success', resp });
        });
    }
    getSweaterById(model) {
        return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            req.body = {
                get: ['*'],
                where: {
                    id: req.params.id
                }
            };
            let sweaterCtrl = model.controller;
            let resp = yield sweaterCtrl.get(req, null, null);
            res.json({ message: 'success', resp });
        });
    }
    //getAllSweaters(model: any) {
    //return async (req: Request, res: Response, next: NextFunction) => {
    //req.body = {
    //get: ['*'],
    //where: {
    //year: '2021'
    //  }
    // }
    // let sweaterCtrl = model.controller;
    //let resp = await sweaterCtrl.get(req, null, null);
    //res.json({ message: 'success', resp });
    // }
    //}
    set model(model) {
        this._model = model;
    }
    get model() {
        return this._model;
    }
}
exports.Sweater = Sweater;
