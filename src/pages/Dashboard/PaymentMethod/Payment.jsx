import SectionHeading from '../../../components/SectionHeading';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';


const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GETWAY_KEY)
const Payment = () => {
    return (
        <div>
            <SectionHeading heading={"First pay then eat"} />
            <div>
                <h2 className='text-center text-4xl font-semibold uppercase text-gray-700'>Payment</h2>

                <Elements stripe={stripePromise}>
                    <CheckoutForm />
                </Elements>
            </div>
        </div>
    );
};

export default Payment;