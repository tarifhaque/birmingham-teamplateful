simpleCart({
    tax:        0.09,
    currency:   "USD",
    cartStyle : "table",
    cartColumns: [
        { attr: "name" , label: "Name" } ,
        { attr: "price" , label: "Price", view: 'currency' } ,
        { attr: "total" , label: "Subtotal", view: 'currency' } ,
    
        { attr: "quantity" , label: "Quantity" } ,
        { view: "decrement" , label: false , text: "-" } ,
        { view: "increment" , label: false , text: "+" } ,
        { view: "remove" , text: "Remove" , label: false }
    ],
    checkout: { 
        type: "SendForm" , 
        url: "menu.html" 
    } 
});

var products = {
	"PurpleGrapes" : {"quantity":"10", "price":".50", "color":"purple"},
	"Banana" : {"quantity":"20", "price":"1.50", "color":"yellow"}, 
	"Limes" : {"quantity":"30", "price":"2.50", "color":"green"},
	"Lettuce" : {"quantity":"50", "price":"3.50", "color":"green"},
	"Cornmeal" : {"quantity":"10", "price":"1.50", "color":"yellow"},
	"Lemons" : {"quantity":"40", "price":"1.50", "color":"yellow"},
    "Celery" : {"quantity":"44", "price":"1.50", "color":"green"},
    "SweetPotato" : {"quantity":"23", "price":"1.50", "color":"orange"},
    "Cauliflower" : {"quantity":"23", "price":"1.00", "color":"white"},
    "ScuppernongGrapes" : {"quantity":"23", "price":"1.00", "color":"green"},
};

var colormap = {
    "purple": "#663366",
    "yellow": "#F9D423",
    "green": "#B3CC57",
    "white": "#FFFEE4",
    "red": "#FF0000",
    "orange": "#FC913A"
};

var chartData;

function buildChart() {

    var colors = [];

    var colorCounts = {
        "purple": 0,
        "yellow": 0,
        "green": 0,
        "white": 0,
        "red":0,
        "orange":0
    };

    simpleCart.each(function( item , x ){
        colors.push(products[item.get('name')].color);
    });

    for (var i = 0; i < colors.length; i++) {
        colorCounts[colors[i]]++;
    }

    var series = [];
    var seriesColors = [];
    for (var key in colorCounts) {
        var percentage = colorCounts[key] / colors.length;
        if (percentage != 0) { 
            series.push([key, percentage]);
            seriesColors.push(colormap[key]);
        }
    }

    chartData.highcharts({
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false
        },
        title: {
            text: 'Nutrition Color'
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: false
                },
                showInLegend: true,
                colors: seriesColors
            }
        },
        series: [{
            type: 'pie',
            name: 'Browser share',
            data: series
        }]
    });

}

window.onload = function() {
	var x = document.getElementById("inventory");
    
    if (x != null) {
        for (var key in products) {
          if (products.hasOwnProperty(key)) {
            
            var start = "<div class='col-xs-6 col-sm-2 placeholder simpleCart_shelfItem'>";
            
            var name  = "<h4 class='item_name'>" + key + "</h4>";
            
            var img = "<img src='images/" + key + ".jpg' class='img-responsive' alt='Generic placeholder thumbnail'>";
            
            // Start all items at a purchase quantity of 0.
            // var quant = "<input type='number' value='0' class='item_Quantity'> <br>";

            var quant = "<input type='number' value='1' class='form-control' class='item_Quantity' aria-describedby='sizing-addon3'>";
            

            var left = "<span> <b> " + products[key].quantity + " in Stock </b> </span> <br>";
            
            var price = "<span class='item_price'>" + "$" + products[key].price + " / </span>";
            
            var add = "<a class='item_add' href='javascript:;''><span class='label label-primary'>Add to Cart </span> </a> </div>";
            
            x.innerHTML = x.innerHTML + start + name + img + quant + left + price + add;
          
          }
        }
    }

    // Build the chart
    chartData = $('#chartcontainer');

    if ($('#chartcontainer')[0] !== undefined) {
        buildChart();
    }

}

function checkoutCart() {
    // empty the cart
    simpleCart.empty();
    simpleCart.update();
}
