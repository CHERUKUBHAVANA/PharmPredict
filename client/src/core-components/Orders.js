import React, { useState, useEffect } from 'react'
import Layout from './Layout'
import axios from 'axios';
import { Table } from 'react-bootstrap';
const ViewOrders = () =>{
    const [orders, setOrders] = useState([])
    useEffect(() => {
        const fetchOrders = async () => {
          try {
            const response = await axios.get(`${process.env.REACT_APP_API}/orders`);
            setOrders(Object.entries(response.data.orders))
          } catch (error) {
            console.error('Error fetching user cart:', error);
          }
        };
    
        fetchOrders();
      }, []);
    return(
        <Layout>
            <h1 style={{textAlign:'center'}}>Orders</h1>
            <Table striped bordered hover>
                <thead>
                    <tr style={{textAlign:'center'}}>
                        <th>Pharmacy Name</th>
                        <th>Items</th>
                    </tr>
                </thead>
                <tbody style={{textAlign:'center'}}>
                    {orders.map(([orderId, order]) => (
                        <tr key={orderId}>
                            <td>{orderId}</td>
                            <td>
                                <ul style={{listStyleType:'none'}}>
                                    {order.map(item => (
                                        <li key={item.id}>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Layout>
    )
}
export default ViewOrders;