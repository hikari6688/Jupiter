import { observable, action, computed } from 'mobx';
class Auth {
  @observable
  authList: Array<string> = ['app:add'];
  
  @action
  setAuth(data: Array<string>) {
    this.authList = data;
  }
}
export const auth = new Auth();
