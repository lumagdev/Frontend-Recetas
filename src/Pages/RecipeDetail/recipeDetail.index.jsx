import React from 'react'
import { useEffect, useState } from 'react';
import Axios  from 'axios';
import { Link, useLocation } from 'react-router-dom';
import { useAuthState } from '../../Context/contexts';

import './recipeDetail.scss';
import Rating from '../../Components/Rating/Rating';

const RecipeDetail = (props) => {

  //sacamos el id de la url del browser troceándolo
  const location = useLocation()
  const urlId = location.pathname.split('/')[2];

  //securizamos ruta usando user
  const {user} = useAuthState();

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const [recipe, setRecipe] = useState({
    id: "",
    title: "",
    type: "",
    category: "",
    ingredients: [],
    description: "",
    img: ""
  });


  useEffect(() => {
    Axios(`http://localhost:4000/recipes/${urlId}`)
      .then(res => {
        setRecipe({

          id: res.data.id,
          title: res.data.title,
          type: res.data.type,
          category: res.data.category,
          ingredients: res.data.ingredients,
          description: res.data.description,
          img: res.data.img
        });
      },

        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])

  

  return (
    <div className='details'>

      <div className='details__top'>
        <h1 className='details__top-title'>{recipe.title}</h1>
        <img alt={recipe.title} src={recipe.img} className='details__top-img'/>
        <Rating />
        <h2 className='details__top-type'>Tipo: {recipe.type}</h2>
      </div>

      <div className='details__ingredients'>
        <h3 className='details__ingredients-title'>Ingredientes:</h3>
        <ul className='details__ingredients-list'>
          {recipe.ingredients.map((item, index) => {
          return (
            <li key={index}>{item}</li>)
        })}
        </ul>
      </div>

      <div className='details__category'>
        <h3 className='details__category-title'>Categoría:</h3>
        <p className='details__category-text'>{recipe.category}</p>
      </div>

      <div className='details__description'>
        <h3 className='details__description-title'>Preparación:</h3>
        <p className='details__description-text'>{recipe.description}</p>
      </div>

        <div className='details__btns'>
          <button className='details__btns-back'>
            <Link to="/dashboard/">Volver</Link>
          </button>

          {user ?
          <button className='details__btns-edit'>
            <Link to={'/detail/edit/'+ urlId}>Editar</Link>
          </button>
          :
          null}
        </div>

    </div>
  )
}

export default RecipeDetail;
