const db = require("../db");
var _ = require("lodash");
const QuotePackage = require("../User-Models/QuotePackages.model");

module.exports = {
    /**
     * @method getAll
     * @description this method will fetch all ReleaseDate
     * @param req
     * @param res
     * @returns void
     */
    getAll: async (req, res) => {
        try {
            QuotePackage.findAll()
                .then((data) => {
                    res.send(data);
                })
                .catch((err) => {
                    res.status(500).send({
                        message:
                            err.message || "Some error occurred while retrieving ReleaseDate details.",
                    });
                });
        } catch (error) {
            console.log(error.message);
        }
    },

    /**
     * @method create
     * @description this method will create new ReleaseDate details
     * @param req
     * @param res
     * @returns void
     */
    create: async (req, res) => {
        try {
            const payload = {
                packageTypeFk:req.body.packageTypeFk,
                quoteIdFk:req.body.quoteId,
                noOfPackages:req.body.noOfPackages,
                packageMeasurment:req.body.packageMeasurment,
                packageUnit:req.body.packageUnit,
                packageWeight:req.body.packageWeight,
                packageLength:req.body.packageLength,
                packageWidth:req.body.packageWidth,
                packageHeight:req.body.packageHeight,
                packageVolume:req.body.packageVolume,
                packageHazardous:req.body.packageHazardous,
                packageHtsCode:req.body.packageHtsCode,
                createdBy:req.body.createdBy,
                modifiedBy:req.body.modifiedBy
            };

            await QuotePackage.create(payload)
                .then((data) => {
                    res.send(data);
                })
                .catch((err) => {
                    res.status(500).send({
                        message:
                            err.message || "Some error occurred while creating the ReleaseDate details.",
                    });
                });
        } catch (error) {
            console.log(error.message);
        }
    },

    /**
     * @method find
     * @description this method will Find and Show ReleaseDate details based on id
     * @param req
     * @param res
     * @returns void
     */
    find: async (req, res, next) => {
        try {
            const id = req.params.id;
            QuotePackage.findAll({
                where: { id: id },
            })
                .then((data) => {
                    if (data) {
                        res.send(data[0]);
                    } else {
                        res.status(404).send({
                            message: `Cannot find ReleaseDate details with id=${id}.`,
                        });
                    }
                })
                .catch((err) => {
                    res.status(500).send({
                        message: "Error retrieving ReleaseDate details with id=" + id,
                    });
                });
        } catch (error) {
            console.log(error.message);
        }
    },

    /**
     * @method find
     * @description this method will Find and Show ReleaseDate details based on id
     * @param req
     * @param res
     * @returns void
     */
    loadPackages: async (req, res, next) => {
        try {
            const search = JSON.parse(req.query.search);
            const id = req.query.quoteId;
            // QuotePackage.findAll({
            //     where: { id: id },
            // })
            let query = 'select sqp.id, sqp."quoteIdFk", sqp."packageTypeFk", sqp."noOfPackages", \
            sqp."packageMeasurment", sqp."packageUnit", sqp."packageWeight",\
            sqp."packageLength", sqp."packageWidth", sqp."packageHeight", sqp."packageVolume", \
            sqp."packageHazardous",sqp."packageHtsCode",sqp."createdAt",\
            (spt."packageName") as "packageName",\
            concat(sqp."packageLength",\'X\',sqp."packageWidth",\'X\',sqp."packageHeight") as "packageLWH" \
            from sc_quotation_packages sqp left join sc_package_tbls spt on spt.id =sqp."packageTypeFk"  where sqp ."quoteIdFk" ='+id+'and';
            query += ' true LIMIT ' + req.query.limit + ' OFFSET ' + req.query.limit * req.query.currentPage
            db.query(
                query
                )
                .then((data) => {
                    db.query(`select count(sc_quotation_packages.id) from sc_quotation_packages where\
                    sc_quotation_packages."quoteIdFk"=`+ req.query.quoteId).then((count) => {
                    const response = {
                        count: count[0][0].count,
                        data: data[0],
                        currentPage: req.query.currentPage,
                        limit: req.query.limit,
                    };
                    res.send(response);
                    });
                })
                .catch((err) => {
                    res.status(500).send({
                        message: "Error retrieving ReleaseDate details with id=" + id,
                    });
                });
        } catch (error) {
            console.log(error.message);
        }
    },

    /**
     * @method update
     * @description this method will update ReleaseDate details data based on id
     * @param req
     * @param res
     * @returns void
     */
    update: async (req, res, next) => {
        try {
            const id = req.params.id;
            QuotePackage.update(req.body, {
                where: { id: id },
            })
                .then((num) => {
                    if (num == 1) {
                        res.send({
                            message: "ReleaseDate details was updated successfully.",
                        });
                    } else {
                        res.send({
                            message: `Cannot update ReleaseDate details with id=${id}. Maybe ReleaseDate details was not found or req.body is empty!`,
                        });
                    }
                })
                .catch((err) => {
                    res.status(500).send({
                        message: "Error updating ReleaseDate details with id=" + id,
                    });
                });
        } catch (error) {
            console.log(error.message);
        }
    },

    /**
     * @method delete
     * @description this method will delete ReleaseDate details data based on id
     * @param req
     * @param res
     * @returns void
     */
    delete: async (req, res, next) => {
        try {
            const id = req.params.id;
            QuotePackage.destroy({
                where: { id: id },
            })
                .then((num) => {
                    if (num == 1) {
                        res.send({
                            message: "ReleaseDate details was deleted successfully!",
                        });
                    } else {
                        res.send({
                            message: `Cannot delete ReleaseDate details with id=${id}. Maybe ReleaseDate details was not found!`,
                        });
                    }
                })
                .catch((err) => {
                    res.status(500).send({
                        message: "Could not delete ReleaseDate details with id=" + id,
                    });
                });
        } catch (error) {
            console.log(error.message);
        }
    },
};
