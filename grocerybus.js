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
        { attr: "total" , label: "Subtotal", view: 'currency' } ,
    
        { attr: "quantity" , label: "Quantity" } ,
        { view: "decrement" , label: false , text: "-" } ,
        { view: "increment" , label: false , text: "+" } ,
        { view: "remove" , text: "Remove" , label: false }
    ]
});

var products = {
	"PurpleGrapes" : {"quantity":"10", "price":".50", "color":"purple"},
	"Banana" : {"quantity":"20", "price":"1.50", "color":"yellow"}, 
	"Limes" : {"quantity":"30", "price":"2.50", "color":"green"},
	"Lettuce" : {"quantity":"50", "price":"3.50", "color":"green"},
	"Cornmeal" : {"quantity":"10", "price":"4.50", "color":"yellow"},
	"Lemons" : {"quantity":"40", "price":"5.50", "color":"yellow"}
};

var chartData;

function buildChart() {

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
                showInLegend: true
            }
        },
        series: [{
            type: 'pie',
            name: 'Browser share',
            data: [
                ['Firefox',   45.0],
                ['IE',       26.8],
                {
                    name: 'Chrome',
                    y: 12.8,
                    sliced: true,
                    selected: true
                },
                ['Safari',    8.5],
                ['Opera',     6.2],
                ['Others',   0.7]
            ]
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

            var quant = "<input type='number' value='0' class='form-control' class='item_Quantity' aria-describedby='sizing-addon3'>";

            var left = "<span> <b> " + products[key].quantity + " in Stock </b> </span> <br>";
            
            var price = "<span class='item_price'>" + "$" + products[key].price + " / </span>";
            
            var add = "<a class='item_add' href='javascript:;''>Add to Cart</a> </div>";
            
            x.innerHTML = x.innerHTML + start + name + img + quant + left + price + add;
          
          }
        }
    }

    // Build the chart
    chartData = $('#chartcontainer');

    if (chartData != 'undefined') {
        buildChart();
    }

}
