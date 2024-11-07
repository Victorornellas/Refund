// Seleciona os elementos do formulario
const amount = document.getElementById("amount")

// Captura o evento de input para formatar o valor
amount.oninput = () => {
    // obtem o valor atual do input e remove o caracteres nao numericos
    let value = amount.value.replace(/\D/g, "")

    // Transformar o valor em centavos
    value = Number(value) / 100
    
    // Atualiza o valor do input
    amount.value = formatCurrencyBRL(value)
    
}

function formatCurrencyBRL(value) {
    // Formata o valor no padrão BRL
    value = value.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    
     })
    
    
     return value
}