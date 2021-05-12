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
class Shoe {
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
            }, 'A table to store user shoe model',
            [
                {
                    route: '/get-all-shoes',
                    method: 'POST',
                    callback: this.getAllShoes,
                    requireToken: true,
                },
                {
                    route: '/get-shoe-by-id/:id',
                    method: 'POST',
                    callback: this.getShoeById,
                    requireToken: true,
                },
                {
                    route: '/create-shoe',
                    method: 'POST',
                    callback: this.createShoe,
                    requireToken: true,
                },
                {
                    route: '/update-shoe/id/:id',
                    method: 'PUT',
                    callback: this.updateShoe,
                    requireToken: true,
                },
                {
                    route: '/delete-shoe/id/:id',
                    method: 'DELETE',
                    callback: this.deleteShoe,
                    requireToken: true,
                }
            ]
        ];
    }
    deleteShoe(model) {
        return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            let shoeCtrl = model.controller;
            let resp = yield shoeCtrl.remove(req, null, null);
            res.json({ message: 'success', resp });
        });
    }
    updateShoe(model) {
        return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            let shoeCtrl = model.controller;
            let resp = yield shoeCtrl.update(req, null, null);
            res.json({ message: 'success', resp });
        });
    }
    createShoe(model) {
        return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            let shoeCtrl = model.controller;
            let resp = yield shoeCtrl.insert(req, null, null);
            res.json({ message: 'success', resp });
        });
    }
    getAllShoes(model) {
        return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            req.body = {
                get: ['*']
            };
            let shoeCtrl = model.controller;
            let resp = yield shoeCtrl.get(req, null, null);
            res.json({ message: 'success', resp });
        });
    }
    getShoeById(model) {
        return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            req.body = {
                get: ['*'],
                where: {
                    id: req.params.id
                }
            };
            let shoeCtrl = model.controller;
            let resp = yield shoeCtrl.get(req, null, null);
            res.json({ message: 'success', resp });
        });
    }
    //getAllShoes(model: any) {
    //return async (req: Request, res: Response, next: NextFunction) => {
    //req.body = {
    //get: ['*'],
    //where: {
    //year: '2021'
    //  }
    // }
    // let shoeCtrl = model.controller;
    //let resp = await shoeCtrl.get(req, null, null);
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
exports.Shoe = Shoe;
