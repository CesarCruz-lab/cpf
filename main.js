import { CPF } from './cpf.js';

const fieldEl = document.querySelectorAll('.field');
const validatorField = document.querySelector('#validator');
const generatorField = document.querySelector('#generator');

function onFieldFocus(input, label) {
  input.addEventListener('input', (ev) => {
    if (ev.target.value.trim()) label.classList.add('onfocus');
    else label.classList.remove('onfocus');
  });
}

function handleGenerator() {
  const form = generatorField.querySelector('form');
  const btnClipboard = generatorField.querySelector('.btn-copy');
  
  
  form.addEventListener('submit', (ev) => {
    ev.preventDefault();
    
    const label = ev.target.querySelector('label');
    const input = ev.target.elements['cpf_generator'];
    const cpf = CPF.generate();
    
    label.classList.add('onfocus');
    input.value = cpf;

    btnClipboard.addEventListener('click', ev => {
      navigator.clipboard.writeText(input.value);
    })
  });
}

function handleValidator() {
  const form = validatorField.querySelector('form');
  const responseEl = validatorField.querySelector('.form-reponse');

  form.addEventListener('submit', (ev) => {
    ev.preventDefault();

    const span = document.createElement('span');
    const input = ev.target.elements['cpf_validator'];
    const emptyValue = !input.value.trim().length;
    const containsLetters = /[A-Za-z]+/g.test(input.value);

    responseEl.innerHTML = '';

    if (emptyValue) {
      span.textContent = 'Este campo não pode estar vazío';
      span.classList.add('text-error');
      responseEl.appendChild(span);
      return;
    }

    if (containsLetters) {
      span.textContent = 'CPF não pode conter letras';
      span.classList.add('text-error');
      responseEl.appendChild(span);
      return;
    }

    const isValidCPF = CPF.validate(input.value);

    if (isValidCPF) {
      span.textContent = 'CPF válido';
      span.classList.add('text-success');
    } else {
      span.textContent = 'CPF inválido';
      span.classList.add('text-error');
    }

    responseEl.appendChild(span);
  });
}

function init() {
  fieldEl.forEach((el) => {
    const label = el.querySelector('.field-label');
    const input = el.querySelector('.field-input');

    onFieldFocus(input, label);
  });

  handleValidator();
  handleGenerator();
}

init();
