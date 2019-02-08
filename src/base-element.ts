import { TemplateResult, render } from 'lit-html';

import { Constructor } from './constructor';

export function BaseElement<TBase extends Constructor>(Base: TBase) {
  return class extends Base {
    public useShadowDOM: boolean = false;
    public template(): TemplateResult {
      throw new Error('template function must be implemented');
    }
    protected render(): void {
      const ctx = this as any;
      const container = ctx.shadowRoot ? ctx.shadowRoot : this;
      render(this.template(), container);
    }
  };
}
