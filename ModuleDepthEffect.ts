import { DepthEffect } from "./DepthEffect";

export default class ModuleRippleEffect {
  private effect: DepthEffect;

  public build(): void {
    this.effect = new DepthEffect();
  }

  public awake(): void {
    document
      .querySelector(".Module-DepthEffect")
      .addEventListener("mousemove", this.setDestination);
    window.addEventListener("resize", this.onResize);
  }

  private onResize = () => {
    this.effect.onResize(window.innerWidth, window.innerHeight);
  };

  private setDestination = (event: MouseEvent) => {
    this.effect.onMouseMove(event);
  };

  protected sleep(): void {
    document
      .querySelector(".Module-DepthEffect")
      .removeEventListener("mousemove", this.setDestination);
  }
}
