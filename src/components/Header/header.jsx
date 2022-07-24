import { Link } from "react-router-dom"

function Header() {
  return (
    <div className='w-3/4 mx-auto bg-white p-5 drop-shadow-xl rounded-lg mt-12 font-bold text-lg'> 
      <div className='flex justify-between'>
        <div >
          <Link to="/homepage"><h3 className='cursor-pointer'>UPayments Store</h3></Link>
        </div>
        <div >
          <Link to="/add-product"><h5 className='cursor-pointer'>Register</h5></Link>
        </div>
      </div>
    </div>
  )
}

export default Header