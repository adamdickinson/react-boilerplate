import util from "util"

export class CodePart {

  constructor(part) {
    this.part = part
  }


  [util.inspect.custom]() {
    return `<CODE>${this.part}</CODE>`
  }

}

export const decode = string => string.replace(/(["']<CODE>|<CODE>["'])/g, "")
export const code = part => new CodePart(part)
