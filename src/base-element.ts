import { Constructor } from './constructor'

export function BaseElement<TBase extends Constructor>(Base: TBase) {
    return class extends Base {
        static selector: string = ''
        protected template: string = ''
        protected useShadow: boolean = false

        public get tag(): string {
            const ctx = this as any
            return ctx.tagName.toLowerCase()
        }

        public get templateID(): string {
            return `${this.tag}-template`
        }

        public attachShadowOptions: ShadowRootInit = { mode: 'open' }

        protected get root(): this | ShadowRoot {
            const ctx = this as any
            if (this.useShadow) {
                return ctx.shadowRoot as ShadowRoot
            }

            return this
        }

        protected render(defaultTemplate: boolean = false): void {
            const ctx = this as any
            if (!this.template) return
            if (defaultTemplate) {
                const content = this.templateElement.content
                ctx.root.appendChild(document.importNode(content, true))
            } else {
                // content updated
            }
        }

        private _templateElement!: HTMLTemplateElement

        protected get templateElement(): HTMLTemplateElement {
            if (!this._templateElement) {
                this.assignTemplate()
            }

            return this._templateElement
        }

        protected set templateElement(element: HTMLTemplateElement) {
            this._templateElement = element
        }

        protected findTemplate(): HTMLElement | null {
            const id = this.templateID
            return document.getElementById(id)
        }

        protected assignTemplate(): void {
            const exists = this.findTemplate() as HTMLTemplateElement
            if (exists) {
                this._templateElement = exists
            } else {
                this._templateElement = this.createTemplate()
            }
        }

        protected createTemplate(): HTMLTemplateElement {
            const element = document.createElement('template')
            element.id = this.templateID
            element.innerHTML += this.template
            document.body.appendChild(element)
            return element
        }
    }
}
