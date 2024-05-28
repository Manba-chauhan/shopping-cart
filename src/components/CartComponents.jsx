import React, { useEffect, useState } from 'react';
import products from '../api/Products'
import { json, useNavigate } from 'react-router-dom';

const CartComponents = () => {
   const[storecart,setCartShow]=useState([])
   const navigate=useNavigate()
  //  const
  
  useEffect(()=>{
   
       const cart = JSON.parse(localStorage.getItem("cart"));
        setCartShow(cart);
  },[localStorage])

   const handleAddItem =(productid)=>{

    
   
       const updatecart= storecart.map((product)=>{
           if(product.pid===productid){
              
                  return {
                    ...product,
                    qty: product.qty + 1,
                  
                  };
                  
                }
                return product
             
              })
              console.log("storecart",storecart)
              setCartShow(updatecart)
              localStorage.setItem("cart", JSON.stringify(updatecart));
     
      // }
      


   }
   const handleRemoveItem =(productid)=>{
    // debugger
    console.log(productid)
    const removeitem = storecart
      .map((product) => {

        if (product.pid === productid) {
          
          return {
            ...product,
            qty: product.qty - 1,
          };
        }

        return product;
      })
      .filter((product) => product.qty > 0);
    setCartShow(removeitem)
    localStorage.setItem("cart",JSON.stringify(removeitem))

   }
   
 const previouspage =()=>{
  //  JSON.parse(localStorage.getItem("cart"));
   navigate("/")
 }
 const handlenextPage =()=>{
    navigate("/invoice")
 }
 
 const totalAmount=()=>{
    // debugger
  console.log("x",storecart)
   
   return storecart.reduce(
                 (total, item) => total + item.price * item.qty,
                 0
               );  ;
 }
  return (
    <div className=" max-w-full flex justify-center items-center mt-32 overflow-auto">
      <div className="bg-white shadow-md p-10 max-sm:p-5">
        <div className="max-h-96 overflow-auto">
          <table className=" w-full border-collapse border border-slate-400 min-w-max ">
            <thead>
              <tr>
                <th className="border border-slate-300 px-8 py-2">No</th>
                <th className="border border-slate-300 px-8 py-2">image</th>
                <th className="border border-slate-300 px-8 py-2">Name</th>
                <th className="border border-slate-300 px-8 py-2">Price</th>
                <th className="border border-slate-300 px-8 py-2">qty </th>
              </tr>
            </thead>
            <tbody>
              {storecart &&  storecart.length > 0  ? (
                storecart.map((product, index) => {
                  return (
                    <tr className="text-center  ">
                      <td className="border border-slate-300 px-8 py-2 max-md:px-2 ">
                        {index + 1}
                      </td>
                      <td className="border border-slate-300 px-8 py-2">
                        <img
                          src={product.img}
                          alt={product.name}
                          className="w-20 h-20 mx-auto"
                        />
                      </td>
                      <td className="border border-slate-300 px-8 py-2">
                        {product.name}
                      </td>
                      <td className="border border-slate-300 px-8 py-2">
                        {product.price}
                      </td>
                      {/* <td className="border border-slate-300 px-8 py-2">{product.pid}</td> */}
                      <td className="border border-slate-300 px-8 py-2 ">
                        <button
                          className="px-2 border-2 border-gray-400 mx-2"
                          onClick={() => {
                            handleRemoveItem(product.pid);
                          }}
                        >
                          <i className="fa-solid fa-minus text-blue-600"></i>
                        </button>
                        {product.qty}
                        <button
                          className="px-2 border-2 border-gray-400 mx-2 "
                          onClick={() => {
                            handleAddItem(product.pid);
                          }}
                        >
                          <i className="fa-solid fa-plus text-blue-600"></i>
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="5" className="text-center">
                    No items in the cart
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <div className="mt-10 flex justify-end  space-x-6 max-md:justify-center">
            <label className="text-black font-semibold text-3xl">Total :</label>
            <p className="text-3xl font-bold text-black"> ₹{totalAmount()}</p>
          </div>
          <div className="mt-10 flex justify-between max-md:justify-center max-md:space-x-4">
            <button
              className="bg-blue-500 px-6 py-2 text-white rounded-md "
              onClick={previouspage}
            >
              Prev
            </button>
            <button
              className="bg-blue-500 px-6 py-2 text-white rounded-md"
              onClick={handlenextPage}
              disabled={storecart.length === 0 || totalAmount() === 0}
            >
              Processed
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartComponents;
