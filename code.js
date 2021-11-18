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