import React, {useEffect, useState} from 'react';
import Recipe from "../components/Recipe";

export default function Home({route}) {
    const {id} = route.params;
    const [recipeData, setRecipeData] = useState<Object[]>([]);
    const [ingredientData, setIngredientData] = useState<Object[]>([]);

    useEffect(() => {
        Promise.all([
            fetch(`http://localhost:8000/api/v1/recipes/${id}`),
            fetch(`http://localhost:8000/api/v1/recipes/${id}`),
        ]).then(([resRecipe, resIngredients]) => Promise.all([resRecipe.json(), resIngredients.json()]))
            .then(([resRecipeData, resIngredientData]) => {
                setRecipeData(resRecipeData);
                setIngredientData(resIngredientData);
            })
    }, [])
    console.log(recipeData, ingredientData);
    return (
        <Recipe recipeInfo={recipeData} ingredientInfo={ingredientData}/>
    );
}