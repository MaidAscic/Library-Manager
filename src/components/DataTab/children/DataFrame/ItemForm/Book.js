import React from "react";
import TextField from "@material-ui/core/TextField";
import ImageContainer from "./ImageContainer";
import BtnGrp from "./ButtonGroup";
import classes from "./ItemForm.module.css";

const Book = (props) => {
  return (
    <React.Fragment>
      <ImageContainer itemId={props.book ? props.book.id : 0} />
      <div className={classes.FormContainer}>
        <TextField
          required
          id="outlined-required"
          label="Book Name"
          value={props.book ? props.book.name : ""}
          variant="outlined"
          name="name"
          size="small"
          fullWidth
          margin="normal"
          onChange = {props.handleChange}
        />
        <TextField
          required
          id="outlined-required"
          label="Book Author"
          value={props.book ? props.book.author : ""}
          variant="outlined"
          name="author"
          size="small"
          fullWidth
          margin="normal"
          onChange = {props.handleChange}

        />
        <TextField
          required
          id="outlined-required"
          label="ISBN"
          value={props.book ? props.book.isbn : ""}
          variant="outlined"
          name="isbn"
          size="small"
          fullWidth
          margin="normal"
          onChange = {props.handleChange}

        />
        <TextField
          required
          id="outlined-required"
          label="Current User"
          value={
            !props.book
              ? ""
              : props.book.user
              ? props.book.user.firstName + " " + props.book.user.lastName
              : "Not rented"
          }
          variant="outlined"
          name="currentUser"
          size="small"
          fullWidth
          disabled
          margin="normal"
        />
        <BtnGrp itemId={props.book ? props.book.id : 0} method={props.method}/>
      </div>
    </React.Fragment>
  );
};

export default Book;
