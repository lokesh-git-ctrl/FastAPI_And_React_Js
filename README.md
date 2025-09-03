# Inventory Management App

A full-stack Inventory Management Application to manage products and suppliers, built with **React**, **FastAPI**, and **PostgreSQL**.  

This app allows users to **add, update, delete, and view products**, manage **suppliers**, and track **inventory quantities, sales, and revenue** in a user-friendly interface.

---

## Features

### Product Management
- Add new products
- Update product details (name, stock quantity, unit price)
- Delete products
- View product list with columns: ID, Name, Quantity In Stock, Quantity Sold, Unit Price, Revenue
- Automatic calculation of revenue based on quantity sold × unit price

### Supplier Management
- View supplier details linked to a product
- Update supplier information (name, company, email, phone)
- Delete supplier
- Add new supplier
- Send email to suppliers (button placeholder for future integration)

### User Interface
- Interactive and responsive **React Bootstrap** UI
- Modal forms for updating products and suppliers
- Confirmation dialogs for delete actions

---

## Tech Stack

- **Frontend:** React, React Bootstrap, Context API, Fetch API  
- **Backend:** FastAPI, SQLAlchemy, Pydantic  
- **Database:** PostgreSQL  
- **Authentication & Authorization:** JWT (if implemented)  

---

## Screenshots

![Product List](./screenshots/product_list.png)  
![Update Product Modal](./screenshots/update_product_modal.png)  
![Supplier Modal](./screenshots/supplier_modal.png)

---

## Setup & Installation

### Backend (FastAPI)
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/inventory-management-app.git
   cd inventory-management-app/backend
Create a virtual environment and install dependencies:

bash
Copy code
python -m venv venv
source venv/bin/activate  # Linux/Mac
venv\Scripts\activate     # Windows
pip install -r requirements.txt
Configure PostgreSQL connection in database.py.

Run the backend server:

bash
Copy code
uvicorn main:app --reload
Frontend (React)
Navigate to the frontend directory:

bash
Copy code
cd ../frontend
Install dependencies:

bash
Copy code
npm install
Start the development server:

bash
Copy code
npm start
API Endpoints
Products
GET /product/product/ - Get all products

POST /product/add/ - Add new product

PUT /product/update/{product_id}/ - Update product

DELETE /product/delete/{product_id}/ - Delete product

Suppliers
GET /supplier/{id}/ - Get supplier by ID

POST /supplier/add/ - Add new supplier

PUT /supplier/update/{id}/ - Update supplier

DELETE /supplier/delete/{id}/ - Delete supplier

Usage
Open the app in the browser (http://localhost:3000)

View products in the table

Click Update to edit product details

Click Supplier to view/update supplier details

Click Delete to remove products or suppliers

Future Enhancements
Integrate real email notifications to suppliers

Add authentication and user roles

Add search and filtering for products and suppliers

Add export reports (CSV/PDF)
