import { useContext,useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import ContextApi from './ContextApi'


function RequireAuth({ children }) {

    useEffect(() => {
      
    
      
    }, [])
    
    let auth=useContext(ContextApi);
    // console.log(auth);
    return  auth.isAuth === true ? children : <Navigate to="/login" replace />;
  }
  
export default RequireAuth;