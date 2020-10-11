const CHECKBOX_TEMPLATE = `
    <input id="input" type="checkbox" class="input-box" />
    <label for="input"></label>
`

class CheckBox extends HTMLElement {
    constructor() {
        super();
        this.isChecked = false;

        const content = document.createElement('div');
        content.classList.add('check-input-container');
        content.innerHTML = CHECKBOX_TEMPLATE;

        this.shadow = this.attachShadow({ mode: 'closed' });
        this.shadow.append(...[createStyleLink('check-input'), content]);
    }

    connectedCallback() {
        // let data = extractAttributes(this);
        // console.log(data);
        let labelElement = this.shadow.querySelector('label');
        labelElement.innerHTML = this.dataset.label;

        let inputElement = this.shadow.querySelector('#input');
        inputElement.onchange = (event) => {
            this.isChecked = event.target.checked
        }
        inputElement.checked = this.isChecked;
    }

    set valueChanged(listener) {
        // console.log(this.dataset.label);
        this.shadow.querySelector('#input').onchange = (event) => {
            let value = event.target.checked
            this.setAttribute('checked', value);
            if (value == false) this.removeAttribute('checked');
            listener.call(this, event, value, this.dataset.label)
        };
    }

    get checked() {
        return this.shadow.querySelector('#input').checked;
    }

    set checked(value) {
        if (![true, false].includes(value)) {
            throw new Error("TypeError: Expected Boolean")
        }
        this.shadow.querySelector('#input').checked = value;

    }
}

window.customElements.define('check-box', CheckBox);
