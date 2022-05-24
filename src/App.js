import "bootstrap/dist/css/bootstrap.min.css";
import MainContainer from "./components/MainContainer";
import MainHeader from "./components/MainHeader";
import { useEffect, useState } from "react";
import { getModels, getProducers, getProducts } from "./api";

function App() {
  const [producers, setProducers] = useState([]);
  const [models, setModels] = useState([]);
  const [filters, setFilters] = useState({
    ForRent: '0',
    Mans: '',
    Cats: '',
    Period: '3h',
    SortOrder: '1',
  });
  const [products, setProducts] = useState([]);
  const [meta, setMeta] = useState([]);

  useEffect(() => {
    getProducts(filters).then((data) => {
      setMeta(data.meta);
      setProducts(data.items);
    });
  }, []);

  function searchHandler() {
    getProducts(filters).then((data) => {
      setMeta(data.meta);
      setProducts(data.items);
    });
  }

  useEffect(() => {
    getProducers().then((res) => setProducers(res));
  }, []);

  useEffect(() => {
    if(filters.Mans != null && filters.Mans !== '') {
      getModels(filters.Mans.split('.')[0]).then((res) => setModels(res));
    }
  }, [filters.Mans]);

  

  return (
    <div>
      <MainHeader />
      <MainContainer
        products={products}
        meta={meta}
        producers={producers}
        models={models}
        filters={filters}
        setFilters={setFilters}
        searchHandler={searchHandler}
      />
    </div>
  );
}

export default App;
