'use client'
import React from 'react'
import DynamicTable from '@/components/Dashboard/Components/DynamicTable';
import Link from 'next/link';
// import { FaEye } from 'react-icons/fa';
import { FaEdit, FaEye, FaTrash, FaTrashAlt } from 'react-icons/fa';


const OrdersReturn = () => {

    const headers = [
        { key: 'orderId', label: 'ORDER ID', width: '200' },
        { key: 'orderType', label: 'ORDER TYPE', width: '200' },
        { key: 'customer', label: 'CUSTOMER', width: '200' },
        { key: 'amount', label: 'AMOUNT', width: '200' },
        { key: 'date', label: 'DATE', width: '200' },
        { key: 'status', label: 'STATUS', width: '200' },
        { key: 'action', label: 'ACTION', width: '200' },
    ];
    
    const data = [
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
  return (
    <div>
    <h2 className="text-lg font-semibold  ms-4 mb-4">Dashboard / Categories</h2>
    <DynamicTable 
        isBtnNeeded={false}
        btnAction={()=>setIsDrawerOpen(!isDrawerOpen)} 
        title='Return Orders'
        data={data} 
        headers={headers}/>

          
    </div>
  
  )
}

export default OrdersReturn