const db = require('../models/db');
const model = require('../models/User');


export class mogin {

    static async login(req, res) {
        const {usernmae, password} = req.params;
        let checkRe = await this.checkUser(usernmae);
        if (checkRe == 0) {
            return {
                'code': 0,
                'message': '无效的输入'
            }
        }
        const cpr=await this.checkPsw(usernmae,password);
        if(cpr){
            return {
                'code':1,
                'message':'登录成功'
            }
        }


    }

    static async checkUser(username) {
        let checkResult;
        await db.user.find({'username': username}, function (err, u) {
            checkResult = u;
            console.log('沃日你的也');
        });
        return checkResult;
    }

    static async checkPsw(username,password) {
        let checkPR;
        await db.user.find({'username': username, 'password': password}, function (err, u) {
            if (err) {
                return 0;
            } else {
                checkPR = u;
            }

        });
        return checkPR;
    }
}