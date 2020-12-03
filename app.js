const Manager = require("./Library/Manager");
const Engineer = require("./Library/Engineer");
const Intern = require("./Library/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./Library/htmlRenderer");
console.log("response");

let newTeamMember = [];

function menuOptions() {
    inquirer.prompt({
        type: 'list',
        name: 'selection',
        message: 'Who are you adding today?',
        choices: ['Manager', 'Engineer', 'Intern', 'New Team']
    }).then(function (answer) {
        switch (answer.selection) {
            case 'Manager':
                addManager();
                break;
            case 'Engineer':
                addEngineer();
                break;
            case 'Intern':
                addIntern();
                break;
            case 'New Team':
                addNewTeam();
                break;

        }
    })
}

// Manager Function
function addManager() {
    inquirer.prompt([{
            type: 'input',
            name: 'name',
            message: "What is the manager's full name?",
        },
        {
            type: 'input',
            name: 'id',
            message: "What is the manager's id number?",
        },
        {
            type: 'input',
            name: 'email',
            message: "What is the manager's email address?",
        },
        {
            type: 'input',
            name: 'officeNumber',
            message: "What is the manager's office number?",
        },
    ]).then (function (answer){
        let manager = new Manager(answer.name, answer.id, answer.email, answer.officeNumber);
        newTeamMember.push(manager);
        menuOptions();
    })
}

// Engineer Function
function addEngineer() {
    inquirer.prompt([{
            type: 'input',
            name: 'name',
            message: "What is the engineer's full name?",
        },
        {
            type: 'input',
            name: 'id',
            message: "What is the engineer's id number?",
        },
        {
            type: 'input',
            name: 'email',
            message: "What is the engineer's email address?",
        },
        {
            type: 'input',
            name: 'gitHub',
            message: "What is the engineer's GitHub Username/Handle?",
        },
    ]).then (function (answer){
        let engineer = new Engineer(answer.name, answer.id, answer.email, answer.gitHub);
        newTeamMember.push(engineer);
        menuOptions();
    })
}

// Intern Function
function addIntern() {
    inquirer.prompt([{
            type: 'input',
            name: 'name',
            message: "What is the intern's full name?",
        },
        {
            type: 'input',
            name: 'id',
            message: "What is the intern's id number?",
        },
        {
            type: 'input',
            name: 'email',
            message: "What is the intern's email address?",
        },
        {
            type: 'input',
            name: 'school',
            message: "What is the intern's school?",
        },
    ]).then (function (answer){
        let intern = new Intern(answer.name, answer.id, answer.email, answer.school);
        newTeamMember.push(intern);
        menuOptions();
    })
}

// New Team Function
function addNewTeam() {
    if (!fs.existsSync(OUTPUT_DIR)){
        fs.mkdirSync(OUTPUT_DIR);
    }
    fs.writeFileSync(outputPath, render(newTeamMember))
}

menuOptions();


// function init() {
//     inquirer.prompt(questions).then(function (response) {
//         console.log(response);
//         const intern = new Intern(response.name, response.id, response.email, response.school);
//         fs.writeFileSync(outputPath, render([intern]));
//     })
// }
// init();

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```