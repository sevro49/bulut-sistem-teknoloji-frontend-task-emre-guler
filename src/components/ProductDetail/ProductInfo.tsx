import { Product } from '@/types/types'

import RatingStars from '@/components/RatingStars'
import { Icon } from '@iconify/react';

import { Button } from '@mui/material'


const ProductInfo = ({product}: {product: Product}) => {
  return (
    <section id='product-info' className='w-full'>

      <div className='flex flex-col gap-2'>
        {/* Product Title */}
        <h1 className='text-3xl'>{product?.title} 
          {product?.brand && 
          (<>
            <span className='text-gray-300'> |</span> <span className='text-blue-600'>{product?.brand}</span>
          </>)}
        </h1>

        {/* Product Rating and Product Stock */}
        <div className='flex items-center gap-4'>
          {/* Product Rating */}
          <div className="flex items-center gap-2 my-2">
          {product?.rating} <RatingStars rating={product.rating}/> <span className='text-blue-600 font-bold'>({product?.reviews.length})</span> 
          </div>

          {/* Product Stock */}
          <span className='text-gray-300'>|</span>
          <p>
            {product?.availabilityStatus === "Low Stock" ? (
              <> <span className='font-bold text-red-700'>Stock:</span> {product?.stock}</>
            ) : product?.availabilityStatus === "Out of Stock" ? (
              <> <span className='font-bold text-gray-400'>Stock:</span> {product?.stock}</>
            ) : (
              <> <span className='font-bold'>Stock:</span> {product?.stock}</>
            )
            }
          </p>
        </div>

        {/* Product Price */}
        <div>
          <h2 className='text-4xl text-red-700 font-semibold'>
          {product?.discountPercentage > 0 
            ? (
              <>
                <span className="line-through text-zinc-600 font-normal text-lg me-2">{product?.price} $</span>
                <span>{(product?.price - (product.price * product.discountPercentage * 1 / 100)).toFixed(2)} $</span>
              </>
            ) : (
              <span>{product?.price} $ </span>
            )}
          </h2>
        </div>

        {/* Add to Cart and Favorite Buttons */}
        <div className='py-4 flex flex-col gap-2'>
          <p className='text-orange-600 font-semibold'>Minimum order quantity: {product?.minimumOrderQuantity}</p>
          <div className='flex items-center gap-5'>
            <Button disabled={product?.availabilityStatus === "Out of Stock"} variant="contained" color="warning" className="w-42 h-9 flex items-center gap-4" sx={{ textTransform: 'none' }}>
              Add to Cart <Icon icon="mdi:cart" className="text-xl"/>
            </Button>
            <Button variant="outlined" color="error" className="w-42 h-9 flex items-center gap-4" sx={{ textTransform: 'none', boxShadow: '1px 2px 4px rgba(0,0,0,0.2)' }}>
              <Icon icon="mdi:heart-outline" className="text-xl"/>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProductInfo