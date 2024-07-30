import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function UpdateProduct() {
    const [email, setEmail] = useState("");
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        getProductDetail();
    }, []);

    const getProductDetail = async () => {
        try {
            console.log(`Fetching product details for ID: ${params.id}`);
            let result = await fetch(`http://localhost:5000/product/${params.id}`);
            console.log("Fetch result:", result);

            if (!result.ok) {
                throw new Error(`HTTP error! status: ${result.status}`);
            }

            let data = await result.json();
            console.log("Fetched data:", data);
            setEmail(data.email);
        } catch (error) {
            console.error("Error fetching product details:", error);
        }
    };

    const updateProductData = async () => {
        try {
            console.log(`Updating product with ID: ${params.id} and email: ${email}`);
            let result = await fetch(`http://localhost:5000/produc/${params.id}`, {
                method: 'PUT',
                body: JSON.stringify({ email }),
                headers: {
                    "Content-Type": "application/json"
                }
            });
            result = await result.json();
            console.log("Update result:", result);
            navigate("/");
        } catch (error) {
            console.error("Error updating product:", error);
        }
    };

    return (
        <div className='add_product'>
            <h1>Update Product</h1>
            <input
                type='text'
                placeholder='Enter updated Email'
                className='inputbox'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <button className='appbtn' onClick={updateProductData}>Update</button>
        </div>
    );
}
