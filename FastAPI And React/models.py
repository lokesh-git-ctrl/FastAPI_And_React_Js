from database import Base
from sqlalchemy import Column, Integer, String, ForeignKey, Numeric

from sqlalchemy.orm import relationship


class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False, unique=True)
    quantity_in_stock = Column(Integer, default=0)     
    quantity_solf = Column(Integer, default = 0)
    unit_price = Column(Numeric(precision=8, scale=2), default=0.00)
    revenue = Column(Numeric(precision=20, scale=2), default=0.00)
    
    supplier_id = Column(Integer, ForeignKey('supplier.id'))
    supplier = relationship('Supplier', back_populates='products') 

class Supplier(Base):

    __tablename__ = "supplier"

    id = Column(Integer, primary_key = True)
    name = Column(String, nullable=False, unique=True)
    company = Column(String, nullable=False, unique=True)
    email = Column(String(80), unique=True)
    phone = Column(String(10),nullable=False)

    products = relationship('Product',back_populates='supplier')