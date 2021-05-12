import { Request, Response, NextFunction } from 'express';

export class Shoe {
  _model: any;
  constructor(norm: any) {
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

  deleteShoe(model: any) {
    return async (req: Request, res: Response, next: NextFunction) => {
      let shoeCtrl = model.controller;
      let resp = await shoeCtrl.remove(req, null, null);
      res.json({ message: 'success', resp });
    }
  }

  updateShoe(model: any) {
    return async (req: Request, res: Response, next: NextFunction) => {
      let shoeCtrl = model.controller;
      let resp = await shoeCtrl.update(req, null, null);
      res.json({ message: 'success', resp });
    }
  }

  createShoe(model: any) {
    return async (req: Request, res: Response, next: NextFunction) => {
      let shoeCtrl = model.controller;
      let resp = await shoeCtrl.insert(req, null, null);
      res.json({ message: 'success', resp });
    }
  }

  getAllShoes(model: any) {
    return async (req: Request, res: Response, next: NextFunction) => {
      req.body = {
        get: ['*']
      }
      let shoeCtrl = model.controller;
      let resp = await shoeCtrl.get(req, null, null);
      res.json({ message: 'success', resp });
    }
  }

  getShoeById(model: any) {
    return async (req: Request, res: Response, next: NextFunction) => {
      req.body = {
        get: ['*'],
        where: {
          id: req.params.id
        }
      }
      let shoeCtrl = model.controller;
      let resp = await shoeCtrl.get(req, null, null);
      res.json({ message: 'success', resp });
    }
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

  set model(model: any) {
    this._model = model;
  }

  get model() {
    return this._model;
  }

}