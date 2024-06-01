const utils = require('../utils');

const queriesHandling = {
    getQueryResult: async function (psql, query, values) {
        let result = {};
        try {
            const res = await psql.query(query, values);
            return { isSuccess: true, result: res.rows };
        } catch (err) {
            return { isSuccess: false, result: err };
        }
    }
};

const commonUtil = {
    responseConstruction: {
        userLoginSuccess: function (res) {
            res.status(200).json({
                success: true,
                message: 'User login successful',
                baseURL: utils.baseURL
            });
        },
        userLoginUnsuccess: function (res) {
            res.status(404).json({
                success: false,
                message: 'No user with these details'
            });
        },
        ISE: function (res) {
            res.status(500).json({
                success: false,
                message: 'Internal Server Error'
            });
        }
    },
    userUtils: {
        isValidUser: async function (req, res, psql) {
            const emailId = utils.trimString(req.body.emailId);
            const password = utils.trimString(req.body.password);
            const query = 'SELECT * FROM vavUserDetails WHERE emailId = $1 AND password = $2';
            const values = [emailId, password];
            const result = await queriesHandling.getQueryResult(psql, query, values);
            if (result.isSuccess) {
                if (result.result.length > 0) {
                    req.vavUserDetails = result.result[0];
                    commonUtil.responseConstruction.userLoginSuccess(res);
                } else {
                    commonUtil.responseConstruction.userLoginUnsuccess(res);
                }
            } else {
                commonUtil.responseConstruction.ISE(res);
            }
        }
    }
};

module.exports = commonUtil;
