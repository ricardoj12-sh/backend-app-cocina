
const axios = require('axios');
const RecipeModel = require('../models/Recipe');

exports.getRecipeById = async (req, res) => {
    const { id } = req.params;
    try {
        // Primero, buscar en la base de datos
        console.log(`Buscando receta en la base de datos con id: ${id}`);
        const recipe = await RecipeModel.findOne({ where: { idMeal: id } });
        
        if (recipe) {
            console.log(`Receta encontrada en la base de datos: ${recipe.idMeal}`);
            return res.json(recipe); // Devolver la receta si está en la base de datos
        }

        // Si no está en la base de datos, buscar en la API externa
        console.log(`Receta no encontrada en la base de datos. Buscando en la API externa con id: ${id}`);
        const externalApiUrl = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
        const response = await axios.get(externalApiUrl);

        if (response.data.meals && response.data.meals.length > 0) {
            console.log(`Receta encontrada en la API externa: ${response.data.meals[0].idMeal}`);
            const externalRecipe = response.data.meals[0];
            return res.json(externalRecipe); // Devolver la receta de la API externa sin guardarla en la base de datos
        } else {
            console.log(`Receta no encontrada en la API externa con id: ${id}`);
            return res.status(404).json({ error: 'Receta no encontrada' });
        }
    } catch (error) {
        console.error('Error al obtener la receta:', error);
        res.status(500).json({ error: 'Error al obtener la receta' });
    }
};



exports.addRecipe = async (req, res) => {
    try {
        const newRecipe = req.body;
        console.log('Datos de la nueva receta:', newRecipe); // Verifica los datos recibidos
        const createdRecipe = await RecipeModel.create(newRecipe);
        res.status(201).json(createdRecipe);
    } catch (error) {
        console.error('Error al agregar la receta:', error); // Ver detalles del error
        res.status(500).json({ error: 'Error al agregar la receta' });
    }
};
exports.searchRecipesByDishName = async (req, res) => {
    const { name } = req.query;
    console.log(`Buscando recetas con el nombre: "${name}"`); // Añadir log
    try {
        const recipes = await RecipeModel.findByDishName(name);
        console.log(`Recetas encontradas: ${JSON.stringify(recipes)}`); // Añadir log
        if (recipes.length === 0) {
            return res.status(404).json({ error: 'Receta no encontrada' });
        }
        res.json(recipes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al buscar recetas' });
    }
};


exports.searchRecipesByCategories = async (req, res) => {
    const { category } = req.params;
    try {
        const recipes = await RecipeModel.findByCategory(category);
        res.json(recipes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al buscar recetas por categoría' });
    }
};

exports.searchRecipesByCountry = async (req, res) => {
    const { country } = req.params;
    try {
        const recipes = await RecipeModel.findByCountry(country);
        res.json(recipes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al buscar recetas por país' });
    }
};
exports.saveRecipeFromApi = async (req, res) => {
    const { id } = req.body; // Recibir el idMeal desde el cuerpo de la solicitud

    try {
        // Verificar si la receta ya está en la base de datos
        let recipe = await RecipeModel.findOne({ where: { idMeal: id } });
        if (recipe) {
            return res.status(400).json({ message: 'La receta ya está en la base de datos' });
        }

        // Llamada a la API externa para obtener la receta
        const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
        const externalRecipe = response.data.meals ? response.data.meals[0] : null;

        if (!externalRecipe) {
            return res.status(404).json({ message: 'Receta no encontrada en la API' });
        }

        // Guardar la receta en la base de datos
        recipe = await RecipeModel.create({
            idMeal: externalRecipe.idMeal,
            strMeal: externalRecipe.strMeal,
            strCategory: externalRecipe.strCategory,
            strInstructions: externalRecipe.strInstructions,
            strArea: externalRecipe.strArea,
            strMealThumb: externalRecipe.strMealThumb,
            strTags: externalRecipe.strTags,
            strIngredient1: externalRecipe.strIngredient1,
            strMeasure1: externalRecipe.strMeasure1,
            // Agregar los campos restantes según tu modelo
        });

        res.status(201).json(recipe);
    } catch (error) {
        console.error('Error al guardar la receta:', error);
        res.status(500).json({ message: 'Error al guardar la receta en la base de datos', error });
    }
};

