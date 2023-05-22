import express from 'express';
import homeControllers from '../controllers/homeController';
import gameControllers from '../controllers/gameController';
import userControllers from '../controllers/userController';

let router = express.Router();

let initWebRoutes=(app)=>{
    router.get('/', homeControllers.getHomepage)//trang chủ

    //--------------User space---------------
    //Login
    router.get('/login', userControllers.loginForm)//render trang loggin
    router.post('/user/loading-user', userControllers.loginSuccess)//post user lên server để kiểm tra
    router.get('/user/logged', userControllers.logged)//render trang home của admin

    //Register
    router.get('/user/register', userControllers.registerForm)//render trang register
    router.post('/user/register-new-user', userControllers.postNewUser)//post new user

    //Forget password
    router.get('/user/forget-password', userControllers.forgetPassword)
    router.post('/user/change-password', userControllers.changePassword)

    //logOut
    router.get('/logout', userControllers.logout)
    
    //read
    router.get('/game/manager', userControllers.gameManager)//trang quản lý bài đăng
    router.get('/game/manager/trash', userControllers.gameManager_trash)//trang quản lý bài đăng đã xóa

    //-------------Game Route Space----------------
    //create
    router.get('/game/create', userControllers.createGame)//tạo bài viết mới
    router.post('/post-new-game', gameControllers.postNewGame)//đẩy viết mới mới lên server

    //edit
    router.get('/game/edit', gameControllers.editGame)//render trang chỉnh sửa bài viết
    router.post('/put-edited-game', gameControllers.putUpdatedGame)//post viết mới sau khi chỉnh sửa

    //delete
    router.get('/game/delete', gameControllers.deleteGame)//chuyển tới thùng rác
    router.get('/game/force-delete', gameControllers.forceDelete)//xoá vĩnh viễn

    //restore
    router.get('/game/restore', gameControllers.restoreGame)//khôi phục từ thùng rác

    //handle events 
    router.get('/game/handle-form-action', gameControllers.handleFormAction)

    //slug
    router.get('/:slug', gameControllers.showGame)//show viết mới khi click vào 1 viết mới trong trang chủ
    
    return app.use('/', router)
}

module.exports = initWebRoutes;