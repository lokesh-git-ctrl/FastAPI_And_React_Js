from pydantic import BaseModel,EmailStr
from typing import Optional
from decimal import Decimal

class SupplierModel(BaseModel):

    name : str
    company : str
    email : EmailStr
    phone : str

    class Config:

        orm_mode = True

        schema_extra = {
            'example':{
                "name" : "Lokesh",
                "company" : "Amazon",
                "email" : "123@example.com",
                "phone" : "1234567890"
            }
        }

class SupplierUpdateModel(BaseModel):

    name : str
    company : str
    email : EmailStr
    phone : str

    class Config:

        orm_mode = True

class ProductModel(BaseModel):

    name : str
    quantity_in_stock : int = 0
    quantity_sold : int = 0
    unit_price : float = 0.00

    class Config:

        orm_mode = True

        schame_extra = {
            'example':{
                "name": "Pizza Margherita",
                "quantity_in_stock": 50,
                "quantity_sold": 10,
                "unit_price": 299.99,
           
            }
        }


class ProductUpdateModel(BaseModel):

    name : str
    quantity_in_stock : int = 0
    quantity_sold : int = 0
    unit_price: Decimal = Decimal("0.00")

    class Config:

        orm_mode = True