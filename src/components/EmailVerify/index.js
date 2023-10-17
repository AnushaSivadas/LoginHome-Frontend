import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { toast,ToastContainer } from "react-toastify";
import success from "../../images/success.png";
import styles from "./styles.module.css";
import { BASE_URL } from "../../api/AuthRequests";

const EmailVerify = () => {
    const [validUrl, setValidUrl] = useState(true);
    const [loading, setLoading] = useState(true); 
  
    const param = useParams();
  
    useEffect(() => {
      const verifyEmailUrl = async () => {
        try {
          const url = `${BASE_URL}/${param.id}/verify/${param.token}`;
          const { data } = await axios.get(url);
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
					<h1>Email verified successfully</h1>
					<Link to="/">
						<button className={styles.green_btn}>Login</button>
					</Link>
				</div>
			) : (
				<h1>404 Not Found</h1>
			)}
      <ToastContainer/>
		</>
	);
};

export default EmailVerify;