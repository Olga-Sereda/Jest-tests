// import { input } from '@/main.js'
var input.input = require('@/main.js')

describe('CardNumber', () => {
    it('Недостаточное кол-во цифр', () => {
        const result = input('1234');

        expect(result).toBeFalsy()
    });

    it('Номер не допускает ввод каких-либо символов и букв', () => {
        const result = input('d!/l?.')

        expect(result).toBeFalsy()
    });

    it('Слишком длинный номер', () => {
        const result = input('12345678901234567890')

        expect(result).toBeFalsy()
    });

    it('Возвращает true, если в номере больше 15 и меньше 20 цифр', () => {
        const result = input('1234567890123456')

        expect(result).toBeTruthy()
    })
})