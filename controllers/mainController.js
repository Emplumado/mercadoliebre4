const {Products} = require('../database/models');
const {Op} = require('sequelize');

const mainController = {
    index: async (req, res) => {
        try {
			const products = await Products.findAll();
			res.render("index", {products});
		} catch(error) {
			res.render("error", {error});
		}
    },

    search: async (req, res) => {
        console.log(req.query.keywords)
        try {
            let results = await Products.findAll({
                where: {
                    name: {[Op.like]: `%${req.query.keywords}%`}
                }
            })
            let count=0
            results.forEach(x => {
                count=count+1
            });
            console.log(count)
            return res.render('results', {results,count, search: req.query.keywords})
        } catch (error) {
            res.render("error", {error});
        }
    },

    offers: async (req, res) => {
        try {
            const products = await Products.findAll({
                where: {
                    category: 'in-sale'
                }
            })
            res.render("offers", {products});
            }catch (error) {
                res.render("error", {error});
            }
    }
};

module.exports = mainController;