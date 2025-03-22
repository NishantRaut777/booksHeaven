import React, { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import axios from 'axios';

const VerifyEmail = () => {
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");

    useEffect(() => {
        if(token) {
            verifyUserEmail();
        }
    }, [token]);

    const verifyUserEmail = async () => {
        try {
            const { data } = await axios.get(`${process.env.BACKEND_URL}/api/auth/verify?token=${token}`);

            alert(data.message);
        } catch (error) {
            alert("Verification failed. Invalid or Expired Token");
        }
    }

  return (
    <div>
    Verifying Email, Please Wait....
    </div>
  )
}

export default VerifyEmail
