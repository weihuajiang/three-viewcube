import * as THREE from 'three'
import { DEFAULT_FACENAMES, FaceNames } from './faceNames'

function createTextTexture(
  text: string,
  props: {
    font: string
    fontSize: number
    width?: number
    height?: number
    color?: number[]
    bgColor?: number[]
  }
) {
  const fontface = props.font || 'Helvetica'
  const fontsize = props.fontSize || 30
  const width = props.width || 200
  const height = props.height || 200
  const bgColor = props.bgColor
    ? props.bgColor.join(', ')
    : '255, 255, 255, 1.0'
  const fgColor = props.color ? props.color.join(', ') : '0, 0, 0, 1.0'
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const context = canvas.getContext('2d')
  if (context) {
    context.font = `bold ${fontsize}px ${fontface}`
    context.fillStyle = `rgba(${bgColor})`
    context.fillRect(0, 0, width, height)
    // get size data (height depends only on font size)
    const metrics = context.measureText(text)
    const textWidth = metrics.width
    // text color
    context.fillStyle = `rgba(${fgColor})`
    context.fillText(
      text,
      width / 2 - textWidth / 2,
      height / 2 + fontsize / 2 - 2
    )
  }

  // canvas contents will be used for a texture
  const texture = new THREE.Texture(canvas)
  texture.minFilter = THREE.LinearFilter
  texture.needsUpdate = true
  return texture
}

export function createTextSprite(text: string) {
  const texture = createTextTexture(text, {
    fontSize: 100,
    font: 'Arial Narrow, sans-serif',
    color: [255, 255, 255, 1],
    bgColor: [0, 0, 0, 0]
  })
  const material = new THREE.SpriteMaterial({ map: texture, transparent: true })
  return new THREE.Sprite(material)
}

export function createFaceMaterials(faceNames: FaceNames = DEFAULT_FACENAMES, fontSize: number = 60) {
  const materials = [
    {
      name: FACES.FRONT,
      map: createTextTexture(faceNames.front, {
        fontSize: fontSize,
        font: 'Arial Narrow, sans-serif'
      })
    },
    {
      name: FACES.RIGHT,
      map: createTextTexture(faceNames.right, {
        fontSize: fontSize,
        font: 'Arial Narrow, sans-serif'
      })
    },
    {
      name: FACES.BACK,
      map: createTextTexture(faceNames.back, {
        fontSize: fontSize,
        font: 'Arial Narrow, sans-serif'
      })
    },
    {
      name: FACES.LEFT,
      map: createTextTexture(faceNames.left, {
        fontSize: fontSize,
        font: 'Arial Narrow, sans-serif'
      })
    },
    {
      name: FACES.TOP,
      map: createTextTexture(faceNames.top, {
        fontSize: fontSize,
        font: 'Arial Narrow, sans-serif'
      })
    },
    {
      name: FACES.BOTTOM,
      map: createTextTexture(faceNames.bottom, {
        fontSize: fontSize,
        font: 'Arial Narrow, sans-serif'
      })
    }
  ]
  return materials
}

export const FACES = {
  TOP: '1',
  FRONT: '2',
  RIGHT: '3',
  BACK: '4',
  LEFT: '5',
  BOTTOM: '6',

  TOP_FRONT_EDGE: '7',
  TOP_RIGHT_EDGE: '8',
  TOP_BACK_EDGE: '9',
  TOP_LEFT_EDGE: '10',

  FRONT_RIGHT_EDGE: '11',
  BACK_RIGHT_EDGE: '12',
  BACK_LEFT_EDGE: '13',
  FRONT_LEFT_EDGE: '14',

  BOTTOM_FRONT_EDGE: '15',
  BOTTOM_RIGHT_EDGE: '16',
  BOTTOM_BACK_EDGE: '17',
  BOTTOM_LEFT_EDGE: '18',

  TOP_FRONT_RIGHT_CORNER: '19',
  TOP_BACK_RIGHT_CORNER: '20',
  TOP_BACK_LEFT_CORNER: '21',
  TOP_FRONT_LEFT_CORNER: '22',

  BOTTOM_FRONT_RIGHT_CORNER: '23',
  BOTTOM_BACK_RIGHT_CORNER: '24',
  BOTTOM_BACK_LEFT_CORNER: '25',
  BOTTOM_FRONT_LEFT_CORNER: '26'
}

export const CORNER_FACES = [
  { name: FACES.TOP_FRONT_RIGHT_CORNER },
  { name: FACES.TOP_BACK_RIGHT_CORNER },
  { name: FACES.TOP_BACK_LEFT_CORNER },
  { name: FACES.TOP_FRONT_LEFT_CORNER },
  { name: FACES.BOTTOM_BACK_RIGHT_CORNER },
  { name: FACES.BOTTOM_FRONT_RIGHT_CORNER },
  { name: FACES.BOTTOM_FRONT_LEFT_CORNER },
  { name: FACES.BOTTOM_BACK_LEFT_CORNER }
]

export const EDGE_FACES = [
  { name: FACES.TOP_FRONT_EDGE },
  { name: FACES.TOP_RIGHT_EDGE },
  { name: FACES.TOP_BACK_EDGE },
  { name: FACES.TOP_LEFT_EDGE },
  // flip back and front bottom edges
  { name: FACES.BOTTOM_BACK_EDGE },
  { name: FACES.BOTTOM_RIGHT_EDGE },
  { name: FACES.BOTTOM_FRONT_EDGE },
  { name: FACES.BOTTOM_LEFT_EDGE }
]

export const EDGE_FACES_SIDE = [
  { name: FACES.FRONT_RIGHT_EDGE },
  { name: FACES.BACK_RIGHT_EDGE },
  { name: FACES.BACK_LEFT_EDGE },
  { name: FACES.FRONT_LEFT_EDGE }
]
