# ProjectPulse Assistant

An AI-powered assistant designed to enhance user experience for [ProjectPulse](https://github.com/Qinastha/ProjectPulse.git) users. Engage in threaded conversations to ask questions and receive answers about your projects.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Scripts](#scripts)
- [Testing](#testing)
- [Related Projects](#related-projects)

## Introduction

ProjectPulse Assistant is an AI assistant that provides a chat interface with threaded conversations. Users can log in into account, start new threads, and interact with the assistant to receive insights and answers related to their projects. The assistant leverages the OpenAI API to deliver intelligent and context-aware responses.

## Features

- **AI-Powered Chat Interface**: Engage in threaded conversations with an AI assistant.
- **User Authentication**: Secure account creation and login.
- **Thread Management**: Create new threads or continue existing conversations.
- **Project Integration**: Receive answers specific to your projects in ProjectPulse.
- **Custom UI Components**: Built with custom elements, variables, mixins, and hooks from the `pulse_library`.

## Technologies Used

- **TypeScript**
- **React**
- **SASS** for styling
- **Axios** for HTTP requests
- **Jest** for testing
- **OpenAI API**

## Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/Qinastha/projectpulseassistant.git
   cd projectpulseassistant
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Install the custom library**:

   ```bash
   npm install @Qinastha/pulse_library@0.8.2
   ```

## Usage

To run the application locally:

```bash
npm start
```

This command starts the development server. Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## Scripts

- **Start the development server**:

  ```bash
  npm start
  ```

- **Build the application for production**:

  ```bash
  npm run build
  ```

- **Run tests**:

  ```bash
  npm test
  ```

- **Eject the configuration**:

  ```bash
  npm run eject
  ```

## Testing

The project uses **Jest** for testing. To execute the test suite:

```bash
npm test
```

## Related Projects

- **ProjectPulse**: The main project for which this assistant is designed.

  [GitHub Repository](https://github.com/Qinastha/ProjectPulse.git)


- **ProjectPulse Chat**: The chat application to interact with other members of the project

  [GitHub Repository](https://github.com/Qinastha/projectpulsechat.git)


- **Pulse Library**: Custom library with elements, variables, mixins, and hooks used in this project.

  [GitHub Repository](https://github.com/Qinastha/pulse_library.git)

 
 Install via npm:

  ```bash
  npm install @Qinastha/pulse_library@0.8.2
  ```
