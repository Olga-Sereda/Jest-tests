import '../src/main.js'

describe('CardNumber', () => {
  it('Недостаточное кол-во цифр', () => {
    const result = document.getElementById('cardNumber')
    result.focus()
    result.textContent = '1234'
    result.blur()
    expect(result.classList.contains('invalid')).toBe(true)
  })
})
