import { useRouter } from 'next/router'
import { useState } from 'react'
import mongoose from 'mongoose'
import Product from '@/models/Product'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Post = ({buyNow, addToCart, product, variants}) => {
  // console.log(product,variants)
  const router = useRouter()
  const { slug } = router.query

  const [pin, setPin] = useState();
  const [service, setService] = useState();

  const checkServiceAvailability =async()=>{
    let pins = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pincode`)
    let pinJson = await pins.json()
    if(Object.keys(pinJson).includes((pin))){
      setService(true)
      toast.success('Your pincode is Serviceable', {
        position: "bottom-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    else{
      setService(false)
      toast.error('Sorry , Your pincode is not Serviceable', {
        position: "bottom-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }
  const onChangePin = (e)=>{
    setPin(e.target.value)
  }

  const [color, setColor] = useState(product.color)
  const [size, setSize] = useState(product.size)
  const refreshVariant = (newsize, newcolor)=>{
    // console.log('v is', variants)
    let url = `${process.env.NEXT_PUBLIC_HOST}/product/${variants[newcolor][newsize]['slug']}`
    window.location= url;
  }

  return <>
    <ToastContainer
      position="bottom-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
    />
    <section className="text-gray-600 body-font overflow-hidden">
  <div className="container px-5 py-16 mx-auto">
    <div className="lg:w-4/5 mx-auto flex flex-wrap">
      <img alt="ecommerce" className="lg:w-1/2 w-full lg:h-auto px-24 object-cover object-center rounded" src={product.img}/>
      <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
        <h2 className="text-sm title-font text-gray-500 tracking-widest">SHOPREACTER</h2>
        <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{product.title}({product.size}/{product.color}) </h1>
        <p className="leading-relaxed">{product.desc}</p>
        <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
          <div className="flex">
            <span className="mr-3">Color</span>
            {Object.keys(variants).includes('red') && Object.keys(variants['red']).includes(size) && <button onClick={()=>{refreshVariant(size, 'red')}} className={`border-2 border-gray-300 ml-1 bg-red-700 rounded-full w-6 h-6 focus:outline-none ${color === 'red' ? 'border-black': 'border-gray-300'}`}></button>}
            {Object.keys(variants).includes('blue') &&  Object.keys(variants['blue']).includes(size) && <button onClick={()=>{refreshVariant(size, 'blue')}} className={`border-2 border-gray-300 ml-1 bg-blue-700 rounded-full w-6 h-6 focus:outline-none ${color === 'blue' ? 'border-black': 'border-gray-300'}`}></button>}
            {Object.keys(variants).includes('black') &&  Object.keys(variants['black']).includes(size) && <button onClick={()=>{refreshVariant(size, 'black')}} className={`border-2 border-gray-300 ml-1 bg-black-700 rounded-full w-6 h-6 focus:outline-none ${color === 'black' ? 'border-black': 'border-gray-300'}`}></button>}
            {Object.keys(variants).includes('green') &&  Object.keys(variants['green']).includes(size) && <button onClick={()=>{refreshVariant(size, 'green')}} className={`border-2 border-gray-300 ml-1 bg-green-700 rounded-full w-6 h-6 focus:outline-none ${color === 'green' ? 'border-black': 'border-gray-300'}`}></button>}
            {Object.keys(variants).includes('purple') &&  Object.keys(variants['purple']).includes(size) && <button onClick={()=>{refreshVariant(size, 'purple')}} className={`border-2 border-gray-300 ml-1 bg-purple-700 rounded-full w-6 h-6 focus:outline-none ${color === 'purple' ? 'border-black': 'border-gray-300'}`}></button>}
            {Object.keys(variants).includes('yellow') &&  Object.keys(variants['yellow']).includes(size) && <button  onClick={()=>{refreshVariant(size, 'yellow')}}className={`border-2 border-gray-300 ml-1 bg-yellow-700 rounded-full w-6 h-6 focus:outline-none ${color === 'yellow' ? 'border-black': 'border-gray-300'}`}></button>}
          </div>
          <div className="flex ml-6 items-center">
            <span className="mr-3">Size</span>
            <div className="relative">
              <select value={size} onChange={(e)=>{refreshVariant(e.target.value, color)}} className="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-gray-500 text-base pl-3 pr-10">
                {Object.keys(variants[color]).includes('S') && <option value={'S'}>S</option>}
                {Object.keys(variants[color]).includes('M') && <option value={'M'}>M</option>}
                {Object.keys(variants[color]).includes('L') && <option value={'L'}>L</option>}
                {Object.keys(variants[color]).includes('XL') && <option value={'XL'}>XL</option>}
                {Object.keys(variants[color]).includes('XXL') && <option value={'XXL'}>XXL</option>}
        
              </select>
              <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4" viewBox="0 0 24 24">
                  <path d="M6 9l6 6 6-6"></path>
                </svg>
              </span>
            </div>
          </div>
        </div>
        <div className="flex">
          <span className="title-font font-medium text-2xl text-gray-900">₹{product.price}</span>
          <button onClick={()=>{buyNow(slug, 1,product.price,product.title,size,color)}} className="flex ml-4 text-white bg-gray-500 border-0 px-1 items-center focus:outline-none hover:bg-gray-600 rounded">Buy Now</button>
          <button onClick={()=>{addToCart(slug, 1,product.price,product.title,size,color) } } className="flex ml-4 text-white bg-gray-500 border-0 px-1 items-center focus:outline-none hover:bg-gray-600 rounded">Add to Cart</button>
          {/* <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
            <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
              <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
            </svg>
          </button> */}
        </div>
        <div className="pin mt-6 flex space-x-2 text-sm">
          <input onChange ={onChangePin} className='border-gray-400 px-2 border-2 rounded-md' placeholder='Enter your pincode' type="text" />
          <button onClick={checkServiceAvailability} className=' text-white bg-gray-500 border-0 py-2 px-6 focus:outline-none hover:bg-gray-600 rounded'>Check</button>
        </div>
        {!service && service != null && <div className="text-red-700">
          Sorry! We do not deliver to this pincode yet
        </div>}
        {service && service != null && <div className="text-green-700">
          yes! This pincode is serviceable
        </div>}

      </div>
    </div>
  </div>
</section>
  </>
}

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }
  let product = await Product.findOne({slug: context.query.slug});
  let variants = await Product.find({title: product.title, category: product.category});
  // console.log(variants)
  let colorSizeSlug = {}  //{red: {XL: {slug: 'wear-cozy'}}}
  for(let item of variants){
    if(Object.keys(colorSizeSlug).includes(item.color)){
      colorSizeSlug[item.color][item.size] = {slug: item.slug}
    }
    else{
      colorSizeSlug[item.color] = {}
      colorSizeSlug[item.color][item.size] = {slug: item.slug}
    }
  }
  return {
    props: { 
      product: JSON.parse(JSON.stringify(product)), 
      variants: JSON.parse(JSON.stringify(colorSizeSlug)) // will be passed to the page component as props
    }
  }
}
export default Post
