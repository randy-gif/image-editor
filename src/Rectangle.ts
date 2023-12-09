class Rectangle {
    _x: number;
    _y: number;
    _width: number;
    _height: number;
    _color: string;
    _id: number;

    constructor(x: number, y: number, width: number, height: number, color: string, id: number) {
        this._x = x;
        this._y = y;
        this._width = width;
        this._height = height;
        this._color = color;
        this._id = id;
    }

    get x() {
        return this._x;
    };

    get y() {
        return this._y;
    };

    get width() {
        return this._width;
    };
  
    get height() {
        return this._height;
    };

    get color() {
        return this._color;
    };

    get id() {
        return this._id;
    };

    get area() {
      return this._width * this.height;
    };
  
    get perimeter() {
      return 2 * (this._width + this._height);
    };

    set x(x: number) {
        this._x = x;
    };

    set y(y: number) {
        this._y = y;
    };

    set width(width: number) {
        this._width = width;
    };

    set height(height: number) {
        this._height = height;
    };

    set color(color: string) {
        this._color = color;
    }

    set id(id: number) {
        this._id = id;
    }
  };

  export default Rectangle;