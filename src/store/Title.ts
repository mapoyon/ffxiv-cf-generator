import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'

export interface ITitleState {
  primary: string
  secondary: string
  updatePrimary: (text: string) => void
  updateSecondary: (text: string) => void
  reset: () => void
}

@Module({
  name: 'Title',
  stateFactory: true,
  namespaced: true
})
export default class TitleModule extends VuexModule implements ITitleState {
  private _primary: string = '';
  private _secondary: string = '';

  public get primary () {
    return this._primary
  }

  public get secondary () {
    return this._secondary
  }

  @Mutation
  private SET_PRIMARY (text: string) {
    this._primary = text
  }

  @Mutation
  private SET_SECONDARY (text: string) {
    this._secondary = text
  }

  @Mutation
  private RESET () {
    this._primary = ''
    this._secondary = ''
  }

  @Action({ rawError: true })
  public updatePrimary (text: string) {
    this.SET_PRIMARY(text)
  }

  @Action({ rawError: true })
  public updateSecondary (text: string) {
    this.SET_SECONDARY(text)
  }

  @Action({ rawError: true })
  public reset () {
    this.RESET()
  }
}
