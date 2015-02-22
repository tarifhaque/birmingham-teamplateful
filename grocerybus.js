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
	"PurpleGrapes" : {"quantity":"10", "price":".50", "color":"purple", "calories":"100"},
	"Banana" : {"quantity":"20", "price":"1.50", "color":"yellow", "calories":"100"}, 
	"Limes" : {"quantity":"15", "price":"2.50", "color":"green", "calories":"50"},
	"Lettuce" : {"quantity":"50", "price":"3.50", "color":"green", "calories":"30"},
	"Cornmeal" : {"quantity":"10", "price":"1.50", "color":"yellow", "calories":"40"},
	"Lemons" : {"quantity":"40", "price":"1.50", "color":"yellow", "calories":"20"},
    "Celery" : {"quantity":"44", "price":"1.50", "color":"green", "calories":"50"},
    "SweetPotato" : {"quantity":"23", "price":"1.50", "color":"orange", "calories":"90"},
    "Cauliflower" : {"quantity":"23", "price":"1.00", "color":"white", "calories":"200"},
    "LettuceMix" : {"quantity":"23", "price":"1.00", "color":"green", "calories":"200"},
    "Satsuma" : {"quantity":"23", "price":"1.30", "color":"orange", "calories":"25"},
    "Minneolas" : {"quantity":"13", "price":"1.30", "color":"orange", "calories":"40"},
    "RussetPotato" : {"quantity":"23", "price":"1.20", "color":"white", "calories":"25"},
    "Strawberry" : {"quantity":"23", "price":"1.00", "color":"red", "calories":"50"},
    "Tomato" : {"quantity":"23", "price":"1.10", "color":"red", "calories":"90"}
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
            text: 'Color & Nutrition'
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

function colorCalorieChart() {

    var colors = [];
    var calories = [];
    var total = 0;

    var colorCounts = {
        "purple": 0,
        "yellow": 0,
        "green": 0,
        "white": 0,
        "red":0,
        "orange":0
    };

    // get the color of each item
    simpleCart.each(function( item , x ){
        colors.push(products[item.get('name')].color);
        calories.push(products[item.get('name')].calories);
        total = total + products[item.get('name')].calories;
    });

    for (var i = 0; i < colors.length; i++) {
        colorCounts[colors[i]] = colorCounts[colors[i]] + calories[i];
    }

    var series = [];
    var seriesColors = [];
    for (var key in colorCounts) {
        var percentage = colorCounts[key] / total;
        if (percentage != 0) { 
            series.push([key, percentage]);
            seriesColors.push(colormap[key]);
        }
    }

    $('#colorcaloriechart').highcharts({
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false
        },
        title: {
            text: 'Calorie Percentage per Color'
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
        colorCalorieChart();
    }

    if ($('#myTable')[0] !== undefined) {
        $("#myTable").tablesorter(); 
    }

}

function checkoutCart() {
    // empty the cart
    simpleCart.empty();
    simpleCart.update();
}
