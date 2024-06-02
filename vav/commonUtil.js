const utils = require('../utils');


queriesHandling = {
    getQueryResult: async function (psql, query, values) {
        result = {};
        try {
            const res = await psql.query(query, values);
            return { isSuccess: true, result: res.rows };
        } catch (err) {
            return { isSuccess: false, result : err };
        }
    }
}


commonUtil = {}
commonUtil.responseConstruction = {
    userLoginSuccess: function (res) {
        res.status(200).json({
            success: true,
            message: 'User login successfull',
            baseURL: utils.baseURL
        });
    },
    userLoginUnsuccess: function (res) {
        res.status(404).json({
            success: false,
            message: 'No user with this user details'
        });
    },
    ISE: function (res) {
        res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }
}
commonUtil.userUtils = {
    isValidUser: async function (req,res, psql) {
        emailId = utils.trimString(req.body.emailId);
        password = utils.trimString(req.body.password);
        var query = 'SELECT * FROM vavuserdetails WHERE emailId = $1 AND password = $2';
        var values = [emailId, password];
        var result = await queriesHandling.getQueryResult(psql, query, values);
        if (result.isSuccess) {
            if(!result.result.length>0){
                commonUtil.responseConstruction.userLoginUnsuccess(res);
            }
            req.vavUserDetails = result.result[0];
            commonUtil.responseConstruction.userLoginSuccess(res);
        } else {
            console.log(result.result);
            commonUtil.responseConstruction.ISE(res);
        }
    }
}




module.exports = commonUtil;
