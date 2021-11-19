//functionality for sign in page
function signInPage(i){
    if(document.getElementById("email").value=='admin@goobereats.com' && document.getElementById('pwd').value=='password'){
        location.href="manager-page.html";
    }
    else{
        let email = document.getElementById('email').value, psw = document.getElementById('pwd').value;
        let fullArr = JSON.parse(localStorage.getItem('fullArr')) || [];
        if(fullArr.length>0&&JSON.parse(localStorage.getItem('fullArr')).some(data => data.email.toLowerCase()== email && data.psw.toLowerCase() == psw)){
            location.href="welome-page.html"
        }
        else{
            alert('Incorrect login credentials')
        }
    }
    i.preventDefault();
}

//Sign up page so that users can create new account
function signUpPage (i) {
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
/*///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////    NAV BAR JS    /////////////////////////////////////////////////////////////////////////////////////////
*////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

window.addEventListener("scroll", function(){
    var header = document.querySelector("header");
    header.classList.toggle("sticky", window.scrollY > 80);
});

/*///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////    CHECKBOX JS    ////////////////////////////////////////////////////////////////////////////////////////
*////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

$("input:checkbox").on('click', function() {
    var $inputbox = $(this);
    if ($inputbox.is(":checked")) {
      var group = "input:checkbox[name='" + $inputbox.attr("name") + "']";
      $(group).prop("checked", false);
      $inputbox.prop("checked", true);
    } else {
      $inputbox.prop("checked", false);
    }
  });

    var confirmbtn = $("#cd");

    for (var i = 0, len = confirmbtn.length; i < len; i++) {
    confirmbtn[i].onclick = function() {
        return confirm("Confirm Your Order");
    };
}

/*///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////    REMOVE FROM CART JS    ////////////////////////////////////////////////////////////////////////////////
*////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function removeCheckout(element) {
    $(element).parent().siblings().remove();
    $(element).parent().remove();
}

/*///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////    NEEDS LABEL    ////////////////////////////////////////////////////////////////////////////////////////
*////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
$(".menu-items td").on({
    mouseenter: function () {
        $(this).children('img').css({'width': '400px', 'height': '300px', 'transition': '0.5s'});
    },
    mouseleave: function () {
        $(this).children('img').css({'width': '350px', 'height': '250px'});
        $('.reveal-checkout').css({'background-color': 'orangered', 'transition': '0.5s'});
    }
});

function addToCart(name, price) {
    if($(`#${name.replace(/\s+/g, '').replace('&', '\\&')}`).length == 0) {
        $('.reveal-checkout').css({'background-color': 'blue', 'transition': '0.5s'});

        $('.checkout-items').append(`
        <div class="checkout-item" id="${name.replace(/\s+/g, '')}">
            <div class="checkout-info">
                <img src="images/${name}.jpg" alt="">
                <p>${name} - $${price}</p>
            </div>
            <div class="price">
                <p class="remove-checkout" onclick="removeCheckout(this)">Remove</p>

                <div class="quantity-change">
                    <ion-icon name="caret-down-circle" class="quantity-button" onclick="quantityChange(this, false, ${price})"></ion-icon>
                    <p class="quantity">1</p>
                    <ion-icon name="caret-up-circle" class="quantity-button" onclick="quantityChange(this, true, ${price})"></ion-icon>
                    <p>&emsp;</p>
                    <p class="checkout-item-final-price">$${price}</p>
                </div>
            </div>
        </div>`);

        calculatePrice();
    }
}

function quantityChange(element, operation, price) {   
    let quantity = Number($(element).siblings('.quantity').html());

    if(operation) {
        quantity++;
    }
    else {
        quantity--;
    }

    if(quantity < 1) {
        quantity = 1;
    }

    $(element).siblings('.quantity').html(`${quantity}`);
    $(element).siblings('.checkout-item-final-price').html(`$${Math.round((quantity * price + Number.EPSILON) * 100) / 100}`);

    calculatePrice();
}

function removeCheckout(element) {
    $(element).parent().parent().remove();

    calculatePrice();
}

function calculatePrice() {
    let finalPrice = 0;

    $('.checkout-item-final-price').each(function() {
        finalPrice += Number($(this).html().replace('$', '')); 
    });

    $('.checkout-final-price').html(`$${Math.round((finalPrice + Number.EPSILON) * 100) / 100}`);
}

