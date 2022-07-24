import { useEffect, useState } from 'react'
import { AddProductNested, ICategories } from '../../helpers/types'
import { addProduct, getCategories } from '../../service/api'
import Header from '../../components/Header/header';
import { useNavigate } from "react-router-dom";
import { useFormik } from 'formik';

function AddProduct() {

  const [categories, setCategories] = useState<ICategories[]>();
  const navigate = useNavigate();

  useEffect(() => {
    handleGetCategories();
  }, [])

  const handleGetCategories = async () => {
    setCategories(await getCategories());
  }

  const handleAddProduct = async (productData: AddProductNested) => {
    await addProduct(productData, navigate);
  }

  const validate = (values: AddProductNested) => {
    const errors: AddProductNested = {};
    if (!values.name || values.name === '') {
      errors.name = 'Required';
    }

    if (!values.price || values.price == 0) {
      errors.price = 0;
    }

    if (!values.category || values.category === '') {
      errors.category = 'Required';
    }
    if (!values.description || values.description === '') {
      errors.description = 'Required';
    }

    if (!values.avatar || values.avatar === '') {
      errors.avatar = 'Required';
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      price: 0,
      category: "",
      description: "",
      avatar: "",
      developerEmail: "ardakeyisoglu@gmail.com"
    },
    validate,
    onSubmit: values => {
      handleAddProduct(values)
    },
  });

  return (
    <div>
      <Header />
      <div className='container mt-16 flex flex-col mx-auto sm:w-4/5 md:w-2/5 gap-5'>
        <h3 className='mx-auto font-semibold text-2xl'>Create Product</h3>
        <form className='mx-auto w-3/5 sm:w-4/5 md:w-11/12' onSubmit={formik.handleSubmit}>
          <input name="name" className="p-5 rounded-xl shadow-xl block w-full mt-2" type="text" value={formik.values.name} placeholder='Product name' onChange={formik.handleChange} />
          {formik.errors.name ? <div className='text-xs text-red-500'>*{formik.errors.name}</div> : null}
          <textarea name='description' rows={4} className="p-5 rounded-xl shadow-xl block w-full mt-2" value={formik.values?.description} placeholder='Description' onChange={formik.handleChange} />
          {formik.errors.description ? <div className='text-xs text-red-500'>*{formik.errors.description}</div> : null}
          <input name='avatar' className="p-5 rounded-xl shadow-xl block w-full mt-2" value={formik.values?.avatar} type="text" placeholder='Image URL' onChange={formik.handleChange} />
          {formik.errors.avatar ? <div className='text-xs text-red-500'>*{formik.errors.avatar}</div> : null}
          <select name='category' value={formik.values.category} onChange={formik.handleChange} className='p-5 rounded-xl shadow-xl block w-full mt-2'>
            <option value="-1" selected disabled hidden>Categories</option>
            {categories && categories.map((item) => {
              return (
                <option value={item.name} key={item.id}>{item.name}</option>
              )
            })}
          </select>
          {formik.errors.category ? <div className='text-xs text-red-500'>*{formik.errors.category}</div> : null}
          <input name='price' className="p-5 rounded-xl shadow-xl block w-full mt-2" value={formik.values.price} type="text" placeholder='Price' onChange={formik.handleChange} />
          {formik.errors.price == "0" ? <div className='text-xs text-red-500'>*Required</div> : null}
          <button type="submit" className="bg-white p-5 font-semibold rounded-xl text-xl shadow-xl block w-full mt-2" >SUBMIT</button>
        </form>
      </div>
    </div>
  )
}

export default AddProduct