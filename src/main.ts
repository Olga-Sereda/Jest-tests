import { el, mount, setAttr } from 'redom'
import Cleave from 'cleave.js'

const label = el('label.labelCard', 'Введите данные карты')
export const input = el('input.cartNumber', {
  placeholder: '0000-0000-0000-0000',
  required: 'required'
})
const errorCard = el('.error', { style: { color: 'red' } })

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

inputMail.addEventListener('blur', () => {
  // @ts-expect-error Property 'value' does not exist on type 'HTMLElement'.ts(2339)
  if (!inputMail.value.includes('@')) {
    inputMail.classList.add('invalid')
    error.textContent = 'Пожалуйста, введите правильный email.'
  } else {
    inputMail.classList.remove('invalid')
    error.textContent = ''
  }
})

input.addEventListener('blur', () => {
  // @ts-expect-error Property 'value' does not exist on type 'HTMLElement'.ts(2339)
  if (input.value.length <= 15) {
    input.classList.add('invalid')
    errorCard.innerHTML = 'Пожалуйста, введите корректный номер'
    return false
  } else {
    input.classList.remove('invalid')
    errorCard.innerHTML = ''
    return true
  }
})

inputDate.addEventListener('blur', () => {
  // @ts-expect-error Property 'value' does not exist on type 'HTMLElement'.ts(2339)
  if (inputDate.value.length < 4) {
    inputDate.classList.add('invalid')
    errorDate.innerHTML = 'Пожалуйста, введите корректную дату'
  } else {
    inputDate.classList.remove('invalid')
    errorDate.innerHTML = ''
  }
})

inputCVV.addEventListener('blur', () => {
  // @ts-expect-error Property 'value' does not exist on type 'HTMLElement'.ts(2339)
  if (inputCVV.value.length < 3) {
    inputCVV.classList.add('invalid')
    errorCVV.textContent = 'Пожалуйста, введите корректный CVV'
  } else {
    inputCVV.classList.remove('invalid')
    errorCVV.textContent = ''
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

new Cleave(input, {
  creditCard: true,
  creditCardStrictMode: true
})

new Cleave(inputDate, {
  date: true,
  datePattern: ['m', 'y']
})

new Cleave(inputCVV, {
  blocks: [3]
})
