import CartModel from "../models/CartModel.js";
import { StatusCodes } from "http-status-codes";

export async function saveCart(req, res) {
//     try {
//         console.log(req.body)
//         const { productId, userId, totalPrice, quantity } = req.body;
//         let cartEntry = await CartModel.findOne({ userId });

//         if (cartEntry) {
//             // Check if the productId already exists in the productId array
//             const existingProduct = cartEntry.productId.find((id) => id.equals(productId));

//             if (existingProduct) {
//                 // Product already exists, update quantity and totalPrice

//                 existingProduct.quantity += quantity;
//                 cartEntry.totalPrice += totalPrice;

//             } else {
//                 // Product does not exist, push the new productId
//                 cartEntry.productId.push(productId);
//                 cartEntry.totalPrice += totalPrice;
//                 cartEntry.quantity += quantity;
//             }

//             await cartEntry.save();
//         } else {
//          let cart  = CartModel(req.body)
//          const cartEntry = await cart.save()
//         }

//         // return { data: cartEntry, message: "Success", status: 200 };
//         res.status(StatusCodes.CREATED).json({data:cartEntry, message:"cart saved successfully", success:true})

//     } catch (err) {
//         console.log("error in saving cart", err);
//         res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:"error in saving cart"})
//         // return { message: err, status: 500 };
//     }

// }

try {
    // console.log("cart body", req.body)
    var user = await CartModel.findOne({userId:req.body.userId})
    // console.log("useerr", user)

    // if(!user){
        const cartData = CartModel(req.body)
        const savedCart = await cartData.save()
        
        res.status(StatusCodes.CREATED).json({data:savedCart, message:"cart saved successfully", success:true})
    // }
    // else{

    //    console.log("else block")
    //     user.productId.push(req.body.productId)
    //     const cart = await user.save()
    //     console.log("carrrr", cart)
    //     res.status(StatusCodes.CREATED).json({data:cart, message:"duplicatecart saved"})
    // }

    
} catch (error) {
    console.log("error in saving cart", error)
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:"error in add to cart"})
}
    
}



export async function fetchAllCart(req,res){
    try {
        const cart = await CartModel.find().populate('productId')
        console.log("cart",cart)
        res.status(StatusCodes.OK).json({data:cart, message:"find all cart", success:true})
    } catch (error) {
        console.log("error in fetching all cart", error)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:"error in fetching all cart", success:false})
    }
}


// export async function deleteCart(req,res){
//     try {
//         const cartEntry = await CartModel.findById(req.params.id);
//         if (!cartEntry) {
//           return { message: "Cart entry not found", status: 404 };
//         }
    
//         // Find the index of the productId in the productId array
//         const index = cartEntry.productId.findIndex((prodId) => prodId.equals(productId));
//         if (index !== -1) {
//           // Remove the productId from the array
//           cartEntry.productId.splice(index, 1);
//           await cartEntry.save();
//           res.status(StatusCodes.OK).json({data:cartEntry, message:"cart deleted successfully"})
//         //   return { data: cartEntry, message: "Success", status: 200 };

//         } else {
//             res.status(StatusCodes.BAD_REQUEST).json({message:"Product not found in cart"})
//         //   return { message: "Product not found in cart", status: 404 };
//         }
//         // const  cart = await CartModel.findByIdAndUpdate(req.params.id)

       
//     } catch (error) {
//         console.log("error in deleting cart ", error)
//         res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:"error in deleting cart ", success:false})
//     }

// }

export async function fetchCartByUserId(req,res){
    try {
        // console.log(req.params.id)
        const cart = await CartModel.find({userId:req.params.id}).populate('productId')

        res.status(StatusCodes.OK).json({data:cart, message:"cart find successfully", message:true})
    } catch (error) {
        console.log("error in fetching cart by userId", error)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:"error in fetching cart using user id "})

    }

}


export async function deleteCart(req,res){
    try {
        // console.log(req.params.id)
        const cart = await CartModel.findByIdAndDelete(req.params.id)
        res.status(StatusCodes.OK).json({message:"cart delete successfully"})
    } catch (error) {
        console.log("error in delete cart", error)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:"error in deletind cart"})
    }
}