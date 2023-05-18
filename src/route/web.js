import express from 'express';
import homeControllers from '../controllers/homeController';

let router = express.Router();

let initWebRoutes=(app)=>{
    router.get('/', homeControllers.getHomepage)//trang chủ

    router.get('/create', homeControllers.createGame)//tạo game
    router.post('/post-new-game', homeControllers.postNewGame)//đẩy game mới lên server

    router.get('/manager', homeControllers.gameManager)//trang quản lý trò chơi



    router.get('/game/:slug', homeControllers.showGame)//show game khi click vào 1 game trong trang chủ

    return app.use('/', router)
}

module.exports = initWebRoutes;