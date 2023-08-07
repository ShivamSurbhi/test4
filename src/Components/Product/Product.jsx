import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetProductThunk } from "../Store/Thunks/Product/GetProductThunk";
import AddProdThunk from "../Store/Thunks/Product/AddProdThunk";
import { type } from "@testing-library/user-event/dist/type";

const Product = () => {
  const dispatch = useDispatch();

  const { data, isLoading, error } = useSelector((state) => {
    return state.product;
  });

  const [showProdModal, setShowProdModal] = useState(false);
  const formInitialState = {
    name: "",
    description: "",
    image: "",
    price: "",
    category: "",
  };
  const formErrorInitialState = {
    name: "",
    description: "",
    image: "",
    price: "",
    category: "",
  };
  const [formData, setFormData] = useState(formInitialState);
  const [formErr, setErrData] = useState(formErrorInitialState);
  const [productList, setProduct] = useState([]);

  var sampleData = [
    {
      id: 1,
      name: "Samsung",
      description: "New Product",
      image: "https://m.media-amazon.com/images/I/61Tl1z+Hn0L._AC_UY218_.jpg",
      price: 99000,
      qty: 0,
      user_id: 1,
      category: ["Electronic"],
    },
    {
      id: 2,
      name: "Apple",
      description: "New Product",
      image: "https://m.media-amazon.com/images/I/71yzJoE7WlL._AC_UY218_.jpg",
      price: 100000,
      qty: 0,
      user_id: 2,
      category: ["Electronic"],
    },
    {
      id: 3,
      name: "Oneplus",
      description: "22",
      image: "https://m.media-amazon.com/images/I/61Tl1z+Hn0L._AC_UY218_.jpg",
      price: "22",
      category: ["Electronic"],
      user_id: 3,
      qty: 0,
    },
  ];

  useEffect(() => {
    console.clear();
    console.log("use effect");
    getProduct();
    // handleSort()
  }, []);

  const getProduct = () => {
    dispatch(GetProductThunk());
    // setProduct(data?.length > 0 ? data : []);
    setProduct(data?.length > 0 ? data : sampleData);
  };

  const handleSort = () => {
    const sortedItems = [...productList]; // Create a copy of the array
    sortedItems.sort((a, b) => b.id - a.id); // Sort the copy
    setProduct(sortedItems); // Update the state with the sorted array
  };

  const handleOpenModal = () => {
    setFormData(formInitialState);
    setShowProdModal(true);
  };

  const handleCloseModal = () => {
    setShowProdModal(false);
  };

  const handleForm = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const formSave = () => {
    console.log("formData", formData);
    setFormData(formInitialState);

    let errObj = {
      name: "",
      description: "",
      image: "",
      price: "",
      category: "",
    };

    let namePattern = /^[A-Za-zs]+$/;
    let descPattern = /^[A-Za-z0-9\s.,!?'"()-]+$/;
    let imagePattern = /\.(jpg|jpeg|png|gif)$/i;
    let pricePattern = /^\d+(\.\d{1,2})?$/;
    let categoryPattern = /^-?\d+(\.\d+)?$/;

    if (!RegExp(namePattern).test(formData.name)) {
      errObj.name = "Please enter valid name format";
      setErrData(errObj);
    }

    if (!RegExp(descPattern).test(formData.description)) {
      errObj.description = "Please enter valid description format";
      setErrData(errObj);
    }

    if (!RegExp(imagePattern).test(formData.image)) {
      errObj.image = "Please enter valid image format";
      setErrData(errObj);
    }

    if (!RegExp(pricePattern).test(formData.price)) {
      errObj.price = "Please enter valid price format";
      setErrData(errObj);
    }

    if (!RegExp(categoryPattern).test(formData.category)) {
      errObj.category = "Please enter valid category format";
      setErrData(errObj);
    }

    const isObjectEmpty = Object.values(errObj).every((value) => {
      return (
        value === null ||
        value === undefined ||
        value === "" ||
        (Array.isArray(value) && value.length === 0)
      );
    });

    setTimeout(() => {
      setErrData(formErrorInitialState);
    }, 3000);

    if (isObjectEmpty) {
      dispatch(AddProdThunk(formData));
      setTimeout(() => {
        getProduct();
      }, 1000);
      handleCloseModal();
    }
  };

  const addCart = (data) => {
    let updateQty = data?.qty + 1;
    let shareData = { id: data?.id, qty: updateQty };

    let cartData = JSON.parse(localStorage.getItem("cart"));

    if (cartData != null && cartData != "") {
      let updateData = cartData.find((v) => v.id == data.id);

      if (updateData != undefined) {
        if (updateData?.qty < 5) {
          updateData.qty = updateData?.qty + 1;
          // Find ID & Slice it
          let findId = cartData.findIndex((v) => v.id == data.id);
          if (findId != -1) {
            cartData.splice(findId, 1);
          }

          cartData.push(updateData);
          localStorage.setItem("cart", JSON.stringify(cartData));
          // Find ID & Slice it
        } else {
          alert("Can't add more quantity");
        }
      } else {
        cartData.push(shareData);
        localStorage.setItem("cart", JSON.stringify(cartData));
      }
    } else {
      localStorage.setItem("cart", JSON.stringify([shareData]));
    }
  };

  return (
    <Fragment>
      <div className="container-fluid mt-3">
        <div className="row">
          <div className="col">
            <button className="btn btn-primary" onClick={handleOpenModal}>
              Add Product
            </button>
          </div>
        </div>
        <div className="row mt-2">
          <div className="col-3"></div>
          <div className="col-9">
            {productList?.map((item, index) => (
              <div className="row mt-2" key={index}>
                <div className="col-3">
                  <img
                    className="img-fluid"
                    src={item.image}
                    style={{ height: "140px" }}
                    alt="productimage"
                  ></img>
                </div>
                <div className="col-9">
                  <div> {item.name} </div>
                  <div> {item.description} </div>
                  <div className="mt-2">
                    <h5>{item.price}</h5>
                  </div>

                  <button
                    className="btn btn-warning"
                    onClick={(e) => {
                      addCart(item);
                    }}
                  >
                    Add to Cart
                  </button>
                  <button className="btn btn-success mx-2">Buy Now</button>
                  <div></div>
                </div>
                <hr className="mt-4"></hr>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal */}
      <div
        className={`modal fade mt-5 ${showProdModal ? "show" : ""}`}
        style={{ display: showProdModal ? "block" : "none" }}
      >
        <div className="modal-dialog ">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Product</h5>
              <button
                type="button"
                className="close btn btn-danger"
                onClick={handleCloseModal}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">
                    Name
                    <span className="mx-2 text-danger">{formErr.name}</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Name"
                    name="name"
                    onChange={handleForm}
                  />
                </div>

                <div className="form-group mt-2">
                  <label htmlFor="exampleInputEmail1">
                    Image URL
                    <span className="mx-2 text-danger">{formErr.image}</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Image URL"
                    name="image"
                    onChange={handleForm}
                  />
                </div>

                <div className="form-group mt-2">
                  <label htmlFor="exampleInputEmail1">
                    Price
                    <span className="mx-2 text-danger">{formErr.price}</span>
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Price"
                    name="price"
                    onChange={handleForm}
                  />
                </div>

                <div className="form-group mt-2">
                  <label htmlFor="exampleInputEmail1">
                    Category
                    <span className="mx-2 text-danger">{formErr.category}</span>
                  </label>
                  <select
                    className="form-control"
                    name="category"
                    id="exampleFormControlSelect1"
                    onChange={handleForm}
                  >
                    <option value="" defaultValue disabled>
                      Selct one
                    </option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </select>
                </div>

                <div className="form-group mt-2">
                  <label htmlFor="exampleInputEmail1">
                    Description
                    <span className="mx-2 text-danger">
                      {formErr.description}
                    </span>
                  </label>
                  <textarea
                    type="text"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Description"
                    name="description"
                    onChange={handleForm}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleCloseModal}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={formSave}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Modal */}
    </Fragment>
  );
};

export default Product;
