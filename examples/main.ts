import { html } from 'lit-html';
import { define, CustomElement, Attribute } from '../src/public-api';

window.addEventListener('DOMContentLoaded', function() {
  define(MyCounter, MyClock, MyHexClock, MyAlertButton);
});

class MyAlertButton extends CustomElement(HTMLElement) {
  static selector = 'my-alert-button';
  get template() {
    return html`<button @click=${this.alert}>click me</button>`
  }
  alert() {
    alert('The click event is bound in the template')
  }
}

class MyCounter extends CustomElement(HTMLElement) {
  static selector = 'my-counter';
  static observedAttributes = ['count'];

  get template() {
    return html`
      <p>The current count is: <span>${this.count}</span></p>
    `;
  }

  @Attribute('number')
  count: number = 0;

  @Attribute('boolean')
  backwards: boolean = false;

  connected() {
    setInterval(this.updateCount, 1000);
  }

  protected updateCount = () => {
    if (this.backwards) {
      this.count = this.count - 1;
    } else {
      this.count = this.count + 1;
    }
  };
}

class MyClock extends CustomElement(HTMLElement) {
  static selector = 'my-clock';
  static observedAttributes = ['timestring'];

  @Attribute()
  timestring: string = this.getTimeString();

  get template() {
    return html`
      <h2>${this.timestring}</h2>
    `;
  }

  connected() {
    setInterval(() => {
      this.timestring = this.getTimeString();
    }, 1000);
  }

  getTimeString() {
    const { h, m, s } = this.getTime();
    return h.substr(-2) + ':' + m.substr(-2) + ':' + s.substr(-2);
  }

  getTime() {
    const h = '0' + new Date().getHours();
    const m = '0' + new Date().getMinutes();
    const s = '0' + new Date().getSeconds();
    return { h, m, s };
  }
}

class MyHexClock extends MyClock {
  static selector = 'my-hex-clock';
  static observedAttributes = ['hexstring'];

  @Attribute()
  hexstring: string = this.getHexString();

  get template() {
    return html`
      <style>
        my-hex-clock h2 {
          color: white;
        }
      </style>
      <h2 style="background: ${this.hexstring}">
        ${this.hexstring}
      </h2>
    `;
  }

  connected() {
    setInterval(() => {
      this.hexstring = this.getHexString();
    }, 1000);
  }

  getHexString() {
    const { h, m, s } = this.getTime();
    return '#' + h.substr(-2) + '' + m.substr(-2) + '' + s.substr(-2);
  }
}
