import React, {useEffect, useState} from 'react';
import Test from "../components/Swiper";
import {Recipe} from "../types";

export default function Home() {
  const [data, setData] = useState<Recipe[]>([]);

  useEffect(() => {
    fetch('http://localhost:8000/api/v1/recipes')
      .then((res) => res.json())
      .then((json) => setData(json))
  }, [])
  return (
    <Test recipes={data}/>
  );
}