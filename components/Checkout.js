'use client';

import { gql } from 'graphql-tag';
import { useMutation } from '@apollo/client';
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import styled from 'styled-components';
import { useState } from 'react';
import SickButton from './styles/SickButton';
import { CURRENT_USER_QUERY } from './User';
import DisplayError from './ErrorMessage';
import { useCart } from '../lib/cartState';

const CheckoutFormStyles = styled.form`
  box-shadow: 0 1px 2px 2px rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 5px;
  padding: 1rem;
  display: grid;
  grid-gap: 1rem;
`;

const stripePromise = process.env.NEXT_PUBLIC_STRIPE_KEY
  ? loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY)
  : null;

const CHECKOUT_MUTATION = gql`
  mutation CHECKOUT_MUTATION($token: String!) {
    checkout(token: $token) {
      id
      charge
      total
    }
  }
`;

function CheckoutForm() {
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const { closeCart } = useCart();
  const [checkout, { error: checkoutError }] = useMutation(CHECKOUT_MUTATION, {
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });

  async function handleSubmit(e) {
    e.preventDefault();

    if (!stripe || !elements) {
      setError({ message: 'Stripe has not loaded yet. Please try again.' });
      return;
    }

    setLoading(true);
    setError(null); // Clear previous errors
    console.log('Thanks for ordering!');

    try {
      const { paymentMethod, error: stripeError } =
        await stripe.createPaymentMethod({
          type: 'card',
          card: elements.getElement(CardElement),
        });

      console.log(paymentMethod);

      if (stripeError) {
        setError(stripeError);
      } else {
        console.log('Payment method created successfully:', paymentMethod);
        await checkout({
          variables: {
            token: paymentMethod.id,
          },
        });
        elements.getElement(CardElement)?.clear();
        closeCart();
      }
    } catch (err) {
      setError(err);
      console.error('Payment error:', err);
    }

    setLoading(false);
  }

  if (!process.env.NEXT_PUBLIC_STRIPE_KEY) {
    return (
      <div className="p-4 border border-red-300 bg-red-50 rounded">
        <p className="text-red-700">
          Missing Stripe configuration. Please add NEXT_PUBLIC_STRIPE_KEY to
          your environment variables.
        </p>
      </div>
    );
  }

  return (
    <CheckoutFormStyles onSubmit={handleSubmit}>
      <DisplayError error={error || checkoutError} />
      <CardElement
        options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#424770',
              '::placeholder': {
                color: '#aab7c4',
              },
            },
          },
        }}
      />
      <SickButton type="submit" disabled={!stripe || loading}>
        {loading ? 'Processing...' : 'Check Out Now'}
      </SickButton>
    </CheckoutFormStyles>
  );
}

function Checkout() {
  if (!stripePromise) {
    return (
      <div className="p-4 border border-red-300 bg-red-50 rounded">
        <p className="text-red-700">
          Stripe configuration is missing. Please check your environment
          variables.
        </p>
      </div>
    );
  }

  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
}

export { Checkout };
