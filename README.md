
# Payments App

This is a full-stack payments app designed to help users easily manage and transfer money between accounts. The application features a simple, minimalistic user interface where users can sign up, log in, view their balance, search for other users, send money, and log out.

## Features

- **User Registration**: New users can sign up by providing their first name, last name, email, and password.
- **User Login**: Existing users can log in with their username and password to access their dashboard.
- **Dashboard**: Users can view their current balance, search for other users, and initiate money transfers.
- **Money Transfer**: Users can select any user from the list and send them money by specifying an amount.
- **Logout**: Users can securely log out of the application.

### Screenshots

#### 1. Sign-Up Page
![Sign-Up Page](https://github.com/user-attachments/assets/f8c79640-ab09-4205-bd57-01e16e61ec71)


The Sign-Up page allows new users to register with their first name, last name, email, and password.

#### 2. Sign-In Page
![Sign-In Page](https://github.com/user-attachments/assets/e45e241b-3e55-4fd4-b0eb-967928ab1a49)


The Sign-In page for existing users. Users can access the app using their username and password.

#### 3. Dashboard Page
![Dashboard Page](https://github.com/user-attachments/assets/75b8d65b-3dd0-48dc-926c-79fca18ab88c)


The Dashboard displays the user's current balance, a list of users to whom they can send money, and a logout button.

#### 4. Send Money Page
![Send Money Page](https://github.com/user-attachments/assets/993bf598-f08c-4086-a4cf-76ea034fc0df)


The Send Money page allows users to enter an amount and initiate a transfer to a selected user.

## Technologies Used

- **Frontend**:
  - **React**: UI components were built with React.
  - **TailwindCSS**: TailwindCSS was used for styling the components, giving the app a clean and responsive design.
  - **React Router**: Used for managing client-side navigation between the different pages of the app.

- **Backend**:
  - **Node.js & Express**: Backend services were implemented with Express.js.
  - **MongoDB**: User data and transactions are stored in MongoDB.
  - **JWT**: JSON Web Tokens (JWT) were used for authentication to manage secure logins and sessions.
  
## Getting Started

Follow these instructions to get a copy of the project running on your local machine.

### Prerequisites

- Node.js
- MongoDB

### Installation

1. **Clone the repository**:
    ```sh
    git clone https://github.com/yourusername/payments-app.git
    ```
    
2. **Navigate to the project directory**:
    ```sh
    cd payments-app
    ```

3. **Install dependencies for the backend**:
    ```sh
    cd backend
    npm install
    ```

4. **Set up environment variables**:

    Create a `.env` file in the backend directory with the following details:

    ```env
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret_key
    ```

5. **Run the backend server**:
    ```sh
    npm start
    ```

6. **Install dependencies for the frontend**:
    ```sh
    cd ../frontend
    npm install
    ```

7. **Run the frontend server**:
    ```sh
    npm start
    ```



