import React, {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from "../../../components/tools/loading/Loading";

function NotFound() {
    const navigate = useNavigate();
    useEffect(() => {
        navigate('/404')
    }, []);
    return (
        <div className={'flex w-full h-full items-center justify-center font-bold text-xl'}>
           <Loading/>
        </div>
    );
}

export default NotFound;