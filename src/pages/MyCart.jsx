import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import CartItem from '../components/CartItem';
import { BsFillPlusCircleFill } from 'react-icons/bs';
import { FaEquals } from 'react-icons/fa';
import PriceCard from '../components/PriceCard';
import Button from '../components/ui/Button';
import axios from 'axios';
import { createContext } from 'react';
import { v4 as uuidv4 } from 'uuid';


const SHIPPING = 3000;
const baseURL = process.env.REACT_APP_URL;

export const ContextCartProduct = createContext();

export default function MyCart() {

  const [cartproduct, setCartProduct] = useState('')
  const uuid = uuidv4();
    //장바구니 상품 가져오기 
    useEffect(() => {
      axios.get(`${baseURL}/user/cart`,{
        headers:{
          "Content-Type": "application/json",
          "Authorization": window.localStorage.getItem('Login')
        }
      }).then((response) => {
        console.log(response.data)
        
        setCartProduct(response.data)
        
      }    
    )
    },[])

    // console.log(cartproduct&& cartproduct[0].price)
    // console.log(cartproduct[0].price)

  const hasProducts = cartproduct.length > 0;

  //이건 왜안되지?
  // console.log(cartproduct[0].price)

  //총금액
 

      //이게됨.
      let totalprice = 0
      cartproduct&&
      cartproduct.map((product)=>(
        totalprice = totalprice + Number(product.price) * Number(product.count)
      ));
      

      //품절된 상품들의 가격들
      let stock_zero_price = 0
        cartproduct && 
        cartproduct.map((product)=> 
          product.stock_zero === false ? stock_zero_price += product.price: "")
        
          
        
        


  return (
       
    <section className='p-8 flex flex-col'>
    
      <p className='text-2xl text-center font-bold pb-4 border-b border-gray-300'>
        내 장바구니
      </p>
      {!hasProducts && <p>장바구니에 상품이 없습니다. 열심히 쇼핑해 주세요!</p>}
      {hasProducts && (
        <>
          <ul className='border-b border-gray-300 mb-8 p-4 px-8'>
            {cartproduct &&
              cartproduct.map((product) => (
                <CartItem  key= {product.id + product.size} product={product} setCartProduct={setCartProduct} cartproduct={cartproduct} />
              ))}
          </ul>

          <div className='flex justify-between items-center mb-6 px-2 md:px-8 lg:px-16'>
            <PriceCard text='상품 총액' price={totalprice - stock_zero_price} />
            <BsFillPlusCircleFill className='shrink-0' />
            <PriceCard text='배송액' price={SHIPPING} />
            <FaEquals className='shrink-0' />
            <PriceCard text='총가격' price={totalprice + SHIPPING - stock_zero_price} />
          </div>
          <Button text='주문하기' />
        </>
      )}
      {/* <ContextCartProduct.Provider value={cartproduct}>
    <CartItem/>
  </ContextCartProduct.Provider>  */}
    </section>
    
  );
  
}
