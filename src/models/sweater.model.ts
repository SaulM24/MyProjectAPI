import { Request, Response, NextFunction } from 'express';

export class Sweater {
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

  deleteSweater(model: any) {
    return async (req: Request, res: Response, next: NextFunction) => {
      let sweaterCtrl = model.controller;
      let resp = await sweaterCtrl.remove(req, null, null);
      res.json({ message: 'success', resp });
    }
  }

  updateSweater(model: any) {
    return async (req: Request, res: Response, next: NextFunction) => {
      let sweaterCtrl = model.controller;
      let resp = await sweaterCtrl.update(req, null, null);
      res.json({ message: 'success', resp });
    }
  }

  createSweater(model: any) {
    return async (req: Request, res: Response, next: NextFunction) => {
      let sweaterCtrl = model.controller;
      let resp = await sweaterCtrl.insert(req, null, null);
      res.json({ message: 'success', resp });
    }
  }

  getAllSweaters(model: any) {
    return async (req: Request, res: Response, next: NextFunction) => {
      req.body = {
        get: ['*']
      }
      let sweaterCtrl = model.controller;
      let resp = await sweaterCtrl.get(req, null, null);
      res.json({ message: 'success', resp });
    }
  }

  getSweaterById(model: any) {
    return async (req: Request, res: Response, next: NextFunction) => {
      req.body = {
        get: ['*'],
        where: {
          id: req.params.id
        }
      }
      let sweaterCtrl = model.controller;
      let resp = await sweaterCtrl.get(req, null, null);
      res.json({ message: 'success', resp });
    }
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

  set model(model: any) {
    this._model = model;
  }

  get model() {
    return this._model;
  }

}