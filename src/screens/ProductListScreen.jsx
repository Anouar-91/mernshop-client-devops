import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { createProduct, deleteProduct, listProducts } from '../redux/actions/productActions';
import { PRODUCT_CREATE_RESET } from '../redux/constants/productConstants';
import Paginate from '../components/Paginate';

const ProductListScreen = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let {pageNumber} = useParams();

    const productList = useSelector(state => state.productList)
    const { loading, error, products, pages, page } = productList
    const productDelete = useSelector(state => state.productDelete)
    const { loading:loadingDelete, error:errorDelete, success:successDelete } = productDelete

    const productCreate = useSelector(state => state.productCreate)
    const { loading:loadingCreate, error:errorCreate, success:successCreate, product:createdProduct } = productCreate

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {
        dispatch({type:PRODUCT_CREATE_RESET})
        if (userInfo && !userInfo.isAdmin) {
            navigate('/login')
        } 
        if(successCreate) {
            navigate(`/admin/product/${createdProduct._id}/edit`)
        }else{
            dispatch(listProducts('', pageNumber))
        }
    }, [dispatch, userInfo, successDelete, successCreate, createdProduct, pageNumber])

    const deleteHandler = (id) => {
        if (window.confirm('Are you sure ?')) {
            dispatch(deleteProduct(id))
        }
    }
    const createProductHandler = () => {
        dispatch(createProduct())
    }

    return (
        <>
            <div className="d-flex align-items-center justify-content-between">
                <div className="">
                    <h1>Products</h1>
                </div>
                <div className="text-right ">
                    <button className="my-3 btn btn-primary" onClick={createProductHandler}>Create product</button>
                </div>
            </div>
            {loadingCreate && <Loader/>}
            {errorCreate && <Message variant="danger">{errorCreate}</Message>}
            {loadingDelete && <Loader/>}
            {errorDelete && <Message variant="danger">{errorDelete}</Message>}
            {loading ? <Loader /> : error ? <Message variant="danger">{error}</Message> : (
                <>
                <table className="table table-hover">
                    <thead>
                        <tr className="table-primary">
                            <th scope="col">ID</th>
                            <th scope="col">NAME</th>
                            <th scope="col">PRICE</th>
                            <th scope="col">CATEGORY</th>
                            <th className="col">BRAND</th>
                            <th className="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product => (
                            <tr key={product._id}>
                                <td scope="row">{product._id}</td>
                                <td>{product.name}</td>
                                <td> 
                                    ${product.price}
                                </td>
                                <td>{product.category}</td>
                                <td>{product.brand}</td>
                                <td>
                                    <Link className="btn btn-sm btn-warning" to={`/admin/product/${product._id}/edit`}><i className="fa-regular fa-pen-to-square"></i></Link>
                                    <button className="btn btn-sm btn-danger" onClick={() => deleteHandler(product._id)}><i className="fa-solid fa-trash"></i></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <Paginate pages={pages} page={page} isAdmin={true}/>
                </>
            )}
        </>
    )
}

export default ProductListScreen