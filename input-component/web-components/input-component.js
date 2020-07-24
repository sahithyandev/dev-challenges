// @ts-nocheck

const capitalize = (str = '') => str[0].toUpperCase() + str.slice(1)
const dashedToCamelCased = (dashed = '') => dashed.split('-').reduce((prev, current) => prev + capitalize(current));

const attributesToObject = attributes => {
  let obj = {};
  for (let attribute of attributes) {
    obj[dashedToCamelCased(attribute.name)] = attribute.value
  }
  console.log(obj)
  return obj;
}
const useIcon = (icon = '', startOrEnd = '') => icon ? `<span class="material-icons input-icon" id="${startOrEnd}">${icon}</span>` : undefined;

class Input extends HTMLElement {
    connectedCallback() {
      let shadowRoot = this.attachShadow({ mode: 'closed' });
      let attributes = attributesToObject(this.attributes);
      let isDisabled = ['', 'true'].includes(attributes.disabled);
      let isFullWidth = ['', 'true'].includes(attributes.fullWidth);
      let isMultiline = ['', 'true'].includes(attributes.multiline);
      
      let inputField = isMultiline ? 'textarea' : 'input';
      let rowCount = isMultiline ? attributes.row : '';
      let icon = useIcon(attributes.startIcon || attributes.endIcon, attributes.startIcon ? 'start-icon' : attributes.endIcon ? 'end-icon': '');
      shadowRoot.innerHTML = `
      <style>
        @import "./web-components/input-component.css";
      </style>
      <div id="input-element" ${(isDisabled && 'disabled') || ''} class="${isFullWidth && 'full-width'}" >
        <label class="label">${attributes.label || 'Label'}</label>
        ${icon ? icon : ''}
        <${inputField} type="text" class="input ${isFullWidth && 'full-width'}" placeholder="Placeholder" ${(isDisabled && 'disabled') || ''} value="${attributes.value || ''}" ${rowCount ? `rows="${rowCount}"`: ''} >${inputField == 'textarea' ? (attributes.value || '') : ''}</${inputField}>
        <span class="helper-text">${attributes.helperText || ''}</span>
      </div>`;
    }
  }
      
  customElements.define('input-wc', Input);