const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController');

router.get('/recipes', recipeController.getAllRecipes);

// Rutas para las recetas
router.get('/recipes/:id', recipeController.getRecipeById);
router.post('/recipes', recipeController.addRecipe);
// Rutas para las recetas
router.get('/search', recipeController.searchRecipesByDishName);
router.get('/category/:category', recipeController.searchRecipesByCategories);
router.get('/country/:country', recipeController.searchRecipesByCountry);
// routes/reciperoutes.js
router.get('/categories', recipeController.getAllCategories);




module.exports = router;
