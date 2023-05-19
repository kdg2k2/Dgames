import express from 'express';
import homeControllers from '../controllers/homeController';
import gameControllers from '../controllers/gameController';

let router = express.Router();

let initWebRoutes=(app)=>{
    router.get('/', homeControllers.getHomepage)//trang chủ


    //-------------Game Route Space----------------
    router.get('/game/manager', gameControllers.gameManager)//trang quản lý trò chơi

    //create
    router.get('/game/create', gameControllers.createGame)//tạo game
    router.post('/post-new-game', gameControllers.postNewGame)//đẩy game mới lên server

    //edit
    router.get('/game/edit', gameControllers.editGame)//render trang chỉnh sửa game
    router.post('/put-edited-game', gameControllers.putUpdatedGame)//post game sau khi chỉnh sửa

    //slug
    router.get('/game/:slug', gameControllers.showGame)//show game khi click vào 1 game trong trang chủ
    

    return app.use('/', router)
}

module.exports = initWebRoutes;