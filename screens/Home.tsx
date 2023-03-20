import React, {useEffect, useState} from 'react';
import Test from "../components/Swiper";
import {Recipe} from "../types";
import recipeService from "../services/recipeService";

export default function Home() {
  const [data, setData] = useState<Recipe[]>([]);

  useEffect(() => {
    recipeService.fetchRecipes()
      .then((recipes) => {
        setData(recipes)
      })
  }, [])
  return (
    <Test recipes={data}/>
  );
}