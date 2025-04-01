'use client'
import CategoryAddForm from '@/components/Dashboard/Components/Category/CategoryForm';
import DynamicTable from '@/components/Dashboard/Components/DynamicTable';
import { axiosInstance } from '@/libs/axiosInstance';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { FaEdit, FaEye, FaTrash, FaTrashAlt } from 'react-icons/fa';

const ProductCategories = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [categories, setCategories] = useState([]);
    const [catData, setCatData] = useState('');
    const [isEdit, setIsEdit] = useState(false)
    const fetchCategories=async()=>{
        await axiosInstance.get('/category').then((data)=>{
            if(data?.data?.status){
                setCategories(data?.data?.data)
            }
        })
    }
    useEffect(() => {
      fetchCategories()
    }, [])
    
    const headers = [
        {key:'name', label:'Id', width:'200'},
        {key:'category', label:'Category', width:'200'},
        {key:'subcategory', label:'Sub Category', width:'200'},
        {key:'status', label:'Status', width:'200'},
        {key:'action', label:'Action', width:'200'},
    ]
    
    const handleDelete = async(id)=>{
        axiosInstance.delete(`/category/${id}`).then((data)=>{
            if(data?.data?.status){
                // alert('')
                fetchCategories()
            }
        })
        
    }
    
    const handleEdit = async(id)=>{
        setIsEdit(true)
        setIsDrawerOpen(true)
        axiosInstance.get(`/category/${id}`).then((data)=>{
            if(data?.data?.status){
                setCatData(data?.data?.data)
                setIsDrawerOpen(true)
            }
        })
    }
    const data = categories?.map((item,index)=>{
    
        return {
          id:index+1,
          category: item?.category,
          subcategory: item?.subcategory,
          status: item?.status,
          action:
                <div className="flex space-x-2">
                    <Link href={""} onClick={()=> handleEdit(item?._id)}>
                    <div className="flex items-center justify-center w-8 h-8 bg-green-100">
                    <FaEdit className='text-green-500' />
                    </div>
                    </Link>

                    <Link href={""} onClick={()=> handleDelete(item?._id)} >
                    <div className="flex items-center justify-center w-8 h-8 bg-green-100">
                    <FaTrash className='text-red-500' />
                    </div>
                    </Link>
                </div>,
        }
    })        
  return (
    <div>
    <h2 className="text-lg font-semibold  ms-4 mb-4">Dashboard / Categories</h2>
    <DynamicTable 
        isBtnNeeded={true}
        btnAction={()=>setIsDrawerOpen(!isDrawerOpen)} 
        title='Categories'
        data={data} 
        headers={headers}/>

        <CategoryAddForm isEdit={isEdit} setIsEdit={setIsEdit} data={catData} fetchCategories={fetchCategories} isOpen={isDrawerOpen} onClose={()=>setIsDrawerOpen(!isDrawerOpen)} />    
    </div>
  )
}

export default ProductCategories