// Context/actions.js
import axios from "axios";

const ROOT_URL = 'http://localhost:4000';


export async function loginUser(dispatch, loginPayload) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginPayload),
    };

    try {
        dispatch({ type: 'REQUEST_LOGIN' });
        let response = await fetch(`${ROOT_URL}/user/login`, requestOptions);
        let data = await response.json();

        if (data.user) {
            dispatch({ type: 'LOGIN_SUCCESS', payload: data });
            //console.log('data:', data);
            await axios(`http://localhost:4000/recipes/myRecipes/${data._id}`)
            .then(res => {
                console.log('resLogin:', res);
                data.recipes = res;
            },
            )
            localStorage.setItem('currentUser', JSON.stringify(data));
            return data
        }

        dispatch({ type: 'LOGIN_ERROR', error: data.errors[0] });
        return;
    } catch (error) {
        dispatch({ type: 'LOGIN_ERROR', error: error });
    }
}

export async function logoutUser(dispatch) {
    dispatch({ type: 'LOGOUT' });
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
}