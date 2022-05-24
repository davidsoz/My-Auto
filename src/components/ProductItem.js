import { useEffect, useState } from "react";
import styled from "styled-components";
import { getModels } from "../api";
import { Compare, Favorite, Note } from "../icons/ActionIcons";
import { Lari } from "../icons/Currancy";
import { Engine, Speed, Transition, Wheel } from "../icons/PartIcons";

const ItemContainer = styled.div`
  margin-top: 10px;
  padding: 14px;
  border-radius: 14px;
  background-color: #fff;
  width: 100%;
  display: flex;
  gap: 16px;
  > :first-child {
    width: 182px;
    height: 144px;
    border-radius: 10px;
    overflow: hidden;
    img {
      width: 182;
      height: 144px;
      cursor: pointer;
    }
  }
  > :last-child {
    flex-grow: 1;
    > div {
      display: flex;
      margin-top: 10px;
      justify-content: space-between;
    }
  }
  .icons {
    display: flex;
    gap: 16px;
  }
`;

function ProductItem({ item, producers }) {
  const [models, setModels] = useState([]);

  const car = producers.find((prod) => Number(prod.man_id) === item.man_id);
  const modelName = models.find((model) => model.model_id === item.model_id);

  useEffect(() => {
    getModels(item.man_id).then((res) => {
      return setModels(res);
    });
  }, [item.man_id]);

  return (
    <ItemContainer>
      <div>
        <img
          src={`https://static.my.ge/myauto/photos/${item.photo}/thumbs/${item.car_id}_2.jpg?v=7`}
          alt="vehicle"
        />
      </div>
      <div>
        <div>
          <div>
            {car.man_name} {modelName && modelName.model_name}{" "}
            <span>{item.prod_year} წ</span>
          </div>
          <div>განბაჟება</div>
          <div>რუსთავის ავტ.</div>
        </div>
        <div>
          <div>
            <div>
              <Engine /> {item.engine_volume} დატ.ჰიბრიდი
            </div>
            <div>
              <Transition /> ავტომატიკა
            </div>
          </div>
          <div>
            <div>
              <Speed /> {item.car_run} კმ
            </div>
            <div>
              <Wheel /> {item.right_wheel ? "მარჯვენა" : "მარცხენა"}
            </div>
          </div>
          <div>
            {item.price} <Lari />
          </div>
        </div>
        <div>
          <div>{item.views} ნახვა 2 დღის წინ</div>
          <div className="icons">
            <Note />
            <Compare />
            <Favorite />
          </div>
        </div>
      </div>
    </ItemContainer>
  );
}

export default ProductItem;
