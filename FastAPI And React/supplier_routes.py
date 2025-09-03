from fastapi import APIRouter, HTTPException, status, Depends
from database import get_db
from models import *
from schemas import SupplierModel,SupplierUpdateModel
from fastapi.encoders import jsonable_encoder
from sqlalchemy.orm import Session

supplier_router = APIRouter(
    prefix = '/supplier',
    tags = ['Suppliers']
)

@supplier_router.get('/')
def index():

    return {"detail":"Hello World"}

@supplier_router.post('/supplier/',status_code=status.HTTP_201_CREATED)
async def add_supplier(supplier_info : SupplierModel, db: Session = Depends(get_db)):

    db_email = db.query(Supplier).filter(Supplier.email == supplier_info.email).first()

    if db_email is not None:

        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User with the email already exists" 
        )
    
    new_supplier = Supplier(
        name = supplier_info.name,
        company = supplier_info.company,
        email = supplier_info.email,
        phone = supplier_info.phone
    )

    db.add(new_supplier)
    db.commit()
    db.refresh(new_supplier)

    return jsonable_encoder(new_supplier)

 
@supplier_router.get('/all/supplier/')
async def All_Supplier(db: Session = Depends(get_db)):

    supplier = db.query(Supplier).all() 

    return jsonable_encoder(supplier)

@supplier_router.get('/supplier/{id}/')
async def Get_Supplier(id:int,db: Session = Depends(get_db)):

    supplier = db.query(Supplier).filter(Supplier.id == id).first()

    if not supplier:

        raise HTTPException(
            status_code = status.HTTP_404_NOT_FOUND,
            detail = 'Supplier Not Found'
        )

    return jsonable_encoder(supplier)
    
@supplier_router.put('/supplier/update/{id}/')
async def Update_Supplier(id:int, supplier : SupplierUpdateModel, db: Session = Depends(get_db)):

    new_suplier = db.query(Supplier).filter(Supplier.id == id).first()
   
    if not new_suplier:

        raise HTTPException(
            status_code = HTTP_404_NOT_FOUND,
            detail = 'Supplier Not Found'
        )

    new_suplier.name = supplier.name
    new_suplier.company = supplier.company
    new_suplier.email = supplier.email
    new_suplier.phone = supplier.phone 

    db.commit()
    db.refresh(new_suplier)

    return jsonable_encoder(new_suplier)


@supplier_router.delete('/supplier/delete/{id}/')
async def Delete_Supplier(
    id : int,
    db : Session = Depends(get_db)
    ):

    supplier = db.query(Supplier).filter(Supplier.id == id).first()

    if not supplier:

        raise HTTPException(
            status_code = status.HTTP_404_NOT_FOUND,
            detail = 'User Not Found'
        )

    db.delete(supplier)
    db.commit()

    return {"detail":"Delete Supplier Successfully"}