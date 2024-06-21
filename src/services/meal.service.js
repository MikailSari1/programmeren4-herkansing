
const logger = require('../util/logger')
const db = require('../dao/mysql-db.js')
const mealService = {
    createMeal: (meal, userId, callback) => {
        logger.info('create meal', meal);
        logger.info('isVegan',meal.isVegan)
        db.getConnection(function (err, connection) {
            if (err) {
                logger.error(err);
                callback(err, null);
                return;
            }

            const isVega = meal.isVega  === 1 ? 1 : 0
            const isVegan = meal.isVegan === 1 ? 1 : 0
            const isToTakeHome = meal.isToTakeHome  === 0 ? 0 : 1
            const dateTime = meal.dateTime
            const maxAmountOfParticipants = meal.maxAmountOfParticipants ? meal.maxAmountOfParticipants : 6;
            const price = meal.price
            const imageUrl = meal.imageUrl
            const name = meal.name
            const description = meal.description
            const allergenes = meal.allergenes
            logger.trace(isVegan, isVega, isToTakeHome, dateTime, maxAmountOfParticipants, price, imageUrl, userId, name, description, allergenes)

                connection.query(
                    'INSERT INTO meal (isVega, isVegan, isToTakeHome, dateTime, maxAmountOfParticipants, price, imageUrl, cookId, createDate, updateDate, name, description, allergenes) VALUES (?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP(), ?, ?, ?)',
                    [isVega, isVegan, isToTakeHome, dateTime, maxAmountOfParticipants, price, imageUrl, userId, name, description, allergenes],
            function (error, results, fields) {
                    connection.release();

                    if (error) {
                        logger.error('error creating meal:', error.message || 'unknown error');
                        callback(error, null);
                    } else {
                        logger.trace('Meal created.');
                        callback(null, {
                            data: results
                        })
                    }
                }
            )
        })
    },

    getAll: (callback) => {
        logger.info('getAll meals')
        db.getConnection(function (err, connection) {
            if (err) {
                logger.error(err)
                callback(err, null)
                return
            }

            connection.query(
                'SELECT * FROM `meal`',
                function (error, results, fields) {
                    connection.release()

                    if (error) {
                        logger.error(error)
                        callback(error, null)
                    } else {
                        logger.debug(results)
                        callback(null, {
                            message: `Found ${results.length} meals.`,
                            data: results
                        })
                    }
                }
            )
        })
    },

    getById: (mealId, callback) => {
        logger.info('getById', mealId);
        db.getConnection(function (err, connection) {
            if (err) {
                logger.error(err)
                callback(err, null)
                return
            }

            connection.query(
                'SELECT * FROM `meal` WHERE id = ?',
                id = mealId,
                function (error, results, fields) {
                    connection.release()

                    if (error) {
                        logger.error(error)
                        callback(error, null)
                    } else {
                        logger.debug(results)
                        callback(null, {
                            message: `Found meal with id ${mealId}.`,
                            data: results
                        })
                    }
                }
            )
        })
    },
    deleteMeal: (mealId, callback) => {
        logger.info('delete meal', mealId)
        db.getConnection(function (err, connection) {
            if (err) {
                logger.error(err)
                callback(err, null)
                return
            }

            connection.query(
                'DELETE FROM `meal` WHERE id = ?',
                id = mealId,
                function (error, results, fields) {
                    connection.release()

                    if (err) {
                        logger.info(
                            'error deleting meal: ',
                            err.message || 'unknown error'
                        )
                        callback(err, null)
                    } else {
                        logger.trace(`Meal deleted with id ${mealId}.`)
                        callback(null, {
                            message: `Meal with id ${mealId} is deleted`,
                            data: results
                        })
                    }
                }
            )
        })
    },
    updateMeal: (mealId, meal, callback) => {
        logger.info('update meal', mealId);

        const valuesToUpdate = [];
        const columnsToUpdate = Object.keys(meal)
            .filter(key => meal[key] !== undefined && meal[key] !== null) // Filter out undefined or null values
            .map(key => {
                valuesToUpdate.push(meal[key]);
                return `${key}=?`;
            });

        if (columnsToUpdate.length === 0) {
            // No fields to update
            callback(new Error('No fields to update'), null);
            return;
        }

        const setClause = columnsToUpdate.join(', ');
        const sql = `UPDATE meal SET ${setClause} WHERE id = ?`;

        db.getConnection(function (err, connection) {
            if (err) {
                logger.error(err);
                callback(err, null);
                return;
            }

            const values = [...valuesToUpdate, mealId];

            connection.query(
                sql,
                values,
                function (error, results, fields) {
                    connection.release();

                    if (error) {
                        logger.error('Error updating meal:', error.message || 'unknown error');
                        callback(error, null);
                    } else {
                        logger.trace(`Meal updated with id ${mealId}.`);
                        callback(null, {
                            message: `Meal updated with id ${mealId}.`,
                            data: results
                        });
                    }
                }
            );
        });
    }


}
module.exports = mealService