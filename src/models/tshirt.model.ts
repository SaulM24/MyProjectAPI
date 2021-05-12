import { Request, Response, NextFunction } from 'express';

export class Tshirt {
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

  deleteTshirt(model: any) {
    return async (req: Request, res: Response, next: NextFunction) => {
      let tshirtCtrl = model.controller;
      let resp = await tshirtCtrl.remove(req, null, null);
      res.json({ message: 'success', resp });
    }
  }

  updateTshirt(model: any) {
    return async (req: Request, res: Response, next: NextFunction) => {
      let tshirtCtrl = model.controller;
      let resp = await tshirtCtrl.update(req, null, null);
      res.json({ message: 'success', resp });
    }
  }

  createTshirt(model: any) {
    return async (req: Request, res: Response, next: NextFunction) => {
      let tshirtCtrl = model.controller;
      let resp = await tshirtCtrl.insert(req, null, null);
      res.json({ message: 'success', resp });
    }
  }

  getAllTshirts(model: any) {
    return async (req: Request, res: Response, next: NextFunction) => {
      req.body = {
        get: ['*']
      }
      let tshirtCtrl = model.controller;
      let resp = await tshirtCtrl.get(req, null, null);
      res.json({ message: 'success', resp });
    }
  }

  getTshirtById(model: any) {
    return async (req: Request, res: Response, next: NextFunction) => {
      req.body = {
        get: ['*'],
        where: {
          id: req.params.id
        }
      }
      let tshirtCtrl = model.controller;
      let resp = await tshirtCtrl.get(req, null, null);
      res.json({ message: 'success', resp });
    }
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

  set model(model: any) {
    this._model = model;
  }

  get model() {
    return this._model;
  }

}