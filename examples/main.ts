import { define, CustomElement, Attribute } from '../src/main'

window.addEventListener('DOMContentLoaded', () => {
    define(MyCounter, MyClock, MyHexClock)
})

class MyCounter extends CustomElement(HTMLElement) {
    static selector = 'my-counter'
    static observedAttributes = ['count']

    template = `<p>The current count is: <span id="count"></span></p>`

    @Attribute('number')
    count: number = 0

    @Attribute('boolean')
    backwards: boolean = false

    interval!: number

    $count!: HTMLElement

    connected() {
        this.$count = this.querySelector('#count') as HTMLElement

        this.updateCount()
        this.interval = setInterval(this.updateCount, 1000)
    }

    protected updateCount = () => {
        if(this.backwards) {
            this.count = this.count - 1
        } else {
            this.count = this.count + 1
        }
        this.$count.innerHTML = this.count.toString()
    }
}

class MyClock extends CustomElement(HTMLElement) {
    static selector = 'my-clock'
    static observedAttributes = ['time']

    template = `<h2 id="time"></h2>`
    $time!: HTMLElement

    connected() {
        this.$time = this.querySelector('#time') as HTMLElement

        this.updateTime()
        setInterval(this.updateTime, 1000)
    }

    updateTime = () => {
        this.$time.innerHTML = this.getTimeString()
    }

    getTimeString() {
        const { h, m, s } = this.getTime()
        return h.substr(-2) + ':' + m.substr(-2) + ':' + s.substr(-2)
    }

    getTime() {
        const h = '0' + new Date().getHours()
        const m = '0' + new Date().getMinutes()
        const s = '0' + new Date().getSeconds()
        return { h, m, s }
    }
}

class MyHexClock extends MyClock {
    static selector = 'my-hex-clock'

    connected() {
        super.connected()

        this.updateHex()
        this.$time.style.color = 'white'

        setInterval(this.updateHex, 1000)
    }

    updateHex = () => {
        this.$time.style.background = this.getHexString()
    }

    getHexString() {
        const { h, m, s } = this.getTime()
        return '#' + h.substr(-2) + '' + m.substr(-2) + '' + s.substr(-2)
    }
}
