import { observable, action } from 'mobx';

interface MenuConf {
  openKeys: string[];
  activekey: string;
}

class CommonStore {
  @observable
  isCollapsed: boolean = false;

  @observable
  menuConfig: MenuConf = {
    openKeys: [],
    activekey: '',
  };

  @observable
  finished: boolean = false;

  @action
  setCollapsed(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  @action
  setConfig(params: MenuConf): void {
    this.menuConfig = { ...this.menuConfig, ...params };
  }
}
export const commonStore = new CommonStore();
