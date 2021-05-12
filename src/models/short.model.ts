import { Request, Response, NextFunction } from 'express';

export class Short {
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

  deleteShort(model: any) {
    return async (req: Request, res: Response, next: NextFunction) => {
      let shortCtrl = model.controller;
      let resp = await shortCtrl.remove(req, null, null);
      res.json({ message: 'success', resp });
    }
  }

  updateShort(model: any) {
    return async (req: Request, res: Response, next: NextFunction) => {
      let shortCtrl = model.controller;
      let resp = await shortCtrl.update(req, null, null);
      res.json({ message: 'success', resp });
    }
  }

  createShort(model: any) {
    return async (req: Request, res: Response, next: NextFunction) => {
      let shortCtrl = model.controller;
      let resp = await shortCtrl.insert(req, null, null);
      res.json({ message: 'success', resp });
    }
  }

  getAllShorts(model: any) {
    return async (req: Request, res: Response, next: NextFunction) => {
      req.body = {
        get: ['*']
      }
      let shortCtrl = model.controller;
      let resp = await shortCtrl.get(req, null, null);
      res.json({ message: 'success', resp });
    }
  }

  getShortById(model: any) {
    return async (req: Request, res: Response, next: NextFunction) => {
      req.body = {
        get: ['*'],
        where: {
          id: req.params.id
        }
      }
      let shortCtrl = model.controller;
      let resp = await shortCtrl.get(req, null, null);
      res.json({ message: 'success', resp });
    }
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

  set model(model: any) {
    this._model = model;
  }

  get model() {
    return this._model;
  }

}