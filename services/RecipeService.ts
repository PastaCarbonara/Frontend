import { API_URL } from '@env';

import HttpErrorHandling from './HttpErrorHandling';
async function fetchRecipes() {
    try {
        const response = await fetch(`${API_URL}/recipes`, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return HttpErrorHandling.responseChecker(response);
    } catch (error) {
        console.error(`Error fetching data: ${error}`);
    }
}

async function fetchRecipeInfo(id: number) {
    try {
        const response = await fetch(`${API_URL}/recipes/${id}`, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return HttpErrorHandling.responseChecker(response);
    } catch (error) {
        console.error(`Error fetching data: ${error}`);
    }
}

const recipeService = {
    fetchRecipes,
    fetchRecipeInfo,
};

export default recipeService;
