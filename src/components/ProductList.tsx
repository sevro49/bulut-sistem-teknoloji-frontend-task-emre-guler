import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "@/store/requestSlice";
import { RootState, AppDispatch } from "@/store/store";
import { Product } from "@/types/types";

// Material UI components
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import Skeleton from '@mui/material/Skeleton';
import RatingStars from "./RatingStars";

const ProductList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { products, status, error } = useSelector(
    (state: RootState) => state.counter.fetchProducts
  );

  const [visibleProducts, setVisibleProducts] = useState<Product[]>([]);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const [lastElement, setLastElement] = useState<HTMLDivElement | null>(null);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  // Fetch products on initial render
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

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
    <section id="product-list" className="h-full w-full mt-12">
      <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {/* Show skeletons on first load */}
        {status === "loading" && (
          Array.from({ length: 16 }).map((_, index) => (
            <Card key={index} sx={{ height: '100%' }}>
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

        {/* Show products when loaded */}
        {visibleProducts.map((product: Product) => (
          <Card key={product?.id} sx={{ height: '100%' }}>
            <CardActionArea sx={{ height: '100%' }}>
              <CardMedia
                component="img"
                height="140"
                image={product?.thumbnail}
                alt={product?.title}
              />
              <CardContent>
                <p className="h-12 line-clamp-2 mb-2 w-full"><span className="me-1 font-semibold">{product?.brand}</span>{product?.title}</p>
                <div className="flex items-center gap-2 text-xs mb-2">{product?.rating} <RatingStars rating={product.rating}/> ({product?.reviews.length})</div>
                <Typography gutterBottom variant="h6" color="green" component="p">
                  {product?.price} 
                </Typography>
              </CardContent>
            </CardActionArea>
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
