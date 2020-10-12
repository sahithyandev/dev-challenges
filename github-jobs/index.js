let container = document.getElementById('results-container');
let LOCATION_SEARCH_BAR_INPUT;

document.body.onload = () => {
    loadData();
    updateIconInputs();

    $('#search-button').addEventListener('click', beforeLoadingData);

    $('#full-time-toggle').valueChanged = (event) => {
        beforeLoadingData();
    };

    Array.from($('#location-results').children).forEach(child => {
        child.valueChanged = locationToggled
    })
    LOCATION_SEARCH_BAR_INPUT = document.getElementById("location-search-bar-input");

    LOCATION_SEARCH_BAR_INPUT.addEventListener('input', (event) => {
        Array.from(document.querySelectorAll('#location-results check-box[checked]')).forEach(el => { el.checked = false; });
    })
}
document.onkeydown = (event) => {
    if (event.keyCode == 13) beforeLoadingData();
}

function updateIconInputs() {
    let iconInputs = document.querySelectorAll('.icon-input');
    iconInputs.forEach(input => {
        let position = window.getComputedStyle(input).position;
        if (position == 'static') {
            input.style.position = 'relative';
        }
    })
}

// call this function when a location-filter is toggled
function locationToggled(event, newValue, label) {
    let otherLocations = Array.from(document.getElementById('location-results').querySelectorAll(`check-box:not([data-label='${label}'])`))
    otherLocations.forEach(location => { location.checked = false });
    LOCATION_SEARCH_BAR_INPUT.value = ''

    beforeLoadingData();

}

// use this function to update the jobCardsa after first time
function beforeLoadingData() {
    container.innerHTML = '';
    loadData();
}

function getLocation() {
    let locationSelected = document.querySelector('#location-results check-box[checked]')
    if (locationSelected) return locationSelected.dataset.label;
    if (LOCATION_SEARCH_BAR_INPUT) return LOCATION_SEARCH_BAR_INPUT.value;
    return '';

}

function loadData() {
    let params = {
        description: $('#search-bar').value,
        full_time: $('#full-time-toggle').checked,
        location: getLocation()
    }
    // TK
    let queriedParams = Object.entries(params).filter(v => v[1] != false).map(v => {
        let rS = `${v[0]}=${v[1]}`
        return rS;
    }).join('&');

    let fetchURL = `https://jobs.github.com/positions.json?${queriedParams}`

    fetch(API_MIDDLEWARE + fetchURL).then(res => res.json()).then(data => {
        addJobCards(data);
    }).catch(err => {
        console.warn(err);
    })
}

function addJobCards(jobArray) {
    let jobCards = [];
    for (let job of jobArray) {
        let el = document.createElement('job-card');
        el.setAttribute('job-id', job.id);
        el.setAttribute('company-logo', job["company_logo"])
        el.setAttribute('company-name', job.company)
        el.setAttribute('job-position', job.title)
        el.setAttribute('job-type', job.type)
        el.setAttribute('company-location', job.location)
        el.setAttribute('job-posted-on', job.created_at)
        jobCards.push(el);
    }

    container.append(...jobCards);
}