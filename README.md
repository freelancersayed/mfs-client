# Mobile Financial Service (MFS) Application

## Overview
The Mobile Financial Service (MFS) application is a secure, responsive, and user-friendly web-based platform designed to facilitate essential financial transactions, similar to popular services like bKash or Nagad. This project is built using the MERN stack—React.js, Node.js, Express.js, and MongoDB—to provide a robust solution for users, agents, and admins to manage their financial activities seamlessly.

## Features

### User Features:
- **Registration:**
  - Users can register with their Name, Mobile Number, Email, and a 5-digit PIN.
  - PINs are securely hashed using bcrypt.js before storage.
  - Accounts are initially pending and require admin approval.
  - Upon activation, users receive a one-time bonus of 40 Taka.
  
- **Secure Login:**
  - Users can log in using either Mobile Number or Email along with their PIN.
  - JWT is used for secure authentication.

- **Send Money:**
  - Users can send money to other users with PIN and JWT verification.
  - A transaction fee of 5 Taka is charged for transactions over 100 Taka.
  - Transactions below 50 Taka are not permitted.

- **Cash-Out:**
  - Users can cash out through agents, with a fee of 1.5% of the transaction amount.
  - Fees are deducted from the user's balance and added to the agent’s balance.

- **Cash-In:**
  - Users can request cash-in through agents without any fee.
  - Upon approval by the agent, the amount is credited to the user’s balance.

- **Balance Inquiry:**
  - Users can check their account balance anytime.

- **Transaction History:**
  - Users can view their last 10 transactions, with JWT verification required.

### Agent Features:
- **Registration:**
  - Agents register with Name, Mobile Number, Email, and a 5-digit PIN.
  - PINs are hashed for security.
  - Accounts are pending until admin approval.
  - Once approved, agents receive a one-time bonus of 10,000 Taka.

- **Secure Login:**
  - Agents can log in using their Mobile Number or Email and PIN with JWT authentication.

- **Transaction Management:**
  - Agents can manage cash-in and cash-out requests.
  - Balance adjustments are made between the agent and the user based on the transactions.

- **Balance Inquiry:**
  - Agents can check their balance anytime.

- **Transaction History:**
  - Agents can view their last 20 transactions with JWT verification.

### Admin Features:
- **Secure Login:**
  - Admins can log in using their Mobile Number or Email and PIN.
  - Secure authentication with JWT.

- **User Management:**
  - Admins can view, search, activate, or block user accounts.

- **System Monitoring:**
  - Admins can view all transactions within the system.

## Installation and Setup

### Prerequisites:
- Node.js
- MongoDB
- NPM or Yarn

### Installation Steps:

1. **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/mfs-application.git
    cd mfs-application
    ```

2. **Install server dependencies:**
    ```bash
    cd server
    npm install
    ```

3. **Install client dependencies:**
    ```bash
    cd client
    npm install
    ```

4. **Environment Variables:**
   - Create a `.env` file in the root of the server directory.
   - Add the following variables:
     ```bash
     PORT=5000
     MONGO_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret
     ```

5. **Run the application:**

   - **Server:**
     ```bash
     cd server
     npm start
     ```
   
   - **Client:**
     ```bash
     cd client
     npm start
     ```

6. **Access the application:**
   - Open your browser and go to `http://localhost:3000`

## Folder Structure



## Technologies Used
- **Frontend:** React.js, Bootstrap/Tailwind CSS (for UI design)
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JWT (JSON Web Tokens)
- **Security:** bcrypt.js (for PIN hashing)

## Contributing
Contributions are welcome! If you find any issues or have suggestions, please feel free to create a pull request or open an issue.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgments
- Special thanks to [Your Name/Your Organization] for the guidance and support.
- Inspired by the real-world applications like bKash and Nagad.
