import { Constructor } from './constructor'
import { BaseElement } from './base-element'
import { CustomLifeCycle } from './life-cycle'

export function CustomElement<TBase extends Constructor>(Base: TBase) {
    return CustomLifeCycle(BaseElement(Base))
}
