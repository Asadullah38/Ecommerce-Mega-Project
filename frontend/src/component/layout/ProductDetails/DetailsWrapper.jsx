import React, { useEffect, useState } from 'react'
import { clearErrors, getProductDetails } from '../../../actions/productActions';
import { useSelector, useDispatch } from "react-redux";
import Loader from '../Loader.jsx/Loader';
import ProductDetails from './ProductDetails';
import { useParams } from 'react-router-dom';


const DetailsWrapper = () => {
    const dispatch = useDispatch();
    let params = useParams();
    let [param] = useState(params);
    useEffect(() => {
        dispatch(getProductDetails(param.id));
    }, [dispatch, param]);


    const currentProduct = useSelector(state => state.productDetails);
    const { loading, product, error } = currentProduct;

    useEffect(() => {
        if (error) {
            dispatch(clearErrors);
        }
    })

    return (
        <div>{loading ? <Loader /> : !loading && product ? <ProductDetails product={product} /> : <h1>Product Not Found. We are sorry for inconvenience</h1>}</div>
    )
}

export default DetailsWrapper;