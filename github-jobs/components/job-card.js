const JOB_CARD_TEMPLATE =
    `
        <img src="" alt="company-logo" class="company-logo" />
        <div class="company-name"></div>
        <div class="job-position"></div>
        <div class="job-type"></div>
        <div class="other-info">
            <div class="company-location"></div>
            <div class="job-posted-before"></div>
        </div>
`

class JobCard extends HTMLElement {
    constructor() {
        super();

        const content = document.createElement('div');
        content.classList.add('job-card');
        content.innerHTML = JOB_CARD_TEMPLATE;

        const a = document.createElement('a');
        a.appendChild(content);

        this.shadow = this.attachShadow({ mode: 'open' });
        // createStyleLink('job-card')
        this.shadow.append(...[createStyleLink('job-card'), a]);
    }

    connectedCallback() {
        let jobData = extractAttributes(this);
        this.updateJobData(jobData);
    }

    updateJobData(jobData) {
        let postedOn = new Date(jobData["job-posted-on"]);
        this.shadow.querySelector('a').href = `./details/index.html?jobId=${jobData['job-id']}`
        this.shadow.querySelector('.company-logo').src = jobData['company-logo'];
        this.shadow.querySelector('.company-name').innerHTML = jobData['company-name'];
        this.shadow.querySelector('.job-position').innerHTML = jobData['job-position'];
        this.shadow.querySelector('.job-type').innerHTML = jobData['job-type'];
        this.shadow.querySelector('.company-location').innerHTML = jobData['company-location'];
        this.shadow.querySelector('.job-posted-before').innerHTML = moment(postedOn).fromNow();

    }

}

window.customElements.define('job-card', JobCard);