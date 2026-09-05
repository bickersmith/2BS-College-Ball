// src/components/core/componentBase.js

export class ComponentBase {
  constructor(props = {}) {
    this.props = props;
  }

  render() {
    throw new Error("render() must be implemented by subclass");
  }

  withFallback(fallbackHtml = "") {
    try {
      const html = this.render();
      return html || fallbackHtml;
    } catch (err) {
      console.error("Component render error:", err);
      return fallbackHtml;
    }
  }
}
