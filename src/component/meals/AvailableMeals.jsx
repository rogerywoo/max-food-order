import react, { useState, useCallback, useEffect } from 'react';
import classes from './AvailableMeals.module.css';
import Card from '../ui/Card';
import MealItem from './mealItem/MealItem';

const DUMMY_MEALS = [
  {
    id: 'm1',
    name: 'Sushi',
    description: 'Finest fish and veggies',
    price: 22.99,
  },
  {
    id: 'm2',
    name: 'Schnitzel',
    description: 'A german specialty!',
    price: 16.5,
  },
  {
    id: 'm3',
    name: 'Barbecue Burger',
    description: 'American, raw, meaty',
    price: 12.99,
  },
  {
    id: 'm4',
    name: 'Green Bowl',
    description: 'Healthy...and green...',
    price: 18.99,
  },
];


const AvailableMeals = () => {

  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMenuHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('https://max-web-api-e658a-default-rtdb.firebaseio.com/meals.json');
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const data = await response.json();
      let loadedMeals;
      setTimeout(() => {
        loadedMeals = [];

        for (const key in data) {
          loadedMeals.push({
            id: key,
            description: data[key].description,
            name: data[key].name,
            price: data[key].price
          })
        }
        setMeals(loadedMeals);
      }, 2000);


    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchMenuHandler();
  }, [fetchMenuHandler]);

  const getContent = () => {

    let content = <p>Getting Meals...</p>;
 
    // // const mealsList = DUMMY_MEALS.map(meal =>{
    if (meals) {
      const mealsList = meals.map(meal => {
        return (<MealItem
          key={meal.id}
          id={meal.id}
          name={meal.name}
          price={meal.price}
          description={meal.description} />);
      });


      if (meals.length > 0) {
        content = mealsList;
      }
    }

    // if (error) {
    //   content = <p>{error}</p>;
    // }

    // if (isLoading) {
    //   content = <p>Loading...</p>;
    // }
    return content;
  }

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{getContent()}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;