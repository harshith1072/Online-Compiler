 
 
# CodeJudge

CodeJudge is a simple online tool for practicing programming problems. It provides a code editor, a compiler to run your code, and an AI that can review your code to help you improve.

---

## Features

### For Users
- **Interactive Code Editor**: A feature-rich editor powered by Monaco that supports multiple languages (C++, Java, Python, JavaScript, etc.).
- **Real-time Compilation & Execution**: Run your code against sample test cases and get instant output.
- **Custom Test Cases**: Test your logic with custom inputs to debug your solution.
- **AI Code Review**: Get intelligent feedback and suggestions to optimize your code's quality and efficiency.
- **Problem Submission**: Submit your solutions to verify correctness against a full suite of test cases.

### For Administrators
- **Admin Dashboard**: A dedicated dashboard for managing programming problems.
- **Problem Management**: Create new problems with a title, description, and difficulty level.
- **Test Case Creation**: Add multiple test cases with specific inputs and expected outputs for each problem.
- **Problem Deletion**: Easily remove problems from the platform.

---

## Technology Stack

### Frontend
- React: For building a dynamic and component-based user interface.
- Tailwind CSS: A utility-first CSS framework for rapid and responsive styling.
- Monaco Editor: The code editor that powers VS Code, integrated for a professional coding experience.
- Axios: A promise-based HTTP client for making API requests.
- React Router: For handling client-side routing.
- Lucide React: A set of consistent open-source icons.

### Backend & Services
- RESTful API: A backend service for managing problems and user submissions.
- Online Compiler: A separate microservice for compiling and running code in a secure environment.

---

## Getting Started

To set up the project locally, follow these steps:

### Prerequisites
- Node.js (v14.x or later)
- npm (or yarn)

### Installation
Clone the repository:
```bash
git clone https://github.com/your-username/codejudge.git
cd codejudge
````

Install the dependencies:

```bash
npm install
```

### Running the Application

Start the development server:

```bash
npm start
 

---

## API Endpoints

The application interacts with two main APIs.

### 1. CodeJudge Backend API

Base URL: `https://codejudge-lfe8.onrender.com`

| Method | Endpoint            | Description                        |
| ------ | ------------------- | ---------------------------------- |
| POST   | /api/admin/register | Registers a new admin account      |
| POST   | /api/admin/login    | Authenticates an admin             |
| GET    | /problems           | Fetches all problems               |
| GET    | /problems/\:id      | Fetches a single problem by ID     |
| POST   | /problems           | Creates a new problem (admin only) |
| DELETE | /problems/\:id      | Deletes a problem (admin only)     |
| GET    | /byProblem/\:id     | Fetches test cases for a problem   |
| POST   | /submissions        | Submits a solution for a problem   |

### 2. Online Compiler

Base URL: `https://online-compiler-076b.onrender.com`

| Method | Endpoint   | Description                          |
| ------ | ---------- | ------------------------------------ |
| POST   | /run       | Compiles and runs a code snippet     |
| POST   | /ai-review | Provides an AI review of the code    |
| POST   | /custom    | Runs code against a custom test case |

---

## Contributing

Contributions are welcome! To contribute:

1. Fork the project
2. Create your feature branch

   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. Commit your changes

   ```bash
   git commit -m "Add some AmazingFeature"
   ```
4. Push to the branch

   ```bash
   git push origin feature/AmazingFeature
   ```
5. Open a Pull Request

---

## Project Demo & Documentation

* **Live Demo**: [https://codejudge-ochre.vercel.app/](https://codejudge-ochre.vercel.app/)
* **Video Demo**: [Watch Here](https://www.loom.com/share/2778ceb8186b4ac8b0a67d3236fc9c68?sid=f30072a7-7364-4aad-9e1b-7ae7b5da427a)
* **High-Level Design Document (HLD)**: [View Document](https://drive.google.com/file/d/1Kb6BmLl7olUHygZbVvswqvsKbBWS81wb/view?usp=sharing)

 
