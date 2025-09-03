import React, { useState } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';

const AddProducts = () => {
  const [productInfo, setProductInfo] = useState({
    ProductName: "",
    QuantityInStock: "",
    QuantitySold: "",
    UnitPrice: "",
    Supplier: ""
  });

  const [message, setMessage] = useState("");
  const [variant, setVariant] = useState("success");

  const updateForm = (e) => {
    setProductInfo({ ...productInfo, [e.target.name]: e.target.value });
  };

  const postData = async (e) => {
    e.preventDefault();

    if (!productInfo.Supplier) {
      setMessage("Please enter Supplier ID");
      setVariant("danger");
      return;
    }

    const url = `http://127.0.0.1:8000/product/product/${productInfo.Supplier}/`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: productInfo.ProductName,
          quantity_in_stock: Number(productInfo.QuantityInStock),
          quantity_sold: Number(productInfo.QuantitySold),
          unit_price: Number(productInfo.UnitPrice)
        })        
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(`Product "${data.name}" added successfully!`);
        setVariant("success");
        setProductInfo({
          ProductName: "",
          QuantityInStock: "",
          QuantitySold: "",
          UnitPrice: "",
          Supplier: ""
        });
      } else {
        setMessage(data.detail || "Failed to add product");
        setVariant("danger");
      }

    } catch (error) {
      setMessage(error.message);
      setVariant("danger");
    }
  };

  return (
    <Card className="p-4 mt-4">
      <h3>Add New Product</h3>
      {message && <Alert variant={variant}>{message}</Alert>}
      <Form onSubmit={postData}>
        <Form.Group className="mb-3">
          <Form.Label>Supplier ID</Form.Label>
          <Form.Control
            type="number"
            name="Supplier"
            value={productInfo.Supplier}
            onChange={updateForm}
            placeholder="Enter Supplier ID"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Product Name</Form.Label>
          <Form.Control
            type="text"
            name="ProductName"
            value={productInfo.ProductName}
            onChange={updateForm}
            placeholder="Product Name"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Quantity In Stock</Form.Label>
          <Form.Control
            type="number"
            name="QuantityInStock"
            value={productInfo.QuantityInStock}
            onChange={updateForm}
            placeholder="Quantity In Stock"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Quantity Sold</Form.Label>
          <Form.Control
            type="number"
            name="QuantitySold"
            value={productInfo.QuantitySold}
            onChange={updateForm}
            placeholder="Quantity Sold"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Unit Price</Form.Label>
          <Form.Control
            type="number"
            step="0.01"
            name="UnitPrice"
            value={productInfo.UnitPrice}
            onChange={updateForm}
            placeholder="Unit Price"
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Add Product
        </Button>
      </Form>
    </Card>
  );
};

export default AddProducts;
