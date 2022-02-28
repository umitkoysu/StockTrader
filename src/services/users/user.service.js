const ProcessCheckManager = require('../../utils/process/process.check.manager');
const { throwCustomException } = require('../../utils/exception/exception.builder');
const { User } = require('../../data/models/user');
const { userCreateValidator, userUpdateValidator , userUpdatePasswordValidator } = require('./user.validator');
const Crypto = require('../../utils/crypto/crypto');
const Op = require('sequelize').Op;

class UserService {

    async getById(id) {

        ProcessCheckManager.checkId(id);

        let result = await User.findOne({
            where: {
                id: id,
                isDeleted: false,
            },
            attributes: ["id", "firstName", "lastName", "userName", "mail","balance", "active", "createdAt", "updatedAt"],
        });

        ProcessCheckManager.checkReturnModelValue(result);
        return result;

    }

    async getList(search) {

        let predicate = {
            isDeleted: false,
        };

        if (search) {
            predicate[Op.or] = {
                firstName: { [Op.like]: `%${search}%` },
                lastName: { [Op.like]: `%${search}%` },
                userName: { [Op.like]: `%${search}%` },
                mail: { [Op.like]: `%${search}%` }
            }
        }

        let result = await User.findAll({
            where: predicate,
            attributes: ["id", "firstName", "lastName", "userName", "mail","balance", "active", "createdAt", "updatedAt"],
        });

        ProcessCheckManager.checkReturnModelList(result);
        return result;

    }

    async create(user) {

        const userAlreayExist = await this.checkMailOrUserName(user.mail, user.userName);
        if (userAlreayExist) {
            throwCustomException(global.ERROR_TYPE.MailOrUsernameAlreadyExist)
        }

        await userCreateValidator.validateAsync(user);
        user.password = await Crypto.hashGenerateAsync(user.password);

        let result = await User.create(user);

        return await this.getById(result.dataValues.id);

    }


    async update(id, user) {

        const userAlreayExist = await this.checkMailOrUserName(user.mail, user.userName, id);
        if (userAlreayExist) {
            throwCustomException(global.ERROR_TYPE.MailOrUsernameAlreadyExist)
        }

        await userUpdateValidator.validateAsync(user);

        let result = await User.update(user, {
            where: {
                isDeleted: false,
                id: id
            }
        });

        ProcessCheckManager.checkUpdateResult(result);
        return await this.getById(id);

    }

    async updateUserBalance(id, user) {

        let result = await User.update({
            balance: user.balance
        }, {
            where: {
                isDeleted: false,
                id: id
            }
        });

        ProcessCheckManager.checkUpdateResult(result);
        return await this.getById(id);

    }

    async passiveDelete(id) {

        let result = await User.update({
            isDeleted: true
        }, {
            where: {
                isDeleted: false,
                id: id
            }
        });

        ProcessCheckManager.checkPassiveDeleteResult(result);

    }

    async changePassword(id, data) {

        let user = await User.findOne({
            where: {
                isDeleted: false,
                id: id,
            }
        })

        ProcessCheckManager.checkReturnModelValue(user);

        await userUpdatePasswordValidator.validateAsync(data);

        var compare = await Crypto.hashCompareAsync(data.oldPassword, user.password);
        if (!compare)
            throwCustomException(global.ERROR_TYPE.IncorrectPassword);

        let result = await User.update({
            password: await Crypto.hashGenerateAsync(data.newPassword)
        }, {
            where: {
                isDeleted: false,
                id: id
            }
        });

        ProcessCheckManager.checkUpdateResult(result);
        return await this.getById(id);

    }

    async checkMailOrUserName(mail, userName, id = null) {

        let result = await User.findOne({
            where: {
                isDeleted: false,
                [Op.or]: {
                    mail: mail,
                    userName: userName,
                }
            }
        });

        if (result) {
            if (result.id == id) {
                return false;
            }
            return true;
        }

        return false;

    }

}

module.exports = new UserService();