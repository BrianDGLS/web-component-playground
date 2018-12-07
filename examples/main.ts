import { Component, Attr } from '../src/main'

class MyCounterComponent extends Component(HTMLElement) {
    static selector = 'my-counter'
    static observedAttributes = ['count']

    template = `<p>The current count is: <span id="count"></span></p>`

    @Attr()
    count: string = '0'

    interval!: number

    $count!: HTMLElement

    connected() {
        this.$count = this.querySelector('#count') as HTMLElement

        this.updateCount()
        this.interval = setInterval(this.updateCount, 1000)
    }

    protected updateCount = () => {
        const newCount = parseInt(this.count, 10) + 1
        this.count = newCount.toString()
        this.$count.innerHTML = this.count
    }
}

window.customElements.define(MyCounterComponent.selector, MyCounterComponent)
