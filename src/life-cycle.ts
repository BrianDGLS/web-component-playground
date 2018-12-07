import { Constructor } from './constructor'

/**
 * Mixin which adds custom lifecycle events and callabacks.
 * @export
 * @template TBase
 * @param {TBase} Base
 * @returns
 */
export function CustomLifeCycle<TBase extends Constructor>(Base: TBase) {
    return class extends Base {
        /**
         * Invoked when the custom element is first connected to the document's
         * DOM.
         * @memberof BaseElement
         */
        public connected(): void {}
        /**
         * Invoked when the custom element is disconnected from the document's
         * DOM.
         * @memberof BaseElement
         */
        public disconnected(): void {}
        /**
         * Invoked when the custom element is moved to a new document.
         * @memberof BaseElement
         */
        public adopted(): void {}
        /**
         * Invoked when one of the custom element's attributes is added,
         * removed, or changed.
         * @param {string} [attr]
         * @param {any} [prev]
         * @param {any} [curr]
         * @memberof BaseElement
         */
        public attributeChanged(attr?: string, prev?: any, curr?: any): void {}
        /**
         * Fired when native adoptedCallback occurs.
         * @protected
         * @returns {CustomEvent}
         */
        protected adoptedEvent(): CustomEvent {
            return new CustomEvent('adopted')
        }
        /**
         * Fired when native connectedCallback occurs.
         * @protected
         * @returns {CustomEvent}
         */
        protected connectedEvent(): CustomEvent {
            return new CustomEvent('connected')
        }
        /**
         * Fired when native disconnectedCallback occurs.
         * @protected
         * @returns {CustomEvent}
         */
        protected disconnectedEvent(): CustomEvent {
            return new CustomEvent('disconnected')
        }
        /**
         * Fired when native attributeChangedCallback occurs.
         * @protected
         * @param {string} attr
         * @param {*} prev
         * @param {*} curr
         * @returns {CustomEvent}
         */
        protected attributeChangedEvent(
            attr: string,
            prev: any,
            curr: any,
        ): CustomEvent {
            return new CustomEvent('attributeChanged', {
                detail: { attr, prev, curr },
            })
        }

        /***********************************************************************
         * Default lifecycle events
         *
         * These have been made private to ensure that only the custom lifecycle
         * events are overwritten. This is necessary as the CustomLifyCycle uses
         * the connectedCallback lifecycle event to attach it's template to the
         * DOM. They are also used to emit custom events allowing developers to
         * listen to the lifecycle events.
         */
        private adoptedCallback(): void {
            const ctx = this as any
            ctx.dispatchEvent(this.adoptedEvent())
            this.adopted()
        }
        private connectedCallback(): void {
            const ctx = this as any
            if (ctx.useShadow) {
                ctx.attachShadow(ctx.attachShadowOptions)
            }
            ctx.dispatchEvent(this.connectedEvent())
            ctx.render(true)
            this.connected()
        }
        private disconnectedCallback(): void {
            const ctx = this as any
            ctx.dispatchEvent(this.disconnectedEvent())
            this.disconnected()
        }
        private attributeChangedCallback(
            attr: string,
            prev: any,
            curr: any,
        ): void {
            const ctx = this as any
            ctx.dispatchEvent(this.attributeChangedEvent(attr, prev, curr))
            this.attributeChanged(attr, prev, curr)
        }
    }
}
