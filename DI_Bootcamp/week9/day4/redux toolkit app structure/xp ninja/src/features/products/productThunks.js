import { setProducts, setLoading, setError } from './productSlice';

export const fetchProducts = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await fetch('https://fakestoreapi.com/products');
    const data = await response.json();
    dispatch(setProducts(data));
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};