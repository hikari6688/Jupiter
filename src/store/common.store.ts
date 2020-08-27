import { observable, action } from 'mobx';

class CommonStore {
  @observable
  isCollapsed = false;

  @observable 
  menuConfig = {
    openKeys: [],
    activekey: '',
  };

  @observable
  finished = false;

  @action
  setCollapsed() {
    this.isCollapsed = !this.isCollapsed;
  }
  
  @action
  setConfig(params) {
    this.menuConfig = { ...this.menuConfig, ...params };
    console.log(this.menuConfig)
  }
}
export const commonStore = new CommonStore();
