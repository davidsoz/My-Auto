import styled from "styled-components";
import ProductList from "./ProductList";
import SearchBar from "./SearchBar";

const MainBody = styled.div`
  background-color: #e5e5e5;
  padding: 32px 0;
  .content {
    display: flex;
    gap: 20px;
    align-items: flex-start;
    max-width: 1050px;
    margin: 0 auto;
  }
`;

function MainContainer({ producers, models, filters, setFilters, products, meta, searchHandler }) {
  return (
    <MainBody>
      <div className="content">
        <SearchBar
          producers={producers}
          models={models}
          filters={filters}
          setFilters={setFilters}
          onSearch={searchHandler}
        />
        <ProductList 
        producers={producers} 
        models={models} 
        filters={filters} 
        setFilters={setFilters}
        products={products}
        meta={meta} 
        />
      </div>
    </MainBody>
  );
}

export default MainContainer;
