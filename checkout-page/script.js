let elementList = document.querySelectorAll('input-wc')
console.log(elementList)
elementList.forEach(element => { if (!element.getAttribute('fullwidth')) element.setAttribute('fullwidth', true) })

function incrementor(event) {
    console.log(event);
    let [inputElementId, action] = ["for", "action"].map(attr => event.target.getAttribute(attr))

    if (inputElementId == null && action == null) {
        [inputElementId, action] = ["for", "action"].map(attr => event.target.parentNode.getAttribute(attr))
    }

    let inputElement = document.getElementById(inputElementId)

    console.log(inputElement);

    if (action == 'add') {
        inputElement.value = +inputElement.value + 1
    } else if (action == 'remove') inputElement.value = inputElement.value - 1
}