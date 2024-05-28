import React, { useDebugValue, useEffect, useState } from "react";
import Products from "../api/Products";
import mouse from "../assets/img/mouse.png";
import { useNavigate } from 'react-router-dom'

const ProductComponent = () => {
  const [cart, setCart] = useState([]);
 const [ search ,setSearch]=useState('');
 const navigate =useNavigate()

useEffect(() => {
  const storecart = localStorage.getItem("cart");
  if (storecart) {
    setCart(JSON.parse(storecart));
  }
}, [localStorage]);

  const handleAddToCart = (productid) => {

   const product = Products[productid];
     
    
      setCart([...cart, { pid: product.id, name :product.name, 
        price: product.price,
        img:product.img,
         qty: 1 }]);
      console.log("cart", cart);
      
  
  };

  

  useEffect(() => {
    const scart= localStorage.setItem("cart", JSON.stringify(cart));
    console.log("caritem", cart);
    // setCart(scart)
  }, [cart]);
  const handleGoTOcart=()=>{
      console.log("Cart addes")
      // Navigate.
      navigate('/cart')

  }

  const filterSearch =Products.filter((product)=>
    product.name.toLowerCase().includes(search.toLowerCase())
  )

  console.log(filterSearch)

  
  return (
    <div className="w-full h-full">
      <div className="flex justify-between  bg-blue-400  p-5 
      max-md:flex-col justify-center">
        <div className=" text-center font-medium text-3xl text-white ">
          <h1>Logo </h1>
        </div>
        <div className=" max-md:ml-10 max-md:mt-4 max-sm:ml-2">
          <div className="flex">
              <div className="relative -right-6 top-4">

              <i className="fa-solid fa-magnifying-glass text-gray-400"></i>
              </div>
            <input
              type="search"
              placeholder="search here for products"
              className="px-6 py-3 border-2 "
              value={search}
              onChange={(e)=>{ setSearch(e.target.value)}}
            />
            
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center mt-20">
     
        <div className="">
          <ul className="grid grid-cols-3 gap-20 max-md:grid-cols-1">
           {filterSearch.length===0? (
              <p>No such item</p>
            ):(filterSearch.map((product, id) => {
              return (
                <li key={id}>
                  <div className="flex flex-col rounded-sm ">
                    <div className="">
                      <img
                        src={product.img}
                        alt={product.name}
                        className="w-[300px] h-[300px] object-cover"
                      />
                    </div>
                    <div
                      className="bg-white shadow-3xl border-2 
                 flex flex-col justify-between px-6 space-y-3  py-4"
                    >
                      <h1 className="text-lg font-bold ">{product.name}</h1>
                      <p>₹ {product.price}</p>

                      {  cart.some((item) => item.pid=== product.id) ? (
                        <button
                          className="bg-blue-500 rounded-full px-10 py-2 "
                          onClick={handleGoTOcart}
                        >
                          GO TO CART
                        </button>
                      ) : (
                        <button
                          className="bg-blue-500 rounded-full px-10 py-2 "
                          onClick={() => {
                            handleAddToCart(id);
                          }}
                        >
                          ADD TO CART
                        </button>
                      )}
                    </div>
                  </div>
                </li>
              );
            }))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProductComponent;
