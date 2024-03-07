const pass = document.querySelector('.main__form--input-pass')
const passAgain = document.querySelector('.main__form--input-again-pass')
const eyePass = document.querySelector('.eye-pass')
const eyePassAgain = document.querySelector('.eye-again-pass')
const btnReg = document.querySelector('.footer__btn')
const checkbox = document.getElementById('checkbox')
const nameInput = document.querySelector('.main__form--input-name')
const emailInput = document.querySelector('.main__form--input-mail')
const roleInput = document.querySelector('.main__form--select-role')
const container = document.querySelector('.container')
const inputs = document.querySelectorAll('input')
const errorMessage = document.querySelector('.main__error')
const formData = new Object();
const successfullyMessage = document.querySelector('.successfully')

const EMAIL_REGEXP = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/

eyePass.addEventListener('click' , () =>{
    pass.type = pass.type === 'password' ? 'text' : 'password'
})

eyePassAgain.addEventListener('click' , () =>{
    passAgain.type = passAgain.type === 'password' ? 'text' : 'password'
})

btnReg.addEventListener('click', () => {
    // Перебираем все инпуты
    inputs.forEach((input) => {
        if (input.value.trim() === '') {
            // Если инпут пустой, меняем его рамку на красную
            input.style.border = '2px solid red';
        } else {
            onInput()
            formData.username =  nameInput.value
            input.style.border = '1px solid #ccc';
        }
    });
        if (roleInput.value !== '') {
                roleInput.style.border = '1px solid #ccc';
                formData.role = roleInput.value
            } else {
                roleInput.style.border = '2px solid red';
                showerrorMessage('Заполните пожалуйста все поля!')
            }
            if ( pass.value !== passAgain.value) {
                pass.style.border = '2px solid red';
                passAgain.style.border = '2px solid red';

                showerrorMessage('Ваши пароли не совпадают')
            }
            else {
                pass.style.border = '1px solid #ccc';
                passAgain.style.border = '1px solid #ccc';

                formData.password = pass.value
                formData.password_repeat =  passAgain.value
            }

        if ( pass.value !== passAgain.value || nameInput === '' ||  !isEmailValid(emailInput.value) || roleInput === '' || pass.value === '' || passAgain.value === ''){
            showerrorMessage('Чтот-то пошло не так , проверьте правильность данных!')
        }
        else {
            fetch('https://jsonplaceholder.typicode.com/users', {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json; charset=UTF-8'
            }
            })
            .then(response => response.text())
            .then(data => {
            console.log('Data sent successfully:', data);
            })
            .catch(error => {
            console.error('Error sending data:', error);
            });
            container.style.display = 'none'
            successfullyMessage.style.display = 'inline-block'
        }

});


checkbox.addEventListener('change', function() {
    btnReg.disabled = !this.checked;
});


function showerrorMessage (message){
    errorMessage.innerHTML = message
    errorMessage.style.display = 'block'
    setTimeout(() => {
        errorMessage.innerHTML = ''
        errorMessage.style.display = 'none'
    }, 3000);
}

function onInput() {
    if (isEmailValid(emailInput.value)) {
        formData.email = emailInput.value
        emailInput.style.borderColor = 'green'; // Валидный email
    } else {
        showerrorMessage('Введите корректную почту!')
        emailInput.style.borderColor = 'red'; // Невалидный email
    }
}

function isEmailValid(value) {
    return EMAIL_REGEXP.test(value);
}








