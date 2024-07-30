import React from 'react'
import { useState,useEffect } from 'react'
import { Link } from 'react-router-dom';

export default function Emails_display() {
    const [product,setProduct]=useState([]);
    useEffect(()=>
    {
        getproduct();
    },[])
    const getproduct=async()=>
    {
        let result=await fetch("http://localhost:5000/products");
        result=await result.json();
        setProduct(result);
    }
    
    
    const del=async (id)=>
    {
     let result=await fetch(`http://localhost:5000/delete/${id}`,{
      method:"Delete"
     });
     result=await result.json();
     if(result)
     {
      getproduct();
     }
    }

    const  searchHandle=async(e)=>
    {
      let key=e.target.value;
      if(key)
      {
        let result=await fetch(`http://localhost:5000/search/${key}`);
        result= await result.json();
        if(result)
        {
          setProduct(result);
        }
        
      }
      else{
        getproduct();
      }
    }
  return (
    <div>


<h2>Emails list</h2>
        <input type='text' className='search-product-box' onChange={searchHandle} placeholder='Search Product'/>
        <ul>
        <li>S.No </li>
            <li>Emails </li>
            
        </ul>
      {
       product.length>0? product.map((item,index)=>
        
            <ul key={item}>
            
             <li>{index+1} </li>
                
            <li>{item.email} </li>
           
            <li><button onClick={()=>del(item._id)}>Delete</button>
            <button><Link to={"/update/"+item._id}>Update</Link></button>
            </li>
        </ul>
        )
        :<h1>No Result Found</h1>
      }




    </div>

  )

}
