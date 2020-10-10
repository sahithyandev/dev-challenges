let container = document.getElementById('results-container');
document.body.onload = () => {
    loadData();
    updateIconInputs();

    $('#search-button').addEventListener('click', searchButtonPressed);

    $('#full-time-toggle').valueChanged = (event) => {
        console.log(event.target.checked);
        beforeLoadingData();
    };
}

function searchButtonPressed() {
    beforeLoadingData();
}

function updateIconInputs() {
    let iconInputs = document.querySelectorAll('.icon-input');
    iconInputs.forEach(input => {
        let position = window.getComputedStyle(input).position;
        if (position == 'static') {
            input.style.position = 'relative';
        }
        // console.log(input.style.position);
        // input.style.position
        // if (!input.style.position) input.style.position = 'relative';
    })
}

// use this function to update the jobCardsa after first time
function beforeLoadingData() {
    container.innerHTML = '';
    loadData();
}

function loadData() {
    let params = {
        description: $('#search-bar').value,
        full_time: $('#full-time-toggle').checked
    }
    // TK
    let queriedParams = Object.entries(params).filter(v => v[1] != false).map(v => {
        let rS = `${v[0]}=${v[1]}`
        return rS;
    }).join('&');
    console.log(queriedParams);

    let fetchURL = `https://jobs.github.com/positions.json?${queriedParams}`

    fetch(API_MIDDLEWARE + fetchURL).then(res => {
        // console.log(res);
        return res.json()
    }).then(data => {
        // console.log(data);

        addJobCards(data); //.slice(0, 15));
        // console.log(container);
    })
}

function addJobCards(jobArray) {
    console.log(jobArray)

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