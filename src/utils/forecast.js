const request = require('request')


//
// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)
const forecast = (latitude,longitude , callback) =>{
  const url= 'http://api.weatherstack.com/current?access_key=a8637fb599167db48ea5006cabdc0fca&query=' +latitude+','+ longitude + '&units=m'
  request({url:url , json:true},(error,response)=>{
   
    if(error){
     callback('Unable to connect to service',undefined)


    }else if (response.body.error){
      callback('unable to find location !',undefined)

    }else{
      callback(undefined,response.body.current.weather_descriptions[0] + '   Its currently   ' +response.body.current.temperature  + '  degree out & it feel like  ' +response.body.current.feelslike +' degree Out')
      
    }

  })

  
}


module.exports= forecast