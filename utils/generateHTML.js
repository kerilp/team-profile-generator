const fs = require('fs');

const outputHTML = (html) => {
    fs.writeFile('team.html', html, (err) => {
        if (err) return console.log(err);
        console.log('Success! Created Team Profile HTML');
    });
};

const renderHTMLTemplate = (...content) => {
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css">
        <title>Team Profiles</title>
    </head>
    <body>
        <main class="container">
            <header class="jumbotron">
                <h1>My Team</h1>
            </header>
            <div class="row">
                ${content.join('\n')}
            </div>
        </main>
    </body>
    </html>
    `;
}

const renderInfo = (data) => {
    switch (data.getRole()) {
        case 'Manager':
            return `Office Number: ${data.office}`;
        case 'Engineer':
            return `GitHub: <a href="https://github.com/${data.github}">${data.github}</a>`;
        case 'Intern':
            return `School: ${data.school}`;
        default:
            return '';
    }
}

const renderCard = (data) => {
    return `<div class="col-12 col-md-4 mb-3">
        <div class="card">
            <h5 class="card-header text-white bg-info">${data.getRole()}</h5>
            <div class="card-body">
                <h5 class="card-title">${data.name}</h5>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">ID: ${data.id}</li>
                    <li class="list-group-item">Email: <a href="mailto:${data.email}">${data.email}</a></li>
                    <li class="list-group-item">${renderInfo(data)}</li>
                </ul>
            </div>
        </div>
    </div>
    `;
}

module.exports = { outputHTML, renderHTMLTemplate, renderInfo, renderCard };