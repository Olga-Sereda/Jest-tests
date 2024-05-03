import {
  isCardValid,
  isCardValidMaxLength,
  isCardValidMinLength,
  isCardValidNumber,
  isEmailValid,
  isEmailStart,
  isEmailStartNumb,
  isEmailValidIncl,
  isDateValid,
  isCVVValid,
  isCVVValidMaxLength,
  isCVVValidMinLength,
  isCVVValidNumb
} from '../src/main.js'

describe('CardNumber', () => {
  // it('Недостаточное кол-во цифр', () => {
  //   const result = document.getElementById('cardNumber')
  //   result.focus()
  //   result.textContent = '1234'
  //   result.blur()
  //   expect(result.classList.contains('invalid')).toBe(true)
  // })
  it('В номере карты верное количество цифр', () => {
    const result = isCardValid('1234567890123456')

    expect(result).toBeTruthy()
  })

  it('Недостаточное кол-во цифр в номере карты', () => {
    const result = isCardValidMinLength('1234')

    expect(result).toBeTruthy()
  })

  it('Слишком большое кол-во цифр в номере карты', () => {
    const result = isCardValidMaxLength('123456789012345678')

    expect(result).toBeTruthy()
  })

  it('В номере карты только цифры', () => {
    const result = isCardValidNumber('sc!%/d4')

    expect(result).toBeFalsy()
  })
})

describe('email', () => {
  it('Почта введена корректно', () => {
    const result = isEmailValid('mailname@domen.ru')

    expect(result).toBeTruthy()
  })

  it('Почта не начинается с @', () => {
    const result = isEmailStart('@domen.ru')

    expect(result).toBeTruthy()
  })

  it('Почта не содержит @', () => {
    const result = isEmailValidIncl('mailomen.ru')

    expect(result).toBeFalsy()
  })

  it('Почта не начинается с цифр', () => {
    const result = isEmailStartNumb('123me@domen.ru')

    expect(result).toBeTruthy()
  })
})

describe('date', () => {
  it('Дата должна содержать не больше 4 цифр', () => {
    const result = isDateValid('122412')

    expect(result).toBeFalsy()
  })
})

describe('CVV', () => {
  it('CVV должен содержать 3 цифры', () => {
    const result = isCVVValid('666')

    expect(result).toBeTruthy()
  })

  it('CVV должен содержать не больше 3 цифр', () => {
    const result = isCVVValidMaxLength('66654')

    expect(result).toBeTruthy()
  })

  it('CVV должен содержать не меньше 3 цифр', () => {
    const result = isCVVValidMinLength('66')

    expect(result).toBeTruthy()
  })

  it('CVV должен содержать цифры', () => {
    const result = isCVVValidNumb('/d4')

    expect(result).toBeFalsy()
  })
})
