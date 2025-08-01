````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````import { PAGINATION_QUERY } from '../components/Pagination';

export default function PaginationField() {
  return {
    keyArgs: false,
    read(existing = [], { args, cache }) {
      console.log({ existing, args, cache });
      const { first, skip } = args;
      const data = cache.readQuery({
        query: PAGINATION_QUERY,
      });
      const count = data?._allProductsMeta?.count;
      const page = skip / first + 1;
    },
    merge() {},
  };
}
