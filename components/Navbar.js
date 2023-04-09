import React, { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { TiShoppingCart } from 'react-icons/ti';
import { AiFillCloseCircle, AiOutlineMinusSquare, AiOutlinePlusSquare } from 'react-icons/ai';
import {MdShoppingCartCheckout ,MdAccountCircle} from 'react-icons/md'


const Navbar = ({cart, addToCart, removeFromCart, clearCart, subTotal}) => {
  console.log(cart, addToCart, removeFromCart, clearCart, subTotal)
  const toggleCart = ()=>{
    if(ref.current.classList.contains('translate-x-full')){
      ref.current.classList.remove('translate-x-full')
      ref.current.classList.add('translate-x-0')
    }
    else if(!ref.current.classList.contains('translate-x-full')){
      ref.current.classList.remove('translate-x-0')
      ref.current.classList.add('translate-x-full')
    }
  }
  const ref = useRef();
  return (
    <div className='flex flex-col md:flex-row md:justify-start justify-center items-center my-2 shadow-md sticky top-0 z-10 bg-white'>
      <div className="logo mx-5">
        <Link href={'/'}><Image width={200} height={40} src="/logo.png" alt="" /></Link>
      </div>
      <div className="nav">
        <ul className='flex items-center space-x-8 font-bold md:text-md'>
          <Link legacyBehavior href={'/tshirts'}><a><li>Tshirts</li></a></Link>
          <Link legacyBehavior href={'/hoodies'}><a><li>Hoodies</li></a></Link>
          <Link legacyBehavior href={'/stickers'}><a><li>Stickers</li></a></Link>
          <Link legacyBehavior href={'/mugs'}><a><li>Mugs</li></a></Link>
        </ul>
      </div>
      <div className="cart absolute top-1 right-0 mx-5 cursor-pointer flex ">
        <Link href={'/login'} ><MdAccountCircle className='text-xl md:text-3xl'/></Link>
        <TiShoppingCart onClick={toggleCart}  className='text-xl md:text-3xl'/>
      </div>
      <div ref = {ref} className={`w-72 sideCart absolute top-0 right-0 bg-gray-100 px-10 py-10 transform transition-transform ${Object.keys(cart).length !== 0 ? 'translate-x-0': 'translate-x-full'} h-[100vh] z-50`}>
        <div className="font-bold text-x text-center">Shopping Cart</div>
        <span onClick={toggleCart} className='absolute top-2 right-2 cursor-pointer text-2xl'><AiFillCloseCircle/></span>
        <ol className= 'list-decimal item'>
          {Object.keys(cart).length==0 && <div className='my-4'>Your cart is Empty!</div>}
          {Object.keys(cart).map((k)=>{return < li key = {k}>
            <div className="item flex my-5">
              <div className="w-2/3 font-semibold">{cart[k].name}</div>
              <div className="flex font-semibold items-center justify-center w-1/3 space-x-4 text-lg"><AiOutlineMinusSquare onClick={()=>{removeFromCart(k, 1, cart[k].price, cart[k].name,cart[k].size, cart[k].variant)}} className='cursor-pointer'/><span className='mx-2'>{cart[k].qty}</span><AiOutlinePlusSquare onClick={()=>{addToCart(k, 1, cart[k].price, cart[k].name,cart[k].size, cart[k].variant)}} className='cursor-pointer'/></div>
            </div>
          </li>})} 
        </ol>
        <div className='font-bold my-3'>Subtotal: ₹{subTotal}</div>
        <div className="flex px-1">
          <Link href={'/checkout'}><button className="flex mr-6 px-1 text-white bg-gray-500 border-0  focus:outline-none hover:bg-gray-600 rounded text-md  items-center"><MdShoppingCartCheckout className='m-1'/>Checkout</button></Link>
          <button onClick={clearCart} className="flex px-1  text-white bg-gray-500 border-0  focus:outline-none hover:bg-gray-600 rounded text-md items-center">Clear Cart</button>
        </div>
      </div>
    </div>
  ) 
}

export default Navbar
   