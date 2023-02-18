import inquirer from 'inquirer';
import fs from "fs/promises"

let {description, license} = await inquirer.prompt([
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
  # Project Description
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
  console.log(license)
  