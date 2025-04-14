const form = document.getElementById('form');
const successMessage = document.getElementById('success-msg');
const options = document.querySelectorAll('.option');

function validateFields(data) {
   let isValid = true;
   for(const [key, value] of Object.entries(data)) {
    if(value == '') {
        isValid = false;
        const errorMessage = document.getElementById(`${key}-required-err`);
        const inputField = document.getElementById(key);
        setError(errorMessage,inputField);
    }
   }

   if (data.email && !validateEmail(data.email)) {
    isValid = false;
    const errorMessage = document.getElementById('email-invalid-err');
    const inputField = document.getElementById('email');
    setError(errorMessage, inputField);
   }

   const queryType = document.querySelector('input[name="query-type"]:checked');
   if(!queryType) {
    isValid = false;
    const errorMessage = document.getElementById('query-type-required-err');
    setError(errorMessage);
   }

   const consent = document.querySelector('input[name="consent"]:checked');
   if(!consent) {
    isValid = false;
    const errorMessage = document.getElementById('consent-required-err');
    setError(errorMessage);
   }


   return isValid;
}

for (const option of options) {
    option.addEventListener('click', () => {
     for (const opt of options) {
        opt.classList.remove('selected-option');
         }
      option.classList.add('selected-option');
    });
}

function setError(errorMessage,inputField) {
  
    errorMessage.style.display = "block";
    if (inputField) {
        inputField.classList.add('input-err');
    }
}

function resetErrors() {
    document.querySelectorAll('.input-box').forEach(input => input.classList.remove('input-err'));
    document.querySelectorAll('.error-msg').forEach(err => {err.style.display = "none"});

}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return email.match(emailRegex);
}

function handleSubmit(e) {
    e.preventDefault(e);
    resetErrors();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    if(validateFields(data)) {
        successMessage.style.display = "block";
        form.reset();
    }
    
}

form.addEventListener('submit', handleSubmit);