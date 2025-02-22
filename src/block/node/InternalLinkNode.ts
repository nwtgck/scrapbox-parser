import { ParserType, convertToLineNodes } from '.'

const internalLinkRegExp = /^(.*?)\[(\/?[^[\]]+)\](.*)$/

export type InternalLinkNodeType = {
  type: 'link'
  pathType: 'root' | 'relative'
  href: string
}

const createInternalLinkNode = (href: string): InternalLinkNodeType => ({
  type: 'link',
  pathType: /^\/.*$/.test(href) ? 'root' : 'relative',
  href
})

export const InternalLinkNodeParser: ParserType = (text, { nested, quoted }, next) => {
  const internalLinkMatch = text.match(internalLinkRegExp)
  if (!internalLinkMatch) return next()

  const [, left, target, right] = internalLinkMatch
  return [
    ...convertToLineNodes(left, { nested, quoted }),
    createInternalLinkNode(target),
    ...convertToLineNodes(right, { nested, quoted })
  ]
}
