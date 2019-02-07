import { TemplateResult, render } from 'lit-html';

import { Constructor } from './constructor';

export function BaseElement<TBase extends Constructor>(Base: TBase) {
  return class extends Base {
    protected template!: TemplateResult;
    protected render(): void {
      if (!this.template) {
        throw new Error('template must be set');
      }
      render(this.template, this as any);
    }
  };
}
