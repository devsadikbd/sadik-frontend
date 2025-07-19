exports.id = 424;
exports.ids = [424];
exports.modules = {

/***/ 7900:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Z": function() { return /* binding */ Products; }
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(5282);
// EXTERNAL MODULE: external "@apollo/client"
var client_ = __webpack_require__(8074);
// EXTERNAL MODULE: external "graphql-tag"
var external_graphql_tag_ = __webpack_require__(9875);
var external_graphql_tag_default = /*#__PURE__*/__webpack_require__.n(external_graphql_tag_);
// EXTERNAL MODULE: external "styled-components"
var external_styled_components_ = __webpack_require__(9914);
var external_styled_components_default = /*#__PURE__*/__webpack_require__.n(external_styled_components_);
// EXTERNAL MODULE: ./node_modules/next/link.js
var next_link = __webpack_require__(1664);
;// CONCATENATED MODULE: ./components/styles/Title.js

const Title = external_styled_components_default().h3.withConfig({
  displayName: "Title",
  componentId: "sc-16nq74k-0"
})(["margin:0 1rem;text-align:center;transform:skew(-5deg) rotate(-1deg);margin-top:-3rem;text-shadow:2px 2px 0 rgba(0,0,0,0.1);a{background:var(--red);display:inline;line-height:1.3;font-size:4rem;text-align:center;color:white;padding:0 1rem;}"]);
/* harmony default export */ var styles_Title = (Title);
;// CONCATENATED MODULE: ./components/styles/ItemStyles.js

const ItemStyles = external_styled_components_default().div.withConfig({
  displayName: "ItemStyles",
  componentId: "sc-16pk14u-0"
})(["background:white;border:1px solid var(--offWhite);box-shadow:var(--bs);position:relative;display:flex;flex-direction:column;img{width:100%;height:400px;object-fit:cover;}p{line-height:2;font-weight:300;flex-grow:1;padding:0 3rem;font-size:1.5rem;}.buttonList{display:grid;width:100%;border-top:1px solid var(--lightGray);grid-template-columns:repeat(auto-fit,minmax(100px,1fr));grid-gap:1px;background:var(--lightGray);& > *{background:white;border:0;font-size:1rem;padding:1rem;}}"]);
/* harmony default export */ var styles_ItemStyles = (ItemStyles);
;// CONCATENATED MODULE: ./components/styles/PriceTag.js

const PriceTag = external_styled_components_default().span.withConfig({
  displayName: "PriceTag",
  componentId: "sc-nwbk6t-0"
})(["background:var(--red);transform:rotate(3deg);color:white;font-weight:600;padding:5px;line-height:1;font-size:3rem;display:inline-block;position:absolute;top:-3px;right:-3px;"]);
/* harmony default export */ var styles_PriceTag = (PriceTag);
;// CONCATENATED MODULE: ./lib/formatMoney.js
function formatMoney(amount = 0) {
  const options = {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  };

  if (amount % 100 === 0) {
    options.minimumFractionDigits = 0;
  }

  const formatter = Intl.NumberFormat('en-US', options);
  return formatter.format(amount / 100);
}
;// CONCATENATED MODULE: ./components/DeleteProduct.js



const DELETE_PRODUCT_MUTATION = external_graphql_tag_.gql`
  mutation DeleteProduct($id: ID!) {
    deleteProduct(id: $id) {
      id
    }
  }
`;
function DeleteProduct({
  id,
  children
}) {
  const [deleteProduct, {
    loading,
    error
  }] = (0,client_.useMutation)(DELETE_PRODUCT_MUTATION, {
    variables: {
      id
    }
  });
  return /*#__PURE__*/jsx_runtime_.jsx("button", {
    type: "button",
    onClick: () => {
      if (confirm('Are you sure you want to delete this product?')) {
        // TODO: Add delete logic here
        console.log('deleting');
        deleteProduct().catch(err => alert(err.message));
      }
    },
    children: children
  });
}
;// CONCATENATED MODULE: ./components/Product.js








function Product({
  product
}) {
  var _product$photo, _product$photo$image;

  return /*#__PURE__*/(0,jsx_runtime_.jsxs)(styles_ItemStyles, {
    children: [/*#__PURE__*/jsx_runtime_.jsx("img", {
      src: product === null || product === void 0 ? void 0 : (_product$photo = product.photo) === null || _product$photo === void 0 ? void 0 : (_product$photo$image = _product$photo.image) === null || _product$photo$image === void 0 ? void 0 : _product$photo$image.publicUrlTransformed,
      alt: product.name
    }), /*#__PURE__*/jsx_runtime_.jsx(styles_Title, {
      children: /*#__PURE__*/jsx_runtime_.jsx(next_link.default, {
        href: `/product/${product.id}`,
        children: product.name
      })
    }), /*#__PURE__*/jsx_runtime_.jsx(styles_PriceTag, {
      children: formatMoney(product.price)
    }), /*#__PURE__*/jsx_runtime_.jsx("p", {
      children: product.description
    }), /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
      className: "buttonList",
      children: [/*#__PURE__*/jsx_runtime_.jsx(next_link.default, {
        href: {
          pathname: 'update',
          query: {
            id: product.id
          }
        },
        children: "Edit \u270F\uFE0F"
      }), /*#__PURE__*/jsx_runtime_.jsx(DeleteProduct, {
        id: product.id,
        children: "Delet"
      })]
    })]
  });
}
;// CONCATENATED MODULE: ./components/Products.js






const ALL_PRODUCTS_QUERY = (external_graphql_tag_default())`
  query ALL_PRODUCTS_QUERY {
    allProducts {
      id
      name
      price
      description
      photo {
        id
        image {
          publicUrlTransformed
        }
      }
    }
  }
`;
const ProductsListStyles = external_styled_components_default().div.withConfig({
  displayName: "Products__ProductsListStyles",
  componentId: "sc-1uv5x8m-0"
})(["display:grid;grid-template-columns:1fr 1fr;grid-gap:60px;"]);
function Products() {
  const {
    data,
    error,
    loading
  } = (0,client_.useQuery)(ALL_PRODUCTS_QUERY);
  console.log(data, error, loading);
  if (loading) return /*#__PURE__*/jsx_runtime_.jsx("p", {
    children: "Loading..."
  });
  if (error) return /*#__PURE__*/(0,jsx_runtime_.jsxs)("p", {
    children: ["Error: ", error.message]
  });
  return /*#__PURE__*/jsx_runtime_.jsx("div", {
    children: /*#__PURE__*/jsx_runtime_.jsx(ProductsListStyles, {
      children: data.allProducts.map(product => /*#__PURE__*/jsx_runtime_.jsx(Product, {
        product: product
      }, product.id))
    })
  });
}

/***/ }),

/***/ 4453:
/***/ (function() {

/* (ignored) */

/***/ })

};
;