import express from 'express';
import homeControllers from '../controllers/homeController';

let router = express.Router();

let initWebRoutes=(app)=>{
    router.get('/', homeControllers.getHomepage)//trang chủ

    return app.use('/', router)
}

module.exports = initWebRoutes;