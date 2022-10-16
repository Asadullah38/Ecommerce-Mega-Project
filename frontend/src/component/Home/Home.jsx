import React, { useEffect } from 'react'
import "./Home.css";
import Loader from '../layout/Loader.jsx/Loader';
import LandingPage from './LandingPage';
import { useDispatch, useSelector } from "react-redux"
import { getProduct } from '../../actions/productActions';

const Home = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProduct())
    }, [dispatch])


    const data = useSelector(state => state.products);
    const { loading } = data;

    return (
        <>
            {loading ? <Loader /> : <LandingPage data={data} />}
        </>
    )
}

export default Home
