import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { server } from "../server";

const ActivationPage = () => {
  const { activation_token } = useParams();
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (activation_token) {
      const sendRequest = async () => {
        try {
          const res = await axios.post(`${server}/user/activation`, {
            activation_token,
          });
          console.log(res);
          setSuccess(true);
        } catch (err) {
          console.error(err);
          setError(true);
        }
      };
      sendRequest();
    }
  }, [activation_token]);

  return (
    <div className="flex justify-center items-center h-screen">
      {error && (
        <p className="text-red-500">Your token is expired or invalid!</p>
      )}
      {success && (
        <p className="text-green-500">Your account has been created successfully!</p>
      )}
      {!error && !success && <p>Activating your account...</p>}
    </div>
  );
};

export default ActivationPage;