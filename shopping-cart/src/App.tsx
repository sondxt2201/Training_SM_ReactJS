import { useState } from 'react';
import { useQuery } from 'react-query';
//Components
import Item from './Item/Item';
import Cart from './Cart/Cart';
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

  const handleAddtoCart = (clickedItem: CartItemType) => {
    setCartItems(prev => {
      const isItemInCart = prev.find(item => item.id === clickedItem.id)

      if (isItemInCart) {
        return prev.map(item => (
          item.id === clickedItem.id ?
            { ...item, amount: item.amount + 1 }
            : item
        ))
      }

      return [...prev, { ...clickedItem, amount: 1 }];
    })
  };

  const handleRemoveFromCart = (id: number) => {
    setCartItems(
      prev => (
        prev.reduce((ack, item) => {
          if (item.id === id) {
            if (item.amount === 1) {
              return ack;
            } else {
              return [...ack, { ...item, amount: item.amount - 1 }];
            }
          } else {
            return [...ack, item];
          }
        }, [] as CartItemType[])
      )
    )
  };

  if (isLoading)
    return <LinearProgress />;

  if (error)
    return <div>Có lỗi xảy ra...</div>


  return (
    <Wrapper>
      <Drawer anchor='right' open={cartOpen} onClose={() => setCartOpen(false)}>
        <Cart cartItems={cartItems} addToCart={handleAddtoCart} removeFromCart={handleRemoveFromCart} />
      </Drawer>
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
