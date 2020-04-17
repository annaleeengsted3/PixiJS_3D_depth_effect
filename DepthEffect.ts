import * as PIXI from "pixi.js";
//to do- remove repetition:
export class DepthEffect {
  private _app: PIXI.Application;
  private _width: number;
  private _height: number;
  private _sprite: PIXI.Sprite;
  private _URLimageToDisplace: string = "./assets/img/3.jpg";
  private _URLDmap: string = "./assets/img/dmaps/3.jpg";
  private _DOMContainer: HTMLElement = document.querySelector(
    ".Module-DepthEffect"
  );
  private _displacementFilterTexture: PIXI.Sprite;
  private _displacementFilter: PIXI.filters.DisplacementFilter;

  constructor() {
    this._width = window.innerWidth;
    this._height = window.innerHeight;
    this.setupPIXIApp();
  }

  private setupPIXIApp() {
    this._app = new PIXI.Application({
      resizeTo: window,
      width: this._width,
      height: this._height,
      transparent: true,
      antialias: true,
    });
    this._DOMContainer.appendChild(this._app.view);
    //causes error, fix:
    // this._app.stage
    //   .on("mousemove", this.onMouseMove)
    //   .on("touchmove", this.onMouseMove);
    this.createSpriteImage();
  }

  private createSpriteImage() {
    const container = new PIXI.Container();
    this._app.stage.addChild(container);
    this._sprite = PIXI.Sprite.from(this._URLimageToDisplace);
    this._sprite.height = this._height;
    this._sprite.width = this._sprite.height * (1266 / 1900); //src image dimensions
    this._sprite.anchor.x = 0.5;
    this._sprite.x = this._width / 2;
    this._app.stage.addChild(this._sprite);

    container.addChild(this._sprite);

    this.createDMap();
  }

  private createDMap() {
    this._displacementFilterTexture = PIXI.Sprite.from(this._URLDmap);
    this._displacementFilterTexture.height = this._sprite.height;
    this._displacementFilterTexture.width = this._sprite.width;
    this._displacementFilterTexture.anchor.x = 0.5;
    this._displacementFilterTexture.position = this._sprite.position;
    this._displacementFilter = new PIXI.filters.DisplacementFilter(
      this._displacementFilterTexture
    );

    this._app.stage.addChild(this._displacementFilterTexture);
    this._sprite.filters = [this._displacementFilter];
  }
  //to do: fix scaling- set tilt according to size
  public onResize(width: number, height: number) {
    this._width = width;
    this._height = height;
    this._sprite.height = this._height;
    this._sprite.width = this._sprite.height * (1266 / 1900);
    this._sprite.x = this._width / 2;
    this._displacementFilterTexture.width = this._sprite.width;
    this._displacementFilterTexture.height = this._sprite.height;
    this._displacementFilterTexture.position = this._sprite.position;

    this._app.renderer.resize(this._width, this._height);
  }

  public onMouseMove(eventData: MouseEvent) {
    this.setTilt(
      15,
      eventData.clientX,
      eventData.clientY,
      this._displacementFilter
    );
  }
  private setTilt(
    maxTilt: number,
    mouseX: number,
    mouseY: number,
    displacementFilter: PIXI.filters.DisplacementFilter
  ) {
    const midPointX = document.body.offsetWidth / 2;
    const midPointY = document.body.offsetHeight / 2;
    const posX = midPointX - mouseX;
    const posY = midPointY - mouseY;
    const valX = (posX / midPointX) * maxTilt;
    const valY = (posY / midPointY) * maxTilt;
    displacementFilter.scale.x = valX;
    displacementFilter.scale.y = valY;
  }
}
