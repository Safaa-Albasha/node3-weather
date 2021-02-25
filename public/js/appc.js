
// console.log('this is from appjs front id');


// fetch('http://puzzle.mead.io/puzzle').then( (response)=>{
//   response.json().then((data) =>{
//     console.log(data)

//   })

// })




const WeatherForm =document.querySelector('form');
const searchForm = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');


WeatherForm.addEventListener('submit',(e)=>{
  e.preventDefault();
  const Location = searchForm.value
  messageOne.textContent='Loading....'

  messageTwo.textContent=''

if(Location.length === 0){
  messageOne.textContent='Please Enter Location'
}else{
 
fetch('/weather?address='+Location).then((response)=>{
  response.json().then((data) =>{
  
    if(data.error){
      messageOne.textContent=data.error
    

    }else{
    messageOne.textContent=data.location
    messageTwo.textContent=data.forecast
    }
  })
  
  })

}

//clint js file



searchForm.value=''
})


