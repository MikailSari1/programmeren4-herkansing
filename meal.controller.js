const mealService = require('../services/meal.service')
const logger = require('../util/logger')
const userService = require("../services/user.service");

let userController = {
    createMeal: (req, res, next) => {
        const meal = req.body
        const userId = req.userId

        logger.info('create meal ', meal.name, meal.id, ' userId: ', userId)
        mealService.createMeal(meal, userId, (error, success) => {
            if (error) {
                return next({
                    status: error.status,
                    message: error.message,
                    data: {}
                })
            }
            if (success) {
                res.status(200).json({
                    status: success.status,
                    message: success.message,
                    data: success.data
                })
            }
        })
    },
    getAll: (req, res, next) => {
        logger.trace('getAll meals')
        mealService.getAll((error, success) => {
            if (error) {
                return next({
                    status: error.status,
                    message: error.message,
                    data: {}
                })
            }
            if (success) {
                res.status(200).json({
                    status: 200,
                    message: success.message,
                    data: success.data
                })
            }
        })
    },
    getById: (req, res, next) => {
        const mealId = req.params.mealId;
        logger.trace('getById', mealId);
        mealService.getById(mealId, (error, success) => {
            if (error) {
                return next({
                    status: error.status,
                    message: error.message,
                    data: {}
                });
            }
            if (success) {
                res.status(200).json({
                    status: 200,
                    message: success.message,
                    data: success.data
                });
            }
        });
    },
    deleteMeal: (req, res, next) => {
        const mealId = req.params.mealId;
        logger.info('delete meal', mealId);
        mealService.delete(mealId, (error, success) => {
            if (error) {
                return next({
                    status: error.status,
                    message: error.message,
                    data: {}
                });
            }
            if (success) {
                res.status(200).json({
                    status: 200,
                    message: success.message,
                    data: success.data
                });
            }
        });
    },
    updateMeal: (req, res, next) => {
        const mealId = req.params.mealId;
        const meal = req.body;
        logger.info('update meal', mealId);
        mealService.update(mealId, meal, (error, success) => {
            if (error) {
                return next({
                    status: error.status,
                    message: error.message,
                    data: {}
                });
            }
            if (success) {
                res.status(200).json({
                    status: 200,
                    message: success.message,
                    data: success.data
                });
            }
        });
    }

}
module.exports = userController