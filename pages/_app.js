import { useRouter } from 'next/router';
import { useEffect, useState } from 'react'
import Head from 'next/head'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import LoadingBar from 'react-top-loading-bar'
import '@/styles/globals.css'

export default function App({ Component, pageProps }) {
  const [cart, setCart] = useState({});
  const [subTotal, setSubTotal] = useState(0);
  const [user,setUser] = useState({value:null});
  const [key, setKey] = useState(); 
  const router = useRouter();
  const [progress, setProgress] = useState(0)

  useEffect(()=>{
    router.events.on('routeChangeStart', ()=>{
      setProgress(40);
    })
    router.events.on('routeChangeComplete', ()=>{
      setProgress(100);
    })

    // console.log("hey i am a useEffect from _app.js")
    try {
      if(localStorage.getItem('cart')){
        setCart(JSON.parse(localStorage.getItem('cart')))
        saveCart(JSON.parse(localStorage.getItem('cart')))
      }
    } catch (error) {
      // console.error(error);
      localStorage.clear();
    }
    const myuser = JSON.parse(localStorage.getItem('myuser'));
    if(myuser){
      setUser({value:myuser.token, email: myuser.email});
    }
    setKey(Math.random())
  },[router.query])

  const logout = ()=>{
    localStorage.removeItem("myuser");
    setUser({value:null})
    setKey(Math.random());
    router.push('/');
  }
  const saveCart=(myCart)=>{
    localStorage.setItem('cart',JSON.stringify(myCart))
    let subt = 0;
    let keys = Object.keys(myCart);
    for(let i = 0 ; i < keys.length ; i++){
      subt += myCart[keys[i]].price * myCart[keys[i]].qty;
    }
    setSubTotal(subt);
  }

  const addToCart = (itemCode, qty, price, name, size, variant)=>{
    let newCart = cart;
    if(itemCode in cart){
      newCart[itemCode].qty = cart[itemCode].qty + qty
    }
    else{
      newCart[itemCode] = {qty: 1, price, name, size, variant}
    }
    setCart(newCart)
    saveCart(newCart)
  }

  const removeFromCart = (itemCode, qty, price, name, size, variant)=>{
    let newCart = cart;
    if(itemCode in cart){
      newCart[itemCode].qty = cart[itemCode].qty - qty
    }
    if(newCart[itemCode].qty <= 0){
      delete newCart[itemCode]
    }

    setCart(newCart)
    saveCart(newCart)
  }
  const buyNow=(itemCode, qty, price, name, size, variant)=>{
    let newCart = {};
    newCart[itemCode] = {qty: 1, price,name, size, variant};
    setCart(newCart)
    saveCart(newCart)
    // console.log(newCart);
    router.push('/checkout')
  }
  const clearCart = ()=>{
    setCart({})
    saveCart({})
  }
  return (
    <>
      <Head>
        <title>ShopReacter.com</title>
        <meta name="description" content="ShopReacter.com - Wrap Yourself In Cozy" />
        <meta name="viewport" content="width=device-width , initial-scale=1.0 , minimum-scale=1.0"/>  
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <LoadingBar color='#FFFFFF' progress={progress} onLoaderFinished={() => setProgress(0)} waitingTime={400}/>
      {key && <Navbar Logout={logout} user={user} key={key} cart={cart} addToCart={addToCart} removeFromCart={removeFromCart} clearCart={clearCart} subTotal = {subTotal}/>}
      {/* <Component buyNow={buyNow} {...pageProps} cart={cart} addToCart={addToCart} removeFromCart={removeFromCart} clearCart={clearCart} subTotal = {subTotal} /> */}
      <Component user={user} buyNow={buyNow} {...pageProps} cart={cart} addToCart={addToCart} removeFromCart={removeFromCart} clearCart={clearCart} subTotal = {subTotal} />
      <Footer/>
    </>
  )
}
