import ModuleDepthEffect from "./ModuleDepthEffect";

export class App {
  // id: number;
  // name: string;
  // testmodule: testModule;
  private _module: ModuleDepthEffect;

  constructor() {
    this.build();
  }

  private build() {
    window.addEventListener("load", this.awake);
    this._module = new ModuleDepthEffect();
    this._module.build();
  }

  private awake = () => {
    this._module.awake();
  };
}

let app: App = new App();
