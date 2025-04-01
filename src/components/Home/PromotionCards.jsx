'use client'
import React, { useState } from 'react'

const PromotionCards = () => {
    const [promotions, setPromotions] = useState([
        {image:"/promotion1.png", alt:"promotion1"},
        {image:"/promotion2.png", alt:"promotion2"},
        {image:"/promotion3.png", alt:"promotion3"},
    ])
  return (
    <div className="xl:container mx-auto overflow-hidden px-2 xl:px-4 my-16">
        <div className="flex flex-wrap lg:flex-nowrap justify-between items-center gap-3 lg:space-x-4">
        {
            promotions?.map((item,index)=>(
                <div key={index} className="w-full lg:w-1/3">
                <img src={item.image} alt={item.alt} className="w-full rounded-xl" />
                </div>
            ))
        }
        </div>
    </div>
  )
}

export default PromotionCards