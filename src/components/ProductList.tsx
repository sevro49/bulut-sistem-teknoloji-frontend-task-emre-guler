import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "@/store/requestSlice"; // imported fetchProducts
import { RootState, AppDispatch } from "@/store/store";
import { Product } from "@/types/types.ts"; // imported Product type

// Material UI components
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';

const ProductList = () => {
  const dispatch = useDispatch<AppDispatch>(); // added AppDispatch

  const { products, status, error } = useSelector(
    (state: RootState) => state.counter.fetchProducts
  );

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts()); // call fetchProducts
    }
  }, [status, dispatch]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  return (
    <section id="product-list" className="h-full w-full mt-12">
      {products.length > 0 ? (
        <div className="w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((product: Product) => (
            <Card key={product?.id} sx={{  }}>
              <CardActionArea sx={{ height: '100%' }}>
                <CardMedia
                  component="img"
                  height="140"
                  image={product?.thumbnail}
                  alt={product?.title}
                />
                <CardContent>
                  <Typography gutterBottom variant="subtitle1" component="p" sx={{ height: 58}}>
                    {product?.title}
                  </Typography>
                  <Typography gutterBottom variant="h6" color="green" component="p">
                    {product?.price}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </div>
      ) : (
        <p>No products available</p>
      )}
    </section>
  );
};

export default ProductList;
