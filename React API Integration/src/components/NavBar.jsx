import React, { useContext, useState, useEffect } from 'react'
import { Navbar, Nav, Form, FormControl, Button, Badge } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { ProductContext } from '../ProductContext'

const NavBar = () => {
    const [search, setSearch] = useState('')
    const [products, setProducts] = useContext(ProductContext)
    const [allProducts, setAllProducts] = useState([])

    // Update allProducts whenever products change (after fetching)
    useEffect(() => {
        setAllProducts(products.data)
    }, [products.data])

    const updateSearch = (e) => {
        setSearch(e.target.value)
    }

    const filteredProduct = (e) => {
        e.preventDefault()
        if (!search) {
            setProducts({ data: allProducts })
            return
        }
        const filtered = allProducts.filter(product =>
            product.name.toLowerCase().includes(search.toLowerCase())
        )
        setProducts({ data: filtered })
    }

    return (
        <Navbar bg='dark' expand="lg" variant="dark">
            <Navbar.Brand href="#home">Inventory Management App </Navbar.Brand>
            <Navbar.Collapse id='basic-navbar-nav'>
                <Nav className='mr-auto'>
                    <Badge className='mt-2' variant='primary'> Products In Stock {products.data.length} </Badge>
                </Nav>
                <Form className="d-flex" onSubmit={filteredProduct}>
                    <Link to="/addproduct" className='btn btn-primary btn-sm mr-4'>Add Product</Link>
                    <FormControl 
                        value={search} 
                        onChange={updateSearch} 
                        type='text' 
                        placeholder="Search" 
                        className="mr-sm-2"
                    />
                    <Button type="submit" variant="outline-primary">Search</Button>
                </Form> 
            </Navbar.Collapse>
        </Navbar>
    )
}

export default NavBar
