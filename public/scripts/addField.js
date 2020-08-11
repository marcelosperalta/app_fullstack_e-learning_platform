// document.querySelector("#container").style.backgroundColor = "red";

// Procurar o botao
document.querySelector("#add-time")
// Quando clicar no botao
.addEventListener('click', cloneField);

// Executar uma acao
function cloneField() {
    // console.log("Cheguei aqui");

    // Duplicar os campos. Que campos?
    const newFieldContainer = document.querySelector('.schedule-item').cloneNode(true);

    // pegar os campos.Que campos?
    const fields = newFieldContainer.querySelectorAll("input");
    // console.log(fields[0]);
    // console.log(fields[1]);
    // console.log(fields[0].value = "");
    
    // Limpar os campos.
    // fields[0].value = "";
    // fields[1].value = "";

    // para cada camo, limpar
    fields.forEach(function(field) {
        // pegar o field do momento e limpa ele
        // console.log(field);
        field.value = "";
    });

    // Colocar na página. Onde?
    document.querySelector('#schedule-items').appendChild(newFieldContainer);
}