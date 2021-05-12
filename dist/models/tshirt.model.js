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
class Tshirt {
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
            }, 'A table to store user tshirt model',
            [
                {
                    route: '/get-all-tshirts',
                    method: 'POST',
                    callback: this.getAllTshirts,
                    requireToken: true,
                },
                {
                    route: '/get-tshirt-by-id/:id',
                    method: 'POST',
                    callback: this.getTshirtById,
                    requireToken: true,
                },
                {
                    route: '/create-tshirt',
                    method: 'POST',
                    callback: this.createTshirt,
                    requireToken: true,
                },
                {
                    route: '/update-tshirt/id/:id',
                    method: 'PUT',
                    callback: this.updateTshirt,
                    requireToken: true,
                },
                {
                    route: '/delete-tshirt/id/:id',
                    method: 'DELETE',
                    callback: this.deleteTshirt,
                    requireToken: true,
                }
            ]
        ];
    }
    deleteTshirt(model) {
        return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            let tshirtCtrl = model.controller;
            let resp = yield tshirtCtrl.remove(req, null, null);
            res.json({ message: 'success', resp });
        });
    }
    updateTshirt(model) {
        return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            let tshirtCtrl = model.controller;
            let resp = yield tshirtCtrl.update(req, null, null);
            res.json({ message: 'success', resp });
        });
    }
    createTshirt(model) {
        return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            let tshirtCtrl = model.controller;
            let resp = yield tshirtCtrl.insert(req, null, null);
            res.json({ message: 'success', resp });
        });
    }
    getAllTshirts(model) {
        return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            req.body = {
                get: ['*']
            };
            let tshirtCtrl = model.controller;
            let resp = yield tshirtCtrl.get(req, null, null);
            res.json({ message: 'success', resp });
        });
    }
    getTshirtById(model) {
        return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            req.body = {
                get: ['*'],
                where: {
                    id: req.params.id
                }
            };
            let tshirtCtrl = model.controller;
            let resp = yield tshirtCtrl.get(req, null, null);
            res.json({ message: 'success', resp });
        });
    }
    //getAllTshirts(model: any) {
    //return async (req: Request, res: Response, next: NextFunction) => {
    //req.body = {
    //get: ['*'],
    //where: {
    //year: '2021'
    //  }
    // }
    // let tshirtCtrl = model.controller;
    //let resp = await tshirtCtrl.get(req, null, null);
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
exports.Tshirt = Tshirt;
