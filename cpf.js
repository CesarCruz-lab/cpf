// CPF VALIDATOR

const CPF = {
  getRamdomNumber(min = 0, max = 9) {
    return `${Math.floor(Math.random() * (max - min)) + min}`;
  },

  formattter(cpf = '') {
    const rule = /([\d]{3})([\d]{3})([\d]{3})([\d]{2})/;
    return cpf.replace(rule, (all, n1, n2, n3, validatorNumber) => `${n1}.${n2}.${n3}-${validatorNumber}`);
  },

  sequetialValue(value = '') {
    const cpf = value.slice(0, value.length - 2).replace(/\D/g, '');
    const sequence = cpf[0].repeat(cpf.length);
    return sequence === cpf;
  },

  getNumbers(value = '') {
    return value.replace(/[\D]+/g, '').slice(0, 9);
  },

  getDigit(cpf = '') {
    const cpfAsArray = cpf.split('');
    let regressive = cpfAsArray.length + 1;

    const digit = cpfAsArray.reduce((acc, value) => {
      acc += regressive * Number(value);
      regressive--;

      return acc;
    }, 0);

    const validDigit = 11 - (digit % 11);

    return validDigit <= 9 ? validDigit : 0;
  },

  validate(value = '') {
    const isSequetialValue = this.sequetialValue(value);

    if (isSequetialValue) {
      return false;
    }

    const numbers = this.getNumbers(value);
    const firstNumberValidator = this.getDigit(numbers);
    const secondNumberValidator = this.getDigit(numbers + firstNumberValidator);
    const cpfGenerated = `${numbers}${firstNumberValidator}${secondNumberValidator}`;
    const cpfFormatted = this.formattter(cpfGenerated);
    const isSameValue = cpfGenerated === value || cpfFormatted === value;

    return isSameValue;
  },

  generate() {
    const randomNumber = this.getRamdomNumber(100000000, 999999999);
    const firstDigit = this.getDigit(randomNumber);
    const secondDigit = this.getDigit(randomNumber + firstDigit);
    const cpf = this.formattter(randomNumber + firstDigit + secondDigit);

    return cpf;
  },
};

export { CPF };
