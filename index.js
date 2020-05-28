const input = document.querySelector('#binary');
const form = document.querySelector('form');
const errorSpan = document.querySelector('form span');
const convertText = document.querySelector('#convert');
const button = document.querySelector('button');

form.addEventListener('submit', handleSubmit);

input.addEventListener('keyup', handleKeyUp);

function handleSubmit(event) {
  try {
    event.preventDefault();
    const inputValue = input.value;

    if (inputValue === '') {
      throw Error('Você deve preencher o campo');
    }

    const decimal = binaryToDecimal(inputValue);

    convertText.innerHTML = `O binário <strong>'${inputValue}'</strong> é equivalente ao número <strong>${decimal}</strong>`

    button.disabled = true;
    input.value = '';
  } catch (err) {
    input.classList.add('input-error');
    errorSpan.classList.add('error');
    errorSpan.innerHTML = err.message;
  }
}

function handleKeyUp(event) {
  try {
    button.disabled = true;

    const value = event.target.value;

    const regexTest = /^[01]{1,8}$/g.test(value);

    if (value.length <= 8 || regexTest) {
      this.classList.remove('input-error');
      errorSpan.classList.remove('error');
    }

    if (value.length > 8 || !regexTest) {
      throw Error('Digite um binário válido de no máximo 8 dígitos');
    }

    button.disabled = false;
  } catch (err) {
    this.classList.add('input-error');
    errorSpan.classList.add('error');
    errorSpan.innerHTML = err.message;
  }
}

function binaryToDecimal(binary) {
  const string = new String(binary);

  string[Symbol.iterator] = function() {
    return {
      next: function() {
        if (this.index < string.length) {
          const power = string.length - 1 - this.index
          const value = Math.pow(2, power) * string[this.index];

          this.index++;

          return { value, done: false }
        }

        return { value: undefined, done: true }
      },
      index: 0,
    }
  }

  return Array.from(string).reduce((acc, val) => acc + val);
} 