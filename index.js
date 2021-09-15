const inquirer = require('inquirer');
const gen = require('./utils/generateHTML');
const Employee = require('./lib/Employee');
const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
let members = [];

const addManager = [
    {
        name: 'name',
        type: 'input',
        message: 'Enter the manager\'s name: ',
        validate: (input) => !!input,
    },
    {
        name: 'id',
        type: 'input',
        message: 'Enter the manager\'s employee ID: ',
        validate: (input) => !!input,
    },
    {
        name: 'email',
        type: 'input',
        message: 'Enter the manager\'s email address: ',
        validate: (input) => !!input,
    },
    {
        name: 'office',
        type: 'input',
        message: 'Enter the manager\'s office number: ',
        validate: (input) => !!input,
    }
];

const addEngineer = [
    {
        name: 'name',
        type: 'input',
        message: 'Enter the engineer\'s name: ',
        validate: (input) => !!input,
    },
    {
        name: 'id',
        type: 'input',
        message: 'Enter the engineer\'s employee ID: ',
        validate: (input) => !!input,
    },
    {
        name: 'email',
        type: 'input',
        message: 'Enter the engineer\'s email address: ',
        validate: (input) => !!input,
    },
    {
        name: 'github',
        type: 'input',
        message: 'Enter the engineer\'s GitHub username: ',
        validate: (input) => !!input,
    }
];

const addIntern = [
    {
        name: 'name',
        type: 'input',
        message: 'Enter the intern\'s name: ',
        validate: (input) => !!input,
    },
    {
        name: 'id',
        type: 'input',
        message: 'Enter the intern\'s employee ID: ',
        validate: (input) => !!input,
    },
    {
        name: 'email',
        type: 'input',
        message: 'Enter the intern\'s email address: ',
        validate: (input) => !!input,
    },
    {
        name: 'school',
        type: 'input',
        message: 'Enter the intern\'s school name: ',
        validate: (input) => !!input,
    }
];

function generateCards() {
    const team = members.map(member => gen.renderCard(member));
    const template= gen.renderHTMLTemplate(team.join(''));
    gen.outputHTML(template);
}

function newEngineer() {
    inquirer
        .prompt(addEngineer)
        .then(({ name, id, email, github }) => {
            members.push(new Engineer(name, id, email, github));
            newMember();
        });
}

function newIntern() {
    inquirer
        .prompt(addIntern)
        .then(({ name, id, email, school }) => {
            members.push(new Intern(name, id, email, school));
            newMember();
        });
}


function newMember() {
    inquirer
        .prompt({
            name: 'add',
            type: 'list',
            message: 'Add a member?',
            choices: [
                'Add an Engineer',
                'Add an Intern',
                'Finish building your team',
            ],
        })
        .then((data) => {
            switch (data.add) {
                case 'Add an Engineer':
                    newEngineer();
                    break;
                case 'Add an Intern':
                    newIntern();
                    break;
                default:
                    generateCards();
            }
            return;
        });
}

function init() {
    inquirer
        .prompt(addManager)
        .then(({ name, id, email, office }) => {
            members.push(new Manager(name, id, email, office));
            newMember();
        });
}

init();