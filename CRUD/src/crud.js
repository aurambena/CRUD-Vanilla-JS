//import asincronic function getUsers
import {getUsers, deleteUser, updateUser} from "./api.js";

//initialize variables 
let editUser = null;

//Get from DOM with id
const form = document.getElementById('form');
const userList = document.getElementById('user-list');

//show users, create an asincronic function to show users over DOM
const renderUsers = async () =>{
    //Get users from API
    const users = await getUsers();
    //Select the deordered list from DOM with id
    const userList = document.getElementById('user-list');
    //walk through the users array 
    users.forEach((user) => {
        //Create a li for each user
        const element = document.createElement('li');
        //Insert name, email and add an edit and delete button
        element.innerHTML = `
        <span> ${user.name} (${user.email})</span>
        <button type="button" class="edit" data-id="${user.id}">Edit</button>
        <button type="button" class="delete" data-id="${user.id}">Delete</button>
        `;
        //Add each user as a li child
        userList.appendChild(element);
    });
};


//Handle submit create an asincronic function to get name and email from DOM
const handleSubmit = async(e)=>{
    //Disable button default behavior
    e.preventDefault();
    //get name and email from DOM
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;

    //if it is a registred user, editUser save nema, email and id, if not, editUser is null
    await updateUser({name, email, id: editUser ? editUser.id:null});
    //Update form
    form.reset();
    //Update users
    renderUsers();
};

//Handle edit
//create an asincronic function who recives id, name and email
const handleEdit = async(id, name, email)=>{
    debugger
    //editUser from handle submit
    editUser={id,name,email};
    // get name and email from DOM
    document.getElementById('name').value = name;
    document.getElementById('email').value = email;
};

//Handle delete
//create an asincronic function who recives id
const handleDelete = async(id)=>{
    debugger
    //Sent id to deleteUser function
    await deleteUser(id);
    //Update users
    debugger
    renderUsers();
};

//Add events to DOM
//Add event listener submit type to sent user info
form.addEventListener('submit', handleSubmit);
//Add event listener click type to 
userList.addEventListener('click', (e)=>{
    const target =e.target;
    
    if (target.classList.contains('edit')){
        //Get the id that we want to edit
        const id = target.getAttribute('data-id');
        //The user that will be edited and it is inside the parenthesis
        const user = Array.from(target.parentNode.children)[0].innerText.split(
            " (",
        );

        //first part is name 
        const name = user[0];
        //Second part is email
        
        const email = user[1].replace(")", "");
        

        handleEdit(id,name,email);

    }else if (target.classList.contains("delete")){
        //Get id
        
        const id = target.getAttribute("data-id");
        //Sent it to delete function
        handleDelete(id);
    }
});

//Update users
renderUsers();

