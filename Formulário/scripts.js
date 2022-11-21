const form = document.getElementById("form")
const cep = document.querySelector("#cep")
const cpf = document.querySelector("#cpf")
const name = document.querySelector("#FullName")

const ShowData = (result) => {
    for(const campo in result) {
        if(document.querySelector("#"+campo)) {
            document.querySelector("#"+campo).value = result[campo];
        }
    }
}

cep.addEventListener("blur", (e) => {
    e.preventDefault();
    ret = VerifyCEP(cep.value)
    if(ret == 1) {
        setSuccessFor(cep);
    
        let search = cep.value.replace("-", "")
        const options = {
            method: 'GET',
            mode: 'cors',
            cache: 'default'
        }
     
        fetch(`https://viacep.com.br/ws/${search}/json/`, options)
     
        // se der certo... then
        .then(response => {response.json()
            .then(data => ShowData(data))})
        
        // se der errado... catch
        .catch(e => console.log("Deu erro: " + e, message))
    } else if(ret == -1) {
        setErrorFor(cep, "CEP invalid. Ex.: 10000-000")
    } else {
        setErrorFor(cep, "Different size 9. Ex.: 10000-000")
    }

})

name.addEventListener("blur", (e) => {
    e.preventDefault();
    if(name.value.split(" ").length < 2) {
        setErrorFor(name, "Name invalid. Enter first name and last name.");
    } else {
        setSuccessFor(name);
    }
})

cpf.addEventListener("blur", (e) => {
    e.preventDefault();
    ret = VerifyCPF(cpf.value) 
    if(ret == 1) {
        setSuccessFor(cpf);
    } else if(ret == -1) {
        setErrorFor(cpf, "Just numbers please. Ex.: 12345678901");
    } else {
        setErrorFor(cpf, "Different size 11. Ex.: 12345678901")
    }    
})

function setErrorFor(input, message) {
    const FormControl = input.parentElement;
    const small = FormControl.querySelector("small");
    
    small.innerText = message;

    FormControl.className = "form-control error"
}

function setSuccessFor(input) {
    const FormControl = input.parentElement;
    const small = FormControl.querySelector("small")

    small.innerText = ""

    FormControl.className = "form-control success";
}

function VerifyCPF(cpf) {
    if(cpf.length != 11) {
        return 0;
    } else {
        if(isNaN(cpf)) {
            return -1;
        } else {
            return 1;
        }
    }
}

function VerifyCEP(cep) {
    if(cep.length != 9) {
        return 0;
    } else {
        if(cep[5] != '-') {
            return -1;
        } else {
            return 1;
        }
    }
}