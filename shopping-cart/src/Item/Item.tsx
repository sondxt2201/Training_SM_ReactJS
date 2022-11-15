import { Button } from "@mui/material";
//Types
import { CartItemType } from "../App";
//Styles
import { Wrapper } from "../Item/Item.styles";

type Props = {
    item: CartItemType;
    handleAddtoCart: (clickedItem: CartItemType) => void;

}

const Item: React.FC<Props> = ({ item, handleAddtoCart }) => (

    <Wrapper>
        <img src={item.image} alt={item.title} />
        <div>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <p>${item.price}</p>
        </div>
        <button onClick={() => handleAddtoCart(item)}>Add to cart</button>
    </Wrapper>
)

export default Item;