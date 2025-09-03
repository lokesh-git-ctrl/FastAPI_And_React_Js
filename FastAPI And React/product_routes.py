from fastapi import APIRouter, HTTPException, status, Depends
from database import get_db
from models import *
from schemas import ProductModel,ProductUpdateModel
from fastapi.encoders import jsonable_encoder
from sqlalchemy.orm import Session

product_router = APIRouter(
    prefix = '/product',
    tags = ['Products']
)


@product_router.post('/product/{supplier_id}/')
async def Add_Product(
    supplier_id : int,
    products :  ProductModel,
    db : Session = Depends(get_db)
    ):

    supplier = db.query(Supplier).filter(Supplier.id == supplier_id).first()

    if not supplier:

        raise HTTPException(
            status_code = status.HTTP_404_NOT_FOUND,
            detail = 'Supplier ID Not Found'
        )    
    
    new_product = Product(
        name = products.name,
        quantity_in_stock = products.quantity_in_stock,    
        quantity_solf = products.quantity_sold,
        unit_price = products.unit_price,
        revenue = 0,
        supplier_id = supplier.id
    )

    new_product.revenue += products.quantity_sold * products.unit_price

    db.add(new_product)
    db.commit()
    db.refresh(new_product)

    return jsonable_encoder(new_product)

@product_router.get('/product/')
async def All_Products(db:Session = Depends(get_db)):

    all_products = db.query(Product).filter(Product.supplier_id != None).all()

    if not all_products:

        raise HTTPException(
            status_code = status.HTTP_404_NOT_FOUND,
            detail = 'Supplier Not Found'
        )

    return jsonable_encoder(all_products)

@product_router.get('/product/specific/{product_id}/')
async def Get_Product(
    product_id : int,
    db : Session = Depends(get_db)
    ):

    get_product = db.query(Product).filter(Product.id == product_id).first()

    if not get_product:

        raise HTTPException(
            status_code = status.HTTP_404_NOT_FOUND,
            detail = 'This Product ID Not Exits'
        )

    return jsonable_encoder(get_product)

@product_router.put('/product/update/{product_id}/')
async def Update_Product(
    product_id : int,
    product : ProductUpdateModel,
    db : Session = Depends(get_db)
    ):

    get_product = db.query(Product).filter(Product.id == product_id).first()

    if not get_product:

        raise HTTPException(
            status_code = status.HTTP_404_NOT_FOUND,
            detail = 'This Product ID Not Exits'
        )

    get_product.name = product.name
    get_product.quantity_in_stock = product.quantity_in_stock
    get_product.quantity_solf = product.quantity_sold
    get_product.unit_price = product.unit_price

    get_product.revenue = product.quantity_sold * product.unit_price
    get_product.quantity_in_stock =  get_product.quantity_in_stock - product.quantity_sold

    db.commit()
    db.refresh(get_product)

    return jsonable_encoder(get_product)


@product_router.delete('/product/delete/{product_id}/')
async def Delete_Product(
    product_id : int,
    db : Session = Depends(get_db)
    ):

    get_product = db.query(Product).filter(Product.id == product_id).first()

    if not get_product:

        raise HTTPException(
            status_code = status.HTTP_404_NOT_FOUND,
            detail = 'This Product ID Not Exits'
        )

    db.delete(get_product)
    db.commit()

    return {'detail':'Delete Product Successfully'}