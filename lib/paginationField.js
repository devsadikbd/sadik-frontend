export default function PaginationField() {
  return {
    keyArgs: false,
    read(existing = [], { args, cache }) {
      console.log({ existing, args, cache });
    },
    merge() {},
  };
}
