import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import Layout from './Layout'
import { isAuth } from '../auth-components/helpers'
import { Button, Table } from 'react-bootstrap';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify'
const ViewCart = () => {
  const [userCart, setUserCart] = useState([]);
  const [count, setCount] = useState(0)
  useEffect(() => {
    const fetchUserCart = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API}/user-cart/${isAuth()._id}`);
        // setUserCart(response.data.cart);
        const cartWithCount = response.data.cart.map(item => ({ ...item, count: 1 }));
        setUserCart(cartWithCount);
      } catch (error) {
        console.error('Error fetching user cart:', error);
      }
    };

    fetchUserCart();
  }, []);

  const removeFromCart = (drugId, indexToRemove, userId) => {
    const updatedCart = [...userCart];
    updatedCart.splice(indexToRemove, 1);
    // const updatedCart = userCart.filter((_, index) => index !== indexToRemove);
    setUserCart(updatedCart);
    axios({
      method: 'DELETE',
      url: `${process.env.REACT_APP_API}/remove-from-cart/${userId}/${drugId}`,
    })
      .then((res) => {
        toast.error(res.data.message);
      })
      .catch(() => {
        toast.error('Error removing product from cart, try again!');
      })
  }

  const incrementCount = (index) => {
    const updatedCart = [...userCart];
    updatedCart[index].count += 1; 
    setUserCart(updatedCart);
  };

  const decrementCount = (index) => {
    const updatedCart = [...userCart];
    if (updatedCart[index].count > 0) {
      updatedCart[index].count -= 1; 
    }
    setUserCart(updatedCart);
  };

  return (
    <Layout>
      <ToastContainer />
      <h1 style={{ textAlign: 'center' }}>My Cart:</h1>
      {userCart ? (
        <Table striped bordered hover responsive>
          <thead style={{ textAlign: 'center' }}>
          </thead>
          <tbody style={{ textAlign: 'center' }}>
            {userCart.map((medicine, index) => (
              <tr key={index}>
                <td style={{ display: 'grid', gridTemplateColumns: 'auto 8rem 8rem', placeItems: 'center' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '2rem 2rem 2rem 20rem', placeItems: 'center' }}>
                    <Button className='decrease' variant='secondary' onClick={()=>decrementCount(index)} style={{ cursor: 'pointer', border: '1px solid black', padding: '0.5rem', borderRadius: '10%' }}>-</Button>
                    <div style={{ width: '2rem', height: '2rem', border: '2px solid black', backgroundColor: 'black', borderRadius: '50%', color: 'white', marginLeft:'0.3rem', marginRight:'0.3rem' }}>{medicine.count}</div>
                    <Button className='increase' variant='secondary' onClick={()=>incrementCount(index)} style={{ cursor: 'pointer', border: '1px solid black', padding: '0.5rem', borderRadius: '10%' }}>+</Button>
                    <div style={{ display: 'grid', gridTemplateColumns: 'auto 2rem' }}>
                      <div>{medicine.name.toUpperCase()}</div>
                    </div>
                  </div>
                  <Button variant='success' style={{ border: '1.5px solid black', borderRadius: '10px', marginRight: '6px' }}>Buy</Button>
                  <Button variant='danger' onClick={() => removeFromCart(medicine.id, index, isAuth()._id)} style={{ border: '1.5px solid white', borderRadius: '10px' }} >Remove</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <p>Loading cart...</p>
      )}
    </Layout>
  )
}
export default ViewCart