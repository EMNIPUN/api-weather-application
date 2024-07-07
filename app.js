const express = require('express');
const http = require('https');
const bodyParser = require('body-parser');


const app = express();
app.use(bodyParser.urlencoded({extended:true}));



app.get('/', function(req, res){

    res.sendFile(__dirname + "/index.html")

});

app.post('/', function(req, res){
    console.log("Post Request Receved");

    const city = req.body.cityName;
    const apiKey = '45c1c884c983168af161a2123b67ba98';
    const unit = 'metric';

    const url = 'https://api.openweathermap.org/data/2.5/weather?q='+city+'&appid='+apiKey+'&units='+unit;


    
    const resi = http.get(url, function(response){
        console.log(response.statusCode);

        response.on('data', function(data){
            const weatherData = JSON.parse(data); 
            const temp = weatherData.main.temp;
            const icon = weatherData.weather[0].icon;
            const weatherDescription = weatherData.weather[0].description;
            const weatherIcon = 'http://openweathermap.org/img/wn/'+icon+'.png';

            res.write("<html>");
            res.write("<head>");
            res.write("<link rel='stylesheet' href='https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css'>");

            res.write("<style>");
            res.write
            ("body { color: whitesmoke; font-family: Arial, sans-serif; text-align: center; background-color: #f0f8ff; padding: 20px;background-image: url('https://images.unsplash.com/photo-1579003593419-98f949b9398f?q=80&w=1473&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'); background-size: cover; background-position: center; height: 100vh;}");

            res.write(".jumbotron {  justify-content: center; align-items: center; height: 60vh; margin-top: 120px; margin-left: 280px; background-color: cadetblue;; padding: 20px;  width: 600px;box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19); border-radius: 20px; background: transparent; }");

            res.write("img { width: 70px; height: 70px; }");
            res.write("#dis{color: white;background-color: rgb(36, 36, 36);padding: 10px;border-radius: 50px;width: 43%; height: 50px;box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);margin-left: 150px;}");

            res.write("</style>");

            res.write("</head>");
            res.write("<body class='container'>");
            res.write("<div class='jumbotron'>");
            res.write("<h1 class='display-4'>"+ city +  "</h1>");
            res.write("<h1 class='display-1'>" + temp + "&deg" + "</h1>");
            res.write("<p class='lead' id ='dis'>" +  weatherDescription + "</p>");
            res.write("<img src='" + weatherIcon + "' class='img-fluid'>");
            res.write("</div>");
            res.write("</body>");
            res.write("</html>");
            res.send();
            
        });
    });
});



app.listen(3000, function(){
    console.log('Server is running on port 3000');
});