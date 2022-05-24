import { useEffect, useState } from "react";
import styled from "styled-components";
import { getProducers, getProducts } from "../api";
import Select from "../UI/Select";
import ProductItem from "./ProductItem";

const ProductsContainer = styled.div`
  flex-grow: 1;
  > :first-child {
    display: flex;
    justify-content: space-between;
    align-items: center;
    > :last-child {
      display: flex;
      gap: 8px;
    }
  }
`;

const period = [
  { value: "1h", label: "ბოლო 1 საათი" },
  { value: "2h", label: "ბოლო 2 საათი" },
  { value: "3h", label: "ბოლო 3 საათი" },
  { value: "1d", label: "ბოლო 1 დღე" },
  { value: "2d", label: "ბოლო 2 დღე" },
  { value: "3d", label: "ბოლო 3 დღე" },
  { value: "1w", label: "ბოლო 1 კვირა" },
  { value: "2w", label: "ბოლო 2 კვირა" },
  { value: "3w", label: "ბოლო 3 კვირა" },
];
const dates = [
  { value: 1, label: "თარიღი კლებადი" },
  { value: 2, label: "თარიღი ზრდადი" },
  { value: 3, label: "ფასი კლებადი" },
  { value: 4, label: "ფასი ზრდადი" },
  { value: 5, label: "გარბენი კლებადი" },
  { value: 6, label: "გარბენი ზრდადი" },
];

function ProductList({ producers, models, filters, setFilters, products, meta }) {
 
  function changeFilterOptions(e, p) {
    let nextFilters = { ...filters };
    nextFilters[p] = e.target.value;
    setFilters(nextFilters);
  }

  return (
    <ProductsContainer>
      <div>
        <span>{meta.total} განცხადება</span>
        <div>
          <Select
            value={filters.Period}
            options={period}
            onChange={(e) => changeFilterOptions(e, "Period")}
          />
          <Select
            value={filters.SortOrder}
            options={dates}
            onChange={(e) => changeFilterOptions(e, "SortOrder")}
          />
        </div>
      </div>
      <div>
        {products.map((product) => (
          <ProductItem
            key={product.car_id}
            producers={producers}
            models={models}
            item={product}
          />
        ))}
      </div>
    </ProductsContainer>
  );
}

export default ProductList;
