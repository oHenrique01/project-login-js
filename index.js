const userInputs = {}

userInputs.name = document.querySelector('#name')
userInputs.email = document.querySelector("#email")
userInputs.password = document.querySelector('#password')

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

function removeFromStyles() {
    Object.entries(userInputs).forEach(([key, value]) => {
        value.classList.remove('success', 'error')
        document.querySelector(`#${key}-error`).textContent = ''
    })
}

const form = document.querySelector('form')

form.addEventListener('submit', (ev) => {
    ev.preventDefault()
    removeFromStyles()

    try {
        validateName(userInputs.name.value)
        userInputs.name.classList.add('success')
        validateEmail(userInputs.email.value)
        userInputs.email.classList.add('success')
        validatePassword(userInputs.password.value)
        userInputs.password.classList.add('success')
        
    } catch (err) {
        const campError = document.querySelector(`#${err.input}-error`)
        campError.textContent = err.message
        campError.classList.add('error')
    }

})

