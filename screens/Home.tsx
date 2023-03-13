import React, {useEffect, useState} from 'react';
import Card from "../components/Card";

export default function Home() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    fetch('https://www.themealdb.com/api/json/v1/1/lookup.php?i=52772')
      .then((res) => res.json())
      .then((json) => setData(json.meals))
  }, [])
  return (
    <Card recipe={data[0]}/>
  );
}