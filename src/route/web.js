import express from 'express';
import homeControllers from '../controllers/homeController';
import gameControllers from '../controllers/gameController';

let router = express.Router();

let initWebRoutes=(app)=>{
    router.get('/', homeControllers.getHomepage)//trang chủ


    //-------------Game Route Space----------------
    //read
    router.get('/game/manager', gameControllers.gameManager)//trang quản lý trò chơi
    router.get('/game/manager/trash', gameControllers.gameManager_trash)//trang quản lý trò chơi

    //create
    router.get('/game/create', gameControllers.createGame)//tạo game
    router.post('/post-new-game', gameControllers.postNewGame)//đẩy game mới lên server

    //edit
    router.get('/game/edit', gameControllers.editGame)//render trang chỉnh sửa game
    router.post('/put-edited-game', gameControllers.putUpdatedGame)//post game sau khi chỉnh sửa

    //delete
    router.get('/game/delete', gameControllers.deleteGame)//chuyển tới thùng rác
    router.get('/game/force-delete', gameControllers.forceDelete)//xoá vĩnh viễn

    //restore
    router.get('/game/restore', gameControllers.restoreGame)//khôi phục từ thùng rác

    //slug
    router.get('/:slug', gameControllers.showGame)//show game khi click vào 1 game trong trang chủ


    return app.use('/', router)
}

module.exports = initWebRoutes;