import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import styled from "styled-components";
import { getCategories } from "../api";
import { Auto, Moto, Tractor } from "../icons/carIcons";
import { Dollar } from "../icons/Currancy";
import Input from "../UI/Input";
import Select from "../UI/Select";

const SearchBarContainer = styled.div`
  width: 250px;
  border: 1px solid #e2e5eb;
  box-shadow: 0px 4px 16px rgba(164, 174, 193, 0.1);
  border-radius: 12px 12px 0px 0px;
  overflow: hidden;
  background-color: #fff;

  .search-bar {
    display: flex;
    & > span {
      padding: 17px 25px;
      width: 33.3333%;
      text-align: center;
    }
  }
  .search-body {
    padding: 0 25px;
    & > div {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
  }

  .price-section {
    padding: 20px 25px;
    margin-top: 20px;
    border-top: 2px solid #e9e9f0;
    > div {
      display: flex;
      justify-content: space-between;
    }
  }
  .price-range {
    display: flex;
    gap: 10px;
    margin-top: 20px;
  }
  .search-section {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 16px 25px;
    box-shadow: 0px 2px 16px rgba(39, 42, 55, 0.13);
    > .btn {
      width: 100%;
      background-color: #fd4100;
      border: none;
      border-radius: 6px;
    }
  }
`;

function SearchBar({ producers, filters, setFilters, onSearch, models }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories().then((res) => setCategories(res));
  }, []);

  const types = [
    { value: "0", label: "იყიდება" },
    { value: "1", label: "ქირავდება" },
  ];

  const producersOptions = [{ label: "ყველა მწარმოებელი", value: "" }].concat(
    producers.map((prod) => {
      return {
        value: prod.man_id,
        label: prod.man_name,
      };
    })
  );

  const modelsOptions = [{ label: "ყველა მოდელი", value: "" }].concat(
    models.map((model) => {
      return {
        value: model.model_id,
        label: model.model_name,
      };
    })
  );

  const categoryOptions = [{ label: "ყველა კატეგორია", value: "" }].concat(
    categories.map((cat) => {
      return {
        value: cat.category_id,
        label: cat.title,
      };
    })
  );

  function changeFilterOptions(e, p) {
    console.log(e.target.value);
    let nextFilters = { ...filters };
    if (p === "Model") {
      nextFilters.Mans = nextFilters.Mans.split(".")[0]; 
      if(e.target.value !== '') {
        nextFilters.Mans += "." + e.target.value;
      }
    } else {
      nextFilters[p] = e.target.value;
    }
    setFilters(nextFilters);
  }

  return (
    <SearchBarContainer>
      <div className="search-bar">
        <span>
          <Auto active={true} />
        </span>
        <span>
          <Tractor />
        </span>
        <span>
          <Moto />
        </span>
      </div>
      <div className="search-body">
        <div>
          <div>გარიგების ტიპი</div>
          <Select
            value={filters.ForRent}
            options={types}
            onChange={(e) => changeFilterOptions(e, "ForRent")}
          />
          <div>მწარმოებელი</div>
          <Select
            value={filters.Mans.split(".")[0]}
            options={producersOptions}
            onChange={(e) => changeFilterOptions(e, "Mans")}
          />
          <div>მოდელი</div>
          <Select
            value={filters.Mans.split(".")[1] ?? ""}
            options={modelsOptions}
            onChange={(e) => changeFilterOptions(e, "Model")}
          />
          <div>კატეგორია</div>
          <Select
            value={filters.Cats}
            options={categoryOptions}
            onChange={(e) => changeFilterOptions(e, "Cats")}
          />
        </div>
      </div>
      <div className="price-section">
        <div>
          <span>ფასი</span>
          <span>{<Dollar />}</span>
        </div>
        <div className="price-range">
          <Input placeholder="დან" />
          <span>-</span>
          <Input placeholder="მდე" />
        </div>
      </div>
      <div className="search-section">
        <Button className="btn" variant="primary" onClick={onSearch}>
          ძებნა
        </Button>
      </div>
    </SearchBarContainer>
  );
}

export default SearchBar;
