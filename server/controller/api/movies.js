const Movie = require('../../db/models').Movies
const User = require('../../db/models').User
const Op = require('sequelize').Op
module.exports = {

    getById(req, res, next) {
        console.log(req.body)
        Movie
            .findById(req.params.movieId)
            .then((result, err) => {
                if (err) {
                    next(err)
                } else {
                    res.json({
                        status: "success",
                        message: "Movie Found!!!",
                        data: {
                            movies: result
                        }
                    })
                }
            })
    },
    getAll(req, res, next) {
        Movie
            .findAll()
            .then(err, result => {
                if (err) {
                    next(err)
                } else {
                    res.json({
                        status: "success",
                        message: "List Movie Found!!!",
                        data: {
                            movies: result
                        }
                    })
                }
            })
    },
    create(req, res, err) {
        return User
            .findById(req.body.userId)
            .then((result) => {
                if (result) {
                    Movie
                        .findOne({
                            where: {
                                name_movies: req.body.name
                            }
                        })
                        .then((movie) => {
                            if (movie) {
                                return res.status(400).send({
                                    code: 92,
                                    error: true,
                                    message: 'Film Sudah Ada!'
                                })
                            }
                            Movie
                                .create({
                                    name_movies: req.body.name,
                                    release_date: req.body.release,
                                    createdBy: result.kode_karyawan
                                })
                                .then((result, err) => {
                                    if (err) {
                                        return res.status(400).send({
                                            success: "Error",
                                            message: {
                                                error: err,
                                            }

                                        })
                                    }
                                    return res.status(201).send({
                                        success: true,
                                        message: 'Data successfully create!'
                                    })
                                })
                        })

                } else {
                    return res.status(400).send({
                        code: 99,
                        error: true,
                        message: 'Data User Not Found ERROR!!'
                    })
                }
            })

    },
    getAllVersiDian(req, res) {
        Movie
            .findAll()
            .then((result) => {
                return res.status(200).send({
                    code:"00",
                    error:false,
                    data: result
                })
            }).catch((error) => res.status(400).send(error))
    }
}