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
    continuedDevelopment, license, authors, credits} = await inquirer.prompt([
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
        message: "Write the usuage of the project?",
      },
    {
      type: 'checkbox',
      name: 'screenshot',
      message: 'What type of screenshot would you like to add?',
      choices: ['Image', 'Video', 'Both'],
    },
    {
        type: 'input',
        name: 'builtWith',
        message: 'What technologies did you use?',
        default: `
      - [x] Semantic HTML5 markup
      - [x] CSS custom properties
      - [x] JavaScript
      - [x] jQuery
      - [x] Bootstrap
      - [x] Flexbox
      - [x] Mobile-first workflow
      `
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
        message: "List the author(s) for the project",
      },
      {
        type: 'input',
        name: 'credits',
        message: "Write any credits",
      },

  ]);
  
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
  ${builtWith}
  
  ## What I learned
  ${learnt}

  ## Continued development
  ${continuedDevelopment}

  ## License
  ${generateLicense(license)}

  ## Authors
  ${authors}

  ## Credits
  ${credits}

 


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
      return '![screenshot](images/bn.gif)\n![screenshot](images/bn_image.png)';
    } else if (screenshot === 'video') {
      return 'https://user-images.githubusercontent.com/97694194/215339388-2ce8e018-399a-45c1-a207-4f0cc803a801.mp4';
    } else {
      return '![screenshot](images/bn.gif)';
    }
  }
  
  
  console.log("success!");

  