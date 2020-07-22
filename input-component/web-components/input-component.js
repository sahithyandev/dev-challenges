const capitalize = str => str[0].toUpperCase() + str.slice(1)
const dashedToCamelCased = (dashed = '') => dashed.split('-').reduce((prev, current) => prev + capitalize(current));

const attributesToObject = attributes => {
  let obj = {};
  for (let attribute of attributes) {
    obj[dashedToCamelCased(attribute.name)] = attribute.value
  }
  console.log(obj)
  return obj;
}


class Input extends HTMLElement {
    connectedCallback() {
      let shadowRoot = this.attachShadow({ mode: 'closed' });
      let attributes = attributesToObject(this.attributes);
      shadowRoot.innerHTML = `
      <style>
        @import "./web-components/input-component.css";
      </style>
      <div id="input-element">
        <label class="label">${attributes.label || 'Label'}</label>
        <input type="text" class="input" placeholder="Placeholder" />
        <span class="helper-text">${attributes.helperText || ''}</span>
      </div>`;
      
      console.log(shadowRoot);
    }
  }
      
  customElements.define('input-wc', Input);