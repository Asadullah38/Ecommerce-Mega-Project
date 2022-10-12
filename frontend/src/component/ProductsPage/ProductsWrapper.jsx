import React, { useEffect } from 'react'
import { getProduct } from '../../actions/productActions';
import { useSelector, useDispatch } from "react-redux";
import Loader from '../layout/Loader.jsx/Loader';
import ProductsPage from './ProductsPage';


const ProductsWrapper = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProduct())
    }, [dispatch])
    const data = useSelector(state => state.products);
    const { loading } = data;


    return (
        <div>{loading ? <Loader /> : <ProductsPage data={data} />}</div>
    )
}

export default ProductsWrapper;