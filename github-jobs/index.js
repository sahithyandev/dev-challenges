document.body.onload = () => {
    loadData();
    updateIconInputs();
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

function loadData() {
    let fetchURL = "https://jobs.github.com/positions.json"

    fetch(API_MIDDLEWARE + fetchURL).then(res => {
        console.log(res);
        return res.json()
    }).then(data => {
        console.log(data);
        addJobCards(data.slice(0, 5));
    })
}

function addJobCards(jobArray) {
    console.log(jobArray)
    let container = document.getElementById('results-container');

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