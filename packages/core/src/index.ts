export class Node {}

export class Element extends Node {
  constructor() {
    super();
  }

  public body() {}
}

export class UIElement extends Element {
  public content?: string = '';
  constructor() {
    super();
  }
}

// export class View

export class Text extends UIElement {
  constructor(content?: string) {
    super();
    this.content = content;
  }

  override body() {
    return [];
  }
}

// customElements.define('ui-text', Text);
