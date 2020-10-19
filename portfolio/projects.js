
// function loadProjects() {
//     firebase.firestore().collection('projects').get().then(snapshot => {
//         let projects = snapshot.docs.map(doc => doc.data()).map(project => ({
//             projectPreview: 'https://via.placeholder.com/300x250?text=Hi',
//             ...project
//         }));
//         console.log(projects);
//         addProjectCards(projects);
//     })
// }

document.body.onload = () => {
    loadProjects()
}