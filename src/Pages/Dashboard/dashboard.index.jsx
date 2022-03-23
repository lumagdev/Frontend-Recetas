// Pages/Dashboard/index.js
import React from "react";
import { useAuthDispatch, logoutUser, useAuthState } from "../../Context/context.index";
import { Link, useNavigate } from "react-router-dom";
import UserRecipes from "./UserRecipes/UserRecipes";
import FiltroPrueba from "./FiltroPrueba";
import { useState } from "react";

import '../../Styles/dashboard.scss'


function Dashboard(_props) {
  let navigate = useNavigate();
  const dispatch = useAuthDispatch(); // lee el método dispatch del contexto
  const user = useAuthState(); //lee los detalles del usuario del contexto
  const email = useAuthState();





  // es el valor del input 
  const [ingredient, setIngredient] = useState('');

  

  const [ingredientsArray, setIngredientsArray] = useState([])
  //const recipesItem = [user.recipes, ingredientsArray];

  console.log('recipesItem ', user.recipes.data);

  const filter = (e) => {
    e.preventDefault()
    console.log('e:', e);
    setIngredientsArray([
      ...ingredientsArray, {name: ingredient}
    ])
    e.target.reset();
    setIngredient('');
  };

//ahora tengo un array de recetas y no ids. 
//no hace falta que haga axios dentro del componente porque ya me las va a pintar de serie. 
  const recipesList = user.recipes.data.map((item, index) =>
 
    <li key={index.toString()}><UserRecipes name={item} /></li>
    
  
  );

  const handleLogout = () => {
    logoutUser(dispatch); //llama a la acción logout
    navigate("/"); //navega de nuevo al login sin usuario
  }

  return (
    <div style={{ padding: 10 }}>
      <div>
        <h1>Dashboard</h1>
        <button onClick={handleLogout}>
          Logout
        </button>
      </div>
      <p>Welcome {user.user}</p>
      <p>Tu email es {email.email}</p>

      <div>
        <hr></hr>
        <div className='recipebtns'>
          <h1>Recetas</h1>
          <Link to='/dashboard/add-recipes'>añadir receta</Link>

        </div>
        <ul>{recipesList}</ul>
      </div>
      <div>
        <form onSubmit={filter}>
          <p>Filtrito</p>

          <input
            type="search"
            value={ingredient}
            onChange={(event)=>setIngredient(event.target.value)}
            placeholder="Filtrito"></input>
          <button type="submit">añadir</button>
          <ul>
            {ingredientsArray.map((item, index)=> <li key={index}>{item.name}</li> )}
          </ul>
        </form>
      </div>
      {/* <div>
      <FiltroPrueba></FiltroPrueba>
      </div>  */}
    </div>

  );
}

export default Dashboard;