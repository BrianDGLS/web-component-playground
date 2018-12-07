type AttrType = 'string' | 'number' | 'boolean' | ''
type StringAttr = { key: string; value: string; initialKey: string }
type NumberAttr = { key: string; value: number; initialKey: string }
type BooleanAttr = { key: string; value: boolean; initialKey: string }

function getInitialKeyName(): string {
    const num = Math.random().toString(36)
    return '_' + num.substr(2, 9)
}

function getInitialKeyDescriptor(): any {
    return { writable: true, value: undefined }
}

function getInitalAttrKey(target: any) {
    const initialKey = getInitialKeyName()
    const initialKeyValidator = getInitialKeyDescriptor()
    Object.defineProperty(target, initialKey, initialKeyValidator)
    return initialKey
}

function setStringAttr(target: any, key: string) {
    const initialKey = getInitalAttrKey(target)

    Object.defineProperty(target, key, {
        enumerable: true,
        get() {
            return this.getAttribute(key)
        },
        set(value: string) {
            stringSetter(this, { key, value, initialKey })
        },
    })
}

function stringSetter(context: any, options: StringAttr): void {
    const { initialKey, key, value } = options

    if (context[initialKey] === undefined) {
        context[initialKey] = {
            initialised: false,
            initialValue: context.getAttribute(key),
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

function numberSetter(context: any, options: NumberAttr): void {
    const { initialKey, key, value } = options

    if (context[initialKey] === undefined) {
        context[initialKey] = {
            initialised: false,
            initialValue: parseInt(context.getAttribute(key), 10),
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

function setNumberAttr(target: any, key: string) {
    const initialKey = getInitalAttrKey(target)
    Object.defineProperty(target, key, {
        enumerable: true,
        get() {
            return parseInt(this.getAttribute(key), 10)
        },
        set(value: number) {
            numberSetter(this, { key, value, initialKey })
        },
    })
}

function booleanSetter(context: any, options: BooleanAttr): void {
    const { initialKey, key, value } = options

    if (context[initialKey] === undefined) {
        context[initialKey] = {
            initialised: false,
            initialValue: context.hasAttribute(key),
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

function setBooleanAttr(target: any, key: string) {
    const initialKey = getInitalAttrKey(target)
    Object.defineProperty(target, key, {
        enumerable: true,
        get() {
            return this.hasAttribute(key)
        },
        set(value: boolean) {
            booleanSetter(this, { key, value, initialKey })
        },
    })
}

export function Attr(type: AttrType = '') {
    return (target: any, key: string) => {
        const value = target[key]
        if (target.hasOwnProperty(key)) {
            delete target[key]
        }

        switch (type) {
            case 'boolean':
                setBooleanAttr(target, key)
            case 'number':
                setNumberAttr(target, key)
            default:
                setStringAttr(target, key)
        }

        if (value !== undefined) {
            target[key] = value
        }
    }
}
