import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import Items from './Items'

const Cart = () => {
  const { id } = useParams()
  const uset_id = localStorage.getItem("_id")

  const [cartData, setCartData] = useState([])
  // const [quantity,setQuantity] = useState(cartData.quantity)
  
  const fetchCart = async () => {
    try {
      const resp = await axios.get(`http://localhost:5000/get-cart/${uset_id}`)
      // console.log("cart Dataaaaaaaaaa ==>", resp.data.data)
      setCartData(resp.data.data)
    } catch (error) {
      console.log("errror in fetching cart by user id", error)
    }
  }
  const decrement = (id) => {

  }
  useEffect(() => {
    fetchCart()
  }, [cartData])

  const calculateTotalPrice = () => {
    if (cartData.length === 0) {
      return 0;
    }

    return cartData.reduce((num1, num2) => {
          
      // const total = num1+num2.totalPrice
      // console.log("total",total)
      return num1 + num2.totalPrice;
    },0);
  };
  // console.log("adaaaaaaaaaaaaa",calculateTotalPrice())

  const handleDelete = async(id)=>{
    try {
      const resp = await axios.delete(`http://localhost:5000/delete-cart/${id}`)
      console.log("delete response",resp)
      
    } catch (error) {
      console.log("error in delete cart", error)
    }
  }

  return (
    <>
      <div className="bg-light py-3">
        <div className="container">
          <div className="row">
            <div className="col-md-12 mb-0">
              <a href="2.html">Home</a> <span className="mx-2 mb-0">/</span>{" "}
              <strong className="text-black">Cart</strong>
            </div>
          </div>
        </div>
      </div>

      <div className="site-section">
        <div className="container">
          <div className="row mb-5">
            <form className="col-md-12" method="post">
              <div className="site-blocks-table">
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th className="product-thumbnail">Image</th>
                      <th className="product-name">Product</th>
                      <th className="product-price">Price</th>
                      <th className="product-quantity">Quantity</th>
                      <th className="product-total">Total</th>
                      <th className="product-remove">Remove</th>
                    </tr>
                  </thead>
                  <tbody>

                    {
                    cartData.map((item,index) => {
                      const { productId, quantity, totalPrice, userId } = item

                      return (
                        <>
                         
                          

                          <tr>
                  <td className="product-thumbnail">
                    <img
                      src={`http://localhost:5000/public/images/${productId[0].pImage}`}
                      alt="Image"
                      className="img-fluid"
                    />
                  </td>
                  <td className="product-name">
                    <h2 className="h5 text-black">{productId[0].pName}</h2>
                  </td>
                  <td>{productId[0].pPrice}</td>
                  <td>
                    <div className="input-group mb-3" style={{ maxWidth: 120 }}>
                      {/* <div className="input-group-prepend">
                        <button
                          className="btn btn-outline-primary js-btn-minus"
                          type="button"
                        >
                          −
                        </button>
                      </div> */}
                      <input
                        type="text"
                        className="form-control text-center"
                        value={quantity}
                        placeholder=""
                        aria-label="Example text with button addon"
                        aria-describedby="button-addon1"
                      />
                      {/* <div className="input-group-append">
                        <button
                          className="btn btn-outline-primary js-btn-plus"
                          type="button"
                        >
                          +
                        </button>
                      </div> */}
                    </div>
                  </td>
                  <td>{totalPrice}</td>
                  <td>
                  <NavLink to="#" className="btn btn-primary btn-sm" onClick={()=>{handleDelete(item._id)}}>
                                Delete
                              </NavLink>
                  </td>
                </tr>
                        </>

                        
                      )
                    })
                  }


                    {/* <tr>
                  <td className="product-thumbnail">
                    <img
                      src="images/cloth_2.jpg"
                      alt="Image"
                      className="img-fluid"
                    />
                  </td>
                  <td className="product-name">
                    <h2 className="h5 text-black">Polo Shirt</h2>
                  </td>
                  <td>$49.00</td>
                  <td>
                    <div className="input-group mb-3" style={{ maxWidth: 120 }}>
                      <div className="input-group-prepend">
                        <button
                          className="btn btn-outline-primary js-btn-minus"
                          type="button"
                        >
                          −
                        </button>
                      </div>
                      <input
                        type="text"
                        className="form-control text-center"
                        defaultValue={1}
                        placeholder=""
                        aria-label="Example text with button addon"
                        aria-describedby="button-addon1"
                      />
                      <div className="input-group-append">
                        <button
                          className="btn btn-outline-primary js-btn-plus"
                          type="button"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </td>
                  <td>$49.00</td>
                  <td>
                    <a href="#" className="btn btn-primary btn-sm">
                      X
                    </a>
                  </td>
                </tr> */}

                  </tbody>
                </table>
              </div>
            </form>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="row mb-5">
                <div className="col-md-6 mb-3 mb-md-0">
                  <button className="btn btn-primary btn-sm btn-block">
                    Update Cart
                  </button>
                </div>
                <div className="col-md-6">
                  <button className="btn btn-outline-primary btn-sm btn-block">
                    Continue Shopping
                  </button>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <label className="text-black h4" htmlFor="coupon">
                    Coupon
                  </label>
                  <p>Enter your coupon code if you have one.</p>
                </div>
                <div className="col-md-8 mb-3 mb-md-0">
                  <input
                    type="text"
                    className="form-control py-3"
                    id="coupon"
                    placeholder="Coupon Code"
                  />
                </div>
                <div className="col-md-4">
                  <button className="btn btn-primary btn-sm">Apply Coupon</button>
                </div>
              </div>
            </div>
            <div className="col-md-6 pl-5">
              <div className="row justify-content-end">
                <div className="col-md-7">
                  <div className="row">
                    <div className="col-md-12 text-right border-bottom mb-5">
                      <h3 className="text-black h4 text-uppercase">Cart Totals</h3>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-md-6">
                      <span className="text-black">Subtotal</span>
                    </div>
                    <div className="col-md-6 text-right">
                      <strong className="text-black">&#8377; {calculateTotalPrice()}</strong>
                    </div>
                  </div>
                  <div className="row mb-5">
                    <div className="col-md-6">
                      <span className="text-black">Total</span>
                    </div>
                    <div className="col-md-6 text-right">
                      <strong className="text-black">&#8377; {calculateTotalPrice()}</strong>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <button
                        className="btn btn-primary btn-lg py-3 btn-block"
                      // onclick="window.location='checkout'"
                      ><NavLink to="/cart/checkout" style={{ color: "#fff" }}>Proceed To Checkout</NavLink>

                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Cart