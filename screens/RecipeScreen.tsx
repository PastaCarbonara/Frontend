import React, {useEffect, useState} from 'react';
import RecipeInfo from "../components/RecipeInfo";
import recipeService from "../services/RecipeService";
import {Recipe} from "../types";

export default function RecipeScreen({route}) {
    const {id} = route.params;
    const [recipeData, setRecipeData] = useState<Recipe>();

    useEffect(() => {
        recipeService.fetchRecipeInfo(id)
            .then((recipeData) => {
                setRecipeData(recipeData);
            })
    }, [])
    console.log(recipeData)
    return (
        <RecipeInfo recipeInfo={recipeData}/>
    );
}