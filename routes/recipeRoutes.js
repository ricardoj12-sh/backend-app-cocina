const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController');

// Rutas para las recetas
router.get('/recipes/:id', recipeController.getRecipeById);
router.post('/recipes', recipeController.addRecipe);
// Rutas para las recetas
router.get('/search', recipeController.searchRecipesByDishName);
router.get('/category/:category', recipeController.searchRecipesByCategories);
router.get('/country/:country', recipeController.searchRecipesByCountry);
router.post('/saveRecipeFromApi', recipeController.saveRecipeFromApi); // Nueva ruta para guardar receta


module.exports = router;
