import { useQuery, gql } from "@apollo/client";

export const CURRENT_USER_QUERY = gql`
  query {
    authenticatedItem {
      ... on User {
        id
        name
        email
        cart {
          id
          quantity
          product {
            id
            price
            name
            description
            photo {
              image {
                publicUrlTransformed
              }
            }
          }
        }
      }
    }
  }
`;

export function useUser() {
  const { data } = useQuery(CURRENT_USER_QUERY, {
    errorPolicy: "all",
    returnPartialData: true,
  });

  const user = data?.authenticatedItem;
  if (!user) return undefined;

  return {
    ...user,
    cart:
      user.cart?.filter(
        (cartItem) => !cartItem?.product || typeof cartItem.product === "object",
      ) || [],
  };
}

// Keep the old export for backward compatibility
export const UseUser = useUser;
