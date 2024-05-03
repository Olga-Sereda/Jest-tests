import { el, mount, setAttr } from 'redom'
// import Cleave from 'cleave.js'

const label = el('label.labelCard#labelId', 'Введите данные карты')
const input = el('input.cartNumber#cardNumber', {
  placeholder: '0000-0000-0000-0000',
  required: 'required',
  type: 'number'
})
const errorCard = el('.error#errorId', { style: { color: 'red' } })

const inputDate = el('input.cardDate', {
  placeholder: '00/00',
  required: 'required'
})
const errorDate = el('.error', { style: { color: 'red' } })
const inputCVV = el('input.cardCVV', {
  placeholder: 'CVV',
  required: 'required'
})
const errorCVV = el('.error', { style: { color: 'red' } })

const labelMail = el('label.labelMail', 'Ваш email:')
const inputMail = el('input.inputMail', { type: 'email', required: 'required' })
const error = el('.error', { style: { color: 'red' } })
const button = el('button.btn', 'Отправить', {
  type: 'submit',
  disabled: 'true'
})

const block = el('.block', [inputDate, inputCVV])
const container = el(
  '.container',
  el('form.form', [
    label,
    input,
    errorCard,
    block,
    errorDate,
    errorCVV,
    labelMail,
    inputMail,
    error,
    button
  ])
)
mount(document.body, container)

//проверка карты
export const isCardValidMaxLength = (card: string): boolean => {
  return card.length >= 17
}

export const isCardValidMinLength = (card: string): boolean => {
  return card.length <= 11
}

export const isCardValidNumber = (card: string): boolean => {
  return /^\d+$/.test(card)
}

export const isCardValid = (card: string): boolean => {
  return card.length === 16
}

input.addEventListener('blur', () => {
  //  @ts-expect-error Property 'value' does not exist on type 'HTMLElement'.ts(2339)
  if (!isCardValid(input.value) || isCardValidMinLength(input.value)) {
    input.classList.add('invalid')
    errorCard.innerHTML = 'Пожалуйста, введите корректный номер'
    return false
  } else {
    input.classList.remove('invalid')
    errorCard.innerHTML = ''
    return true
  }
})

input.addEventListener('blur', () => {
  //  @ts-expect-error Property 'value' does not exist on type 'HTMLElement'.ts(2339)
  if (isCardValidMaxLength(input.value) || !isCardValidNumber(input.value)) {
    input.classList.add('invalid')
    errorCard.innerHTML = 'Пожалуйста, введите корректный номер'
    return false
  } else {
    input.classList.remove('invalid')
    errorCard.innerHTML = ''
    return true
  }
})

//валидация даты
export const isDateValid = (date: string): boolean => {
  return date.length < 4
}

inputDate.addEventListener('blur', () => {
  // @ts-expect-error Property 'value' does not exist on type 'HTMLElement'.ts(2339)
  if (!isDateValid(inputDate.value)) {
    inputDate.classList.add('invalid')
    errorDate.innerHTML = 'Пожалуйста, введите корректную дату'
  } else {
    inputDate.classList.remove('invalid')
    errorDate.innerHTML = ''
  }
})

//проверка CVV
export const isCVVValid = (cvv: string): boolean => {
  return cvv.length === 3
}

export const isCVVValidMinLength = (cvv: string): boolean => {
  return cvv.length < 3
}

export const isCVVValidMaxLength = (cvv: string): boolean => {
  return cvv.length > 3
}

export const isCVVValidNumb = (cvv: string): boolean => {
  return /^\d+$/.test(cvv)
}

inputCVV.addEventListener('blur', () => {
  // @ts-expect-error Property 'value' does not exist on type 'HTMLElement'.ts(2339)
  if (!isCVVValid(inputCVV.value) || isCVVValidMaxLength(inputCVV.value)) {
    inputCVV.classList.add('invalid')
    errorCVV.textContent = 'Пожалуйста, введите корректный CVV'
  } else {
    inputCVV.classList.remove('invalid')
    errorCVV.textContent = ''
  }
})

inputCVV.addEventListener('blur', () => {
  // @ts-expect-error Property 'value' does not exist on type 'HTMLElement'.ts(2339)
  if (isCVVValidMinLength(inputCVV.value) || !isCVVValidNumb(inputCVV.value)) {
    inputCVV.classList.add('invalid')
    errorCVV.textContent = 'Пожалуйста, введите корректный CVV'
  } else {
    inputCVV.classList.remove('invalid')
    errorCVV.textContent = ''
  }
})

//проверка почты
export const isEmailValid = (email: string): boolean => {
  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/

  return emailRegex.test(email)
}

export const isEmailValidIncl = (email: string): boolean => {
  return email.includes('@')
}

export const isEmailStart = (email: string): boolean => {
  return email.startsWith('@')
}

export const isEmailStartNumb = (email: string): boolean => {
  const numbers = email.match(/^\d+/)[0]
  return email.startsWith(numbers)
}

inputMail.addEventListener('blur', () => {
  //  @ts-expect-error Property 'value' does not exist on type 'HTMLElement'.ts(2339)
  if (!isEmailValid(inputMail.value) || !isEmailValidIncl(inputMail.value)) {
    inputMail.classList.add('invalid')
    error.textContent = 'Пожалуйста, введите правильный email.'
  } else {
    inputMail.classList.remove('invalid')
    error.textContent = ''
  }
})

inputMail.addEventListener('blur', () => {
  //  @ts-expect-error Property 'value' does not exist on type 'HTMLElement'.ts(2339)
  if (isEmailStart(inputMail.value) || isEmailStartNumb(inputMail.value)) {
    inputMail.classList.add('invalid')
    error.textContent = 'Пожалуйста, введите правильный email.'
  } else {
    inputMail.classList.remove('invalid')
    error.textContent = ''
  }
})

const inputs = document.querySelectorAll('input')

const checkForm = () => {
  for (let i = 0; i < inputs.length; i++) {
    if (inputs[i].value === '') {
      setAttr(button, { disabled: true })
      return
    }
  }
  setAttr(button, { disabled: false })
}

for (const inputVal of inputs) {
  inputVal.addEventListener('change', () => {
    checkForm()
  })
  inputVal.addEventListener('keyup', () => {
    checkForm()
  })
  inputVal.addEventListener('keydown', () => {
    checkForm()
  })
}

// new Cleave(input, {
//   creditCard: true,
//   creditCardStrictMode: true
// })

// new Cleave(inputDate, {
//   date: true,
//   datePattern: ['m', 'y']
// })

// new Cleave(inputCVV, {
//   blocks: [3]
// })
