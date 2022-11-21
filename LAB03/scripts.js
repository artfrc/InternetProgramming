const form = document.getElementById("form")
const username = document.getElementById("name")
const data_nasc = document.getElementById("data_nasc")
const cpf = document.getElementById("cpf")
const cep = document.getElementById("cep")
const sexo = document.getElementById("sexo")

form.addEventListener('submit', (e) => {
    e.preventDefault(); // não recarrega a página

    CheckInputs();
});

function CheckInputs() {
    const nameValue = username.value;
    const dataNascValue = data_nasc.value;
    const cpfValue = cpf.value;
    const cepValue = cep.value;

    if(nameValue == "") {
        setErrorFor(username, "O nome é obrigatório.");
    } else {
        setSuccessFor(username);
    }

    if(dataNascValue == "") {
        setErrorFor(data_nasc, "Data de nascimento é obrigatória.");
    } else {
        setSuccessFor(data_nasc);
    }

    if(cpfValue == "") {
        setErrorFor(cpf, "O CPF é obrigatório.");
    } else if(cpfValue.length != 11) {
        setErrorFor(cpf,"CPF deve conter 11 dígitos.");
    } else {
        setSuccessFor(cpf);
    }

    if(cepValue == "") {
        setErrorFor(cep, "O CEP é obrigatório.");
    } else if(cepValue.length != 9 && cepValue[5] != '-') {
        setErrorFor(cep,"CEP inválido. Ex.: 11111-111");
    } else {
        setSuccessFor(cep);
    }

}

function setErrorFor(input, message) {
    const formControl = input.parentElement;
    const small = formControl.querySelector('small')

    // Adicionar a mensagem de erro

    small.innerText = message;

    // Adicionar a classe de erro

    formControl.className = "form-control error";
}

function setSuccessFor(input) {
    const formControl = input.parentElement;
    const small = formControl.querySelector('small')

    small.innerText = "";

    // Adicionar a classe de sucesso
    formControl.className = "form-control success";
}