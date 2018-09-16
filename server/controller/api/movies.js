const Movie = require('../../db/models').Movies
const User = require('../../db/models').User
const Op = require('sequelize').Op
module.exports = {
    getById(req, res, next) {
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
            }).catch((error) => res.status(400).send(error))
    },
    getAll(req, res) {
        Movie
            .findAll()
            .then((result) => {

                if (result.length > 0) {
                    return res.status(200).send({
                        code: "00",
                        error: false,
                        data: result
                    })
                }
                return res.status(400).send({
                    code: 90,
                    error: false,
                    message: 'Data Not Found!'
                })
            }).catch((error) => res.status(400).send(error))
    },
    create(req, res, err) {

        if(!req.body.isSuperUser){
            return res.status(401).send({
                code:02,
                error:true,
                message:'User Not Authorization/Previledge For This Request!'
            })
        }
        return Movie
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
                        createdBy: req.body.kodeKaryawan
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
                            message: 'Data successfully created!'
                        })
                    }).catch((error) => res.status(400).send(error))
            })

    },
    updateById(req, res) {
        if(!req.body.nama || !req.body.release){
            return res.status(400).send({
                code:99,
                error:true,
                message:'Validasi Payload Not Null!'
            })
        }
        return Movie
            .findById(req.body.id)
            .then((result) => {
                if (result) {
                    Movie
                        .update({
                            name_movies: req.body.nama,
                            release_date: req.body.release
                        }, {
                            where: {
                                id: result.id
                            }
                        })
                        .then((movie) => {
                            return res.status(202).send({
                                code: "00",
                                error: false,
                                message: 'Data ID ' + req.body.id + ' berhasil di update!'
                            })
                        }).catch((error) => res.status(400).send(error))
                } else {
                    return res.status(400).send({
                        code: 90,
                        error: true,
                        message: 'ID ' + req.body.id + ' Not Found!'
                    })
                }
            }).catch((error) => res.status(400).send(error))
    }
}