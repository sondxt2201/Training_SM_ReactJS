import { Button } from "@mui/material";
//Types
import { CartItemType } from "../App";
//Styles
import { Wrapper } from "../App.styles";

type Props = {
    item: CartItemType;
    handleAddtoCart: (clickedItem: CartItemType) => void;

}

const Item: React.FC<Props> = ({ item, handleAddtoCart }) => (

    <Wrapper>
        <img src={item.image} alt={item.title} />
    </Wrapper>
)