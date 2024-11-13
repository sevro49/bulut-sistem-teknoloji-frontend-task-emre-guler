import { Routes, Route } from "react-router-dom";
import Home from "@/components/Home";
import ProductDetail from "@/components/ProductDetail/ProductDetail";

function App() {

  return (
    <main>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetail />} />
      </Routes>
    </main>
  );
}

export default App;
