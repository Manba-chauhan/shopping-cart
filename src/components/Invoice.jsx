import React, { useEffect, useState } from 'react';

const Invoice = () => {
  const [cartdetail,setCartDetail]=useState([])
  useEffect(()=>{
      const cart = JSON.parse(localStorage.getItem("cart"));
      console.log(cart)
      setCartDetail(cart)


  },[localStorage])
  useEffect(()=>{

  },[])

   const totalAmount = () => {
     // debugger
    //  console.log("x", storecart);

     return cartdetail.reduce((total, item) => total + item.price * item.qty, 0);
   };
  return (
    <div className="bg-blue-400 max-w-full   mx-auto shadow-lg p-20 
    mt-20 text-nowrap max-md:p-5">
      <div className="">
        <h1 className="text-4xl  mt-5 mb-10 font-bold text-white underline underline-offset-8
         tracking-widest">
          Your Order Details
        </h1>
      </div>
      {cartdetail.map((product,index) => {
        return (
          <div className=" w-1/2 flex  flex-col max-md:w-full">
          
            <hr></hr>
            <div className="my-4  flex justify-start  space-x-32 ">
              <label className="text-black font-semibold tracking-wider leading-loosed">
                Product Name
              </label>
              <p className="text-md text-black leading-loosed tracking-wider">
                {product.name}
              </p>
            </div>
            <div className="my-4 flex justify-start  space-x-28 ">
              <label className="text-black font-semibold tracking-wider leading-loosed">
                Per Product Price{" "}
              </label>
              <p className="text-md text-black leading-loosed tracking-wider">
                {product.price}
              </p>
            </div>
            <div className="my-4 flex justify-start  space-x-44 ">
              <label className="text-black font-semibold tracking-wider leading-loosed">
                Quantity{" "}
              </label>
              <p className="text-md text-black leading-loosed tracking-wider">
                {product.qty}
              </p>
            </div>
          </div>
        );
      })}
     <hr></hr> <div className="my-4 flex justify-start  space-x-40 text-white font-bold ">
        <label className="text-black font-bold tracking-wider leading-loosed">
          Total Price
        </label>
        <p className="text-md text-black leading-loosed tracking-wider">
          {" "}
          Rs. {totalAmount()}
        </p>
      </div>
      <div className="flex justify-center items-center mt-20 ">
        <h2 className="text-5xl font-bold shadow-slate-500 text-white
         underline underline-offset-8 max-md:text-4xl">
          {" "}
          * Thank You For Order *{" "}
        </h2>
      </div>
    </div>
  );
}

export default Invoice;
