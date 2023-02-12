import axios from 'axios';
import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import Categories from '../components/Categories';

export default function EditProductDetail() {
    const location = useLocation();


    const [editform, setEditForm] = useState({})


    const id = location.state.product.id;



    useEffect(()=>{
        axios({
            method: "get",
            url : `http://3.38.35.43:8080/register/product/${id}`, //url이 안먹히는듯
            headers: {  
             "Content-Type": "application/json",
              "Authorization" : window.localStorage.getItem('Login')
            }
        }).then((response) => {
            console.log("수정할 데이터 값을 가져왔습니다.");
            console.log(id)
            console.log(response.data)
            setEditForm(response.data)
    
         })
         .catch((error) => console.log(error))
    },[] )
    
    //상품 재고 갯수 변경하기
    const ChangeStock = () =>{

    }
    

  return (
    <div>
        <li>상품 아이디는 : "{editform.id}"</li>
        <li>상품 이름은 : "{editform.name}"</li>
        <li>상품 가격은 : "{editform.price}"</li>
        <li>상품 카테고리 : "{editform.category}"</li>
        <li>상품 설명 : " {editform.description}"</li>
        <button onClick={ChangeStock}> 상품 재고 변경하기</button>

    </div>
  )
}