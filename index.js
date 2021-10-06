const cleanButton = document.getElementById("cleanButton")
const countButton = document.getElementById("countButton")
const RADIO_1  = document.getElementById("radio-1")
const RADIO_2 = document.getElementById("radio-2")
const RADIO_3 = document.getElementById("radio-3")
const FILTER_INPUT = document.getElementById("filter-text")
const WORD_INPUT = document.getElementById("texarea")
const RESULT_1 = document.getElementById("character-result")
const RESULT_2 = document.getElementById("word-result")

$(function() {
    $('#filter-text').on('keypress', function(e) {
        if (e.which == 32){
            return false;
        }
    });
});

cleanButton.addEventListener("click",()=>
{
    cleanResults()
    WORD_INPUT.value = ""
    FILTER_INPUT.value = ""
    document.querySelector('input[name="task"]:checked').checked = false;
})

countButton.addEventListener("click", ()=>
{
    cleanResults()

    let words = 0, characters = 0
    const palabras = WORD_INPUT.value
    const texto = palabras.split(/\s+/).filter(item => item!="")
    const filterWords = FILTER_INPUT.value.split(",")

    if(RADIO_1.checked && filterWords!="")
    {
        characters = palabras.length - contarPalabras(palabras,filterWords)[1]
        words = texto.length - contarPalabras(palabras,filterWords)[0]
    }else if(RADIO_2.checked && filterWords!="")
    {
        characters = contarPalabras(palabras,filterWords)[1]
        words = contarPalabras(palabras,filterWords)[0]
    }else
    {
        characters = palabras.length
        words = texto.length
        console.log(texto)
    }

    writeResults(words,characters)
})

function contarPalabras(txt,arr)
{
    const txt_array = txt.split(/\s+/)
    let ocurrency = 0,character = 0

    for(let i = 0;i<arr.length;i++)
    {
        ocurrency += txt_array.reduce((acm,j)=>
        {
            if(arr[i]!="" && arr[i]===j)
            {
                acm++
                character += j.length
            }
            return acm
        },0)
    }
    return [ocurrency,character]
}

function writeResults(words,characters)
{
    RESULT_1.innerText +=characters
    RESULT_2.innerText += words
}
function cleanResults()
{
    RESULT_1.innerText = "Characters : "
    RESULT_2.innerText = "Words : "
}