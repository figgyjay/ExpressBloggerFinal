const { uuid } = require('uuidv4');
			var express = require('express');
			var router = express.Router();

			const {db} = require("../mongo")

 
			router.get('/get-one-example', async function(req, res, next) {
				const blogPost = await db().collection("blogs").findOne({
					id: {
						$exists: true
					}
				})
				res.json({
					success: true,
					post: blogPost
				})
			});

			

			router.get('/get-one/:id', async function(req, res, next) {
						if (!req.params.id){
							res.json({
								success: false,
								message: "Blog ID is required"
							})
							return;
						}
						const blogPosts = await db().collection('blogs').findOne({
							id: req.params.id
						})
						res.json({
							success: true,
							posts: blogPosts
						})
				});
				

				router.post('/create-one', async function(req, res, next){
					try {
						const newPost = {
							title: req.body.title,
							text: req.body.text,
							author: req.body.author,
							email: req.body.email,
							categories: req.body.categories,
							starRating: Number(req.body.starRating)
						}

						await db().collection('blogs').insertOne()

						res.json({
							success: true,
							newPost
						})
					} catch(e){
						console.log(typeof(e))
					}
				});

				router.delete('/delete-one', async function(req, res){
				console.log (req.body)
				res.json({
					success: true,
				})

				router.get('/get-multi', async function(req,res) {
					const sortField = req.query.sortField;
					const sortOrder = Number(req.query.sortOrder);
					const limit = Number(req.query.limit);
					const page = Number(req.query.page);
				
					console.log(sortField, typeof sortField);
					console.log(sortOrder, typeof sortOrder);
					console.log(limit, typeof limit);
					console.log(page, typeof page);

					const skip = limit * page - 1;
					console.log(skip);

					const blogs = await db().collection('blogs').find({}).sort({
						[sortField]: sortOrder
					}).limit(limit).skip()

					res.json({
						success: true,
					})

				})

				router.delete('/delete-multi', async function (req, res){
					console.log(req.body)
					res.json({
						success: true
					})
				})
			})
			
		



			module.exports = router;