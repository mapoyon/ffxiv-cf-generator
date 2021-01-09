/* eslint-disable import/no-mutable-exports */
import { Store } from 'vuex'
import { getModule } from 'vuex-module-decorators'
import ITitleState from '~/store/Title'
import IBackgroundImageState from '~/store/BackgroundImage'

let titleStore: ITitleState
let backgroundImageStore: IBackgroundImageState
function initialiseStores (store: Store<any>): void {
  titleStore = getModule(ITitleState, store)
  backgroundImageStore = getModule(IBackgroundImageState, store)
}

export { initialiseStores, titleStore, backgroundImageStore }
