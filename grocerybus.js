simpleCart({
    checkout: 
    { 
	type: "PayPal" , 
	email: "you@yours.com" 
    },
    tax:        0.09,
    currency:   "USD",
    cartStyle : "table",
    cartColumns: [
        { attr: "name" , label: "Name" } ,
        { attr: "price" , label: "Price", view: 'currency' } ,
        { view: "decrement" , label: false , text: "-" } ,
        { attr: "quantity" , label: "Qty" } ,
        { view: "increment" , label: false , text: "+" } ,
        { attr: "total" , label: "Subtotal", view: 'currency' } ,
        { view: "remove" , text: "Remove" , label: false }
    ]
});

var products = [
	{ "name":"PurpleGrapes", "quantity":"10", "price":".50"},
	{ "name":"Banana", "quantity":"20", "price":"1.50"}, 
	{ "name":"Limes", "quantity":"30", "price":"2.50"},
	{ "name":"Lettuce", "quantity":"50", "price":"3.50"},
	{ "name":"Cornmeal", "quantity":"10", "price":"4.50"},
	{ "name":"Lemons", "quantity":"40", "price":"5.50" }
];

window.onload = function() {
	var x = document.getElementById("inventory");

	for (var i = 0; i < products.length; i++) {
		var start = "<div class='col-xs-6 col-sm-3 placeholder simpleCart_shelfItem'>";
        var name  = "<h4 class='item_name'>" + products[i].name + "</h4>";
        var img = "<img src='images/" + products[i].name + ".jpg' class='img-responsive' alt='Generic placeholder thumbnail'>";
        var quant = "<input type='text' value='" + products[i].quantity + "' class='item_Quantity'> <br>";
        var price = "<span class='item_price'>" + "$" + products[i].price + " / </span>";
        var add = "<a class='item_add' href='javascript:;''>Add to Cart</a> </div>";
		x.innerHTML = x.innerHTML + start + name + img + quant + price + add;
	}
}

function cart() {
	
}