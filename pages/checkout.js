import React from 'react'
import Link from 'next/link';
import { AiOutlineMinusSquare, AiOutlinePlusSquare } from 'react-icons/ai';
import {MdShoppingCartCheckout} from 'react-icons/md'
import Head from 'next/head';
import Script from 'next/script';

const Checkout = ({cart, subTotal, addToCart, removeFromCart }) => {
  const initiatePayment = async()=>{
    let oid = Math.floor(Math.random() * Date.now());
    //Get a transaction token
    const data = { cart, subTotal , oid, email :'email'};

    let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pretransaction`,{
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    let txnRes = await a.json();
    console.log(txnRes); 
    let txnToken = txnRes.txnToken;
      
    var config = {
      "root": "",
      "flow": "DEFAULT",
      "data": {
      "orderId": oid , /* update order id */
      "token": txnToken, /* update token value */
      "tokenType": "TXN_TOKEN",
      "amount": subTotal /* update amount */
      },
      "handler": {
        "notifyMerchant": function(eventName,data){
          console.log("notifyMerchant handler function called");
          console.log("eventName => ",eventName);
          console.log("data => ",data);
        } 
      }
    };

    window.Paytm.CheckoutJS.init(config).then(function onSuccess() {
        // after successfully updating configuration, invoke JS Checkout
        window.Paytm.CheckoutJS.invoke();
    }).catch(function onError(error){
        console.log("error => ",error);
    });

  }
  return (
    <div className='container px-2 m-auto'>

      <Head><meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0"/></Head>
      <Script type="application/javascript" crossorigin="anonymous" src={`${process.env.NEXT_PUBLIC_PAYTM_HOST}/merchantpgpui/checkoutjs/merchants/${process.env.NEXT_PUBLIC_PAYTM_MID}.js`}/>

      <h1 className='font-bold text-3xl my-8 text-center'>Checkout</h1>
      <h2 className='semi-bold text-xl'>1. Delivery Details</h2>
      <div className="mx-auto flex">
        <div className="px-2 w-1/2">
          <div className=" mb-4">
            <label htmlFor="name" className="leading-7 text-sm text-gray-600">Name</label>
            <input type="text" id="name" name="name" className="w-full bg-white rounded border border-gray-300 focus:border-gray-500 focus:ring-2 focus:ring-gray-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
          </div>
        </div>
        <div className="px-2 w-1/2">
          <div className=" mb-4">
            <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
            <input type="email" id="email" name="email" className="w-full bg-white rounded border border-gray-300 focus:border-gray-500 focus:ring-2 focus:ring-gray-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
          </div>
        </div>
      </div>
        <div className="px-2 w-full">
          <div className=" mb-4">
            <label htmlFor="address" className="leading-7 text-sm text-gray-600">Address</label>
            <textarea name="address" id="address" cols="30" rows="2" className="w-full bg-white rounded border border-gray-300 focus:border-gray-500 focus:ring-2 focus:ring-gray-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"></textarea>
          </div>
        </div>
      <div className="mx-auto flex">
        <div className="px-2 w-1/2">
          <div className=" mb-4">
            <label htmlFor="phone" className="leading-7 text-sm text-gray-600">Phone</label>
            <input type="phone" id="phone" name="phone" className="w-full bg-white rounded border border-gray-300 focus:border-gray-500 focus:ring-2 focus:ring-gray-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
          </div>
        </div>
        <div className="px-2 w-1/2">
          <div className=" mb-4">
            <label htmlFor="city" className="leading-7 text-sm text-gray-600">City</label>
            <input type="text" id="city" name="city" className="w-full bg-white rounded border border-gray-300 focus:border-gray-500 focus:ring-2 focus:ring-gray-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
          </div>
        </div>
      </div>
      <div className="mx-auto flex">
        <div className="px-2 w-1/2">
          <div className=" mb-4">
            <label htmlFor="state" className="leading-7 text-sm text-gray-600">State</label>
            <input type="text" id="state" name="state" className="w-full bg-white rounded border border-gray-300 focus:border-gray-500 focus:ring-2 focus:ring-gray-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
          </div>
        </div>
        <div className="px-2 w-1/2">
          <div className=" mb-4">
            <label htmlFor="pincode" className="leading-7 text-sm text-gray-600">PinCode</label>
            <input type="text" id="pincode" name="pincode" className="w-full bg-white rounded border border-gray-300 focus:border-gray-500 focus:ring-2 focus:ring-gray-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
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
          <Link href={'/checkout'}><button  onClick={initiatePayment} className="flex mr-6 px-1 text-white bg-gray-500 border-0  focus:outline-none hover:bg-gray-600 rounded text-md  items-center"><MdShoppingCartCheckout className='m-1'/>Pay ₹{subTotal}</button></Link>
      </div>
    </div>
  )
}

export default Checkout
