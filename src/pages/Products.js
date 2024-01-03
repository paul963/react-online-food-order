import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

import classes from './Products.module.css';

function Products() {
  const [selectedMeal, setSelectedMeal] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();

  const { productCategory, productLink } = useParams();
  console.log(productCategory, productLink);

  useEffect(() => {
    const fetchMeal = async () => {
      const response = await fetch(
        'https://food-order-56332-default-rtdb.firebaseio.com/menu.json'
      );

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const responseData = await response.json();

      const loadedMeal = responseData[productCategory]?.[productLink];

      if (!loadedMeal) {
        throw new Error('Meal not found!');
      }

      setSelectedMeal({
        id: productLink,
        productCategory,
        productLink,
        name: loadedMeal.name,
        image: loadedMeal.image,
        description: loadedMeal.description,
        price: `$${loadedMeal.price.toFixed(2)}`,
      });

      document.title = loadedMeal.name;
      const metaDescription = document.createElement('meta');
      metaDescription.name = 'description';
      metaDescription.content = loadedMeal.description;
      document.head.appendChild(metaDescription);

      setIsLoading(false);
    };

    fetchMeal().catch((error) => {
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

  return (
    <>
      {httpError ? (
        <section className={classes.MealsError}>
          {/* <p>{httpError}</p> */}
          <h1>An error occurred!</h1>
          <h2>Product doesn't exist...</h2>
          <Link to='..' className={classes.back}>
            All products
          </Link>
        </section>
      ) : (
        <div className={classes.mealContainer}>
          <h1 className={classes.mealName}>{selectedMeal.name}</h1>
          {selectedMeal.image && <img className={classes.mealImage} src={selectedMeal.image} />}
          <p className={classes.mealDescription}>{selectedMeal.description}</p>
          <h2 className={classes.mealPrice}>{selectedMeal.price}</h2>
          <Link to='..' className={classes.back}>
            All products
          </Link>
        </div>
      )}
    </>
  );
}

export default Products;