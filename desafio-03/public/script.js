const cards = document.querySelectorAll('.card')


for(let card of cards){
    card.addEventListener("click", function(){
    window.location.href = `/courses/${card.id}`
    })

}

