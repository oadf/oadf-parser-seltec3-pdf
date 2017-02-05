export const Alignment = {
  LEFT: 'LEFT',
  RIGHT: 'RIGHT',
  CENTER: 'CENTER',
}

export const ContentType = {
  INTEGER: 'INTEGER',
  TEXT: 'TEXT',
  RESULT: 'RESULT',
  HEIGHT_RESULT: 'HEIGHT_RESULT',
  WIND: 'WIND',
}

export default class Column {
  constructor(element, alignment, type) {
    this.name = element.getText();
    this.alignment = alignment;
    this.type = type;

    this.left = element.getX();
    this.right = element.getX() + element.getWidth();
  }

  getName() {
    return this.name;
  }

  getRight() {
    return this.right;
  }

  match(element, previousColumn) {
    const left = element.getX();
    const right = element.getX() + element.getWidth();

    const diffLeft = left - this.left;
    const diffRight = this.right - right;

    if (left >= this.left && right <= this.right) {
      return true;
    }
    if (this.alignment === Alignment.CENTER && diffLeft > -10 && diffRight > -10) {
      if (diffLeft < 0) {
        this.left = this.left - Math.abs(diffLeft);
      }
      if (diffRight < 0) {
        this.right = this.right + Math.abs(diffLeft);
      }
      return true;
    }
    if (this.alignment === Alignment.LEFT && diffLeft < 5 && diffLeft > -10) {
      if (diffLeft < 0) {
        this.left = this.left - Math.abs(diffLeft);
      }
      if (diffRight < 0) {
        this.right = this.right + Math.abs(diffRight);
      }
      return true;
    }
    if (this.alignment === Alignment.RIGHT && diffRight < 5 && diffRight > -10) {
      if (diffRight < 0) {
        this.right = this.right + Math.abs(diffRight);
      }
      if (diffLeft < 0) {
        this.left = this.left - Math.abs(diffLeft);
      }
      return true;
    }
    // Special case for missaligned headers
    if (
      this.alignment === Alignment.LEFT &&
      previousColumn != null &&
      left > previousColumn.getRight()
    ) {
      this.left = left;
      if (diffRight < 0) {
        this.right = this.right + Math.abs(diffRight);
      }
      return true;
    }
    // console.log(`Not matched: ${element.getText()} for column ${this.name}: ${diffLeft} - ${diffRight}`);
    return false;
  }
}
