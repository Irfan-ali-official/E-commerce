# E-Commerce Web Application

This project is an **E-Commerce Project** built using **React**, **Node.js**, and **MongoDB**. The dashboard allows admins to manage products, users, and orders. Users can view their profiles, order history, and update their details.

## Features

- **Admin Dashboard**: Admins can manage products, users, and orders.
  - Add, update, and delete products.
  - View, update, and delete users.
  - Manage orders and view order details.
- **User Profile**:

  - Users can view and update their account details.
  - Users can view their order history.

- **Authentication**:
  - JWT-based authentication.
  - Admin and user roles.

## Tech Stack

- **Frontend**: React, Tailwind CSS
- **Backend**: Node.js, Express
- **Database**: MongoDB

## Tech Stack

### MVC Pattern for Backend

- Model
- View
- Controller

## Issues Encountered

```
While building the e-commerce web application, several challenges were encountered. One major hurdle was ensuring proper authentication and authorization using JWT tokens, which required careful handling of tokens across both frontend and backend to secure user sessions and restrict access based on roles. Another challenge involved retrieving and displaying user-specific orders, ensuring data security, and avoiding cross-user data leakage. Debugging middleware to handle these processes effectively required extensive logging and testing. Additionally, maintaining a smooth user experience, particularly in areas like dynamic profile updates and real-time order management, presented performance optimization challenges. Integrating and ensuring proper styling with Tailwind CSS to create a responsive and user-friendly dashboard also required thorough testing to meet design expectations.
```

## Installation

1. **Clone the repository**:

   ```bash
   .env already provided just add values to
   these
   MONGO_URI=MongoDbURL
   JWT_SECRET=Your__Secrete_JWT
   PORT =PORT
   git clone<https://github.com/Irfan-ali-official/E-commerce.git>
   cd ecommerce-admin-dashboard
   npm i
   cd backend
   start: npm run dev
   cd frontend
   npm i
   start: npm run dev
   Login as a Admin
   email:irfan@gmail.com
   password:12345



   ```
