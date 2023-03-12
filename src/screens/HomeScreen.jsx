import React, { useEffect, useState } from 'react'
import Product from '../components/Product';
import { ThreeDots } from 'react-loader-spinner'
//redux
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../redux/actions/productActions';
import Message from '../components/Message';
import { useParams } from 'react-router-dom';
import Paginate from '../components/Paginate';
import { Helmet } from 'react-helmet';
import ProductCarousel from '../components/ProductCarousel';
import Meta from '../components/Meta';
import axios from 'axios';
import * as Sentry from '@sentry/react';


const HomeScreen = () => {
    let { keyword } = useParams();
    let { pageNumber } = useParams();
    const dispatch = useDispatch();
    const productList = useSelector(state => state.productList)
    const { loading, error, products, page, pages } = productList

    async function generateError() {
        console.log("error envoyé")
        try{
            const {data} = await axios.get("http://localhost/api/error/" + 'products')
        }catch(error){
            Sentry.captureException(error);
        }
    }

    useEffect(() => {
        dispatch(listProducts(keyword, pageNumber))
    }, [dispatch, keyword, pageNumber])

    return (
        <div className="container">
            <Meta />
            {!keyword && <><div className="mt-3"><ProductCarousel /></div></>}
            <h1>Latest Products</h1>
            <button className="btn btn-primary" onClick={() => generateError()}>Génerer une erreur</button>
            {loading
                ? <ThreeDots wrapperStyle={{ justifyContent: 'center' }} />
                : error
                    ? (<Message variant="danger">{error}</Message>) :
                    <>
                        <div className="row">
                            {products.map(product => {
                                return (
                                    <div key={product._id} className="col-md-4">
                                        <Product product={product} />
                                    </div>
                                )

                            })}
                        </div>
                        <div className="mt-5">
                            <Paginate pages={pages} page={page} keyword={keyword ? keyword : ""} />
                        </div>

                    </>
            }

        </div>
    )
}

export default HomeScreen