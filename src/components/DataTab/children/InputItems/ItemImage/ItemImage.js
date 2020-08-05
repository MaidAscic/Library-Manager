import React from "react";
import classes from "./ItemImage.module.css";
import { connect } from "react-redux";
import book from "../../../../../images/books/book.png"
import user from "../../../../../images/users/user.png"

import miscReducer from "../../../../../store/reducers/miscReducer";
const ItemImage = (props) => {
    

    // const imageUploadHandler = event =>{
    //     props.setImage(event.target.files[0]);
    // }

  return (
    <div className={classes.Image}>
      <img
        className={classes.Item}
        src={window.location.href.includes("user")? user:book}
        alt="Item Img"
      />
      {/* <input type="file" onChange={imageUploadHandler}/> */}
    </div>
  );
};

const mapStateToProps = state =>{
    return {
        image: miscReducer.newItemImage,
    }
}
const mapDispatchToProps = (dispatch) => {
  return {
    setImage: (image) => dispatch({ type: "SET_IMAGE", image: image }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemImage);
