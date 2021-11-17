//Sign up page so that users can create new account
const signUpPage =i=> {
    //sets input values to variables
    let firstName=document.getElementById("fname").value,
        lastName=document.getElementById("fname").value,
        email=document.getElementById("email").value,
        psw=document.getElementById("pwd").value;
    
    //Sets full array to either an empty array (if nothing was pushed to local storage)
    //or pulls items from current local storage
    let fullArr = JSON.parse(localStorage.getItem('fullArr')) || [];

    //Goes through local storage to see if any emails match so that duplicate accounts can't be made
    if(fullArr.length && JSON.parse(localStorage.getItem('fullArr')).some(data => 
        data.email.toLowerCase() == email.toLowerCase())){
            var localStorageContains=true;
        }
        else{
            var localStorageContains=false;
        }

    //Adds users input to local storage and resets form if email isn't duplicate
    if(localStorageContains==false){
        fullArr.push({firstName, lastName, email, psw});
        localStorage.setItem('fullArr', JSON.stringify(fullArr));
        document.querySelector('form').reset();
        document.getElementById('fname').focus();
        alert("Account Created.\n\n Please sign in with the link below")
    }
    //alerts user that the email is being used
    else{
        alert("Looks like that email is already being used\nIf you forget your password reset it below")
    }
    i.preventDefault()
    
}

//functionality for sign in page
function signInPage(i){
    let email = document.getElementById('email').value, psw = document.getElementById('pwd').value;
    let fullArr = JSON.parse(localStorage.getItem('fullArr')) || [];
    if(JSON.parse(localStorage.getItem('fullArr')).some(data => data.email.toLowerCase()== email && data.psw.toLowerCase() == psw)
    &&fullArr.length){
        location.href="welome-page.html"
    }
    else{
        alert('Incorrect login credentials')
    }
    i.preventDefault();
}
