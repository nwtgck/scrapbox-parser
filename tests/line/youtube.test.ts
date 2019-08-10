/* global describe it expect */

import { BlockComponentType, convertToBlockComponents } from '../../src/block/BlockComponent'
import { BlockType } from '../../src/block'
import { convertToBlocks } from '../../src/parse'

describe('youtube', () => {
  it('Simple youtube link', () => {
    const input = '[https://www.youtube.com/watch?v=YJ5q8Wrkbdw]'
    const blockComponents: BlockComponentType[] = convertToBlockComponents(input)
    const blocks: BlockType[] = convertToBlocks(blockComponents)
    expect(blocks).toEqual([
      {
        indent: 0,
        type: 'line',
        nodes: [
          {
            type: 'youtube',
            link: 'https://www.youtube.com/watch?v=YJ5q8Wrkbdw'
          }
        ]
      }
    ])
  })

  it('Short youtube link', () => {
    const input = '[https://youtu.be/YJ5q8Wrkbdw]'
    const blockComponents: BlockComponentType[] = convertToBlockComponents(input)
    const blocks: BlockType[] = convertToBlocks(blockComponents)
    expect(blocks).toEqual([
      {
        indent: 0,
        type: 'line',
        nodes: [
          {
            type: 'youtube',
            link: 'https://youtu.be/YJ5q8Wrkbdw'
          }
        ]
      }
    ])
  })

  it('Youtube link with params', () => {
    const input = '[https://www.youtube.com/watch?v=YJ5q8Wrkbdw&feature=youtu.be&t=10]'
    const blockComponents: BlockComponentType[] = convertToBlockComponents(input)
    const blocks: BlockType[] = convertToBlocks(blockComponents)
    expect(blocks).toEqual([
      {
        indent: 0,
        type: 'line',
        nodes: [
          {
            type: 'youtube',
            link: 'https://www.youtube.com/watch?v=YJ5q8Wrkbdw&feature=youtu.be&t=10'
          }
        ]
      }
    ])
  })

  it('Short youtube link with params', () => {
    const input = '[https://youtu.be/YJ5q8Wrkbdw&feature=youtu.be&t=10]'
    const blockComponents: BlockComponentType[] = convertToBlockComponents(input)
    const blocks: BlockType[] = convertToBlocks(blockComponents)
    expect(blocks).toEqual([
      {
        indent: 0,
        type: 'line',
        nodes: [
          {
            type: 'youtube',
            link: 'https://youtu.be/YJ5q8Wrkbdw&feature=youtu.be&t=10'
          }
        ]
      }
    ])
  })
})
