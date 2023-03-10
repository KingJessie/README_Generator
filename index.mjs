import inquirer from "inquirer";
import fs from "fs/promises";


// Function that checks for an input, and prompts the user to enter an input if none has been provided.
// function is then used to verify the user input using the validate inquirer prompt.
const requireInput = (input) => {
  if (input) {
    return true;
  } else {
    return "Please input the required information to proceed.";
  }
};


let {title, contentTable, description, installation, usage, screenshot, builtWith,  
  license, contributing, confirmTest, test, github, githubUrl, email, authors } = await inquirer.prompt([
  {
    type: "input",
    name: "title",
    message: "What is the title of your project?",
    validate: requireInput,
  },
  {
    type: "input",
    name: "contentTable",
    message: "Insert table of contents or hit ENTER to accept the default",
    default: `- [Project Description](#project-description)
      - [Installation](#installation)
      - [Usage](#usage)
      - [Screenshot](#screenshot)
      - [Built with](#built-with)
      - [License](#license)
      - [Contributing](#contributing)
      - [Test](#test)
      - [Questions](#questions)
      - [Authors](#authors)
      `,
  },
  {
    type: "input",
    name: "description",
    message: "Write a description of your project?",
    validate: requireInput,
  },
  {
    type: "input",
    name: "installation",
    message: "How can the application be installed?",
    default:
      "```\n" +
      "# Clone this repository:\n" +
      "git clone https://github.com/KingJessie/Better_Nutrient.git\n" +
      "cd Better_Nutrient\n" +
      "# To open folder in VS Code\n" +
      "code .\n" +
      "```\n",
  },
  {
    type: "input",
    name: "usage",
    message: "Write the usage of the project?",
    default: "No information provided",
  },
  {
    type: "list",
    name: "screenshot",
    message: "What type of screenshot would you like to add?",
    choices: ["Image", "Video"],
    filter(val) {
      return val.toLowerCase();
    },
  },
  {
    type: "input",
    name: "builtWith",
    message: "What technologies did you use?",
    default:" Technologies: \n" +
      " - [x] Semantic HTML5 markup \n" +
      " - [x] CSS custom properties \n" +
      " - [x] JavaScript \n" +
      " - [x] jQuery \n" +
      " - [x] Bootstrap \n" +
      " - [x] Flexbox \n" +
      " - [x] Mobile-first workflow ",
  },
  {
    type: "list",
    name: "license",
    message: "Select a license badge",
    choices: ["MIT", "ISC", "Boost"],
    filter(val) {
      return val.toLowerCase();
    },
  },
  {
    type: "input",
    name: "contributing",
    message:
      "Write information on how other developers can contribute:",
    validate: requireInput,
  },
  {
    type: "list",
    name: "confirmTest",
    message: "Do you have information on how to test this software?",
    choices: ["Yes", "No"],
    filter(val) {
        return val.toLowerCase();
      }
  },
  {
    type: "input",
    name: "test",
    message: "Please provide test information:",
    //  Confirm test: If user choice is 'Yes,' then it asks user to submit response.
    // A default answer is used if no information has been given.
    // If the user chose "No," the programme would end and the word "no" would be shown in the test.
    when: (response) => response.confirmTest === 'yes',
        default: () => 'No information submitted'
  },
  {
    type: "input",
    name: "authors",
    message: "Write the author(s) for the project",
    validate: requireInput,
  },
  {
    type: "input",
    name: "github",
    message: "What is your github username:",
    validate: requireInput,
  },
  {
    type: "input",
    name: "githubUrl",
    message: "What is your github URL:",
    validate: requireInput,
  },
  {
    type: 'input',
    name: 'email',
    message: "What's your email address:",
    validate(value) {
      const pass = value.match(
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/i
      );
      if (pass) {
        return true;
      }

      return 'Please enter a valid email address';
    },
  }

]);


// This function converts user input to markdown by splitting, trimming (to remove whitespace),
// and joining the strings with newline (\n) to create a formatted list.
function returnList(input) {
  if (input) {
    return input.split(",").map((input) => `* ${input.trim()}`).join("\n");
  }
}

let readMeGenerator = `
  # **${title}** ????
  
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

  ## License
  This application is covered under: ${generateLicense(license)}


  ## Contributing

  > Contributions are what make the open source community such an extraordinary environment for learning, inspiration, and creation.
  
  Your contributions are very much appreciated. If you have a proposal to improve this, please share it via:
  ${contributing}
  

  ## Test
  - Is there any test: ${confirmTest}
  - If so, provide test information: ${(test)}

  ## Questions
  Feel free to contact me with any questions about the application, the contribution, the test, or anything else.
  - ${(email)}
  - Github Name: ${(github)}
  - Github URL: ${(githubUrl)}

  ## Authors
  ${returnList(authors)}
  
  `;

// The await operator is used to wait for a promise before continuing the execution of the code.
// When the promise is fulfilled, the value is returned. 
// Node fs (file system) module to create a new file and write the contents of the readMeGenerator variable to it.
await fs.writeFile("CreateREADME.md", readMeGenerator);

// This function generates different licence types depending on the value of the licence argument. 
// Conditional statements provide different output according to license value which user would have selected.
function generateLicense(license) {
  if (license === "mit") {
    return "[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)";
  } else if (license === "isc") {
    return "[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)";
  } else {
    return "[![License](https://img.shields.io/badge/License-Boost_1.0-lightblue.svg)](https://www.boost.org/LICENSE_1_0.txt)";
  }
}

// This function generates a screenshot image based on its screenshot parameter.
// Conditional statements provide different output according to screenshot value.
function generateScreenshot(screenshot) {
  if (screenshot === "video") {
    return "![screenshot](images/bn.gif)";
  } else {
    return "![screenshot](images/bn_image.png)";
  }
}

// Success is printed on the terminal when the software is complete and functional.
console.log("success!");