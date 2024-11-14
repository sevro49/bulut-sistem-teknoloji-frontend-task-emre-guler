import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, resetStatus } from "@/store/requestSlice";
import { RootState, AppDispatch } from "@/store/store";
import { Product } from "@/types/types";
import { Link } from 'react-router-dom';

import RatingStars from "./RatingStars";
import { Icon } from '@iconify/react';

// Material UI components
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import CardActionArea from '@mui/material/CardActionArea';
import Skeleton from '@mui/material/Skeleton';
import Chip from '@mui/material/Chip';
import { Button } from "@mui/material";

const ProductList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { products, status, error } = useSelector(
    (state: RootState) => state.requests
  );

  const [visibleProducts, setVisibleProducts] = useState<Product[]>([]);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const [lastElement, setLastElement] = useState<HTMLDivElement | null>(null);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  // Fetch products on initial render
  useEffect(() => {
    dispatch(resetStatus()); // Reset status to 'idle' when component mounts. otherwise, it will not fetch again.

    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [dispatch]);

  // get first 20 products on refresh
  useEffect(() => {
    if (products.length > 0) {
      setVisibleProducts(products.slice(0, 20)); // Initial products
    }
  }, [products]);

  // Manages the lazy loading mechanism using IntersectionObserver.
  // When the 'lastElement' at the bottom of the page becomes visible,
  // the 'setVisibleProducts' function is triggered to load more products.
  // This continues to load new products as the page is scrolled.
  useEffect(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }
    
    observerRef.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && products.length > visibleProducts.length) {
        setIsLoadingMore(true);
        setVisibleProducts((prev) => [
          ...prev,
          ...products.slice(prev.length, prev.length + 10),
        ]);
        setIsLoadingMore(false);
      }
    });
  
     // Start observing the 'lastElement'
    if (lastElement) {
      observerRef.current.observe(lastElement);
    }
  
    // Cleanup function: disconnect the observer when the component unmounts or dependencies change
    return () => {
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, [lastElement, products, visibleProducts]);
  
  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  return (
    <section id="product-list" className="h-full mt-12">
      <div className="w-full grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
        {/* Show skeletons on first load */}
        {status === "loading" && (
          Array.from({ length: 16 }).map((_, index) => (
            <Card key={index} sx={{ height: '100%' }}>
              <CardActionArea sx={{ height: '100%' }}>
                  <Skeleton variant="rectangular" width={320} height={320} />
                  <CardContent>
                    <Skeleton variant="text" width="60%" height={20} />
                    <Skeleton variant="text" width="40%" height={16} />
                  </CardContent>
              </CardActionArea>
            </Card>
          ))
        )}

        {/* Show products when loaded */}
        {visibleProducts.map((product: Product) => (
          <Card key={product?.id} sx={{ height: '100%' }}>
            <Link to={`/product/${product?.id}`}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image={product?.thumbnail}
                  alt={product?.title}
                />
                <CardContent>
                  <p className="h-12 line-clamp-2 mb-2 w-full"><span className="me-1 font-semibold">{product?.brand}</span>{product?.title}</p>
                  <div className="flex items-center gap-2 text-xs mb-2">
                  {product?.rating} <RatingStars rating={product.rating}/> ({product?.reviews.length})
                  </div>
                  <p className="text-xl text-red-700 font-bold mb-2">
                    {product?.discountPercentage > 0 
                    ? (
                      <>
                        <span className="line-through text-zinc-600 font-normal text-sm me-2">{product?.price} $</span>
                        <span>{(product?.price - (product.price * product.discountPercentage * 1 / 100)).toFixed(2)} $</span>
                      </>
                    ) : (
                      <span>{product?.price} $ </span>
                    )}
                  </p>
                  <div className="text-sm text-red-700 font-bold h-6">
                    {product?.availabilityStatus === "Low Stock" ? (
                      <Chip label="Low Stock" color="error" size="small"/>
                    ) : product?.availabilityStatus === "Out of Stock" ? (
                      <Chip label="Out of Stock" size="small"/>
                    ) : (
                      ""
                    )
                    }
                  </div>
                </CardContent>
              </CardActionArea>
            </Link>
            <CardActions className="flex gap-2 w-full items-center justify-center" sx={{ '& > :not(style) ~ :not(style)': { marginLeft: 0 } }}>
              <Button disabled={product?.availabilityStatus === "Out of Stock"} variant="contained" color="success" className="w-full flex items-center gap-2" sx={{ textTransform: 'none' }}>
                <Icon icon="mdi:cart" className="text-xl"/>
              </Button>
              <Button variant="outlined" color="error" className="w-full h-full">
                <Icon icon="mdi:heart-outline" className="text-xl"/>
              </Button>
            </CardActions>
          </Card>
        ))}

        {/* To show loading skeleton when loading more products */}
        {isLoadingMore && (
          Array.from({ length: 10 }).map((_, index) => (
            <Card key={`skeleton-${index}`} sx={{ height: '100%' }}>
              <CardActionArea sx={{ height: '100%' }}>
                <Skeleton variant="rectangular" width="100%" height={250} />
                <CardContent>
                  <Skeleton variant="text" width="60%" height={20} />
                  <Skeleton variant="text" width="40%" height={16} />
                </CardContent>
              </CardActionArea>
            </Card>
          ))
        )}

        <div ref={setLastElement} style={{ height: '1px' }}></div>
      </div>
    </section>
  );
};

export default ProductList;
