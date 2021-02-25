const path = require('path');
const express = require('express');
const hbs = require('hbs')
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');


const app = express()
const port = process.env.PORT || 3000


// path for express config
const publicdirname =path.join(__dirname,'../public');
const viewsPath = path.join(__dirname, '../templates/views'); 
const partialsPath = path.join(__dirname,'../templates/partials')
//setup handle bar engin 
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicdirname))


app.get('/', (req, res) => {
	res.render('index', {
		title: 'Weather App ',
		name:'Safa'
	});
});

app.get('/about', (req, res) => {
  res.render('about',{
    title:'About ',
    name:'Safa'
  })
  
});


app.get('/help', (req, res) => {
  res.render('help',{
    title:'Help',
    name:'Safa'
  })
  
});


app.get('/weather',(req,res)=>{
      if(!req.query.address){
        return res.send({
          error:'You Must provied Address'
  })
}
geocode(req.query.address,(error,{ lattitude, longitude ,  location}={}) =>{
            if(error){
              return res.send({error})
            }
            forecast(lattitude,longitude ,(error,forcastData)=>{
              if (error){
                return res.send({error});
              }
              res.send({
                forecast:forcastData,
                location,
                address: req.query.address
              });
            })
          })  
})




app.get('/help/*', (req, res) => {
  res.render('404',{
    title:'404',
    name:'Safa',
    errorMsg:'Oops Article Not Found'
  });
});



app.get('*', (req, res) => {
  res.render('404',{
    title:'404',
    name:'Safa',
    errorMsg:'Oops Page Not FOUND'
  });
});


app.listen(port,()=>{
console.log('server is up in port '+port)

})