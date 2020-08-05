import React from "react";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import classes from "./ItemForm.module.css";
import { connect } from "react-redux";
import axios from "axios";
const BtnGrp = (props) => {
  const refreshUsers = () => {
    axios.get("http://localhost:8080/api/users").then((response) => {
      props.fetchUsers(response.data);
    });
  };

  const refreshBooks = () => {
    axios.get("http://localhost:8080/api/books").then((response) => {
      props.fetchBooks(response.data);
    });
  };
  const deleteReq = (id) => {
    let type = window.location.href.substring(
      window.location.href.lastIndexOf("/") + 1
    );

    axios.delete("http://localhost:8080/api/" + type + "/" + id).then(() => {
      props.removeID();
      refreshBooks();
      refreshUsers();
    });
  };
  return (
    <ButtonGroup fullWidth className={classes.ButtonGroup}>
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          props.method();
          props.removeID();
        }}
      >
        Update
      </Button>
      {window.location.href.includes("user")?<Button variant="contained" color="primary" onClick={props.return}>
        Return Book
      </Button>:null}
      
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          deleteReq(props.itemId);
        }}
      >
        Delete
      </Button>
      <Button variant="contained" color="secondary" onClick={props.removeID}>
        Close
      </Button>
    </ButtonGroup>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    removeID: () => dispatch({ type: "REMOVE_ID" }),
    fetchBooks: (data) => dispatch({ type: "FETCH_BOOKS", data: data }),
    fetchUsers: (data) => dispatch({ type: "FETCH_USERS", data: data }),
  };
};
export default connect(null, mapDispatchToProps)(BtnGrp);
