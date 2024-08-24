const API_URL = "https://jsonplaceholder.typicode.com/users";

//getUsers
//Create an asincronic function to get the user from API
export const getUsers = async() =>{
    //Await to be executed
    const response = await fetch(API_URL);
    //returns users array 
    return await response.json();
};

//deleteUser
//Create an asincronic function to get the user from API with user id
export const deleteUser = async(id) =>{
    //Await to be executed
    const responser = await fetch(`${API_URL}/${id}`,{
        //DELETE method
        method: "DELETE",
        
    });
    debugger
    return await responser.json();
};

//editUser -> addUser
//Create an asincronic function to check if the user exist or not 
export const updateUser = async(user) =>{
    let response = null;
    //If the user do not exist
    if(!user.id){
        response = await fetch(API_URL, {
            //Method create user
            method: "POST",
            //Extra info for the API can understand what are we asking for
            headers:{
            "Content-Type" : "application/JSON",
        },
        
        //converts JavaScript objects into JSON strings
        body: JSON.stringify(user),
    });
    //If the user exist
    }else{
        
        debugger
        response = await fetch(`${API_URL}/${user.id}`,{
        //method edit user
        method: "PUT",
        //Extra info for the API can understand what are we asking for
        headers: {
        "Content-Type": "application/json",
        },
        
        //converts JavaScript objects into JSON strings
        body: JSON.stringify(user),
        });
    }
    return await response.json();
};

