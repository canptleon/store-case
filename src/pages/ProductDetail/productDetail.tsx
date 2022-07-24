import { useEffect, useState } from 'react'
import Header from '../../components/Header/header'
import { IProduct } from '../../helpers/types'
import { getProductById, deleteProduct } from '../../service/api';
import { useNavigate } from "react-router-dom"
import { TrashIcon } from '@heroicons/react/solid';

function ProductDetail() {

  const [product, setProduct] = useState<IProduct>();
  const [isDeleteModalActive, setIsDeleteModalActive] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    handleGetProduct();
  }, [])

  const handleGetProduct = async () => {
    const getId = localStorage.getItem("productId");
    getId !== null && setProduct(await getProductById(getId));
  }

  const handleDeleteProduct = async () => {
    product && await deleteProduct(product.id);
    navigate("/homepage");
  }

  return (
    <>
      <div>
        <Header />
        <div className='container sm:w-4/5 md:w-4/5 max-w-5xl mx-auto mt-16'>
          <div className='flex flex-row gap-10'>
            <div className="basis-1/3 bg-white rounded-lg">
              <img className='p-2 border-2 border-black group transition duration-200 ease-in rounded-lg transform sm:hover:scale-105 hover:z-50' src={product?.avatar} alt="UPayments" />
            </div>
            <div className="basis-2/3">
              <div className="h-full">
                <div className='flex flex-col justify-between h-full'>
                  <h1 className="font-bold text-5xl mt-2">{product?.name}</h1>
                  <p className="font-bold text-xl">$ {product?.price}</p>
                </div>
              </div>
            </div>
          </div>
          <div className='w-full md:w-auto mt-8 bg-gray-400 p-0.5 rounded-2xl' />
          <div className='mt-8'>
            <h4 className="font-medium text-3xl">Description</h4>
            <p className="text-xl mt-2">{product?.description}</p>
          </div>
        </div>
        <div className="fixed bg-red-500 w-20 h-20 rounded-full bottom-5 right-10 cursor-pointer flex text-center content-center items-center justify-center hover:animate-bounce">
          <TrashIcon className='h-10 w-10 bg-red-500 text-white' onClick={() => setIsDeleteModalActive(true)} />
        </div>
      </div>

      <div id="popup-modal" tabIndex={-1} className={`flex justify-center items-center absolute right-0 ${isDeleteModalActive ? ("") : ("hidden")} overflow-y-auto overflow-x-hidden z-50 md:inset-0 h-modal md:h-full`}>
        <div className="relative p-4 w-full max-w-md h-full md:h-auto">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <button onClick={() => setIsDeleteModalActive(false)} type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-toggle="popup-modal">
              <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
              <span className="sr-only">Close modal</span>
            </button>
            <div className="p-6 text-center">
              <svg aria-hidden="true" className="mx-auto mb-4 w-14 h-14 text-gray-400 dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to delete this product?</h3>
              <button onClick={() => handleDeleteProduct()} data-modal-toggle="popup-modal" type="button" className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
                Yes, I'm sure
              </button>
              <button onClick={() => setIsDeleteModalActive(false)} data-modal-toggle="popup-modal" type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">No, cancel</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProductDetail