import React, { useState } from 'react';
import { RiDeleteBin5Fill } from 'react-icons/ri';
import { AiOutlinePlusSquare, AiOutlineMinusSquare } from 'react-icons/ai';
import {v4 as uuidv4} from 'uuid';
import { CountUpCartItem,CountDownCartItem, DeleteCartItem } from '../api/api';

const ICON_CLASS ='transition-all cursor-pointer hover:text-brand hover:scale-105 mx-1';
export default function CartItem({
  cartproduct,
  setCartProduct,
  product,
  product: { id, image, name, size, count, price },
  uid,}){
  // const [init,setInit] = useState(product.count)
  const uuid = uuidv4();
  //상품 삭제하기 

  const handleDelete = () => {
      DeleteCartItem(product.id,product.size)
      .then(() => {
        setCartProduct(prev => prev.filter((val) => 
        (val.id !== product.id || val.size !== product.size)))})
      .catch((error) => console.log(error))}

  // const handleMinus = () => {
  //   if (quantity < 2) return;
  //   addOrUpdateToCart(uid, { ...product, quantity: quantity - 1 });
  // };
  // const handlePlus = () =>
  //   addOrUpdateToCart(uid, { ...product, quantity: quantity + 1 });

  const addCount = () => {
    const data = JSON.stringify({
      "size" : product.size})
    CountUpCartItem(product.id,product.size)
    .then((res) => setCartProduct(res.data) )    
    .catch(() => alert("올바른 사이즈를 입력하세요."))}

  const deleteCount = () =>{
    CountDownCartItem(product.id,product.size)
    .then((res) => setCartProduct(res.data))}
  // setCartProduct(prev => 
  //   prev.map(values => 
  //   values.id === product.id && values.size === product.size ? )

  return (
    <li className='flex justify-between my-2 items-center' >
      <img className='w-24 md:w-48 rounded-lg' src={product.imgKey}  />
      <div className='flex-1 flex justify-between ml-4'>
        <div className='basis-3/5'>
        
          <p className='text-lg'>{product.name}</p>
          <p className='text-xl font-bold'>{product.size}</p>
          <p>₩{product.price}</p>
        </div>
        
        {!product.stock_zero ? <div className='font-bold text-red-600'>품절입니다.</div> 
        : <div className='text-2xl flex items-center'>
          <AiOutlineMinusSquare type ="button" className={ICON_CLASS} onClick={deleteCount} />
          <span>{product.count}</span>
          <AiOutlinePlusSquare className={ICON_CLASS} onClick={addCount}/>
          <RiDeleteBin5Fill className={ICON_CLASS} onClick={handleDelete} />
        </div>}
      </div>
    </li>
  );
}
