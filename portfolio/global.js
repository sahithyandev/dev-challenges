const $ = str => document.querySelector(str);
const FIREBASE_CONFIG = {
    apiKey: "AIzaSyDX1YYp74LFJkhxG1R6k-eczwXqPKKIStE",
    authDomain: "portfolio-3a584.firebaseapp.com",
    databaseURL: "https://portfolio-3a584.firebaseio.com",
    projectId: "portfolio-3a584",
    storageBucket: "portfolio-3a584.appspot.com",
    messagingSenderId: "864812273048",
    appId: "1:864812273048:web:3f63e2162c4c623efeefed"
};
// Initialize Firebase
firebase.initializeApp(FIREBASE_CONFIG);

// Builds a project card
function buildProjectCard(project) {
    const TEMPLATE = `
        <img
            src="%projectPreview%"
            class="project-card__preview"
        />
        <div id="tags-container">
        </div>
        <h2 class="project-card__project-title">%projectTitle%</h2>
        <p class="project-card__project-description">
            %projectDescription%
        </p>
        <div class="project-card__buttons-container">
            <a target="_blank" href="%demoURL%">
                <button class="btn--primary">Demo</button></a
            ><a target="_blank" href="%codeURL%">
                <button class="btn--secondary">Code</button>
            </a>
        </div>
    `

    let card = document.createElement('div');
    card.classList.add('project-card');

    card.innerHTML = Object.entries(project).reduce((previous, current) => {
        return previous.replace(`%${current[0]}%`, current[1]);
    }, TEMPLATE);

    let tagsContainer = Array.from(card.children).find(element => element.id == 'tags-container');
    let tags = project.tags.map(tag => {
        let tagElement = document.createElement('span');
        tagElement.classList.add('tag');
        tagElement.innerHTML = tag;

        return tagElement;
    })
    tagsContainer.append(...tags);
    return card;
}

// Add project cards to the ui
function addProjectCards(projectArray) {
    let container = $('#projects-container');
    let projectCards = projectArray.map(buildProjectCard);

    container.append(...projectCards);
}

// Loads data of projects from firebase
function loadProjects(projectCount) {
    let projectsReference = firebase.firestore().collection("projects");
    if (projectCount) {
        projectsReference = projectsReference.limit(projectCount);
    }

    projectsReference.get().then(snapshot => {
        let projects = snapshot.docs.map(doc => doc.data()).map(project => ({
            projectPreview: 'https://via.placeholder.com/300x250?text=Hi',
            ...project
        }));
        console.log(projects);
        addProjectCards(projects);
    })
}