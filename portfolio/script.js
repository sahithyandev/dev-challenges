// const $ = str => document.querySelector(str);
// const PROJECTS = [
//     {
//         projectPreview: "https://via.placeholder.com/300x250?text=Hi",
//         projectTitle: "Recipe Page",
//         projectDescription: "In this project, I work with HTML and SCSS to create a responsive page. The design is from devchallenge.io.",
//         demoURL: "https://dev-challenges.vercel.app/recipe-page",
//         codeURL: "https://github.com/sahithyandev/dev-challenges/tree/master/recipe-page",
//         tags: ["HTML", "CSS", "Responsive"]
//     },
//     {
//         projectPreview: "https://via.placeholder.com/300x250?text=Hi",
//         projectTitle: "Recipe Page",
//         projectDescription: "In this project, I work with HTML and SCSS to create a responsive page. The design is from devchallenge.io.",
//         demoURL: "https://dev-challenges.vercel.app/recipe-page",
//         codeURL: "https://github.com/sahithyandev/dev-challenges/tree/master/recipe-page",
//         tags: ["HTML", "CSS", "Responsive"]
//     }
// ]

// function buildProjectCard(project) {
//     const TEMPLATE = `
//         <img
//             src="%projectPreview%"
//             class="project-card__preview"
//         />
//         <div id="tags-container">
//         </div>
//         <h2 class="project-card__project-title">Recipe Blog</h2>
//         <p class="project-card__project-description">
//             %projectDescription%
//         </p>
//         <div class="project-card__buttons-container">
//             <a href="%demoURL%">
//                 <button class="btn--primary">Demo</button></a
//             ><a href="%codeURL%">
//                 <button class="btn--secondary">Code</button>
//             </a>
//         </div>
//     `

//     let card = document.createElement('div');
//     card.classList.add('project-card');

//     card.innerHTML = Object.entries(project).reduce((previous, current) => {
//         return previous.replace(`%${current[0]}%`, current[1]);
//     }, TEMPLATE);

//     let tagsContainer = Array.from(card.children).find(element => element.id == 'tags-container');
//     let tags = project.tags.map(tag => {
//         let tagElement = document.createElement('span');
//         tagElement.classList.add('tag');
//         tagElement.innerHTML = tag;

//         return tagElement;
//     })
//     tagsContainer.append(...tags);
//     console.log(tagsContainer);
//     return card;
// }

// function addProjectCards(projectArray) {
//     let container = $('#projects-container');
//     let projectCards = projectArray.map(buildProjectCard);

//     container.append(...projectCards);
// }

document.body.onload = () => {
    loadProjects(3);
    // addProjectCards(PROJECTS);
}