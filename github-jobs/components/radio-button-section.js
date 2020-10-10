// TK
const RADIO_BUTTON_SECTION_TEMPLATE =
    `
<div>
</div>
`
window.customElements.define('radio-button-section', class extends HTMLElement {
    constructor() {
        super();

        const content = document.createElement('div');
        content.innerHTML = RADIO_BUTTON_SECTION_TEMPLATE;

        this.shadow = this.attachShadow({ mode: 'closed' });
        this.shadow.append(...[createStyleLink('radio-button-section')])
    }
})