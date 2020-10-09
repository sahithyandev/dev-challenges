// @ts-nocheck

const capitalize = (str = '') => str[0].toUpperCase() + str.slice(1)
const dashedToCamelCased = (dashed = '') => dashed.split('-').reduce((prev, current) => prev + current);

const attributesToObject = attributes => {
  let obj = {};
  for (let attribute of attributes) {
    obj[dashedToCamelCased(attribute.name)] = attribute.value
  }
  return obj;
}
const useIcon = (icon = '', startOrEnd = '') => icon ? `<span class="material-icons input-icon" id="${startOrEnd}">${icon}</span>` : undefined;

class Input extends HTMLElement {
    connectedCallback() {
      let shadowRoot = this.attachShadow({ mode: 'open' });
      let attributes = attributesToObject(this.attributes);
      // console.log(attributes);
      let isDisabled = ['', 'true'].includes(attributes.disabled);
      let isFullWidth = ['', 'true'].includes(attributes.fullWidth || attributes.fullwidth);
      let isMultiline = ['', 'true'].includes(attributes.multiline);
      // console.log({isDisabled, isFullWidth, isMultiline});
      
      let inputField = isMultiline ? 'textarea' : 'input';
      let rowCount = isMultiline ? attributes.row : '';
      let icon = useIcon(attributes.starticon || attributes.endicon, attributes.starticon ? 'start-icon' : attributes.endicon ? 'end-icon': '');
      shadowRoot.innerHTML = `
      <style>
        @import "./web-components/input-component.css";
      </style>
      <div id="input-element" ${(isDisabled && 'disabled') || ''} class="${isFullWidth && 'full-width'}" >
        <label class="label">${attributes.label || 'Label'}</label>
        <div>
          ${icon ? icon : ''}
          <${inputField} type="${attributes.type || "text"}" class="input ${isFullWidth && 'full-width'}" placeholder="${attributes.placeholder || "Placeholder"}" ${(isDisabled && 'disabled') || ''} value="${attributes.value || ''}" ${rowCount ? `rows="${rowCount}"`: ''} required>${inputField == 'textarea' ? (attributes.value || '') : ''}</${inputField}>
        </div>
      </div>`;
      const rm = `<span class="helper-text">${attributes.helperText || ''}</span>`;
    }
  }
      
  customElements.define('input-wc', Input);