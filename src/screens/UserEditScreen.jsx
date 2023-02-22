import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { getUserDetails, updateUser } from '../redux/actions/userActions';
import { USER_DETAILS_RESET, USER_UPDATE_RESET } from '../redux/constants/userConstants';

const UserEditScreen = ({ }) => {
    let { id } = useParams();
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [isAdmin, setIsAdmin] = useState(false)

    const dispatch = useDispatch();

    const userDetails = useSelector(state => state.userDetails);
    const { loading, error, user } = userDetails;

    const userUpdate = useSelector(state => state.userUpdate);
    const { loading: loadingUpdate, errorUpdate, success: successUpdate } = userUpdate;

    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(updateUser({_id:user._id, name, email, isAdmin}))
    }

    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: USER_UPDATE_RESET })
            dispatch({ type: USER_DETAILS_RESET })
            navigate('/admin/userlist')
        } else {
            if (!user.name || user._id !== id ) {
                dispatch(getUserDetails(id))
            } else {
                setName(user.name)
                setEmail(user.email)
                setIsAdmin(user.isAdmin)
            }
        }

    }, [user, id, successUpdate])

    return (
        <>
            <Link to="/admin/userlist" className="btn btn-light my-3">
                Go back
            </Link>
            <div>
                <FormContainer>
                    <h1>Edit user</h1>
                    {loadingUpdate && <Loader/>}
                    {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
                    {loading ? <Loader /> : error ? <Message variant="danger">{error}</Message> : (
                        <form onSubmit={submitHandler} action="" className="mt-4">
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input id='name' name="name" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your name" className="form-control" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email Address</label>
                                <input id='email' name="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email address" className="form-control" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="isAdmin">Is Admin</label>
                                <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" checked={isAdmin} onChange={(e) => setIsAdmin(e.target.checked)} />
                            </div>
                            <button className="btn btn-primary mt-3">Update</button>
                        </form>
                    )}
                </FormContainer>
            </div>
        </>
    )
}

export default UserEditScreen