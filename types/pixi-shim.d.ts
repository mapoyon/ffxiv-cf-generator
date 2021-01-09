declare module '@pixi/app' {
  export { Application } from 'pixi.js'
}

declare module '@pixi/filter-blur' {
  import { filters } from 'pixi.js'
  export import BlurFilter = filters.BlurFilter
}

declare module '@pixi/text' {
  export { Text, TextStyle } from 'pixi.js'
}

declare module '@pixi/core' {
  export { Renderer, BatchPluginFactory, Texture, BaseTexture } from 'pixi.js'
}

declare module '@pixi/sprite' {
  export { Sprite } from 'pixi.js'
}

declare module '@pixi/math' {
  export { Point } from 'pixi.js'
}
