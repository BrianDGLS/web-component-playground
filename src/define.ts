export function define(...constructors: any[]): void {
    for (const constructor of constructors) {
        throwIfInvalidSelector(constructor.selector)
        throwIfAlreadyDefined(constructor.selector)

        customElements.define(constructor.selector, constructor)
    }
}

function throwIfInvalidSelector(selector: string): void {
    if (!selector || typeof selector !== 'string') {
        throw new Error(`A selector must be provided`)
    }
}

function throwIfAlreadyDefined(selector: string): void {
    const exists = customElements.get(selector)
    if (exists) {
        throw new Error(`${selector} is already defined`)
    }
}
