// for testing
let jobData = {
    "id": "0b6ee79d-a3e5-472d-a33e-ed587f1fe44f",
    "type": "Full Time",
    "url": "https://jobs.github.com/positions/0b6ee79d-a3e5-472d-a33e-ed587f1fe44f",
    "created_at": "Fri Oct 09 14:49:20 UTC 2020",
    "company": "Eastern Illinois University",
    "company_url": "https://www.eiu.edu/marcom/open.php",
    "location": "Charleston, IL",
    "title": "Web Developer",
    "description": "<p>Want to work on a great team, have a variety of work, and provide service to wonderful people? Do all of that while working on a college campus with amazing benefits! EIU Marketing &amp; Communications is searching for a web developer to join our team and help us continue to provide top-notch solutions to faculty, staff, and students at Eastern Illinois University. We do great work and we want to be a part of it!</p>\n<p>Our Ideal Candidate</p>\n<p>Is self-driven, but enjoys collaborating and working together. Is comfortable building solutions from the ground-up as well as occasionally working on existing systems. Knows the foundation of a wonderful web application is great code which is maintainable, secure, clean, and well-designed. Is user-focused, ensuring that they build a great experience for an audience they take the time to understand.</p>\n<p>Responsibilities</p>\n<p>Write clean, fast PHP7 code\nCode-up html pages from Photoshop designs\nMeet with clients and develop solutions that can meet their needs\nTroubleshoot, test, and maintain a variety of systems that connect with all aspects of campus\nConnect with third-party APIs and other campus systems (Banner, Oracle, Mailgun, Twilio, etc.)\nSkills</p>\n<p>Knowledge of PHP, MySQL, HTML, CSS, Javascript\nFront-end development experience\nWorking with APIs\nLaravel knowledge is preferred, but not needed\nRequirements</p>\n<p>Must be or become an Illinois resident within 6 months of taking the position. Two years of work experience in an IT-related profession or college coursework in Information Technology (IT), IT Management, or a closely-related discipline. 60 semester hours or Associate’s Degree equals one year; 90-120 semester hours or Bachelor’s Degree equals two years.</p>\n<p>Additional requirements include two years’ experience developing dynamic sites with PHP, ASP, PERL, Ruby, or Python; two years’ experience writing html/css; and two years’ experience working with database systems (mysql or oracle or MS SQL server) in relation to web development. Candidates who qualify for an on-campus interview will be asked to provide an online portfolio.</p>\n<p>The Civil Service Examination for this classification is a credentials assessment.  No participation other than submission of applicant materials is required from qualified applicants.  Upon successful selection of a candidate, all scores will be voided from this IT Technical Associate – Web Developer for Marketing &amp; Communications register.</p>\n<p>To apply, please submit application, resume, transcripts, and the names and contact information for three (3) business references <a href=\"https://www.eiu.edu/~humanres/application/\">https://www.eiu.edu/~humanres/application/</a>.   Deadline for application is October 15, 2020.</p>\n<p>About the EIU Web Team</p>\n<p>The EIU Web Team is part of EIU Marketing &amp; Communications, which serves all areas on campus developing marketing materials, websites, web applications, social media, videos, and advertising to help market Eastern Illinois University. We value our people and provide a good work/life balance.</p>\n",
    "how_to_apply": "<p><a href=\"https://www.eiu.edu/marcom/open.php\">https://www.eiu.edu/marcom/open.php</a></p>\n",
    "company_logo": "https://jobs.github.com/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBcmVMIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--2c9ed603957ccec636b24a8daaf6f07ad1424af8/EIU%20Square%202%20Color.png"
}

document.body.onload = () => {
    let url = new URL(document.location);
    let params = url.searchParams;
    // for testing
    // updateUI(jobData);
    loadData(params.get('jobId'))
}

function loadData(jobId) {
    let fetchURL = `https://jobs.github.com/positions/${jobId}.json`;

    fetch(API_MIDDLEWARE + fetchURL).then(res => res.json()).then(data => {
        console.log(data);
        updateUI(data);
    })
}

function updateUI(jobData) {
    $('.how-to-apply').innerHTML = jobData["how_to_apply"];
    $('#job-position').innerHTML = jobData["title"];
    $('.job-posted-before').innerHTML = moment(jobData["created_at"]).fromNow();
    // TK
    console.log(Object.keys(jobData));
    if (jobData["type"] != "Full Time") {
        $('.job-type').classList.add('hidden');
    }
    $('.company-logo').src = jobData["company_logo"]
    $('.company-name').innerHTML = jobData["company"]
    $('.company-location').innerHTML = jobData["location"]
    $('.description').innerHTML = jobData["description"]

    $('#main-data').classList.remove('hidden');
}