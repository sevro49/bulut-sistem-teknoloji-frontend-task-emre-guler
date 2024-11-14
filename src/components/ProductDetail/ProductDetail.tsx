import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { Product } from '@/types/types';
import ProductImage from './ProductImage';
import ProductInfo from './ProductInfo';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const product = useSelector((state: RootState) =>
    state.requests.filteredProducts.find((prod: Product) => prod.id.toString() === id)
  );

  if(!product) {
    return <div>Product not found</div>;
  }

  return (
    <section id='product-detail' className='flex flex-col lg:flex-row gap-10 w-full h-full px-[0.5rem] sm:px-[2rem] md:px-[5rem] lg:px-[8rem] xl:px-[10rem] 2xl:px-[18rem] mt-12'>
      <ProductImage product={product} />
      <ProductInfo product={product} />
    </section>
  )
}

export default ProductDetail