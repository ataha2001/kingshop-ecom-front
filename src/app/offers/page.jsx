'use client'
import ProductCart from '@/components/ProductCard'
import { axiosInstance } from '@/libs/axiosInstance'
import { products } from '@/libs/productData'
import React, { useEffect, useState } from 'react'

const Offers = () => {
    const [flashSaleProducts, setFlashSaleProducts] = useState([])
      // const [latestProducts, setLatestProducts] = useState([])
      // const [heartColor, setHeartColor] = useState(false)

      const fetchFlashSaleProducts = async()=>{
        axiosInstance.get('/products/flash-sales').then((data)=>{
          if(data?.data?.status){
            setFlashSaleProducts(data?.data?.data)
          }
        })
       
      }
      useEffect(() => {
        fetchFlashSaleProducts()
      }, [])
      
  return (
    <div className='xl:container px-2 xl-px-4 py-12 mx-auto'>
        <div className="flex items-center">
        <h1 className="text-xl md:text-4xl font-bold mb-0">Offer Products</h1>
        <span className="text-md md:text-xl ms-2 relative top-[1px]">
            ({flashSaleProducts?.length} products Found)
        </span>
        </div>
        <div className="mt-5">
        <ProductCart isWishListed={false} data={flashSaleProducts} />
        </div>
    </div>
  )
}

export default Offers