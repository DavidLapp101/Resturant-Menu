var currentUser;
var currentEmail;
var managerMenu;
var deletedItems;
var priceTotal = 0;
var adminEmail='admin@goobereats.com';
var adminPwd='admin1';
var usersEmail;
var usersFirstName;
var usersLastName;
var usersPassword;

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
        this.orderTitle = '';
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
    if($('.manager-page').length > 0) {
        localStorage.setItem('vggd%^DI*65', $('.menu-items').html());
        localStorage.setItem('noi()*%8537f7', $('.checkout-items').html());
    }
    saveOrder();

    if($('.checkout-wrapper').length > 0) {
        priceTotal = 0;

        priceTotal += Number($('.check-total').children().html().replace('$', ''));

        if($('.gift').length > 0) {
            priceTotal += Number($('.gift').html().replace('$', ''));
        }

        if($('.del-fee p').length > 0) {
            priceTotal += Number($('.del-fee p').html().replace('$', ''));
        }

        priceTotal = Math.round((priceTotal + Number.EPSILON) * 100) / 100;
        localStorage.setItem('b3hkbr1%*(Gj', priceTotal);

        
    }

    if(currentUser != undefined || currentUser != null) {
        localStorage.setItem('2tgewg3g3%&^j$', currentEmail);
        localStorage.setItem(currentEmail, JSON.stringify(currentUser));
    }
});

$(window).on('load', function() { 
    currentEmail = localStorage.getItem('2tgewg3g3%&^j$');
    currentUser = JSON.parse(localStorage.getItem(currentEmail));
    priceTotal = localStorage.getItem('b3hkbr1%*(Gj');

    managerMenu = localStorage.getItem('vggd%^DI*65');
    deletedItems = localStorage.getItem('noi()*%8537f7');
    console.log(currentUser);
 });

$(window).on('load', function(){
    let fullArr = JSON.parse(localStorage.getItem('fullArr'));
    let tempname=currentUser.name;
    for(let f=0; f<=fullArr.length-1; f++){
        if(fullArr[f].firstName==tempname){
            usersEmail=fullArr[f].email;
            usersFirstName=fullArr[f].firstName;
            usersLastName=fullArr[f].lastName;
            usersPassword=fullArr[f].psw
        }
    }
     $('.profile-users-name').html(`${usersFirstName} ${usersLastName}`);
     $('.profile-users-username').html(`${usersEmail}`);
     $('.profile-users-email').html(`${usersEmail}`);
     $('.profile-users-password').html(`${usersPassword}`);
});

 /*///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////    NAV BAR JS    /////////////////////////////////////////////////////////////////////////////////////////
*////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

window.addEventListener("scroll", function(){
    var header = document.querySelector("header");
    header.classList.toggle("sticky", window.scrollY > 80);
});

/*///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////    CHECKOUT JS    ////////////////////////////////////////////////////////////////////////////////////////
*////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//forces you to input data before you can purchase items
$('.checkoutbtn').on('click', function() {
    if(($('#order-title-text').val() == '')
    ||($('#card-num').val() == '')
    ||($('#card-cvv').val() == '')
    ||($('#card-mm').val() == '')
    ||($('#card-yy').val() == '')
    ||($('#user-address').val() == '')
    ||($('#user-zip').val() == '')) {
        alert('Please fill in all above!');
    }
    else if (($('#none-in-cart').children().length == 0)) {
        alert('You dont have anything in your cart');
    }
    else {
        currentUser.checkoutOrder.orderTitle = $('#order-title-text').val();

        if(confirm("Confirm Your Order")) {
            currentUser.pastOrders.push(currentUser.checkoutOrder);
            location.href="rec.html";
        }      
    }
});

//adds classes for your crdit card info and prevents you from adding more then one crdit info class
$('.credit-btn').on('click', function() {
    if($('.credit-info').children().length > 0) {
        alert("You have already chosen credit")
    }
    else {
    $('.credit-info').append(`
    <input class="cc-txt-box" type="text" id="card-num" maxlength="16" placeholder="Card Number XXXX-XXXX-XXXX-XXXX">
                        
    <input class="sml-txt-box" type="text" id="card-cvv" maxlength="3" placeholder="CVV"></input>
    
    <input class="mm-yy" type="text" id="card-mm" maxlength="2" placeholder="MM">

    <input class="mm-yy" type="text" id="card-yy" maxlength="2" placeholder="YY">`);
    }
});

//removes credit card classes if you chose to pay cash
$('.cash-btn').on('click', function() {
    $('.credit').children().remove();
});

//allows you to put in your address for delivery
$('.del-btn').on('click', function() {
    if($('.address-info').children().length > 0) {
        alert("You have already chosen delivery please input your address");
    }
    else {
    $('.address-info').append(`
    <input class="txt-box" type="text" id="user-address" placeholder="Address">
    
    <input class="zip-post" type="text" id="user-zip" maxlength="5" placeholder="Zip / Postal">`);
    }
});

//shows delivery fee if delivery is chosen
$('.del-btn').on('click', function() {
    if($('.del-fee').children().length > 0) {
    }
    else {
    $('.del-fee').append(`
    <h5>Delivery Fee</h5>
    <p>$49.99</p>`);
    }
});

//removes delivery fee when pick up is chosen
$('.pick-btn').on('click', function() {
    $('.del-fee').children().remove();
});

//removes adress option if you choose pickup
$('.pick-btn').on('click', function() {
    $('.no-del').children().remove();
});

//adds 5.00 tip
$('.five').on('click', function() {
    if($('.user-tip').children().length > 1) {
        alert("You have already tipped");
    }
    else {
    $('.user-tip').append(`
    <span class="gift">$5.00</span><button class="remove-tip" onclick="removeTip(this)">Remove</button>`);
    }
});

//adds 10.00 tip
$('.ten').on('click', function() {
    if($('.user-tip').children().length > 1) {
        alert("You have already tipped");
    }
    else {
    $('.user-tip').append(`
    <span class="gift">$10.00</span><button class="remove-tip" onclick="removeTip(this)">Remove</button>`);
    }
});

//adds 15.00 tip
$('.fifteen').on('click', function() {
    if($('.user-tip').children().length > 1) {
        alert("You have already tipped");
    }
    else {
    $('.user-tip').append(`
    <span class="gift">$15.00</span><button class="remove-tip" onclick="removeTip(this)">Remove</button>`);
    }
});

//adds 20.00 tip
$('.twenty').on('click', function() {
    if($('.user-tip').children().length > 1) {
        alert("You have already tipped");
    }
    else {
    $('.user-tip').append(`
    <span class="gift">$20.00</span><button class="remove-tip" onclick="removeTip(this)">Remove</button>`);
    }
});

//lets you remove tips
function removeTip(element) {
    $(element).siblings('.gift').remove();
    $(element).remove();
}

/*///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////    REMOVE FROM CART JS    ////////////////////////////////////////////////////////////////////////////////
*////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//allows you to remove items from the cheack out cart
function removeCheckout(element) {
    $(element).parent().parent().remove();
    calculateCheckoutPrice();
}

/*///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////    NEEDS LABEL    ////////////////////////////////////////////////////////////////////////////////////////
*////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Makes it so that menu items grow a bit on hover
$(document).on('mouseenter', '.menu-item', function() {
    if($('.manager-page').length > 0) {
        $(this).children('img').css({'width': '400px', 'height': '300px', 'transition': '0.5s'});
        $(this).children('p').css({'color': 'orangered', 'transition': '0.5s'}).html(`${$(this).children('p').html()} - Remove?`);
    }
    else {
        $(this).children('img').css({'width': '400px', 'height': '300px', 'transition': '0.5s'});
        $(this).children('p').css({'color': 'blue', 'transition': '0.5s'});
    }
});

$(document).on('mouseleave', '.menu-item', function() {
    if($('.manager-page').length > 0) {
        $(this).children('img').css({'width': '350px', 'height': '250px'});
        $(this).children('p').css({'color': 'lightskyblue', 'transition': '0.5s'}).html(`${$(this).children('p').html().replace('- Remove?', '')}`);
    }
    else {
        $(this).children('img').css({'width': '350px', 'height': '250px'});
        $(this).children('p').css({'color': 'lightskyblue', 'transition': '0.5s'});
    }
});

$('.checkout').on('mouseenter', function() {
    $('.reveal-checkout').css({'background-color': 'lightskyblue', 'transition': '0.5s'});
});

$(document).on('mouseenter', '.order-name-container p', function() {
    $('.order-name-container p').removeClass('hovered');
    $('.order-name-container p').css({'background-color': 'ghostwhite', 'color': 'black', 'transition': '0.2s'});
    $(this).css({'background-color': 'rgb(70, 70, 70)', 'color': 'ghostwhite', 'transition': '0.2s'});
    $(this).toggleClass('hovered');

    let pastOrder = currentUser.pastOrders.find(obj => {return obj.orderTitle == $(this).text()});

    $('.previous-order-listings').empty();
    $('.previous-order-listings').append(`<h1>${pastOrder.orderTitle}</h1>`);

    for(i = 0; i < pastOrder.name.length; i++) {
        $('.previous-order-listings').append(`
            <div class="previous-order">
                <img src="images/${pastOrder.name[i]}.jpg" alt="">
                <h2>X <span class="quantity">${pastOrder.quantity[i]}</span><br><span class="name">${pastOrder.name[i]}</span></h2>
                <div>
                    <p>$${Math.round((pastOrder.quantity[i] * pastOrder.price[i] + Number.EPSILON) * 100) / 100}</p>
                    <button onclick="addToCart('${pastOrder.name[i]}', ${pastOrder.price[i]}, this, ${pastOrder.quantity[i]})">Add To Checkout</button>
                </div>
            </div>
        `);
    }
});

// When menu item is clicked, this function will append it to the cart and turn the reveal bar blue
// to notify that item has been added. Any particular item cannot be added more than once
function addToCart(name, price, element, quantity = 1) {
    if($('.manager-page').length > 0) {
        $('.reveal-checkout').css({'background-color': 'red', 'transition': '0.5s'});

        $('.checkout-items').append(`
        <div class="deleted-items">
            <div>
                <img src="images/${name}.jpg" alt="">
                <p>${name}</p>
            </div>
            <button onclick="addToMenu('${name}', ${price}, '${$(element).attr('id')}', this)">Add To Menu</button>
        </div>
        `);

        element.remove(); 
    }
    else if($(`#${name.replace(/\s+/g, '').replace('&', '\\&')}`).length == 0) {
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
                    <p class="quantity">${quantity}</p>
                    <ion-icon name="caret-up-circle" class="quantity-button" onclick="quantityChange(this, true, ${price})"></ion-icon>
                    <p>&emsp;</p>
                    <p class="checkout-item-final-price">$${Math.round((quantity * price + Number.EPSILON) * 100) / 100}</p>
                </div>
            </div>
            <p style="display: none;" class="item-name">${name}</p>
            <p style="display: none;" class="item-price">${price}</p>
        </div>`);

        calculatePrice();
    }
}

function addToMenu(name, price, menuSlot, removed) {
    $(`#${menuSlot}-items`).next().append(`
        <div class="menu-item" id="${menuSlot}" onclick="addToCart('${name}', ${price}, this)"><img src="images/${name}.jpg" alt=""><p>${name} - $${price}</p></div>
    `);

    $(removed).parent().remove();
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

function checkoutQuantityChange(element, operation, price) {
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
    $(element).parent().siblings('.item-price').children().html(`$${Math.round((quantity * price + Number.EPSILON) * 100) / 100}`);

    calculateCheckoutPrice();
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

function calculateCheckoutPrice() {
    let finalPrice = 0;

    $('.item-price').children().each(function() {
        finalPrice += Number($(this).html().replace('$', '')); 
    });

    $('.check-total').children().html(`$${Math.round((finalPrice + Number.EPSILON) * 100) / 100}`);
}

//Sign up page so that users can create new account
const signUpPage =i=> {
    //sets input values to variables
    let firstName=document.getElementById("fname").value,
        lastName=document.getElementById("lname").value,
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
        alert("Looks like that email is already being used\nIf you forget your password reset")
    }
    
    i.preventDefault()
    
}

//creates a admin account automatically 
$(window).on('load', function(){
    let fullArr = JSON.parse(localStorage.getItem('fullArr')) || [];
    
        if(fullArr[0].email==adminEmail){
        }
        else{
            firstName='first';
            lastName='last'
            email=adminEmail;
            psw=adminPwd;
            fullArr.splice(0,0,{firstName, lastName, email, psw})
            localStorage.setItem('fullArr', JSON.stringify(fullArr));
            localStorage.setItem(email, JSON.stringify(new Customer(firstName, lastName)));
        }
})

//functionality for sign in page
function signInPage(i){
    if(document.getElementById('email').value==adminEmail && document.getElementById('pwd').value==adminPwd){
        currentUser = JSON.parse(localStorage.getItem(adminEmail));
        currentEmail = adminEmail;

        location.href="manager-page.html";
    }
        else{
        let email = document.getElementById('email').value, psw = document.getElementById('pwd').value;
        let fullArr = JSON.parse(localStorage.getItem('fullArr')) || [];
        if(JSON.parse(localStorage.getItem('fullArr')).some(data => data.email.toLowerCase()== email && data.psw == psw)
        &&fullArr.length){
            currentUser = JSON.parse(localStorage.getItem(email));
            currentEmail = email;
            
            location.href="welome-page.html";
        }
        else{
            alert('Incorrect login credentials')
        }
    }
    i.preventDefault();
}

//functionality for forget password 
function forgetPwd(i){
    let email=document.getElementById('forget-pwd-email').value;
    let newPass=document.getElementById('forget-pwd').value;
    let fullArr = JSON.parse(localStorage.getItem('fullArr'));
    let firstName="1";
    let lastName="1";
    let psw=newPass
    for(let f=0; f<=fullArr.length-1; f++){
        console.log("Last Name: " + fullArr[f].firstName + ", Last Name: "+fullArr[f].lastName+", Email: "+fullArr[f].email+", Password: "+fullArr[f].psw)
        if(fullArr[f].email==email){
            firstName=fullArr[f].firstName;
            console.log(firstName)
            lastName=fullArr[f].lastName;
            console.log(lastName)
            fullArr.splice(f,1)
        }   
    } 
    let newData={firstName, lastName, email, psw};
    fullArr.push(newData)
    fullArr=JSON.stringify(fullArr);
    localStorage.setItem('fullArr', fullArr)
}

function profileChangePwd(i){
    let newPass=document.getElementById('profile-settings-reset-psw').value;
    let confirmPass=document.getElementById('profile-settings-reset-psw-confirm').value;
    let currentPass=document.getElementById('profile-settings-current-pwd').value;
    let fullArr = JSON.parse(localStorage.getItem('fullArr'));
    let email=usersEmail;
    let psw;
    let firstName='1';
    let lastName='1';
    if(newPass!=confirmPass){
        alert('Your passwords are not the same!!!');
    }
    else{
        psw=newPass
        if(currentPass!=usersPassword){
            alert('Your current password does not match');
        }
        else{
            alert('in else statement');
            for(let f=0; f<=fullArr.length-1; f++){
                alert('in for')
                console.log("Last Name: " + fullArr[f].firstName + ", Last Name: "+fullArr[f].lastName+", Email: "+fullArr[f].email+", Password: "+fullArr[f].psw)
                if(fullArr[f].email=usersEmail){
                    alert('in if loop')
                    firstName=usersFirstName;
                    console.log(firstName)
                    lastName=usersLastName;
                    console.log(lastName)
                    fullArr.splice(f,1)
                }
                alert('end for loop')   
            }
            alert('hiya')
            let newData={firstName, lastName, email, psw};
            alert('HELLLLLLOOOOOOO')
            fullArr.push(newData)
            fullArr=JSON.stringify(fullArr);
            localStorage.setItem('fullArr', fullArr) 
        }
    }
    alert('end of statement')
}
$('.final-checkout').on('click', function() {
    if($('.final-checkout').siblings().length > 0) {
        location.href="checkout.html";
    }
    else {
        alert('Add items to your cart!');
    }
});

function saveOrder() {
    if($('.checkout-items').length > 0) {
        let order = new Order();

        $('.checkout-item').each(function() {
            let name = $(this).children('.item-name').html();
            let quantity = Number($(this).find('.quantity').html());
            let price = Number($(this).children('.item-price').html());
            
            order.pushOrder(name, quantity, price);  
        });

        currentUser.checkoutOrder = order;
    }
    else if($('.checkout-wrapper').length > 0) {
        let order = new Order();

        $('.customer-order-item').each(function() {
            let name = $(this).children('.history-item-name').html();
            let quantity = Number($(this).find('.quantity').html());
            let price = Number($(this).find('.final-item-price').html());
            
            order.pushOrder(name, quantity, price);  
        });

        currentUser.checkoutOrder = order;
    }
}

$(window).on('load', function() { 
    if($('.first-last-name').length > 0) {
        $('.first-last-name').html(`${currentUser.name} ${currentUser.lastName}`);

    }

    if(currentEmail == adminEmail && $('.first-last-name').length > 0) {
        $('.first-last-name').after(`
            <a href="manager-page.html">Manager Edit Menu</a>
        `).remove();
    }

    if($('.previous-holder').length > 0) {
        let length = currentUser.pastOrders.length;

        for(i = 0; i < length; i++) {
            $('.order-name-container').append(`<p>${currentUser.pastOrders[i].orderTitle}</p>`);
        }
    }

    if($('.menu-body').length > 0) {
        if(managerMenu != undefined && managerMenu != '') {
            $('.menu-items').empty().html(managerMenu);
        }
    }
    
    if(($('.menu-body').length > 0 || $('.previous-holder').length > 0) && currentUser.checkoutOrder != undefined) {
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
                    <div class="quantity-change">
                        <ion-icon name="caret-down-circle" class="quantity-button" onclick="checkoutQuantityChange(this, false, ${currentUser.checkoutOrder.price[i]})"></ion-icon>
                        <p class="quantity">${currentUser.checkoutOrder.quantity[i]}</p>
                        <ion-icon name="caret-up-circle" class="quantity-button" onclick="checkoutQuantityChange(this, true, ${currentUser.checkoutOrder.price[i]})"></ion-icon>
                    </div>
                    <button class="rem-btn" onclick="removeCheckout(this)">Remove</button>
                </div>
                <p style="display: none;" class="final-item-price">${currentUser.checkoutOrder.price[i]}</p>
            </div>
            `);
        }

        calculateCheckoutPrice();
    }
    else if($('.manager-page').length > 0) {
        if(managerMenu != undefined && managerMenu != '') {
            $('.menu-items').empty().html(managerMenu);

            if(deletedItems != undefined && deletedItems != '') {
                $('.checkout-items').html(deletedItems);
            }
        }
    }
    else if($('.rec-page').length > 0) {
        let orderTime = Math.round((Math.random() / 2) * 1000) / 10;
        
        if(orderTime < 12) {
            orderTime = 12;
        }

        $('.est-time').html(`${orderTime}min`);
        $('.rec-order-info h1').html(`Hi ${currentUser.name} ${currentUser.lastName}`);
        $('.rec-order-info h3').html(`Order Name: ${currentUser.pastOrders[currentUser.pastOrders.length - 1].orderTitle}`);

        $('.placed-order-total').html(`$${priceTotal}`);

        for(i = 0; i < currentUser.checkoutOrder.name.length; i++) {
            $('.rec-page').append(`
            <div class="rec-item-name">${currentUser.checkoutOrder.name[i]}</div>
                <div class="rec-con">
                <div class="item-pic-rec">
                    <img src="images/${currentUser.checkoutOrder.name[i]}.jpg">
                </div>
                <div class="item-price">
                    <p>$${Math.round((currentUser.checkoutOrder.price[i] * currentUser.checkoutOrder.quantity[i] + Number.EPSILON) * 100) / 100}</p>
                </div>
            </div>
            `);
        }
    }
 });

//PROFILE JS
//puts placeholders in user info tab
// $(window).on('load', function(){
//     $('#profile-settings-first-name').attr('placeholder', usersFirstName);
//     $('#profile-settings-last-name').attr('placeholder', usersLastName);
//     $('.profile-settings-email').attr('placeholder', usersEmail)
// })

// function profileChangeName(i){
//     alert('start')
//     let firstName=document.getElementById('profile-settings-first-name').value;
//     let lastName=document.getElementById('profile-settings-last-name').value;
//     console.log(firstName);
//     console.log(lastName);
//     alert('before for')
//     let fullArr = JSON.parse(localStorage.getItem('fullArr'));
//     let email;
//     let psw;
//     for(let f=0; f<=fullArr.length-1; f++){

//         if(fullArr[f].firstName==usersFirstName){
//             email=fullArr[f].email
//             psw=fullArr[f].psw
//             fullArr.splice(f,1)
//         }
//     }
//     let newData={firstName, lastName, email, psw};
//     console.log(newData)
//     fullArr.push(newData);
//     fullArr=JSON.stringify(fullArr);
//     localStorage.setItem('fullArr', fullArr)
//     alert('end')
// }


// function forgetPwd(i){
//     let email=document.getElementById('forget-pwd-email').value;
//     let newPass=document.getElementById('forget-pwd').value;
//     let fullArr = JSON.parse(localStorage.getItem('fullArr'));
//     let firstName="1";
//     let lastName="1";
//     let psw=newPass
//     for(let f=0; f<=fullArr.length-1; f++){
//         console.log("Last Name: " + fullArr[f].firstName + ", Last Name: "+fullArr[f].lastName+", Email: "+fullArr[f].email+", Password: "+fullArr[f].psw)
//         if(fullArr[f].email==email){
//             firstName=fullArr[f].firstName;
//             console.log(firstName)
//             lastName=fullArr[f].lastName;
//             console.log(lastName)
//             fullArr.splice(f,1)
//         }   
//     } 
//     let newData={firstName, lastName, email, psw};
//     fullArr.push(newData)
//     fullArr=JSON.stringify(fullArr);
//     localStorage.setItem('fullArr', fullArr)
// }