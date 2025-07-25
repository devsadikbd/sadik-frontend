import Head from 'next/head';
import Link from 'next/link';
import gql from 'graphql-tag';
import PaginationStyles from './styles/PaginationStyles';

const PAGINATION_QUERY = gql`
  query PAGINATION_QUERY {
    _allProductsMeta {
      count
    }
  }
`;

export default function Pagination({ page }) {
  return (
    <PaginationStyles>
      <Head>
        <title>sadik - page {page} of ___</title>
      </Head>
      <Link href="/">← Prev</Link>
      <p>Page __ of ___</p>
      <p>__ Items Total</p>
      <Link href="/">Next →</Link>
    </PaginationStyles>
  );
}
