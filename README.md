# Backend de Gestión de Recetas y Comentarios

Este backend permite gestionar recetas y comentarios para una aplicación de cocina. Utiliza Node.js con Express y Sequelize para interactuar con una base de datos MySQL. A través de esta API, los usuarios pueden buscar recetas por diferentes criterios, agregar nuevas recetas y comentarios, y obtener categorías predefinidas.

## Funcionalidad General

Este backend ofrece las siguientes funcionalidades principales:
1. **Gestión de Recetas**: Permite agregar, buscar, y filtrar recetas por diferentes parámetros, como el nombre del platillo, la categoría, y el país de origen.
2. **Gestión de Comentarios**: Permite a los usuarios agregar y ver comentarios asociados a recetas específicas.
3. **Integración con API externa**: Incluye un endpoint para guardar recetas desde una API externa en la base de datos.
4. **Configuración de CORS**: Permite que el frontend, alojado en `http://localhost:4200`, acceda a esta API.

## Endpoints

### Endpoints para Recetas (`recipeRoutes`)

#### Obtener una receta por ID
- **URL**: `GET /api/recipes/:id`
- **Descripción**: Devuelve una receta específica basada en su ID.
- **Respuesta**: JSON de la receta solicitada o un mensaje de error si no se encuentra.

#### Agregar una nueva receta
- **URL**: `POST /api/recipes`
- **Descripción**: Añade una nueva receta a la base de datos.
- **Body (JSON)**: 
  ```json
  {
    "strMeal": "Nombre de la receta",
    "strCategory": "Categoría",
    "strInstructions": "Pasos de la receta",
    "strArea": "País de origen",
    "strMealThumb": "URL de imagen",
    "strTags": "Etiquetas"
  }
Respuesta: JSON con la receta creada.
Buscar recetas por nombre del platillo
URL: GET /api/search?name=:name
Descripción: Busca recetas por el nombre del platillo (parcial o completo).
Respuesta: JSON con las recetas que coinciden con el nombre.
Buscar recetas por categoría
URL: GET /api/category/:category
Descripción: Filtra recetas según la categoría especificada.
Respuesta: JSON con las recetas que pertenecen a la categoría.
Buscar recetas por país de origen
URL: GET /api/country/:country
Descripción: Filtra recetas según el país de origen especificado.
Respuesta: JSON con las recetas del país solicitado.
Obtener todas las categorías
URL: GET /api/categories
Descripción: Devuelve una lista de categorías de recetas predefinidas en el sistema.
Respuesta: JSON con las categorías disponibles.
Endpoints para Comentarios (commentRoutes)
Agregar un comentario a una receta
URL: POST /api/comments
Descripción: Agrega un nuevo comentario a una receta específica.
Body (JSON):
json

{
  "recipeId": "ID de la receta",
  "user": "Nombre del usuario",
  "content": "Texto del comentario"
}
Respuesta: JSON con el comentario creado.
Obtener comentarios de una receta específica
URL: GET /api/comments/:recipeId
Descripción: Devuelve todos los comentarios asociados a una receta específica, basado en su recipeId.
