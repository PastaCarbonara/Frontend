const getRecipes = () => {
    fetch('http://localhost:8000/api/v1/recipes', {
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then((response) => response.json())
        .then((data) => console.log(data));
}

const recipeService = {
    getRecipes,
};

export default recipeService;