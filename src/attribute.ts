type AttributeType = 'string' | 'number' | 'boolean' | ''
type StringAttribute = { key: string; value: string; initialKey: string }
type NumberAttribute = { key: string; value: number; initialKey: string }
type BooleanAttribute = { key: string; value: boolean; initialKey: string }

function getInitialKeyName(): string {
    const num = Math.random().toString(36)
    return '_' + num.substr(2, 9)
}

function getInitialKeyDescriptor(): any {
    return { writable: true, value: undefined }
}

function getInitalAttributeKey(target: any) {
    const initialKey = getInitialKeyName()
    const initialKeyValidator = getInitialKeyDescriptor()
    Object.defineProperty(target, initialKey, initialKeyValidator)
    return initialKey
}

function setStringAttribute(target: any, key: string) {
    const initialKey = getInitalAttributeKey(target)

    Object.defineProperty(target, key, {
        enumerable: true,
        get() {
            return this.getAttribute(key)
        },
        set(value: string) {
            stringSetter(this, { key, value, initialKey })
        }
    })
}

function stringSetter(context: any, options: StringAttribute): void {
    const { initialKey, key, value } = options

    if (context[initialKey] === undefined) {
        context[initialKey] = {
            initialised: false,
            initialValue: context.getAttribute(key)
        }
    }

    const { initialised, initialValue } = context[initialKey]

    if (!initialised && initialValue) {
        context.setAttribute(key, initialValue)
        context[initialKey].initialised = true
    } else {
        context.setAttribute(key, value)
    }
}

function numberSetter(context: any, options: NumberAttribute): void {
    const { initialKey, key, value } = options

    if (context[initialKey] === undefined) {
        context[initialKey] = {
            initialised: false,
            initialValue: parseInt(context.getAttribute(key), 10)
        }
    }

    const { initialised, initialValue } = context[initialKey]

    if (!initialised && initialValue) {
        context.setAttribute(key, initialValue)
        context[initialKey].initialised = true
    } else {
        context.setAttribute(key, value)
    }
}

function setNumberAttribute(target: any, key: string) {
    const initialKey = getInitalAttributeKey(target)
    Object.defineProperty(target, key, {
        enumerable: true,
        get() {
            return parseInt(this.getAttribute(key), 10)
        },
        set(value: number) {
            numberSetter(this, { key, value, initialKey })
        }
    })
}

function booleanSetter(context: any, options: BooleanAttribute): void {
    const { initialKey, key, value } = options

    if (context[initialKey] === undefined) {
        context[initialKey] = {
            initialised: false,
            initialValue: context.hasAttribute(key)
        }
    }

    const { initialised, initialValue } = context[initialKey]

    if (!initialised && initialValue) {
        context.setAttribute(key, initialValue)
        context[initialKey].initialised = true
    } else {
        context.setAttribute(key, value)
    }
}

function setBooleanAttribute(target: any, key: string) {
    const initialKey = getInitalAttributeKey(target)
    Object.defineProperty(target, key, {
        enumerable: true,
        get() {
            return this.hasAttribute(key)
        },
        set(value: boolean) {
            booleanSetter(this, { key, value, initialKey })
        }
    })
}

export function Attribute(type: AttributeType = '') {
    return (target: any, key: string) => {
        const value = target[key]
        if (target.hasOwnProperty(key)) {
            delete target[key]
        }

        switch (type) {
            case 'boolean':
                setBooleanAttribute(target, key)
            case 'number':
                setNumberAttribute(target, key)
            default:
                setStringAttribute(target, key)
        }

        if (value !== undefined) {
            target[key] = value
        }
    }
}
