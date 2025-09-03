import React, { useEffect, useState } from "react";
import { Modal, Button, Table, Form } from "react-bootstrap";

const SupplierDetails = ({ show, handleClose, supplierId, productId }) => {
  const [supplier, setSupplier] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  // Mail form states
  const [showMailForm, setShowMailForm] = useState(false);
  const [mailData, setMailData] = useState({ subject: "", message: "" });

  useEffect(() => {
    if (show && supplierId) {
      fetchSupplier();
    } else if (show && !supplierId) {
      setSupplier({ name: "", company: "", email: "", phone: "" });
    }
  }, [show, supplierId]);

  const fetchSupplier = async () => {
    try {
      const res = await fetch(`http://127.0.0.1:8000/supplier/supplier/${supplierId}/`);
      if (!res.ok) throw new Error("Supplier not found");
      const data = await res.json();
      setSupplier(data);
    } catch (err) {
      console.error(err);
      setSupplier(null);
    }
  };

  const handleChange = (e) => setSupplier({ ...supplier, [e.target.name]: e.target.value });

  const handleUpdate = async () => {
    try {
      const res = await fetch(`http://127.0.0.1:8000/supplier/supplier/update/${supplierId}/`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(supplier),
      });
      const updated = await res.json();
      if (!res.ok) throw new Error(updated.detail || "Update failed");
      setSupplier(updated);
      setIsEditing(false);
      alert("Supplier updated successfully ✅");
    } catch (err) {
      alert("Update failed: " + err.message);
    }
  };

  const handleAdd = async () => {
    try {
      const res = await fetch(`http://127.0.0.1:8000/supplier/supplier/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(supplier),
      });
      const newSupplier = await res.json();
      if (!res.ok) throw new Error(newSupplier.detail || "Add failed");
      setSupplier(newSupplier);
      setIsAdding(false);
      alert("Supplier added successfully ✅");
    } catch (err) {
      alert("Add failed: " + err.message);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this supplier and all their products?")) return;
    try {
      const res = await fetch(`http://127.0.0.1:8000/supplier/supplier/delete/${supplierId}/`, { method: "DELETE" });
      const result = await res.json();
      if (!res.ok) throw new Error(result.detail || "Delete failed");
      alert("Supplier and their products deleted ✅");
      handleClose();
    } catch (err) {
      alert("Delete failed: " + err.message);
    }
  };

  // Mail form handlers
  const handleMailChange = (e) => setMailData({ ...mailData, [e.target.name]: e.target.value });

  const handleSendMail = async () => {
    try {
      if (!productId) {
        alert("No product selected for this supplier");
        return;
      }
      const res = await fetch(`http://127.0.0.1:8000/email/${productId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(mailData),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.detail || "Email sending failed");
      alert("Email sent successfully ✅");
      setShowMailForm(false);
      setMailData({ subject: "", message: "" });
    } catch (err) {
      alert("Send failed: " + err.message);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header>
        <Modal.Title>
          {isAdding ? "Add Supplier" : isEditing ? "Update Supplier" : "Supplier Details"}
        </Modal.Title>
        <Button variant="danger" onClick={handleClose} style={{ border: "none", padding: "0.25rem 0.5rem", fontSize: "1.2rem", lineHeight: "1" }}>
          &times;
        </Button>
      </Modal.Header>
      <Modal.Body>
        {supplier ? (
          isEditing || isAdding ? (
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control name="name" value={supplier.name} onChange={handleChange} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Company</Form.Label>
                <Form.Control name="company" value={supplier.company} onChange={handleChange} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" name="email" value={supplier.email} onChange={handleChange} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Phone</Form.Label>
                <Form.Control name="phone" value={supplier.phone} onChange={handleChange} />
              </Form.Group>
            </Form>
          ) : (
            <>
              <Table bordered>
                <tbody>
                  <tr><th>Id</th><td>{supplier.id}</td></tr>
                  <tr><th>Name</th><td>{supplier.name}</td></tr>
                  <tr><th>Company</th><td>{supplier.company}</td></tr>
                  <tr><th>Email</th><td>{supplier.email}</td></tr>
                  <tr><th>Phone</th><td>{supplier.phone}</td></tr>
                </tbody>
              </Table>

              {showMailForm && (
                <Form className="mt-3">
                  <Form.Group className="mb-2">
                    <Form.Label>Subject</Form.Label>
                    <Form.Control name="subject" value={mailData.subject} onChange={handleMailChange} />
                  </Form.Group>
                  <Form.Group className="mb-2">
                    <Form.Label>Message</Form.Label>
                    <Form.Control as="textarea" rows={4} name="message" value={mailData.message} onChange={handleMailChange} />
                  </Form.Group>
                  <Button variant="primary" className="me-2" onClick={handleSendMail}>Send Mail</Button>
                  <Button variant="secondary" onClick={() => setShowMailForm(false)}>Cancel</Button>
                </Form>
              )}
            </>
          )
        ) : <p>No supplier details found</p>}
      </Modal.Body>
      <Modal.Footer>
        {isEditing ? (
          <>
            <Button variant="success" onClick={handleUpdate}>Save Changes</Button>
            <Button variant="secondary" onClick={() => setIsEditing(false)}>Cancel</Button>
          </>
        ) : isAdding ? (
          <>
            <Button variant="success" onClick={handleAdd}>Add Supplier</Button>
            <Button variant="secondary" onClick={() => setIsAdding(false)}>Cancel</Button>
          </>
        ) : (
          <>
            <Button variant="success" className="me-2" onClick={() => { setIsAdding(true); setSupplier({ name: "", company: "", email: "", phone: "" }); }}>Add Supplier</Button>
            <Button variant="info" className="me-2" onClick={() => setIsEditing(true)}>Update</Button>
            <Button variant="danger" className="me-2" onClick={handleDelete}>Delete</Button>
            <Button variant="warning" onClick={() => setShowMailForm(true)}>Send Mail</Button>
          </>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default SupplierDetails;
