import {validateEmail, validateNotEmpty} from '../validations'

describe('validations', () => {
  describe('Validate Email', () => {
    it('Should return empty if valid email', () => {
      expect(validateEmail('enzo@test.com')).toBe('')
    })
    it('Should return error if not valid email value', () => {
      expect(validateEmail('enzotest.com')).toBe('Invalid Email')
      expect(validateEmail('enzo@testcom')).toBe('Invalid Email')
      expect(validateEmail(undefined)).toBe('Invalid Email')
      expect(validateEmail({})).toBe('Invalid Email')
    })
  })
  describe('Validate if empty Field', () => {
    it('should return empty if valid field', () => {
      expect(validateNotEmpty('sdf')).toBe('')
    })
    it('should return a error mesage if not valid', () => {
      expect(validateNotEmpty('')).toBe('This field cannot be empty')
      expect(validateNotEmpty()).toBe('This field cannot be empty')
      expect(validateNotEmpty({})).toBe('This field cannot be empty')
    })
  })
})
