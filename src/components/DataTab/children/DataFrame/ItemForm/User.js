import React from "react";
import TextField from "@material-ui/core/TextField";
import ImageContainer from "./ImageContainer";
import classes from "./ItemForm.module.css";
import BtnGrp from "./ButtonGroup";

const User = (props) => {
  return (
    <React.Fragment>
      <ImageContainer itemId={props.user ? props.user.id : ""} />
      <div className={classes.FormContainer}>
        <TextField
          required
          id="outlined-required"
          label="First Name"
          value={props.user ? props.user.firstName : ""}
          variant="outlined"
          name="firstName"
          size="small"
          fullWidth
          margin="normal"
          onChange = {props.handleChange}
          
        />

        <TextField
          required
          id="outlined-required"
          label="Last Name"
          value={props.user ? props.user.lastName : ""}
          variant="outlined"
          name="lastName"
          size="small"
          fullWidth
          margin="normal"
          onChange = {props.handleChange}

        />

        <TextField
          required
          id="outlined-required"
          label="Age"
          value={props.user ? props.user.age : ""}
          variant="outlined"
          name="age"
          size="small"
          fullWidth
          type="number"
          margin="normal"
          onChange = {props.handleChange}

        />
        <TextField
          disabled
          required
          id="outlined-required"
          label="Current Book"
          value={
            !props.user
              ? ""
              : !props.user.currentBook
              ? "Not rented"
              : props.user.currentBook.name
          }
          variant="outlined"
          name="currentBook"
          size="small"
          fullWidth
          margin="normal"
        />
        <BtnGrp itemId={props.user ?props.user.id:""} method={props.method} return={props.user.currentBook ? props.return:()=>{}}/>
      </div>
    </React.Fragment>
  );
};

export default User;
