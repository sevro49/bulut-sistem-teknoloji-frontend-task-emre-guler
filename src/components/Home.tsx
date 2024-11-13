import ProductList from "@/components/ProductList";

const Home = () => {
  return (
    <div className="w-full h-full flex flex-col lg:flex-row gap-8 justify-start px-[0.5rem] sm:px-[5rem] lg:px-[8rem] xl:px-[10rem] 2xl:px-[18rem] relative">
      <ProductList />
    </div>
  );
};

export default Home;
