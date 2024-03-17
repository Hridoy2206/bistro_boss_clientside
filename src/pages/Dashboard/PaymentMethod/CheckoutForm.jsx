import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useEffect, useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useCart from '../../../hooks/useCart';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import useAuth from '../../../hooks/useAuth';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import useMenu from '../../../hooks/useMenu';

const CheckoutForm = () => {
    const [paymentError, setPaymentError] = useState();
    const [clientSecret, setClientSecret] = useState("");
    const [paymentIntentId, setPaymentIntentId] = useState("");
    const navigate = useNavigate();
    const { user } = useAuth();
    console.log(user.displayName, user.email);
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const [cartData] = useCart();
    const [menu] = useMenu();
    const totalPrice = cartData.reduce((total, item) => total + item.price, 0);

    useEffect(() => {
        if (totalPrice > 0) {
            axiosSecure.post("/create-payment-intent", { price: totalPrice })
                .then(res => {
                    console.log(res.data?.clientSecret);
                    setClientSecret(res.data?.clientSecret)
                })
        }
    }, [axiosSecure, totalPrice])

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }
        const card = elements.getElement(CardElement);
        if (card === null) {
            return;
        }

        // Include billing_details when creating the payment method
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
            billing_details: {
                email: user?.email || "anonymous",
                name: user?.displayName || "anonymous",
            }
        });

        if (error) {
            console.log('[error]', error);
            setPaymentError(error?.message);
            return;
        }

        //* Confirm the payment intent without including billing_details
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
            clientSecret, {
            payment_method: paymentMethod.id,
        });

        if (confirmError) {
            console.log("confirmError", confirmError);
        } else {
            console.log("payment intent", paymentIntent);
            if (paymentIntent.status === "succeeded") {
                setPaymentIntentId(paymentIntent.id)
            }
        }
        //* Save payment in the database
        const paymentInfo = {
            name: user?.displayName,
            email: user?.email,
            price: totalPrice,
            transectionId: paymentIntent?.id,
            data: new Date(),
            cartIds: cartData.map(item => item._id),
            menuItemIds: cartData.map(item => item.menuId),
            status: "pending"
        }
        const res = await axiosSecure.post("/payments", paymentInfo);
        if (res.data?.paymentResult?.insertedId) {
            toast.success("Successfully payment completed");
            navigate("/dashboard/payment-history")
        }
        console.log(res);

    }

    return (
        <div className='lg:w-7/12 mx-auto mt-8'>
            <form onSubmit={handleSubmit}>
                <CardElement
                    className='border border-gray-500 p-2'
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                border: '1px solid #ff5200',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                {paymentError && <p className='text-red-400 mt-2'>{paymentError}</p>}
                {paymentIntentId && <p className='text-green-400 mt-2'>{paymentIntentId}</p>}
                <div className='text-center w-1/3 mx-auto'>
                    <button className='mx-auto w-full mt-16 lg:px-12 px-2 py-3 rounded-lg bg-[#D1A054] text-white active:scale-95 duration-300 disabled:bg-slate-300 disabled:active:scale-100' type="submit" disabled={!stripe || !clientSecret}>
                        Pay
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CheckoutForm;