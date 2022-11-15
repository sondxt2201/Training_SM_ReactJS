import { useState } from 'react';
import { useQuery } from 'react-query';
//Components
import Item from './Item/Item';
import Drawer from '@mui/material/Drawer';
import { LinearProgress } from '@mui/material';
import { Grid } from '@mui/material';
import { Badge } from '@mui/material';
import { AddShoppingCart } from '@mui/icons-material';
//Styles
import { Wrapper, StyledButton } from './App.styles';
//Types
export type CartItemType = {
  id: number;
  category: string;
  description: string;
  price: number;
  title: string;
  amount: number;
  image: string;
}



const getProducts = async (): Promise<CartItemType[]> =>
  await (await fetch('https://fakestoreapi.com/products')).json();

const App = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([] as CartItemType[]);
  const { data, isLoading, error } = useQuery<CartItemType[]>(
    'products',
    getProducts
  );
  console.log(data);
  const getTotalItem = (items: CartItemType[]) =>
    items.reduce((ack: number, item) => ack + item.amount, 0);
  const handleAddtoCart = (clickedItem: CartItemType) => null;
  const handleRemoveFromCart = () => null;
  if (isLoading)
    return <LinearProgress />;

  if (error)
    return <div>Có lỗi xảy ra...</div>


  return (
    // <div className="App">
    //   Hello from the other sideeeee
    // </div>

    <Wrapper>
      <Drawer anchor='right' open={cartOpen} onClose={() => setCartOpen(false)}></Drawer>
      <StyledButton onClick={() => setCartOpen(true)}>
        <Badge badgeContent={getTotalItem(cartItems)} color='error'>
          <AddShoppingCart />
        </Badge>
      </StyledButton>

      <Grid container spacing={3} >
        {data?.map(item => (
          <Grid item key={item.id} xs={12} sm={4}>
            <Item item={item} handleAddtoCart={handleAddtoCart} />
          </Grid>

        ))}
      </Grid>

    </Wrapper>
  );
}

export default App;
