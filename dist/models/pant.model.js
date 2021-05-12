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
class Pant {
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
            }, 'A table to store user pant model',
            [
                {
                    route: '/get-all-pants',
                    method: 'POST',
                    callback: this.getAllPants,
                    requireToken: true,
                },
                {
                    route: '/get-pant-by-id/:id',
                    method: 'POST',
                    callback: this.getPantById,
                    requireToken: true,
                },
                {
                    route: '/create-pant',
                    method: 'POST',
                    callback: this.createPant,
                    requireToken: true,
                },
                {
                    route: '/update-pant/id/:id',
                    method: 'PUT',
                    callback: this.updatePant,
                    requireToken: true,
                },
                {
                    route: '/delete-pant/id/:id',
                    method: 'DELETE',
                    callback: this.deletePant,
                    requireToken: true,
                }
            ]
        ];
    }
    deletePant(model) {
        return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            let pantCtrl = model.controller;
            let resp = yield pantCtrl.remove(req, null, null);
            res.json({ message: 'success', resp });
        });
    }
    updatePant(model) {
        return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            let pantCtrl = model.controller;
            let resp = yield pantCtrl.update(req, null, null);
            res.json({ message: 'success', resp });
        });
    }
    createPant(model) {
        return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            let pantCtrl = model.controller;
            let resp = yield pantCtrl.insert(req, null, null);
            res.json({ message: 'success', resp });
        });
    }
    getAllPants(model) {
        return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            req.body = {
                get: ['*']
            };
            let pantCtrl = model.controller;
            let resp = yield pantCtrl.get(req, null, null);
            res.json({ message: 'success', resp });
        });
    }
    getPantById(model) {
        return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            req.body = {
                get: ['*'],
                where: {
                    id: req.params.id
                }
            };
            let pantCtrl = model.controller;
            let resp = yield pantCtrl.get(req, null, null);
            res.json({ message: 'success', resp });
        });
    }
    //getAllPants(model: any) {
    //return async (req: Request, res: Response, next: NextFunction) => {
    //req.body = {
    //get: ['*'],
    //where: {
    //year: '2021'
    //  }
    // }
    // let pantCtrl = model.controller;
    //let resp = await pantCtrl.get(req, null, null);
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
exports.Pant = Pant;
