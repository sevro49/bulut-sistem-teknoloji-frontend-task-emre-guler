import ProductList from "@/components/ProductList";
import FilterList from "@/components/FilterList";

const Home = () => {
  return (
    <section className="w-full h-full flex flex-col lg:flex-row gap-8 justify-start px-[0.5rem] sm:px-[2rem] md:px-[5rem] lg:px-[8rem] xl:px-[10rem] 2xl:px-[18rem] relative">
      <FilterList />
      <ProductList />
    </section>
  );
};

export default Home;
