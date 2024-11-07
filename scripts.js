// Seleciona os elementos do formulario
const form = document.querySelector("form")
const amount = document.getElementById("amount")
const expense = document.getElementById("expense")
const category = document.getElementById("category")

// Seleciona os elementos da lista

const expenseList = document.querySelector("ul")
const expensesQuantity = document.querySelector("aside header p span")

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

    //Captura o evento de submit do formulario para obter os valores
form.onsubmit = (event) => {
    // Previne o comportamento padrao da pagina
    event.preventDefault ()

        // Cria um objeto com os detalhes na nova despesa
    const newExpense = {
        id: new Date() .getTime(),
        expense: expense.value,
        category_id: category.value,
        category_name: category.options[category.selectedIndex].text,
        amount: amount.value,
        createad_at: new Date(),
    }

   //Chama a função que irá adicionar o item na lista
   expenseAdd(newExpense)
}

// Adiciona um novo item na lista
function expenseAdd(newExpense){
    try {
        //Cria o elemento para adicionar o item (li) na lista (ul)
        const expenseItem = document.createElement("li")
        expenseItem.classList.add("expense" )

        // Cria o icone da categoria
        const expenseIcon = document.createElement("img")
        expenseIcon.setAttribute("src", `img/${newExpense.category_id}.svg`)
        expenseIcon.setAttribute("alt", newExpense.category_name)

        //Cria a info da despesas.
        const expenseInfo = document.createElement("div")
        expenseInfo.classList.add("expense-info")

        // Cria o nome da despesas
        const expenseName = document.createElement("strong")
        expenseName.textContent = newExpense.expense

        // Cria a categoria da despesas
        const expenseCategory = document.createElement("span")
        expenseCategory.textContent = newExpense.category_name

        // Adiciona o nome e categoira na div das infomações da despesas
        expenseInfo.append(expenseName, expenseCategory)

        // Criao valor da despensa
        const expenseAmount = document.createElement("span")
        expenseAmount.classList.add("expense-amount")
        expenseAmount.innerHTML = `<small>R$</small>${newExpense.amount
            .toUpperCase()
            .replace("R$", "")}`

        // Adicionado o icone de remover
        const removeIcon = document.createElement("img")
        removeIcon.classList.add("remove-icon")
        removeIcon.setAttribute("src", "img/remove.svg")
        removeIcon.setAttribute("alt", "remover")


     //Adiciona as informações no item

        expenseItem.append(expenseIcon, expenseInfo, expenseAmount, removeIcon)

     // Adiciona o item na lista
        expenseList.append(expenseItem)

     // Atualiza os totais
     updateTotals()

    } catch (error) {
        alert("Não foi possivel atulizar a lista de despesas.")
        console.log(error)
    }
}

// Atualiza o valor total

function updateTotals() {
    try {
        // recupera todos os itens da lista
        const items = expenseList.children
        // Atualiza a quantidade de itens na lista
        expensesQuantity.textContent = `${items.length} ${
            items.length > 1 ? "despesas" : "despesa"
        } ` 
    } catch (error) {
        console.log(error)
        alert("Não foi possivel atualizar os totais")
    }
}