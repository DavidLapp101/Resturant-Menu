var currentUser;
var currentEmail;
var emailHolder = '2tgewg3g3%&^j$';

class Customer {
    constructor(name, lastName) {
        this.name = name;
        this.lastName = lastName;
        this.checkoutOrder;
        this.pastOrders = [];
    }
}

class Order {
    constructor() {
        this.name = [];
        this.quantity = [];
        this.price = [];
    }

    pushOrder(orderName, orderQuantity, orderPrice) {
        this.name.push(orderName);
        this.quantity.push(orderQuantity);
        this.price.push(orderPrice);
    }
}

$(window).on('unload', function() {
    localStorage.setItem(emailHolder, currentEmail);
    localStorage.setItem(currentEmail, JSON.stringify(currentUser));
});

$(window).on('load', function() { 
    let email = localStorage.getItem(emailHolder);
    currentUser = JSON.parse(localStorage.getItem(email));
    console.log(currentUser);
 });

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
    $(element).parent().parent().remove();
}

/*///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////    NEEDS LABEL    ////////////////////////////////////////////////////////////////////////////////////////
*////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Makes it so that menu items grow a bit on hover
$(".menu-items td").on({
    mouseenter: function () {
        $(this).children('img').css({'width': '400px', 'height': '300px', 'transition': '0.5s'});
    },
    mouseleave: function () {
        $(this).children('img').css({'width': '350px', 'height': '250px'});
        $('.reveal-checkout').css({'background-color': 'orangered', 'transition': '0.5s'});
    }
});

// When menu item is clicked, this function will append it to the cart and turn the reveal bar blue
// to notify that item has been added. Any particular item cannot be added more than once
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
                <p class="remove-checkout" onclick="removeCart(this)">Remove</p>

                <div class="quantity-change">
                    <ion-icon name="caret-down-circle" class="quantity-button" onclick="quantityChange(this, false, ${price})"></ion-icon>
                    <p class="quantity">1</p>
                    <ion-icon name="caret-up-circle" class="quantity-button" onclick="quantityChange(this, true, ${price})"></ion-icon>
                    <p>&emsp;</p>
                    <p class="checkout-item-final-price">$${price}</p>
                </div>
            </div>
            <p style="display: none;" class="item-name">${name}</p>
            <p style="display: none;" class="item-price">${price}</p>
        </div>`);

        calculatePrice();
    }
}

// Changes the quantity value and item price of specific item
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

// Removes the menu item from the cart
function removeCart(element) {
    $(element).parent().parent().remove();

    calculatePrice();
}

// This function gets called everytime something that would change the final price happens, such as when an item's
// quantity changes, and an item is added or removed
function calculatePrice() {
    let finalPrice = 0;

    $('.checkout-item-final-price').each(function() {
        finalPrice += Number($(this).html().replace('$', '')); 
    });

    $('.checkout-final-price').html(`$${Math.round((finalPrice + Number.EPSILON) * 100) / 100}`);
}

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
        localStorage.setItem(email, JSON.stringify(new Customer(firstName, lastName)));
        localStorage.setItem('fullArr', JSON.stringify(fullArr));
        document.querySelector('form').reset();
        document.getElementById('fname').focus();
        alert("Account Created.\n\n Please sign in with the link below");
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
        currentUser = JSON.parse(localStorage.getItem(email));
        currentEmail = email;

        location.href="welome-page.html";
    }
    else{
        alert('Incorrect login credentials')
    }
    i.preventDefault();
}

$('.final-checkout').on('click', function() {
    if($('.final-checkout').siblings().length > 0) {
        let order = new Order();

        $('.checkout-item').each(function() {
            let name = $(this).children('.item-name').html();
            let quantity = Number($(this).find('.quantity').html());
            let price = Number($(this).children('.item-price').html());
            
            order.pushOrder(name, quantity, price);
            currentUser.checkoutOrder = order;

            location.href="checkout.html";
        });


    }
    else {
        alert('Add items to your cart!');
    }

    console.log(currentUser.checkoutOrder);
});

$(window).on('load', function() { 
    if($('.first-last-name').length > 0) {
        $('.first-last-name').html(`${currentUser.name} ${currentUser.lastName}`);
    }

    if($('.menu-body').length > 0 && currentUser.checkoutOrder != undefined) {
        console.log('working');
        for(i = 0; i < currentUser.checkoutOrder.name.length; i++) {
            $('.checkout-items').append(`
            <div class="checkout-item" id="${currentUser.checkoutOrder.name[i].replace(/\s+/g, '')}">
                <div class="checkout-info">
                    <img src="images/${currentUser.checkoutOrder.name[i]}.jpg" alt="">
                    <p>${currentUser.checkoutOrder.name[i]} - $${currentUser.checkoutOrder.price[i]}</p>
                </div>
                <div class="price">
                    <p class="remove-checkout" onclick="removeCart(this)">Remove</p>

                    <div class="quantity-change">
                        <ion-icon name="caret-down-circle" class="quantity-button" onclick="quantityChange(this, false, ${currentUser.checkoutOrder.price[i]})"></ion-icon>
                        <p class="quantity">${currentUser.checkoutOrder.quantity[i]}</p>
                        <ion-icon name="caret-up-circle" class="quantity-button" onclick="quantityChange(this, true, ${currentUser.checkoutOrder.price[i]})"></ion-icon>
                        <p>&emsp;</p>
                        <p class="checkout-item-final-price">$${Math.round((currentUser.checkoutOrder.price[i] * currentUser.checkoutOrder.quantity[i] + Number.EPSILON) * 100) / 100}</p>
                    </div>
                </div>
                <p style="display: none;" class="item-name">${currentUser.checkoutOrder.name[i]}</p>
                <p style="display: none;" class="item-price">${currentUser.checkoutOrder.price[i]}</p>
            </div>`);

            calculatePrice();
        }
    }
    else if($('.checkout-wrapper').length > 0) {
        for(i = 0; i < currentUser.checkoutOrder.name.length; i++) {
            $('.order-history').append(`
            <div class="customer-order-item">
                <div class="history-item-name">${currentUser.checkoutOrder.name[i]}</div>
                <div class="order-his-con">
                    <div class="item-pic">
                        <img src="images/${currentUser.checkoutOrder.name[i]}.jpg">
                    </div>
                    <div class="item-price">
                        <p>$${Math.round((currentUser.checkoutOrder.price[i] * currentUser.checkoutOrder.quantity[i] + Number.EPSILON) * 100) / 100}</p>
                    </div>
                    <form>
                        <input  class="num-inc" type="number" id="quantity" name="quantity" min="1" max="999">
                    </form>
                    <button class="rem-btn" onclick="removeCheckout(this)">Remove</button>
                </div>
            </div>
            `);
        }
    }
 });

//  $(window).on('load', function() { 
//     if($('.rec-page').length > 0) {
//         for(i = 0; i < currentUser.checkoutOrder.name.length; i++) {
//             console.log('loaded');
//             $('.order-history').append(`
//             <div class="rec-item-name">${currentUser.checkoutOrder.name[i]}</div>
//                 <div class="rec-con">
//                 <div class="item-pic-rec">
//                     <img src="images/${currentUser.checkoutOrder.name[i]}.jpg">
//                 </div>
//                 <div class="item-price">
//                     <p>$${Math.round((currentUser.checkoutOrder.price[i] * currentUser.checkoutOrder.quantity[i] + Number.EPSILON) * 100) / 100}</p>
//                 </div>
//             </div>
//             `);
//         }
//     }
//  });