const userInputs = {}

userInputs.name = document.querySelector('#name')
userInputs.email = document.querySelector("#email")
userInputs.password = document.querySelector('#password')
userInputs.confirmPassword = document.querySelector('#confirmPassword')

const reqLength = document.getElementById("req-length")
const reqUppercase = document.getElementById("req-uppercase")
const reqLowercase = document.getElementById('req-lowercase')
const reqNumber = document.getElementById("req-number")
const reqSpecial = document.getElementById("req-special")

const rules = {
    name: /^[A-Za-zÀ-ÿ\s]{2,}$/,
    password: /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*?&]).{8,}$/,
    email: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
}

function validateName(name) {
    if(name.trim().length === 0) {
        const err = new Error('Preencha esse campo.')
        err.input = 'name'
        throw err
    }

    if(!rules.name.test(name)) {
        const err = new Error('Nome invalido.')
        err.input = 'name'
        throw err
    }
}

function validateEmail(email) {
     if(email.trim().length === 0) {
        const err = new Error('Preencha esse campo.')
        err.input = 'email'
        throw err
    }

    if(!rules.email.test(email)) {
        const err = new Error('Email invalido.')
        err.input = 'email'
        throw err
    }
}

function validatePassword(password) {
    if(password.trim().length === 0) {
        const err = new Error('Preencha esse campo.')
        err.input = 'password'
        throw err
    }

    if(!rules.password.test(password)) {
        const err = new Error('Senha invalida.') 
        err.input = 'password'
        throw err
    }
}

function confirmPassword() {

    if(userInputs.confirmPassword.value !== userInputs.password.value) {
        const err = new Error('As senhas não conferem.')
        err.input = 'confirmPassword'
        throw err
    }
}

function removeFromStyles() {
    Object.entries(userInputs).forEach(([key, value]) => {
        value.classList.remove('success', 'error')
        document.querySelector(`#${key}-error`).textContent = ''
    })
}

function createAccount () {
    const validations = {
            name: validateName,
            email: validateEmail,
            password: validatePassword,
            confirmPassword : confirmPassword
        }

        Object.entries(validations).forEach(([key, validate]) => {
            validate(userInputs[key].value)
            userInputs[key].classList.add('success')
        })

        const msgCreate = document.querySelector('#create')
        msgCreate.textContent = 'Conta criada!'
        msgCreate.classList.add('msgCreate')
}

const form = document.querySelector('form')

form.addEventListener('submit', (ev) => {
    ev.preventDefault()
    removeFromStyles()

    try {
        createAccount()
        
    } catch (err) {
        const fieldError = document.querySelector(`#${err.input}-error`)
        fieldError.textContent = err.message
    }

})

const div = document.querySelector('#password-requirements-container')

//mostra os requisitos da senha ao clicar no campo
userInputs.password.addEventListener('focus', () => {
    div.classList.add('active')
})

//esconde os requisitos da senha ao sair do campo
userInputs.password.addEventListener('blur', () => {
    div.classList.remove('active')
})

//atualiza e remove a mensagem de error enquanto o usuario digita a senha
userInputs.password.addEventListener('input', () => {
    updateRequeriment(reqLength, userInputs.password.value.length >= 8)
    updateRequeriment(reqUppercase, /[A-Z]/.test(userInputs.password.value))
    updateRequeriment(reqLowercase, /[a-z]/.test(userInputs.password.value))
    updateRequeriment(reqNumber, /[0-9]/.test(userInputs.password.value))
    updateRequeriment(reqSpecial, /[!@#$%^&*(),.?\":{}|<>]/.test(userInputs.password.value))


    const err = document.querySelector('#password-error')
    err.textContent = ''
    userInputs.password.classList.remove('error')
})

userInputs.confirmPassword.addEventListener('input', () => {
    const err = document.querySelector('#confirmPassword-error')
    err.textContent = ''
    userInputs.confirmPassword.classList.remove('error')
})

function updateRequeriment(element, isValid) {
    if (isValid) {
        element.classList.add('valid')
    } else {
        element.classList.remove('valid')
    }
}

