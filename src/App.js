import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { simpleGetCall } from "./components/service/servies";
import { useEffect, useRef, useState } from "react";
import defailtProduct from "./defailtProduct.svg";
import Footer from "./components/Footer";

function App() {
  const [productCategories, setProductCategories] = useState([]);
  const [seleCategory, setSeleCategory] = useState();
  const [seleSubCategory, setseleSubCategory] = useState();
  const [loading, setLoading] = useState(false);
  const [subcategories, Setsubcategories] = useState([]);
  const [products, setproducts] = useState();
  const [selProduct, setselProduct] = useState();
  const [selProductTocard, setselProductstoCart] = useState([]);
  const [cartProducts, setCartProducts] = useState([]);
  const [price, setprice] = useState(0);
  const prodRef = useRef(null);
  const qtyRef = useRef(null);

  useEffect(() => {
    getProductCategories();
  }, []);

  console.log("peoductCategories", productCategories);
  console.log("setSeleCategory", seleCategory);
  console.log("subcategories", subcategories);
  console.log("seleSubCategory", seleSubCategory);
  console.log("product", selProduct);
  console.log("selProductTocard", selProductTocard);
  console.log("cartProducts", cartProducts);
  const getProductCategories = () => {
    setLoading(true);
    simpleGetCall(
      "https://elredtest.s3.amazonaws.com/reactAssignment/getCategories.json"
    )
      .then((res) => {
        if (res.success) {
          setProductCategories(res.result);
        }
      })
      .catch((err) => {
        console.log("err", err);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    if (seleCategory && seleCategory.length) {
      productsBycategory();
    }
  }, [seleCategory]);

  const productsBycategory = () => {
    setLoading(true);
    simpleGetCall(
      `https://elredtest.s3.amazonaws.com/reactAssignment/getSubCategory_${seleCategory}.json`
    )
      .then((res) => {
        console.log("res");
        if (res.success) {
          Setsubcategories(res.result);
        }
      })
      .catch((err) => {
        console.log("err", err);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    if (seleSubCategory && seleSubCategory.length) {
      getProductsBy();
    }
  }, [seleSubCategory]);

  useEffect(() => {
    let price = 0;
    if (selProductTocard && selProductTocard.length) {
      selProductTocard.map((item) => (price = price + Number(item.grossPrice)));
      setprice(price);
    }
  }, [selProductTocard]);

  const getProductsBy = () => {
    setLoading(true);
    simpleGetCall(
      `https://elredtest.s3.amazonaws.com/reactAssignment/getProduct_${seleSubCategory}.json`
    )
      .then((res) => {
        console.log("res", res);
        if (res.success) {
          setproducts(res.result);
        }
      })
      .catch((err) => {
        console.log("err", err);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <div className="App">
      <Navbar />
      <Sidebar product={!products || loading ? true : false} />
      <div className={`cx-main ${!products && "h-100"}`}>
        <div className="d-flex">
          <h2>Print Heads</h2>
          <input
            className="form-control  w-25"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
        </div>
        <div className="cx-body p-5">
          {loading ? (
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          ) : seleSubCategory ? (
            products && products.length ? (
              <div className="d-flex">
                <div className="products">
                  {products.map((product, index) => {
                    return (
                      <div
                        className="product"
                        key={product.productId}
                        onClick={() => {
                          setselProduct(product);
                        }}
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                      >
                        <img
                          src={
                            product.productImages.length
                              ? product.productImages[0]
                              : defailtProduct
                          }
                        />
                        <span className="categoryName">
                          {product.itemDescription}
                        </span>
                      </div>
                    );
                  })}
                </div>
                <div className="cartItem">
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">Product</th>
                        <th scope="col">Quality</th>
                        <th scope="col">Price</th>
                        <th scope="col">edit </th>
                      </tr>
                    </thead>
                    <tbody>
                      {cartProducts.map((item, index) => {
                        console.log("item",item);
                        return (
                          <tr>
                            <th scope="row">{item && item.selProductTocard && item.selProductTocard[0].packingDescription}</th>
                            <td>{item.qty}</td>
                            <td>{item.price}</td>
                            <td>
                              <button
                                className="btn btn-primary"
                                onClick={() => {
                                 qtyRef.current.value=item.price;
                                 setprice(item.price)
                                 setselProductstoCart(item.selProductTocard)
                                }}
                                data-bs-toggle="modal"
                                data-bs-target="#exampleModal"
                              >
                                edit
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div className="noDta mt-5">
                <span className="text-danger"> No Product found</span>
              </div>
            )
          ) : (
            <>
              <div className="productCategories">
                {productCategories.length ? (
                  productCategories.map((productCat, index) => {
                    return (
                      <div
                        key={productCat.categoryId}
                        className={`productCat  ${
                          seleCategory == productCat.categoryId &&
                          "seleCategory"
                        }`}
                        onClick={() => {
                          setSeleCategory(productCat.categoryId);
                        }}
                      >
                        <img
                          src={
                            productCat.categoryImageURL.length
                              ? productCat.categoryImageURL
                              : defailtProduct
                          }
                        />
                        <span className="categoryName">
                          {productCat.categoryName}
                        </span>
                      </div>
                    );
                  })
                ) : (
                  <></>
                )}
              </div>
              <hr className="w-75" />
              <div className="subcategories">
                {subcategories && subcategories.length
                  ? subcategories.map((category, index) => {
                      return (
                        <div
                          key={category.subCategoryId}
                          className={`subCat  ${
                            seleCategory == category.subCategoryId &&
                            "seleCategory"
                          }`}
                          onClick={() => {
                            setseleSubCategory(category.subCategoryId);
                          }}
                        >
                          <img
                            src={
                              category.subCategoryImageURL.length
                                ? category.subCategoryImageURL
                                : defailtProduct
                            }
                          />
                          <span className="categoryName">
                            {category.subCategoryName}
                          </span>
                        </div>
                      );
                    })
                  : !loading &&
                    seleCategory &&
                    seleCategory.length && (
                      <div className="noDta mt-5">
                        <span className="text-danger">
                          {" "}
                          No Subcategory found
                        </span>
                      </div>
                    )}
              </div>
            </>
          )}
        </div>
        {seleSubCategory && !loading && (
          <Footer
            setseleSubCategory={setseleSubCategory}
            setproducts={setproducts}
            subcategories={subcategories}
          />
        )}
      </div>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Modal title
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body d-flex">
              <div className="left">
                <h2>{selProduct && selProduct.itemDescription}</h2>
                <div className="productImages">
                  <img
                    src={
                      selProduct &&
                      selProduct.productImages &&
                      selProduct.productImages.length &&
                      selProduct.productImages[0]
                    }
                  />
                </div>
                <b className="title">
                  {selProduct && selProduct.itemDescription}{" "}
                </b>
                <b className="price">
                  {selProduct &&
                    selProduct.currency &&
                    selProduct.currency.symbol}{" "}
                  {price}
                </b>
                <div className="productInfo">dsdafsdf</div>
                <div className="varient d-flex ">
                  {selProduct &&
                    selProduct.variants &&
                    selProduct.variants.length &&
                    selProduct.variants.map((vrien, index) => {
                      var filteItem = selProductTocard.filter(
                        (item) => item.variantId == vrien.variantId
                      );
                      return (
                        <div
                          className=" varientItem"
                          key={"vrien" + index}
                          onClick={() => {
                            console.log(
                              "sdsa",
                              selProductTocard.indexOf(vrien)
                            );

                            if (filteItem.length && selProductTocard) {
                              setselProductstoCart(
                                selProductTocard.filter(
                                  (item) => item.variantId != vrien.variantId
                                )
                              );
                            } else
                              setselProductstoCart([
                                ...selProductTocard,
                                vrien,
                              ]);
                          }}
                        >
                          <button
                            type="button"
                            class={
                              filteItem.length
                                ? "btn btn-outline-danger "
                                : "btn btn-outline-secondary "
                            }
                          >
                            {vrien.packingDescription}
                          </button>
                        </div>
                      );
                    })}
                </div>
                <div className="qty p-3">
                  <label htmlFor="">Enter Quantity</label>
                  <input
                    className="form-control  w-25"
                    type="number"
                    placeholder="Quantity"
                    aria-label="Search"
                    min={2}
                    max={12}
                    ref={qtyRef}
                  />
                </div>
              </div>
              <div className="right">
                {selProductTocard && selProductTocard.length ? (
                  <div class="table-responsive">
                    <table class="table table-bordered">
                      <thead>
                        <tr>
                          <th scope="col">Product Description</th>
                          <th scope="col">Product color</th>
                          <th scope="col">Price</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selProductTocard.map((prod, index) => {
                          return (
                            <tr key={"prod" + index}>
                              <th scope="row">{prod.packingDescription} </th>
                              <td>{prod.colorDescription}</td>
                              <td>{prod.grossPrice}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={() => {
                  let qty = qtyRef.current.value;
                  setCartProducts([
                    ...cartProducts,
                    {selProductTocard:selProductTocard, qty ,price},
                  ]);
                  setselProductstoCart([])
                }}
              >
                Add to cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
