export function hexToRgb(hex: string) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result
    ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    }
    : null
}

export function afterOpacity(
  fg: Array<number>,
  o: number,
  bg = [255, 255, 255]
) {
  return fg.map((colFg: any, idx: number) => o * colFg + (1 - o) * bg[idx])
}

export function getRGBAfterOpacity(hex: string, opacity: number) {
  const rgb = hexToRgb(hex)
  const arrayRGB = [rgb.r, rgb.g, rgb.b]
  const newColor = afterOpacity(arrayRGB, opacity)
  return `rgba(${newColor[0]},${newColor[1]},${newColor[2]},${opacity})`
}
