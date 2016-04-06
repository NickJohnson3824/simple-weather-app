$(function() {
    
    // function loadWeather uses ajax method to make call to openweather map.  Parameters are apiKey and zipCode
    function loadWeather(apiKey, zipCode) { 
      // ajax method creates html elements when successful
      $.ajax({
            dataType: "jsonp",
            url: 'http://api.openweathermap.org/data/2.5/weather?zip=' + zipCode + ',us&APPID=' + apiKey,           
            success: function(data) {
                $('#weather').append('<h1>Weather For ' + data.name + '</h1><h3>Weather Description:  ' + data.weather[0].description + '</h3>' +
                                '<h3>Temperature: ' + getTempFahrenheit(data.main.temp) + ' &deg;F</h3>');       
            },
            error: function (errorData) {
                $('#weather').append('<p>An error occured while attempting to retrieve weather information</p>');
            }            
        });  
    }
    
    // function used to convert the json temperature data from Kelvin to Fahrenheit returning the results
    // Math.round is used to round the number
    function getTempFahrenheit (KelvinTemp){       
        return Math.round((KelvinTemp * 1.8) - 459.67);
    };
    
    // Click event handler for btnGetWeather
    // removes previously created elements.  Stores textbox values in variables and passes them to te loadWeather function as arguments
    $('#btnGetWeather').on('click', function(e) {
         e.preventDefault();
        
         $('#weather h1, #weather h3').remove();
            
         var apiKey = $('#apikey').val();
         var zipCode = $('#zip').val();
        
         loadWeather(apiKey, zipCode);
    });
});
