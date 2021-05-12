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
class Short {
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
            }, 'A table to store user short model',
            [
                {
                    route: '/get-all-shorts',
                    method: 'POST',
                    callback: this.getAllShorts,
                    requireToken: true,
                },
                {
                    route: '/get-short-by-id/:id',
                    method: 'POST',
                    callback: this.getShortById,
                    requireToken: true,
                },
                {
                    route: '/create-short',
                    method: 'POST',
                    callback: this.createShort,
                    requireToken: true,
                },
                {
                    route: '/update-short/id/:id',
                    method: 'PUT',
                    callback: this.updateShort,
                    requireToken: true,
                },
                {
                    route: '/delete-short/id/:id',
                    method: 'DELETE',
                    callback: this.deleteShort,
                    requireToken: true,
                }
            ]
        ];
    }
    deleteShort(model) {
        return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            let shortCtrl = model.controller;
            let resp = yield shortCtrl.remove(req, null, null);
            res.json({ message: 'success', resp });
        });
    }
    updateShort(model) {
        return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            let shortCtrl = model.controller;
            let resp = yield shortCtrl.update(req, null, null);
            res.json({ message: 'success', resp });
        });
    }
    createShort(model) {
        return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            let shortCtrl = model.controller;
            let resp = yield shortCtrl.insert(req, null, null);
            res.json({ message: 'success', resp });
        });
    }
    getAllShorts(model) {
        return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            req.body = {
                get: ['*']
            };
            let shortCtrl = model.controller;
            let resp = yield shortCtrl.get(req, null, null);
            res.json({ message: 'success', resp });
        });
    }
    getShortById(model) {
        return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            req.body = {
                get: ['*'],
                where: {
                    id: req.params.id
                }
            };
            let shortCtrl = model.controller;
            let resp = yield shortCtrl.get(req, null, null);
            res.json({ message: 'success', resp });
        });
    }
    //getAllShorts(model: any) {
    //return async (req: Request, res: Response, next: NextFunction) => {
    //req.body = {
    //get: ['*'],
    //where: {
    //year: '2021'
    //  }
    // }
    // let shortCtrl = model.controller;
    //let resp = await shortCtrl.get(req, null, null);
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
exports.Short = Short;
