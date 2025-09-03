🏭 Inventory Management App

A full-stack Inventory Management application to manage products and suppliers, built using React for the frontend and FastAPI for the backend with PostgreSQL as the database.

🚀 Features
Product Management

🛒 Add, Update, Delete Products

📊 View product list with details: ID, Name, Quantity In Stock, Quantity Sold, Unit Price, Revenue

💰 Automatic calculation of revenue

Supplier Management

🧑‍💼 View and update supplier details (Name, Company, Email, Phone)

➕ Add new supplier

🗑️ Delete supplier

✉️ Send email to suppliers (placeholder for future feature)

UI & UX

📱 Responsive Design using React Bootstrap

🔄 Modal forms for updating products and suppliers

⚠️ Confirmation dialogs for delete actions

🛠️ Tech Stack

Frontend: React, React Bootstrap, Context API, Fetch API

Backend: FastAPI, SQLAlchemy, Pydantic

Database: PostgreSQL

Authentication & Authorization: JWT (optional)

📁 Project Structure
InventoryManagementApp/
├── backend/
│   ├── main.py          # FastAPI app
│   ├── models.py        # Database models
│   ├── routers/         # API routes (product, supplier)
│   └── database.py      # DB connection
├── frontend/
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── App.jsx
│   │   └── index.jsx
│   └── public/
├── README.md
└── requirements.txt

💻 Setup & Installation
Backend

Clone the repo:

git clone https://github.com/your-username/inventory-management-app.git
cd inventory-management-app/backend


Create virtual environment & install dependencies:

python -m venv venv
venv\Scripts\activate      # Windows
source venv/bin/activate   # Linux/Mac
pip install -r requirements.txt


Configure PostgreSQL connection in database.py

Run backend server:

uvicorn main:app --reload

Frontend

Navigate to frontend:

cd ../frontend


Install dependencies:

npm install


Start development server:

npm start


Open browser at: http://localhost:3000

📌 Usage

View products in the table

Click Update to edit product details

Click Supplier to view/update supplier details

Click Delete to remove products or suppliers

Add new suppliers using Add Supplier button

🔮 Future Enhancements

Real email notifications to suppliers

Authentication & roles

Search and filter for products and suppliers

Export reports (CSV/PDF)
