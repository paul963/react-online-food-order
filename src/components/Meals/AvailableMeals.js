import { Fragment, useEffect, useState } from 'react';

import MealItem from './MealItem/MealItem';
import classes from './AvailableMeals.module.css';

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();

  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch(
        'https://food-order-56332-default-rtdb.firebaseio.com/menu.json'
      );

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const responseData = await response.json();

      const loadedMeals = [];

      for (const category in responseData) {
        for (const key in responseData[category]) {
          loadedMeals.push({
            id: key,
            category: category,
            link: responseData[category][key].link,
            name: responseData[category][key].name,
            description: responseData[category][key].description,
            price: responseData[category][key].price,
          });
        }
      }

      setMeals(loadedMeals);
      setIsLoading(false);
    };

    fetchMeals().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, []);

  if (isLoading) {
    return (
      <section className={classes.MealsLoading}>
        <p>Loading...</p>
      </section>
    );
  }

  if (httpError) {
    return (
      <section className={classes.MealsError}>
        <p>{httpError}</p>
      </section>
    );
  }

  const groupedMeals = {};

  meals.forEach((meal) => {
    if (!groupedMeals[meal.category]) {
      groupedMeals[meal.category] = [];
    }
    groupedMeals[meal.category].push(meal);
  });

  const mealsList = [];
  for (const category in groupedMeals) {
    if (groupedMeals.hasOwnProperty(category)) {
      mealsList.push(
        <Fragment key={category}>
          <h2 style={{ textAlign: "center", textTransform: "uppercase" }}>{category}</h2>
          {groupedMeals[category].map((meal) => (
            <MealItem
              key={meal.id}
              id={meal.id}
              category={meal.category}
              link={meal.link}
              name={meal.name}
              description={meal.description}
              price={meal.price}
            />
          ))}
        </Fragment>
      );
    }
  }

  return (
    <section className={classes.meals}>
      <div className={classes.mealsItem}>
        <ul>{mealsList}</ul>
      </div>
    </section>
  );
};

export default AvailableMeals;