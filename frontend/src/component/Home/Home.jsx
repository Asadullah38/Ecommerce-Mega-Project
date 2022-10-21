import React, { useEffect } from 'react'
import "./Home.css";
import Loader from '../layout/Loader.jsx/Loader';
import LandingPage from './LandingPage';
import { useDispatch, useSelector } from "react-redux"
import { getProduct } from '../../actions/productActions';
import { loadUser } from "../../actions/userActions";

const Home = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProduct())
        dispatch(loadUser());
    }, [dispatch])


    const data = useSelector(state => state.products);
    const user= useSelector(state => state.user);
    const { loading } = data;

    return (
        <>
            {loading ? <Loader /> : <LandingPage data={data} user={user} />}
        </>
    )
}

export default Home
