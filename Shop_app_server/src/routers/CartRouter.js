import express from 'express'
import { deleteCart, fetchAllCart, fetchCartByUserId, saveCart } from '../controllers/CartController.js'

const CartRouter = express.Router()

CartRouter.post('/insert-cart', saveCart)
CartRouter.get('/get-cart', fetchAllCart)
CartRouter.delete('/delete-cart', deleteCart)

CartRouter.get('/get-cart/:id', fetchCartByUserId)
CartRouter.delete('/delete-cart/:id',deleteCart)
export default CartRouter