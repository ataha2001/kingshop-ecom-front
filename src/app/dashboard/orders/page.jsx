'use client'
import React, { useEffect, useState } from 'react'
import DynamicTable from '@/components/Dashboard/Components/DynamicTable';
import Link from 'next/link';
// import { FaEye } from 'react-icons/fa';
import { FaEdit, FaEye, FaTrash, FaTrashAlt } from 'react-icons/fa';
import { MdOutlineKeyboardArrowRight } from 'react-icons/md';
import { axiosInstance } from '@/libs/axiosInstance';


const Orders = () => {

    const [data, setData] = useState([])
    const headers = [
        { key: 'orderId', label: 'ORDER ID', width: '200' },
        { key: 'orderType', label: 'ORDER TYPE', width: '200' },
        { key: 'customer', label: 'CUSTOMER', width: '200' },
        { key: 'amount', label: 'AMOUNT', width: '200' },
        { key: 'date', label: 'DATE', width: '200' },
        { key: 'status', label: 'STATUS', width: '200' },
        { key: 'action', label: 'ACTION', width: '200' },
    ];
    
    const data1 = [
        {
            orderId: '15012559',
            orderType: <span className="bg-green-200 text-green-500 px-2 py-1 rounded">Delivery</span>,
            customer: 'John Doe',
            amount: '32.000',
            date: '05:44 PM, 15-01-2025',
            status: <span className="bg-yellow-200 text-yellow-500 px-2 py-1 rounded">Pending</span>,
            action: (
                <div className="flex space-x-2">
                    <Link href={'/dashboard/orders/view/15012559'}>
                        <div className="flex items-center justify-center w-8 h-8 bg-gray-100">
                            <FaEye className="text-blue-500" />
                        </div>
                    </Link>
                </div>
            ),
        },
        {
            orderId: '15012558',
            orderType: <span className="bg-green-200 text-green-500 px-2 py-1 rounded">Delivery</span>,
            customer: 'John Doe',
            amount: '136.000',
            date: '04:54 PM, 15-01-2025',
            status: <span className="bg-green-200 text-green-500 px-2 py-1 rounded">Delivered</span>,
            action: (
                <div className="flex space-x-2">
                    <Link href={'/dashboard/orders/view/15012558'}>
                        <div className="flex items-center justify-center w-8 h-8 bg-gray-100">
                            <FaEye className="text-blue-500" />
                        </div>
                    </Link>
                </div>
            ),
        },
        {
            orderId: '14012535',
            orderType: <span className="bg-red-200 text-red-500 px-2 py-1 rounded">Pick Up</span>,
            customer: 'John Doe',
            amount: '200.000',
            date: '11:24 AM, 14-01-2025',
            status: <span className="bg-red-200 text-red-500 px-2 py-1 rounded">Canceled</span>,
            action: (
                <div className="flex space-x-2">
                    <Link href={'/dashboard/orders/view/14012535'}>
                        <div className="flex items-center justify-center w-8 h-8 bg-gray-100">
                            <FaEye className="text-blue-500" />
                        </div>
                    </Link>
                </div>
            ),
        },
        {
            orderId: '14012532',
            orderType: <span className="bg-green-200 text-green-500 px-2 py-1 rounded">Delivery</span>,
            customer: 'John Doe',
            amount: '4214.200',
            date: '10:47 AM, 14-01-2025',
            status: <span className="bg-red-200 text-red-500 px-2 py-1 rounded">Canceled</span>,
            action: (
                <div className="flex space-x-2">
                    <Link href={'/dashboard/orders/view/14012532'}>
                        <div className="flex items-center justify-center w-8 h-8 bg-gray-100">
                            <FaEye className="text-blue-500" />
                        </div>
                    </Link>
                </div>
            ),
        },
    ];

    const fetchOrders = async()=>{
        axiosInstance.get('/orders').then((data)=>{
            if(data?.data?.status){
                
                setData(data?.data?.data?.map((item)=>{
                    return {
                        orderId: item?._id,
                        orderType: <span className="bg-green-200 text-green-500 px-2 py-1 rounded">{item?.orderType}</span>,
                        customer: item?.userId?.name,
                        amount: item?.total,
                        date: item?.orderDate,
                        status: <span className="bg-yellow-200 text-yellow-500 px-2 py-1 rounded">{item?.orderStatus}</span>,
                        action: (
                            <div className="flex space-x-2">
                                <Link href={`/dashboard/orders/view/${item?._id}`}>
                                    <div className="flex items-center justify-center w-8 h-8 bg-gray-100">
                                        <FaEye className="text-blue-500" />
                                    </div>
                                </Link>
                            </div>
                        ),
                    }
                }))
                    console.log('check data',data);
                    
                
            }
        })
    }
    useEffect(() => {
        fetchOrders()
    }, [])
    console.log('data',data);
    
  return (
    <div>
    <div className="flex mb-4 items-center gap-2 ml-2">
        <Link href={"/dashboard"}>Dashboard</Link>
        <MdOutlineKeyboardArrowRight />
        <Link href={"/dashboard/orders"}>Orders</Link>
        <MdOutlineKeyboardArrowRight />
        <span className="text-blue-500">View</span>
      </div>
    <DynamicTable 
        isBtnNeeded={false}
        btnAction={()=>setIsDrawerOpen(!isDrawerOpen)} 
        title='Orders'
        data={data} 
        headers={headers}/>

          
    </div>
  
  )
}

export default Orders