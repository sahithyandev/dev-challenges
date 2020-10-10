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
        let data = extractAttributes(this);
        let labelElement = this.shadow.querySelector('label');
        labelElement.innerHTML = data.label;

        let inputElement = this.shadow.querySelector('#input');
        inputElement.onchange = (event) => {
            this.isChecked = event.target.checked
        }
        inputElement.checked = this.isChecked;
        console.log('wooo');
    }
}

window.customElements.define('check-box', CheckBox);
