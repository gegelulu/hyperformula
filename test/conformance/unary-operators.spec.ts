import { HyperFormula } from '../../src'
import '../testConfig'
import { adr, detailedError } from '../testUtils'
import {  ErrorType } from '../../src/Cell'

//Standard 
// UNARY + https://docs.oasis-open.org/office/OpenDocument/v1.3/csprd02/part4-formula/OpenDocument-v1.3-csprd02-part4-formula.html#__RefHeading__1018040_715980110
// UNARY - https://docs.oasis-open.org/office/OpenDocument/v1.3/csprd02/part4-formula/OpenDocument-v1.3-csprd02-part4-formula.html#__RefHeading__1018042_715980110


function createEngine(data: any[][]) {
  const engine = HyperFormula.buildFromArray(data)

  return {
    getCellValue(cellAddress: string) {
      return engine.getCellValue(adr(cellAddress))
    }
  }
}

describe('Quality assurance of operators Unary plus and minus', () => {
  xit('string given by reference shoud return string with UNARY+', () => {
    const engine = createEngine([
      ['Liz'],
      ['=+A1']
    ])
    expect(engine.getCellValue('A2')).toEqual('Liz') // UNARY PLUS value
  })

  it('string given by reference shoud return string with UNARY-', () => {
    const engine = createEngine([
      ['Liz'],
      ['=-A1']
    ])
    expect(engine.getCellValue('A2')).toEqual(detailedError(ErrorType.VALUE))
  })

  xit('string given directly shoud return same string', () => {
    const engine = createEngine([
      ['=+"Liz"']
    ])
    expect(engine.getCellValue('A1')).toEqual('Liz') 
  })

  it('string given directly shoud thrown error with UNARY-', () => {
    const engine = createEngine([
      ['=-"Liz"']
    ])
    expect(engine.getCellValue('A1')).toEqual(detailedError(ErrorType.VALUE)) 
  })

  xit('float given by reference shoud return same float with UNARY+', () => {
    const engine = createEngine([
      ['3,1415'],
      ['=+A1']
    ])
    expect(engine.getCellValue('A2')).toEqual('3,1415') 
  })

  it('number given by reference shoud return same number with UNARY+', () => {
    const engine = createEngine([
      [999],
      ['=+A1']
    ])
    expect(engine.getCellValue('A2')).toEqual(999) 
  })

  it('Integer given by reference shoud return same Integer with UNARY+', () => {
    const engine = createEngine([
      ['02/01/1999'],
      ['=+A1']
    ])
    expect(engine.getCellValue('A2')).toEqual('02/01/1999') 
  })

  it('Integer given by reference shoud return same Integer with UNARY+', () => {
    const engine = createEngine([
      ['=+"02/01/1999"']
    ])
    expect(engine.getCellValue('A1')).toEqual('02/01/1999') 
  })

})


