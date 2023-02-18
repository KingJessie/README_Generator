import inquirer from 'inquirer';
import fs from "fs/promises"

let {title, contentTable, description, license} = await inquirer.prompt([
    {
      type: 'input',
      name: 'title',
      message: "What is the title of your project?"
    },
    {
      type: 'input',
      name: 'contentTable',
      message: "Insert table of content or press ENTER for default",
      default: `- [Project Description](#project-description)
      - [Installation](#installation)
      - [Usage](#usage)
      - [Screenshot](#screenshot)
      - [License](#license)
      - [Contributing](#contributing)
      - [Tests](#tests)
      - [Questions](#questions)`
      },
    {
      type: 'input',
      name: 'description',
      message: "Write a description of your project?"
      },
    {
      type: 'list',
      name: 'license',
      message: 'Select one license badge',
      choices: ['MIT', 'ISC', 'Boost'],
      filter(val) {
        return val.toLowerCase();
      }
    }
  ]);
  
  let readMeGenerator =  `
  # ${title} 📝
  
  ## Table of contents
  ${contentTable}

  ## **Project Description**
  ${description}

  ## License
  ${generateLicense(license)}


  `;
  
  await fs.writeFile("README.md", readMeGenerator);
  
  function generateLicense(license){
    if (license === 'mit') {
      return '[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)';
    } else if (license === 'isc') {
      return '[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)';
    } else {
      return '[![License](https://img.shields.io/badge/License-Boost_1.0-lightblue.svg)](https://www.boost.org/LICENSE_1_0.txt)';
    }
  }
  
  console.log("success!");

  