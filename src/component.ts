import { Constructor } from './constructor'
import { BaseElement } from './base-element'
import { CustomLifeCycle } from './life-cycle'

export class ComponentLike extends Component(HTMLElement) {}

export function Component<TBase extends Constructor>(Base: TBase) {
    return CustomLifeCycle(BaseElement(Base))
}
