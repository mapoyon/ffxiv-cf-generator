import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'

type ImageResource = HTMLImageElement | null;
type Imageable = HTMLImageElement | Blob;

export interface IBackgroundImageState {
  image: ImageResource
  width: number
  height: number
  updateImage: (imageable: Imageable) => void
}

@Module({
  name: 'BackgroundImage',
  stateFactory: true,
  namespaced: true
})
export default class BackgroundImageModule extends VuexModule implements IBackgroundImageState {
  private _image: ImageResource = null;

  public get image () {
    return this._image
  }

  public get width () {
    if (this._image == null) {
      return 0
    }

    return this._image.width
  }

  public get height () {
    if (this._image == null) {
      return 0
    }

    return this._image.height
  }

  @Mutation
  private SET_IMAGE (image: HTMLImageElement) {
    this._image = image
  }

  @Action({ rawError: true })
  public updateImage (imageable: Imageable) {
    if (imageable instanceof HTMLImageElement) {
      this.SET_IMAGE(imageable)
    } else if (imageable instanceof Blob) {
      const self = this
      const reader = new FileReader()
      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (!(typeof e.target?.result === 'string')) {
          return
        }

        const image = new Image()
        image.src = e.target.result
        self.SET_IMAGE(image)
      }
      reader.readAsDataURL(imageable)
    }
  }
}
