import { useState } from 'react';
import { Product } from '@/types/types'

import RatingStars from '@/components/RatingStars'
import { Icon } from '@iconify/react';

// MUI Components
import { Button, List, ListItem, ListItemText, Dialog, DialogContent, DialogTitle, IconButton, Divider } from '@mui/material'


const ProductInfo = ({product}: {product: Product}) => {
  const [open, setOpen] = useState<boolean>(false); // Open or close dialog

  const handleClose = () => {
    setOpen(false);  // close Dialog
  };

  // Function to format date and time
  const formatDate = (date: string) => {
    const dateObj = new Date(date);

    // Format date and time
    const formattedDate = dateObj.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric'
    });
    const formattedTime = dateObj.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });

    return `${formattedDate} ${formattedTime}`; // Return formatted date and time
  }

  const hiddenEmail = (email: string) => {
    if(!email) return '';
    const [localPart] = email.split('@'); // Split email into local part and domain

    const visiblePart = localPart.slice(0, 2); // First two characters
    const hiddenPart = '****'

    return `${visiblePart}${hiddenPart}@***`; // Return the hidden email
  }

  const hiddenName = (name: string) => {
    if(!name) return '';
    const [firstName, lastName] = name.split(' '); // Split name into first and last name

    const visiblePartFirstName = firstName.slice(0, 1); // First one character
    const visiblePartLastName = lastName.slice(0, 1); // First one character
    const hiddenPart = '***'

    return `${visiblePartFirstName}${hiddenPart} ${visiblePartLastName}${hiddenPart}`; // Return the hidden name
  }

  return (
    <section id='product-info' className='w-full'>

      {/* Product Title, Rating, Stock, Price, Add to Cart and Favorite Buttons */}
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
          {product?.rating} <RatingStars rating={product.rating}/> <span onClick={() => setOpen(true)} className='text-blue-600 font-bold cursor-pointer'>{product?.reviews.length} Reviews</span> 
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
          <p className='text-green-600 font-semibold'>Minimum order quantity: {product?.minimumOrderQuantity}</p>
          <div className='flex items-center gap-5'>
            <Button disabled={product?.availabilityStatus === "Out of Stock"} variant="contained" color="success" className="w-42 h-9 flex items-center gap-4" sx={{ textTransform: 'none' }}>
              Add to Cart <Icon icon="mdi:cart" className="text-xl"/>
            </Button>
            <Button variant="outlined" color="error" className="w-42 h-9 flex items-center gap-4" sx={{ textTransform: 'none', boxShadow: '1px 2px 4px rgba(0,0,0,0.2)' }}>
              <Icon icon="mdi:heart-outline" className="text-xl"/>
            </Button>
          </div>
        </div>
      </div>

      {/* Product Description */}
      <div className='mt-12'>
        <h3 className='text-2xl font-semibold'>Product Information</h3>
        <div>
          <p className='py-2 text-justify'>{product?.description}</p>
          <List>
            {[
              { label: 'Brand', value: product?.brand },
              { label: 'Return Policy', value: product?.returnPolicy },
              { label: 'Warranty Information', value: product?.warrantyInformation },
              { label: 'Shipping Information', value: product?.shippingInformation },
              { label: 'Weight', value: product?.weight ? `${product.weight} kg` : null },
              { label: 'Depth', value: product?.dimensions.depth ? `${product.dimensions.depth} cm` : null },
              { label: 'Height', value: product?.dimensions.height ? `${product.dimensions.height} cm` : null },
              { label: 'Width', value: product?.dimensions.width ? `${product.dimensions.width} cm` : null },
              { label: 'SKU', value: product?.sku ? `${product.sku}` : null }
            ].map(
              (item, index) =>
                item.value && (
                  <ListItem key={index} sx={{ padding: 0 }}>
                    <ListItemText className='flex flex-row items-center justify-between bg-zinc-100 p-2 rounded-md' primary={item.label} secondary={item.value} />
                  </ListItem>
                )
            )}
          </List>
        </div>
      </div>

      {/* Dialog for ratings*/}
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="md"
        fullWidth
        className="object-contain relative"
        sx={{ '& .MuiDialog-paper': { maxHeight: '500px' } }}
      >
        <DialogTitle className="flex items-center justify-between">
          Ratings ({product?.reviews.length})
          <IconButton
            onClick={handleClose}>
            <Icon icon="material-symbols:close" />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <List className="flex flex-col gap-4">
            {product?.reviews.map((review, index) => (
              <ListItem key={index} sx={{ padding: 0, display: 'block' }}>
                <div className='flex items-center gap-4 text-sm'>
                  <ListItemText
                    primary={
                      <>
                        <span className='text-sm'>{hiddenName(review?.reviewerName)}</span> |{' '}
                        <span>{hiddenEmail(review?.reviewerEmail)}</span>
                        <RatingStars rating={review?.rating} />
                        <span className='text-sm'>{formatDate(review?.date)}</span>
                      </>
                    }
                  />
                </div>
                <ListItemText
                  primary={
                    <p className='break-words'>{review?.comment}</p>
                  }
                />
                <Divider variant="middle" flexItem sx={{ margin: '1rem 0 0 0' }} />
              </ListItem>
            ))}
          </List>
        </DialogContent>
      </Dialog> 
    </section>
  )
}

export default ProductInfo