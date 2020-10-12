document.body.onload = () => {
    let url = new URL(document.location);
    let params = url.searchParams;
    loadData(params.get('jobId'))
}

function loadData(jobId) {
    let fetchURL = `https://jobs.github.com/positions/${jobId}.json`;

    fetch(API_MIDDLEWARE + fetchURL).then(res => res.json()).then(data => {
        updateUI(data);
    })
}

function updateUI(jobData) {
    $('.how-to-apply').innerHTML = jobData["how_to_apply"];
    $('#job-position').innerHTML = jobData["title"];
    $('.job-posted-before').innerHTML = moment(jobData["created_at"]).fromNow();
    if (jobData["type"] != "Full Time") {
        $('.job-type').classList.add('hidden');
    }
    $('.company-logo').src = jobData["company_logo"]
    $('.company-name').innerHTML = jobData["company"]
    $('.company-location').innerHTML = jobData["location"]
    $('.description').innerHTML = jobData["description"]

    $('#main-data').classList.remove('hidden');
}