import React, { useEffect, useContext, useState } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import { ProductContext } from '../ProductContext';
import SupplierDetails from "./SupplierDetails";

const ProductsTable = () => {
  const [products, setProducts] = useContext(ProductContext);
  const [showModal, setShowModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);

  // Supplier modal state
  const [showSupplier, setShowSupplier] = useState(false);
  const [selectedSupplierId, setSelectedSupplierId] = useState(null);
  const [selectedProductId, setSelectedProductId] = useState(null);

  useEffect(() => { fetchProducts(); }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch('http://127.0.0.1:8000/product/product/');
      const results = await res.json();
      setProducts({ data: results });
    } catch (err) { console.error(err); }
  };

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    fetch(`http://127.0.0.1:8000/product/delete/${id}/`, { method: "DELETE" })
      .then(res => res.json())
      .then(result => {
        alert(result.detail);
        setProducts(prev => ({ data: prev.data.filter(p => p.id !== id) }));
      })
      .catch(err => alert("Delete failed: " + err.message));
  };

  const handleEditClick = (product) => { setCurrentProduct({ ...product }); setShowModal(true); };
  const handleModalChange = (e) => setCurrentProduct({ ...currentProduct, [e.target.name]: e.target.value });

  const handleUpdate = async () => {
    try {
      const res = await fetch(`http://127.0.0.1:8000/product/product/update/${currentProduct.id}/`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: currentProduct.name,
          quantity_in_stock: Number(currentProduct.quantity_in_stock),
          quantity_sold: Number(currentProduct.quantity_solf),
          unit_price: Number(currentProduct.unit_price)
        })
      });
      const updatedProduct = await res.json();
      if (!res.ok) throw new Error(updatedProduct.detail || "Update failed");
      setProducts(prev => ({ data: prev.data.map(p => p.id === updatedProduct.id ? updatedProduct : p) }));
      setShowModal(false);
    } catch (err) { alert("Update failed: " + err.message); }
  };

  const handleSupplierClick = (product) => {
    setSelectedSupplierId(product.supplier_id);
    setSelectedProductId(product.id);
    setShowSupplier(true);
  };

  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Id</th><th>Product Name</th><th>Quantity In Stock</th>
            <th>Quantity Sold</th><th>Unit Price</th><th>Revenue</th><th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.data && products.data.map(product => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.quantity_in_stock}</td>
              <td>{product.quantity_solf}</td>
              <td>{product.unit_price}</td>
              <td>{product.revenue}</td>
              <td>
                <Button variant="outline-info" size="sm" className="me-2" onClick={() => handleEditClick(product)}>Update</Button>
                <Button variant="outline-secondary" size="sm" className="me-2" onClick={() => handleSupplierClick(product)}>Supplier</Button>
                <Button variant="outline-danger" size="sm" onClick={() => handleDelete(product.id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Update Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header>
          <Modal.Title>Update Product</Modal.Title>
          <Button variant="danger" onClick={() => setShowModal(false)} style={{ border: 'none', padding: '0.25rem 0.5rem', fontSize: '1.2rem', lineHeight: '1' }}>&times;</Button>
        </Modal.Header>
        <Modal.Body>
          {currentProduct && (
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Product Name</Form.Label>
                <Form.Control name="name" value={currentProduct.name} onChange={handleModalChange} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Quantity In Stock</Form.Label>
                <Form.Control name="quantity_in_stock" type="number" value={currentProduct.quantity_in_stock} onChange={handleModalChange} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Quantity Sold</Form.Label>
                <Form.Control name="quantity_solf" type="number" value={currentProduct.quantity_solf} onChange={handleModalChange} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Unit Price</Form.Label>
                <Form.Control name="unit_price" type="number" step="0.01" value={currentProduct.unit_price} onChange={handleModalChange} />
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-end">
          <Button variant="success" onClick={handleUpdate}>Save Changes</Button>
        </Modal.Footer>
      </Modal>

      {/* Supplier Modal */}
      <SupplierDetails 
        show={showSupplier} 
        handleClose={() => setShowSupplier(false)} 
        supplierId={selectedSupplierId} 
        productId={selectedProductId} 
      />
    </div>
  );
};

export default ProductsTable;
