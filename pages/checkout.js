import React, { useState } from 'react'
import Link from 'next/link';
import { AiOutlineMinusSquare, AiOutlinePlusSquare } from 'react-icons/ai';
import {MdShoppingCartCheckout} from 'react-icons/md'

// Function to generate a random order ID (you can use your own logic here)
const generateOrderId = () => {
  return 'ORD' + Math.floor(Math.random() * 1000000000);
};
const Checkout = ({cart, subTotal, addToCart, removeFromCart }) => {
  const [customerDetails, setCustomerDetails] = useState({
    name: '',
    email: '',
    address: '',
    phone: '',
    city: '',
    state: '',
    pincode: '',
  });
  const handleCashOnDelivery = () => {
    const { name, email, address, phone, city, state, pincode } = customerDetails;
    const orderAmount = subTotal;
    const selectedProducts = Object.values(cart);
    const orderId = generateOrderId();

    const orderDetails = {
      email,
      orderId,
      products: selectedProducts,
      address,
      amount: orderAmount,
      status: 'Initiated',
      customerDetails: {
        name,
        email,
        address,
        phone,
        city,
        state,
        pincode,
      },
    };
     // Send a request to your backend to create the order
    // You can use fetch or any HTTP library to make a POST request to your backend API endpoint
    fetch(`${process.env.NEXT_PUBLIC_HOST}/api/create-order`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(orderDetails)
    })
      .then(response => {
        if (response.ok) {
          // Order created successfully, perform further actions (e.g., show order details page)
          console.log('Order created successfully:', orderDetails);
          // Redirect to order confirmation page or perform necessary actions
        } else {
          // Handle error cases if order creation fails
          console.error('Failed to create order');
        }
      })
      .catch(error => {
        console.error('Error creating order:', error);
        // Handle any network errors
      });
  };
  return (
    <div className='container px-2 m-auto'>
      <h1 className='font-bold text-3xl my-8 text-center'>Checkout</h1>
      <h2 className='semi-bold text-xl'>1. Delivery Details</h2>
      <div className="mx-auto flex">
        <div className="px-2 w-1/2">
          <div className=" mb-4">
            <label htmlFor="name" className="leading-7 text-sm text-gray-600">Name</label>
            <input 
            type="text" 
            id="name" 
            name="name"
            value={customerDetails.name}
            onChange={(e) => setCustomerDetails({ ...customerDetails, name: e.target.value })} 
            className="w-full bg-white rounded border border-gray-300 focus:border-gray-500 focus:ring-2 focus:ring-gray-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
          </div>
        </div>
        <div className="px-2 w-1/2">
          <div className=" mb-4">
            <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
            <input 
            type="email" 
            id="email" 
            name="email" 
            value={customerDetails.email}
            onChange={(e) => setCustomerDetails({ ...customerDetails, email: e.target.value })}
            className="w-full bg-white rounded border border-gray-300 focus:border-gray-500 focus:ring-2 focus:ring-gray-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
          </div>
        </div>
      </div>
        <div className="px-2 w-full">
          <div className=" mb-4">
            <label htmlFor="address" className="leading-7 text-sm text-gray-600">Address</label>
            <textarea 
            name="address" 
            id="address" 
            cols="30" 
            rows="2"
            value={customerDetails.address}
            onChange={(e) => setCustomerDetails({ ...customerDetails, address: e.target.value })} 
            className="w-full bg-white rounded border border-gray-300 focus:border-gray-500 focus:ring-2 focus:ring-gray-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"></textarea>
          </div>
        </div>
      <div className="mx-auto flex">
        <div className="px-2 w-1/2">
          <div className=" mb-4">
            <label htmlFor="phone" className="leading-7 text-sm text-gray-600">Phone</label>
            <input 
            type="phone" 
            id="phone" 
            name="phone" 
            value={customerDetails.phone}
            onChange={(e) => setCustomerDetails({ ...customerDetails, phone: e.target.value })}
            className="w-full bg-white rounded border border-gray-300 focus:border-gray-500 focus:ring-2 focus:ring-gray-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
          </div>
        </div>
        <div className="px-2 w-1/2">
          <div className=" mb-4">
            <label htmlFor="city" className="leading-7 text-sm text-gray-600">City</label>
            <input 
            type="text" 
            id="city" 
            name="city"
            value={customerDetails.city}
            onChange={(e) => setCustomerDetails({ ...customerDetails, city: e.target.value })} 
            className="w-full bg-white rounded border border-gray-300 focus:border-gray-500 focus:ring-2 focus:ring-gray-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
          </div>
        </div>
      </div>
      <div className="mx-auto flex">
        <div className="px-2 w-1/2">
          <div className=" mb-4">
            <label htmlFor="state" className="leading-7 text-sm text-gray-600">State</label>
            <input 
            type="text" 
            id="state" 
            name="state"
            value={customerDetails.state}
            onChange={(e) => setCustomerDetails({ ...customerDetails, state: e.target.value })} 
            className="w-full bg-white rounded border border-gray-300 focus:border-gray-500 focus:ring-2 focus:ring-gray-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
          </div>
        </div>
        <div className="px-2 w-1/2">
          <div className=" mb-4">
            <label htmlFor="pincode" className="leading-7 text-sm text-gray-600">PinCode</label>
            <input 
            type="text" 
            id="pincode" 
            name="pincode"
            value={customerDetails.pincode}
            onChange={(e) => setCustomerDetails({ ...customerDetails, pincode: e.target.value })}
            className="w-full bg-white rounded border border-gray-300 focus:border-gray-500 focus:ring-2 focus:ring-gray-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
          </div>
        </div>
      </div>
      <h2 className='semi-bold text-xl'>2. Review Cart Items & Pay</h2>
      <div className=" sideCart  bg-gray-100 p-6 m-2 ">
        <ol className= 'list-decimal item'>
          {Object.keys(cart).length==0 && <div className='my-4'>Your cart is Empty!</div>}
          {Object.keys(cart).map((k)=>{return < li key = {k}>
            <div className="item flex my-5">
              <div className=" font-semibold">{cart[k].name}({cart[k].size}/{cart[k].variant})</div>
              <div className="flex font-semibold items-center justify-center w-1/3 space-x-4 text-lg"><AiOutlineMinusSquare onClick={()=>{removeFromCart(k, 1, cart[k].price, cart[k].name,cart[k].size, cart[k].variant)}} className='cursor-pointer'/><span className='mx-2'>{cart[k].qty}</span><AiOutlinePlusSquare onClick={()=>{addToCart(k, 1, cart[k].price, cart[k].name,cart[k].size, cart[k].variant)}} className='cursor-pointer'/></div>
            </div>
          </li>})}
        </ol>
        <span className='font-bold'>Subtotal: ₹{subTotal}</span>
      </div>
      <div className="mx-4">
          {/* <Link href={'/checkout'}><button  onClick={handleCashOnDelivery} className="flex mr-6 px-1 text-white bg-gray-500 border-0  focus:outline-none hover:bg-gray-600 rounded text-md  items-center"><MdShoppingCartCheckout className='m-1'/>Pay ₹{subTotal}</button></Link> */}
        <button onClick={handleCashOnDelivery} className="flex mr-6 px-1 text-white bg-gray-500 border-0  focus:outline-none hover:bg-gray-600 rounded text-md  items-center">
          <MdShoppingCartCheckout className='m-1' />
          Pay ₹{subTotal}
        </button>
      </div>
    </div>
  )
}

export default Checkout
