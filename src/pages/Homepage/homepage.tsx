import { useEffect, useState } from 'react'
import { getProducts, getCategories } from '../../service/api'
import { IProduct, ICategories } from '../../helpers/types'
import Header from '../../components/Header/header';
import { useNavigate } from "react-router-dom";
import { PlusIcon } from '@heroicons/react/solid';

function Homepage() {

  const [products, setProducts] = useState<IProduct[]>([]);
  const [categories, setCategories] = useState<ICategories[]>();
  const [selectedCategoryName, setSelectedCategoryName] = useState<string>("-1");
  const [selectedProductId, setSelectedProductId] = useState<string>("");
  const [filterProductName, setfilterProductName] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    handleGetProducts();
    handleGetCategories();
  }, [])

  useEffect(() => {
    if (selectedProductId !== "") {
      localStorage.setItem("productId", selectedProductId);
      navigate("/product-detail");
    }

  }, [selectedProductId])

  useEffect(() => {
    runFilter();
  }, [filterProductName, selectedCategoryName])

  const runFilter = () => {
    let newData = [...products].map(m => {

      let catState = false, visible = false;

      if (m.category === selectedCategoryName || selectedCategoryName === "-1")
        catState = true;

      if (catState) {
        if (filterProductName === "" || m.name.toLowerCase().includes(filterProductName.toLowerCase())) {
          visible = true;
        }
      }

      m.isVisible = visible;
      return m;
    });

    setProducts(newData);
  }

  const handleGetProducts = async () => {

    let data = await getProducts();
    data.forEach(f => f.isVisible = true);

    setProducts(data);
  }

  const handleGetCategories = async () => {
    setCategories(await getCategories());
  }

  return (
    <div className='relative min-h-screen'>
      <Header />
      <div className='container mx-auto mt-16'>
        <div className='flex justify-between gap-5 sm:flex-col md:flex-row '>
          <div className='sm:w-4/5 mx-auto md:w-96'>
            <input className='sm:w-full md:w-80 p-5 drop-shadow-xl rounded-lg' onChange={(e) => setfilterProductName(e.target.value)} placeholder="Apple Watch, Samsung 521, Macbook Pro, ..."></input>
          </div>
          <div className='flex justify-end sm:w-4/5 mx-auto md:w-96'>
            <select value={selectedCategoryName} onChange={(e) => setSelectedCategoryName(e.target.value)} className=' sm:w-full md:w-80 p-5 drop-shadow-xl rounded-lg'>
              <option value="-1" selected>Categories</option>
              {categories && categories.map((item) => {
                return (
                  <option value={item.name} key={item.id}>{item.name}</option>
                )
              })}
            </select>
          </div>
        </div>
        <div className='container max-w-5xl mx-auto mt-16 xsm:w-4/5'>
          <div className='sm:grid md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-4 flex-wrap gap-10'>
            {products && products.filter(f => f.isVisible).map((item, key) => {
              return (
                <div className="cursor-pointer" key={key} onClick={() => setSelectedProductId(item.id)}>
                  <div className="h-64 bg-white rounded-lg flex justify-center justify-items-center">
                    <img className='p-2 max-h-full object-contain mx-auto group transition duration-200 ease-in transform sm:hover:scale-105 hover:z-50' src={item.avatar} alt="UPayments" />
                  </div>
                  <h6 className="font-bold text-xl mt-1 pl-1" >{item.name}</h6>
                  <p className="font-semibold text-xl text-center">$ {item.price}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
      <div className="fixed bg-black w-20 h-20 rounded-full bottom-5 right-10 cursor-pointer flex text-center content-center items-center justify-center hover:animate-bounce" onClick={() => navigate("/add-product")}>
        <PlusIcon className="h-10 w-10 text-white" />
      </div>
    </div>
  )
}

export default Homepage