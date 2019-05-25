import {HandsOnEngine} from '../../src'
import {CellError, ErrorType} from '../../src/Cell'
import {Config} from '../../src/Config'
import {MatrixPlugin} from '../../src/interpreter/plugin/MatrixPlugin'
import '../testConfig.ts'

describe('Matrix plugin', () => {
  it('matrix multiplication', async () => {
    const config = new Config({functionPlugins: [MatrixPlugin]})
    const engine = await HandsOnEngine.buildFromArray([
      ['1', '2'],
      ['3', '4'],
      ['5', '6'],
      ['1', '2'],
      ['3', '4'],
      ['{=MMULT(A1:B3,A4:B5)}'],
    ], config)

    expect(engine.getCellValue('A6')).toBeCloseTo(7)
    expect(engine.getCellValue('B6')).toBeCloseTo(10)
    expect(engine.getCellValue('A7')).toBeCloseTo(15)
    expect(engine.getCellValue('B7')).toBeCloseTo(22)
    expect(engine.getCellValue('A8')).toBeCloseTo(23)
    expect(engine.getCellValue('B8')).toBeCloseTo(34)
  })

  it('matrix multiplication wrong size', async () => {
    const config = new Config({functionPlugins: [MatrixPlugin], matrixDetection: true})
    const engine = await HandsOnEngine.buildFromArray([
      ['1', '2'],
      ['3', '4'],
      ['5', '6'],
      ['1', '2', '3'],
      ['4', '5', '6'],
      ['7', '8', '9'],
      ['{=mmult(A1:B3,A4:C6)}'],
    ], config)

    expect(engine.getCellValue('A7')).toEqual(new CellError(ErrorType.VALUE))
    expect(engine.getCellValue('B7')).toEqual(0)
  })

  it('matrix multiplication with string in data', async () => {
    const config = new Config({functionPlugins: [MatrixPlugin]})
    const engine = await HandsOnEngine.buildFromArray([
      ['1', '2','{=MMULT(A1:B2,A3:B4)}'],
      ['3', 'foo'],
      ['1', '2','{=MMULT(A3:B4,A1:B2)}'],
      ['3', '4'],
    ], config)

    expect(engine.getCellValue('C1')).toEqual(new CellError(ErrorType.VALUE))
    expect(engine.getCellValue('D1')).toEqual(new CellError(ErrorType.VALUE))
    expect(engine.getCellValue('C2')).toEqual(new CellError(ErrorType.VALUE))
    expect(engine.getCellValue('D2')).toEqual(new CellError(ErrorType.VALUE))
    expect(engine.getCellValue('C3')).toEqual(new CellError(ErrorType.VALUE))
    expect(engine.getCellValue('D4')).toEqual(new CellError(ErrorType.VALUE))
    expect(engine.getCellValue('C3')).toEqual(new CellError(ErrorType.VALUE))
    expect(engine.getCellValue('D4')).toEqual(new CellError(ErrorType.VALUE))
  })

  it('nested matrix multiplication', async () => {
    const config = new Config({functionPlugins: [MatrixPlugin]})
    const engine = await HandsOnEngine.buildFromArray([
      ['1', '2'],
      ['3', '4'],
      ['{=MMULT(A1:B2, MMULT(A1:B2,A1:B2))}'],
    ], config)

    expect(engine.getCellValue('A3')).toEqual(37)
    expect(engine.getCellValue('B3')).toEqual(54)
    expect(engine.getCellValue('A4')).toEqual(81)
    expect(engine.getCellValue('B4')).toEqual(118)
  })

  it('mmult of other mmult', async () => {
    const config = new Config({functionPlugins: [MatrixPlugin]})
    const engine = await HandsOnEngine.buildFromArray([
      ['1', '2', '{=MMULT(A1:B2, A1:B2)}', '{=MMULT(A1:B2, A1:B2)}'],
      ['3', '4', '{=MMULT(A1:B2, A1:B2)}', '{=MMULT(A1:B2, A1:B2)}'],
      ['{=MMULT(A1:B2, C1:D2)}'],
    ], config)

    expect(engine.getCellValue('A3')).toEqual(37)
    expect(engine.getCellValue('B3')).toEqual(54)
    expect(engine.getCellValue('A4')).toEqual(81)
    expect(engine.getCellValue('B4')).toEqual(118)
  })

  it('matrix transpose', async () => {
    const config = new Config({functionPlugins: [MatrixPlugin]})
    const engine = await HandsOnEngine.buildFromArray([
      ['1', '2'],
      ['3', '4'],
      ['5', '6'],
      ['{=transpose(A1:B3)}'],
    ], config)

    expect(engine.getCellValue('A4')).toBeCloseTo(1)
    expect(engine.getCellValue('B4')).toBeCloseTo(3)
    expect(engine.getCellValue('C4')).toBeCloseTo(5)
    expect(engine.getCellValue('A5')).toBeCloseTo(2)
    expect(engine.getCellValue('B5')).toBeCloseTo(4)
    expect(engine.getCellValue('C5')).toBeCloseTo(6)
  })

  it('matrix multiplication by sumproduct', async () => {
    const config = new Config({functionPlugins: [MatrixPlugin], matrixDetection: true })
    const engine = await HandsOnEngine.buildFromArray([
      ['1', '2'],
      ['3', '4'],
      ['5', '6'],
      ['1', '2'],
      ['3', '4'],
      ['=SUMPRODUCT($A1:$B1,transpose(A$4:A$5))', '=SUMPRODUCT($A1:$B1,transpose(B$4:B$5))'],
      ['=SUMPRODUCT($A2:$B2,transpose(A$4:A$5))', '=SUMPRODUCT($A2:$B2,transpose(B$4:B$5))'],
      ['=SUMPRODUCT($A3:$B3,transpose(A$4:A$5))', '=SUMPRODUCT($A3:$B3,transpose(B$4:B$5))'],
    ], config)

    expect(engine.getCellValue('A6')).toBeCloseTo(7)
    expect(engine.getCellValue('B6')).toBeCloseTo(10)
    expect(engine.getCellValue('A7')).toBeCloseTo(15)
    expect(engine.getCellValue('B7')).toBeCloseTo(22)
    expect(engine.getCellValue('A8')).toBeCloseTo(23)
    expect(engine.getCellValue('B8')).toBeCloseTo(34)
  })

  it('matrix maxpool', async () => {
    const config = new Config({functionPlugins: [MatrixPlugin]})
    const engine = await HandsOnEngine.buildFromArray([
      ['1', '2', '3', '4', '5', '6'],
      ['11', '12', '13', '14', '15', '16'],
      ['21', '22', '23', '24', '25', '26'],
      ['{=maxpool(A1:F3,3)}'],
    ], config)

    expect(engine.getCellValue('A4')).toBeCloseTo(23)
    expect(engine.getCellValue('B4')).toBeCloseTo(26)
  })

  it('matrix maxpool, custom stride', async () => {
    const config = new Config({functionPlugins: [MatrixPlugin]})
    const engine = await HandsOnEngine.buildFromArray([
      ['1', '2', '3', '4', '5', '6'],
      ['11', '12', '13', '14', '15', '16'],
      ['21', '22', '23', '24', '25', '26'],
      ['28', '29', '30', '31', '32', '33'],
      ['{=maxpool(A1:F4,3,1)}'],
    ], config)

    expect(engine.getCellValue('A5')).toBeCloseTo(23)
    expect(engine.getCellValue('A6')).toBeCloseTo(30)
    expect(engine.getCellValue('B5')).toBeCloseTo(24)
    expect(engine.getCellValue('B6')).toBeCloseTo(31)
    expect(engine.getCellValue('C5')).toBeCloseTo(25)
    expect(engine.getCellValue('C6')).toBeCloseTo(32)
    expect(engine.getCellValue('D5')).toBeCloseTo(26)
    expect(engine.getCellValue('D6')).toBeCloseTo(33)
  })

  it('matrix element-wise addition', async () => {
    const config = new Config({functionPlugins: [MatrixPlugin]})
    const engine = await HandsOnEngine.buildFromArray([
      ['1', '2', '100', '200'],
      ['3', '4', '300', '400'],
      ['5', '6', '500', '600'],
      ['1', '2'],
      ['3', '4'],
      ['{=MMULT(A1:B3,A4:B5) + C1:D3}'],
    ], config)

    expect(engine.getCellValue('A6')).toBeCloseTo(107)
    expect(engine.getCellValue('B6')).toBeCloseTo(210)
    expect(engine.getCellValue('A7')).toBeCloseTo(315)
    expect(engine.getCellValue('B7')).toBeCloseTo(422)
    expect(engine.getCellValue('A8')).toBeCloseTo(523)
    expect(engine.getCellValue('B8')).toBeCloseTo(634)
  })

  it('matrix medianpool on even square', async () => {
    const config = new Config({functionPlugins: [MatrixPlugin]})
    const engine = await HandsOnEngine.buildFromArray([
      ['1', '2', '1', '2', '1', '5'],
      ['3', '4', '3', '7', '6', '7'],
      ['{=medianpool(A1:F2,2)}'],
    ], config)

    expect(engine.getCellValue('A3')).toBeCloseTo(2.5)
    expect(engine.getCellValue('B3')).toBeCloseTo(2.5)
    expect(engine.getCellValue('C3')).toBeCloseTo(5.5)
  })

  it('matrix medianpool on odd square', async () => {
    const config = new Config({functionPlugins: [MatrixPlugin]})
    const engine = await HandsOnEngine.buildFromArray([
      ['1', '1', '1'], // right shot from the beginning
      ['1', '2', '3'],
      ['3', '3', '3'],

      ['2', '2', '2'], // need one step to the left
      ['3', '4', '6'],
      ['10', '10', '10'],

      ['0', '0', '0'], // need one step to the right
      ['4', '6', '7'],
      ['8', '8', '8'],

      ['{=medianpool(A1:C9,3)}'],
    ], config)

    expect(engine.getCellValue('A10')).toBeCloseTo(2)
    expect(engine.getCellValue('A11')).toBeCloseTo(4)
    expect(engine.getCellValue('A12')).toBeCloseTo(6)
  })
})
