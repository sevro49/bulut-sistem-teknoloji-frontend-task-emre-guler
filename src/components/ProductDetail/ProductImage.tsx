import { Product } from "@/types/types";
import { useState } from "react";

import { Icon } from '@iconify/react';
import { Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material';

const ProductImage = ({ product }: { product: Product }) => {

  const [currentImage, setCurrentImage] = useState<number>(0);
  const [open, setOpen] = useState<boolean>(false); // Open or close dialog

  const handleClose = () => {
    setOpen(false);  // close Dialog
  };

  const handleNextImage = () => {
    setCurrentImage((prev) => (prev + 1) % product.images.length); // Next picture
  };

  const handlePrevImage = () => {
    setCurrentImage((prev) => (prev - 1 + product.images.length) % product.images.length); // Previous picture
  };
  
  return (
    <section id="product-images" className="w-full ">

      {/* Product Image */}
      <div className="relative w-full">
        <img 
          onClick= {() => setOpen(true)}
          src={product.images[currentImage]} 
          alt={product.title} 
          className="w-[35rem] h-[35rem] object-contain border cursor-pointer" 
          loading="lazy"/>
      </div>

      {/* Product Thumbnail Images */}
      <div className="flex items-center gap-2 mt-4">
        {product.images.map((image, index) => (
          <img 
            onClick= {() => setCurrentImage(index)}
            key={index} 
            src={image} 
            alt={product.title} 
            className="w-[8rem] h-[8rem] object-contain border cursor-pointer" 
            loading="lazy"/>
        ))}
      </div>

      {/* Dialog for bigger images*/}
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="md"
        fullWidth
        className="object-contain relative"
      >
        <DialogTitle className="flex justify-end">
          <IconButton
            onClick={handleClose}>
            <Icon icon="material-symbols:close" />
          </IconButton>
        </DialogTitle>
        <DialogContent className="flex justify-center">
          <img src={product.images[currentImage]} alt={product.title}  className="max-w-full max-h-full object-contain" />

          {/* Prev Image */}
          <IconButton
            sx={{position: 'absolute',
              backgroundColor: 'rgba(255, 255, 255, 1)',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.8)', 
            },
            }}
            onClick={handlePrevImage}
            className="absolute left-0 top-1/2 -translate-y-1/2">
            <Icon icon="mingcute:left-fill" className="text-4xl"/>
          </IconButton>

          {/* Next Image */}
          <IconButton
            sx={{position: 'absolute',
              backgroundColor: 'rgba(255, 255, 255, 1)',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.8)', 
            },
            }}
            onClick={handleNextImage}
            className="absolute right-0 top-1/2 -translate-y-1/2">
            <Icon icon="mingcute:right-fill" className="text-4xl"/>
          </IconButton>
        </DialogContent>
      </Dialog>    
    </section>
  )
}

export default ProductImage