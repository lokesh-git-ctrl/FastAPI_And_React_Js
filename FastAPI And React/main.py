from fastapi import FastAPI, Depends, HTTPException
from supplier_routes import supplier_router
from product_routes import product_router
from database import get_db
from models import *
from sqlalchemy.orm import Session
from typing import List

from fastapi_mail import ConnectionConfig, FastMail, MessageSchema, MessageType
from pydantic import BaseModel, EmailStr
from starlette.responses import JSONResponse
from dotenv import dotenv_values
import logging

app = FastAPI()
credentials = dotenv_values(".env")

from fastapi.middleware.cors import CORSMiddleware

origins = [
    "http://localhost:5173",  # React dev server
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 📌 Pydantic schemas
class EmailSchema(BaseModel):
    email: List[EmailStr]

class EmailContent(BaseModel):
    message: str
    subject: str

# 📌 Email Config (Gmail: TLS on port 587)
conf = ConnectionConfig(
    MAIL_USERNAME=credentials['EMAIL'],
    MAIL_PASSWORD=credentials['PASS'],
    MAIL_FROM=credentials['EMAIL'],
    MAIL_PORT=587,
    MAIL_SERVER="smtp.gmail.com",
    MAIL_STARTTLS=True,
    MAIL_SSL_TLS=False,
    USE_CREDENTIALS=True,
    VALIDATE_CERTS=False   # <-- bypass SSL verification
)



@app.post('/email/{product_id}')
async def send_email(product_id: int, content: EmailContent, db: Session = Depends(get_db)):
    try:
        # ✅ Get product
        product = db.query(Product).filter(Product.id == product_id).first()
        if not product:
            raise HTTPException(status_code=404, detail="Product not found")

        # ✅ Get supplier
        supplier = db.query(Supplier).filter(Supplier.id == product.supplier_id).first()
        if not supplier:
            raise HTTPException(status_code=404, detail="Supplier not found")

        if not supplier.email:
            raise HTTPException(status_code=400, detail="Supplier has no email address")

        supplier_email = [supplier.email]  # must be a list

        # ✅ Email body
        html = f"""
        <h5>Loki Business LTD</h5> 
        <br>
        <p>{content.message}</p>
        <br>
        <h6>Best Regards</h6>
        <h6>Loki Business LTD</h6>
        """

        # ✅ Create message
        message = MessageSchema(
            subject=content.subject,
            recipients=supplier_email,
            body=html,
            subtype=MessageType.html
        )

        fm = FastMail(conf)
        await fm.send_message(message)

        return JSONResponse(status_code=200, content={"message": "Email has been sent"})

    except Exception as e:
        logging.error(f"Email sending failed: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Email sending failed: {str(e)}")

# Include routers
app.include_router(supplier_router)
app.include_router(product_router)
