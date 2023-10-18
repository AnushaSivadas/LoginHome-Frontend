import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import success from "../../images/success.png";
import styles from "./styles.module.css";
import API from '../../utils/axios.js';


const EmailVerify = () => {
  const [validUrl, setValidUrl] = useState(true);
  const [loading, setLoading] = useState(true);

  const param = useParams();

  useEffect(() => {
    const verifyEmailUrl = async () => {
      try {
        const { data } = await API.get(`/${param.id}/verify/${param.token}`);
        const { success, message } = data;

        if (success) {
          toast.success(message, { position: 'bottom-left' });
          setValidUrl(true);

        } else {
          toast.error(message, { position: 'bottom-left' });
          setValidUrl(false);

        }

      } catch (error) {
        console.log(error);
        setValidUrl(false);
      } finally {
        setLoading(false);
      }
    };
    verifyEmailUrl();
  }, [param]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {validUrl ? (
        <div className={styles.container}>
          <img src={success} alt="success_img" className={styles.success_img} />

          <center><h2 >Email verified successfully</h2></center>

          <Link to="/">
            <button className={styles.green_btn}>Login</button>
          </Link>
        </div>
      ) : (
        <h1>404 Not Found</h1>
      )}
      <ToastContainer />
    </>
  );
};

export default EmailVerify;