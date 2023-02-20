import inquirer from 'inquirer';
import fs from "fs/promises";

const requireInput = (input) => {
    if (input) {
      return true;
    }
    else{
        return 'Please input the required information to proceed.';
    }

  };

let {title, contentTable, description, installation, usage, screenshot, builtWith, learnt,
    continuedDevelopment, license, authors, confirmCredits, credits} = await inquirer.prompt([
    {
      type: 'input',
      name: 'title',
      message: "What is the title of your project?",
      validate: requireInput
    },
    {
      type: 'input',
      name: 'contentTable',
      message: "Insert table of contents or hit ENTER to accept the default",
      default: `- [Project Description](#project-description)
      - [Installation](#installation)
      - [Usage](#usage)
      - [Screenshot](#screenshot)
      - [Built with](#built-with)
      - [What I learned](#what-i-learned)
      - [Continued development](#continued-development)
      - [License](#license)
      - [Authors](#authors)
      - [Credits](#credits)`
      },
    {
      type: 'input',
      name: 'description',
      message: "Write a description of your project?",
      validate: requireInput
      },
      {
        type: 'input',
        name: 'installation',
        message: "How can the application be installed?",
        default: "```\n" +
        "# Clone this repository:\n" +
        "git clone https://github.com/KingJessie/Better_Nutrient.git\n" +
        "cd Better_Nutrient\n" +
        "# To open folder in VS Code\n" +
        "code .\n" +
        "```\n"
      },
      {
        type: 'input',
        name: 'usage',
        message: "Write the usage of the project?",
        default: "No usage provided"
      },
    {
      type: 'list',
      name: 'screenshot',
      message: 'What type of screenshot would you like to add?',
      choices: ['Image', 'Video', 'Both'],
      filter(val) {
        return val.toLowerCase();
      }
    },
    {
        type: 'input',
        name: 'builtWith',
        message: 'What technologies did you use?',
        default: " - [x] Semantic HTML5 markup \n" +
      " - [x] CSS custom properties \n" +
     " - [x] JavaScript \n" +
     " - [x] jQuery \n" +
     " - [x] Bootstrap \n" +
     " - [x] Flexbox \n" +
     " - [x] Mobile-first workflow " 

      },
      {
        type: 'input',
        name: 'learnt',
        message: "What did you learn from the projects and what challenges did you overcome?",
        validate: requireInput
      },
      {
        type: 'input',
        name: 'continuedDevelopment',
        message: "Write your continued development?",
      },
      {
        type: 'list',
        name: 'license',
        message: 'Select a license badge',
        choices: ['MIT', 'ISC', 'Boost'],
        filter(val) {
          return val.toLowerCase();
        }
      },
      {
        type: 'input',
        name: 'authors',
        message: "Write the author(s) for the project",
        validate: requireInput
      },
      {
        type: 'list',
        name: 'confirmCredits',
        message: 'Do you want to provide credits?',
        choices: ['Yes', 'No'],
        filter(val) {
          return val.toLowerCase();
        }
      },
      {
        type: 'input',
        name: 'credits',
        message: 'Please provide credits:',
        when: (response) => response.confirmCredits === 'Yes',
        default: () => 'No information submitted'
      }

  ]);


  function returnList(input) {
    if (input) {
      return input.split(",").map(item => `* ${item.trim()}`).join("\n");
    } else {
      return "";
    }
  }
  

  
  let readMeGenerator =  `
  # ![screenshot](images/readme.png) **${title}** 
  
  ## Table of contents
  ${contentTable}

  # **Project Description**
  ${description}

  ## Installation
  ${installation}

  ## Usage
  ${usage}

  ## Screenshot
  ${generateScreenshot(screenshot)}
  
  ## Built with
  ${returnList(builtWith)}

  
  ## What I learned
  ${learnt}

  ## Continued development
  ${continuedDevelopment}

  ## License
  ${generateLicense(license)}

  ## Authors
  ${returnList(authors)}

  ## Credits
  ${confirmCredits}
  ${returnList(credits)}


  `;
  
  await fs.writeFile("CreateREADME.md", readMeGenerator);
  
  function generateLicense(license){
    if (license === 'mit') {
      return '[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)';
    } else if (license === 'isc') {
      return '[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)';
    } else {
      return '[![License](https://img.shields.io/badge/License-Boost_1.0-lightblue.svg)](https://www.boost.org/LICENSE_1_0.txt)';
    }
  };

  function generateScreenshot(screenshot) {
    if (screenshot === 'both') {
      return '![screenshot](images/bn.gif)\n![screenshot](images/bn.png)';
    } else if (screenshot === 'video') {
      return '![screenshot](images/bn.gif)';
    } else {
      return '![screenshot](images/bn_image.png)';
    }
  };

  
  
  console.log("success!");

  