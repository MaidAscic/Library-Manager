import React from "react";
import ItemImage from "../../InputItems/ItemImage/ItemImage";
import classes from "./ItemForm.module.css";
import TextField from "@material-ui/core/TextField";


const ImageContainer = (props) => {
  return (
    <div className={classes.ImageContainer}>
      <div className={classes.InnerImageContainer}>
        <TextField
          required
          id="outlined-required"
          label="ID"
          defaultValue={props.itemId}
          variant="outlined"
          name="id"
          size="small"
          fullWidth
          disabled
          margin="normal"
        />
        <ItemImage itemId={props.itemId} />
      </div>
    </div>
  );
};

export default ImageContainer;
