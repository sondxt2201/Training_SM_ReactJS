import { useState } from 'react';
import { useQuery } from 'react-query';
//Components
import Drawer from '@mui/material/Drawer';
import { LinearProgress } from '@mui/material';
import Grid from '@mui/material';
import { Badge } from '@mui/material';
import AddShoppingCart from '@mui/material';
//Styles
import { Wrapper } from './App.styles';
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



const getProducts = async (): Promise<CartItemType> =>
  await (await fetch('https://fakestoreapi.com/products')).json();

const App = () => {
  const { data, isLoading, error } = useQuery<CartItemType[]>(
    'products',
    getProducts
  );
  console.log(data);
  const getTotalItem = () => null;
  const handleAddtoCart = (clickedItem: CartItemType) => null;
  const handleRemoveFromCart = () => null;
  if (isLoading)
    return <LinearProgress />;

  if (error)
    return <div>Có lỗi xảy ra...</div>


  return (
    <div className="App">
      Hello from the other sideeeee
    </div>
  );
}

export default App;
