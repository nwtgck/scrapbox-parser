import { ParserType, convertToLineNodes } from '.'

const codeRegExp = /^(.*?)`(.*?)`(.*)$/
const codeCommandRegExp = /^(\$ .+)$/

export type CodeNodeType = {
  type: 'code'
  text: string
}

const createCodeNode = (text: string): CodeNodeType => ({
  type: 'code',
  text
})

export const CodeNodeParser: ParserType = (text, { nested, quoted }, next) => {
  if (nested) return next()

  const codeCommandMatch = text.match(codeCommandRegExp)
  if (codeCommandMatch) {
    const [, target] = codeCommandMatch
    return [ createCodeNode(target) ]
  }

  const codeMatch = text.match(codeRegExp)
  if (codeMatch) {
    const [, left, target, right] = codeMatch
    return [
      ...convertToLineNodes(left, { nested, quoted }),
      createCodeNode(target),
      ...convertToLineNodes(right, { nested, quoted })
    ]
  }

  return next()
}
