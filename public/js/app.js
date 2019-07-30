const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const message1 = document.querySelector('#errorP')
const message2 = document.querySelector('#successP')



weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const locationFromUI = search.value;
    message1.textContent = 'Loading...'
    message2.textContent = ''
    fetch('/weather?address='+locationFromUI).then((response) => {
    response.json().then((data) => {
        if(data.error){
            message1.textContent = data.error            
        }else{
             message1.textContent = data.location
             message2.textContent = data.forecast             
        }
    })
});
})