import * as PIXI from "pixi.js";
//to do- remove repetition:
export class DepthEffect {
  private _app: PIXI.Application;
  private _width: number;
  private _height: number;
  private _sprite: PIXI.Sprite;
  private _URLimageToDisplace: string = "./assets/img/test.jpg";
  private _URLDmap: string = "./assets/img/dmaps/test.jpg";
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
    this._sprite.width = 300;
    this._sprite.height = 400;
    this._sprite.anchor.x = 0.5;
    this._sprite.anchor.y = 0.5;
    this._sprite.x = document.body.offsetWidth / 2;
    this._sprite.y = document.body.offsetHeight / 2;
    this._app.stage.addChild(this._sprite);
    this._sprite.width = 300;
    this._sprite.height = 400;

    container.addChild(this._sprite);

    this.createDMap();
  }

  private createDMap() {
    this._displacementFilterTexture = PIXI.Sprite.from(this._URLDmap);
    this._displacementFilterTexture.width = 300;
    this._displacementFilterTexture.height = 400;
    this._displacementFilterTexture.anchor.x = 0.5;
    this._displacementFilterTexture.anchor.y = 0.5;
    this._displacementFilterTexture.position = this._sprite.position;
    this._displacementFilter = new PIXI.filters.DisplacementFilter(
      this._displacementFilterTexture
    );

    this._app.stage.addChild(this._displacementFilterTexture);
    this._sprite.filters = [this._displacementFilter];
  }
  //to do: fix scaling according to ratio!
  public onResize(width: number, height: number) {
    const ratioW = width / this._width;
    const ratioH = height / this._height;
    this._width = width;
    this._height = height;
    this._sprite.width = this._sprite.width * ratioW;
    this._sprite.height = this._sprite.height * ratioH;
    this._sprite.x = document.body.offsetWidth / 2;
    this._sprite.y = document.body.offsetHeight / 2;
    this._displacementFilterTexture.position = this._sprite.position;
    this._displacementFilterTexture.x = this._sprite.x;
    this._displacementFilterTexture.y = this._sprite.y;
    this._app.renderer.resize(this._width, this._height);
  }

  public onMouseMove(eventData: MouseEvent) {
    this.setTilt(
      25,
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
