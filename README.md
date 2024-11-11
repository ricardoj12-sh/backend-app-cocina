Endpoints de Comentarios
POST /api/comments/: Crea un nuevo comentario en la base de datos.
GET /api/comments/:recipeId: Obtiene los comentarios asociados a una receta específica usando el recipeId.
Endpoints de Recetas
GET /api/recipes/:id: Busca una receta por su ID. Si no está en la base de datos, la busca en la API externa de TheMealDB.
POST /api/recipes: Agrega una nueva receta en la base de datos.
GET /api/search?name=nombre: Busca recetas por el nombre del plato proporcionado en el query name.
GET /api/category/:category: Busca recetas en la base de datos según una categoría específica.
GET /api/country/:country: Busca recetas en la base de datos según el país de origen especificado.
POST /api/saveRecipeFromApi: Guarda una receta de la API externa en la base de datos usando el idMeal proporcionado en el cuerpo de la solicitud.
