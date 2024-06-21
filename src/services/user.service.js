const logger = require('../util/logger')
const db = require('../dao/mysql-db')
const { getById } = require('../controllers/user.controller')

const userService = {
    create: (user, callback) => {
        logger.debug(' aaaaaaaaaaaaaaaa')
        logger.info('create user', user)
        db.getConnection(function (err, connection) {
            if (err) {
                logger.error(err)
                callback(err, null)
                return
            }

            connection.query(
                `INSERT INTO user (firstName, lastName, emailAdress, password, isActive, street, city, phoneNumber, roles) VALUES (?, ?, ?, ?, ?, ?, ?, ?,?);` ,
                [
                    user.firstName,
                    user.lastName,
                    user.emailAdress,
                    user.password,
                    user.isActive,
                    user.street,
                    user.city,
                    user.phoneNumber,
                    user.roles
                ],
                function (error, results, fields) {
                    connection.release()

                    if (error) {
                        logger.error(error)
                        callback(error, null)
                    } else {
                        logger.debug(results)
                        callback(null, {
                            message: `Created user with id ${results.insertId}.`,
                            data: results
                        })
                    }
                }
            )
        })
    },

    getAll: (callback) => {
        logger.info('getAll')

        // Nieuwe manier van werken: met de MySQL database
        db.getConnection(function (err, connection) {
            if (err) {
                logger.error(err)
                callback(err, null)
                return
            }

            connection.query(
                'SELECT id, firstName, lastName FROM `user`',
                function (error, results, fields) {
                    connection.release()

                    if (error) {
                        logger.error(error)
                        callback(error, null)
                    } else {
                        logger.debug(results)
                        callback(null, {
                            message: `Found ${results.length} users.`,
                            data: results
                        })
                    }
                }
            )
        })
    },

    getById: (userId, callback) => {
        logger.info('getById userId:', userId)

        db.getConnection(function (err, connection) {
            if (err) {
                logger.error(err)
                callback(err, null)
                return
            }

            connection.query(
                'SELECT *  FROM `user` WHERE id = ?',
                [userId],
                function (error, results, fields) {
                    connection.release()

                    if (error) {
                        logger.error(error)
                        callback(error, null)
                    } else {
                        logger.debug(results)
                        callback(null, {
                            message: `Found ${results.length} user.`,
                            data: results
                        })
                    }
                }
            )
        })
    },

    getProfile: (userId, callback) => {
        logger.info('getProfile userId:', userId)

        db.getConnection(function (err, connection) {
            if (err) {
                logger.error(err)
                callback(err, null)
                return
            }

            connection.query(
                'SELECT id, firstName, lastName FROM `user` WHERE id = ?',
                [userId],
                function (error, results, fields) {
                    connection.release()

                    if (error) {
                        logger.error(error)
                        callback(error, null)
                    } else {
                        logger.debug(results)
                        callback(null, {
                            message: `Found ${results.length} user.`,
                            data: results
                        })
                    }
                }
            )
        })
    },

        updateUser: (userId, user, callback) => {
        logger.info('updateUser userId:', userId);
        console.log(user)
        db.getConnection((err, connection) => {
            if (err) {
                logger.error(err);
                callback(err, null);
                return;
            }
            const valuesToUpdate = [];
                        const columnsToUpdate = Object.keys(user)
                            .filter(key => user[key] !== undefined && user[key] !== null && key !== 'emailAddress')
                            .map(key => {
                                valuesToUpdate.push(user[key]);
                                return `${key}=?`;
                            });

                        if (columnsToUpdate.length === 0) {
                            connection.release();
                            callback(new Error('No fields to update'), null);
                            return;
                        }

                        const setClause = columnsToUpdate.join(', ')
                        const sql = `UPDATE user SET ${setClause} WHERE id = ?`

                        const values = [...valuesToUpdate, userId]

            connection.query(sql, values, (error, results) => {
                connection.release();
                if (error) {
                    logger.error(error);
                    callback(error, null);
                } else {
                    logger.debug(results);
                    callback(null, {
                        message: `User updated with id ${userId}.`,
                        data: results
                    });
                }
            });
        });
    },

    deleteUser: (userId, callback) => {
        logger.info('deleteUser userId:', userId);
        db.getConnection((err, connection) => {
            if (err) {
                logger.error(err);
                callback(err, null);
                return;
            }
            connection.query('DELETE FROM `user` WHERE id = ?', [userId], (error, results, fields) => {
                connection.release();
                if (error) {
                    logger.error(error);
                    callback(error, null);
                } else {
                    logger.debug(results);
                    callback(null, {
                        message: `Deleted ${results.affectedRows} user.`,
                        data: results
                    });
                }
            });
        });
    }
}

module.exports = userService