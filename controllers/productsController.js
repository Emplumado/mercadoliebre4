const {Products} = require('../database/models')
const {validationResult} = require("express-validator");
const fs = require("fs");
const path = require("path");
const glob = require("glob");

const productsController = {

    index: async (req, res) => {
        try {
            let products = await Products.findAll()
            res.render('products', { products});
        } catch (error) {
            console.error(error)
        }
    },

    detail: async (req, res) => {
        try {
            const product = await Products.findOne({
                where:{
                    id: parseInt(req.params.id)
                }
            });
            res.render("detail", {product});
        } catch (error) {
            res.render("error", {error});
        }
    },

    create: async (req, res) => {
		try {
			res.render("product-create-form");
		} catch(error) {
			res.render("error", {error});
		}
	},

    store: async (req, res) => {
        try{
            let validationErrors = validationResult(req);
            if (typeof req.file === 'undefined') {
                let newError = {
                   value: '',
                   msg: 'Debe cargar una imagen de producto',
                   param: 'image',
                   location: 'files'
                }
				errors.errors.push(newError);
				
			}
            if (validationErrors.isEmpty()) {
                await Products.create({
                    name: req.body.name,
                    price: req.body.price,
                    discount: req.body.discount,
                    category: req.body.category,
                    description: req.body.description,
                    image: req.file.filename
                });
                res.redirect("/products");
            }else {
                res.render("product-create-form", {errors: validationErrors.errors});
                }
        }catch(error) {
            res.render("error", {error});
            }
    },

    edit: async (req, res) => {
		try {
			const productToEdit = await Products.findByPk(req.params.id);
			res.render("product-edit-form", {productToEdit});
		} catch(error) {
			res.render("error", {error});
		}
	},
    
    update: async (req, res) => {
        try{
            let validationErrors = validationResult(req);
            if (validationErrors.isEmpty()) {
                await Products.update({
                    name: req.body.name,
                    price: req.body.price,
                    discount: req.body.discount,
                    category: req.body.category,
                    description: req.body.description
                }, {
                    where: {
                        id: req.params.id
                    }
                });
                res.redirect("/products/detail/" + req.params.id);
            }else {
				const productToEdit = await Products.findByPk(req.params.id);
				res.render("product-edit-form", {errors: validationErrors.errors, productToEdit});
			}
		} catch(error) {
			res.render("error", {error});
		}
    },

    destroy: async (req, res) => {
        try {
			const product = await Products.findByPk(req.params.id);
			const imageFile = glob.sync(path.join(__dirname, "..", "public", "img", "products", `${product.image}`));
            imageFile.forEach(file => fs.unlinkSync(file));
			await Products.destroy({
				where: {
					id: req.params.id
				}
			});
			res.redirect("/products");
		} catch(error) {
			res.render("error", {error});
		}
    },
};

module.exports = productsController;