import {CellError, ErrorType} from '../Cell'
import {buildParsingErrorAst, ParsingError} from '../parser/Ast'

export class ParsingErrorVertex {
  constructor(
    public readonly errors: ParsingError[],
    public readonly rawInput: string
  ) {}

  public getCellValue(): CellError {
    return CellError.parsingError()
  }

  public getFormula(): string {
    return this.rawInput
  }
}
