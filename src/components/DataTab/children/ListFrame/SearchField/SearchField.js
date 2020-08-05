import React, { useState } from "react";
import classes from "./SearchField.module.css";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import Search from "@material-ui/icons/Search";
import Add from "@material-ui/icons/Add";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import axios from "axios";
const SearchField = (props) => {
  const [user, setUser] = useState({
    id: 0,
    firstName: "",
    lastName: "",
    age: 0,
  });
  const [book, setBook] = useState({
    id: 0,
    name: "",
    author: "",
    isbn: "",
    rentalDate: null,
    returnDate: null,
  });
  const isUser = window.location.href.includes("user");

  const useStyles = makeStyles({
    button: {
      backgroundColor: "#3f51b5",
      color: "white",
      height: "40px",
      width: "40px",
      "&:hover": {
        backgroundColor: "#448aff",
      },
    },
  });

  const handleUserChange = (event) => {
    const { name, value } = event.target;
    setUser({
      ...user,
      [name]: value,
    });
  };
  const handleBookChange = (event) => {
    const { name, value } = event.target;
    setBook({
      ...book,
      [name]: value,
    });
  };

  const searchUser = () => {
    if (user.firstName === "" && user.lastName === "") {
      refreshUsers();
    } else {
      axios
        .post("http://localhost:8080/api/users/search", user)
        .then((response) => {
          props.fetchUsers(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  const searchBook = () => {
    if (book.name === "" && book.author === "" && book.isbn === "") {
      refreshBooks();
    } else {
      axios
        .post("http://localhost:8080/api/books/search", book)
        .then((response) => {
          props.fetchBooks(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  const refreshUsers = () => {
    axios
      .get("http://localhost:8080/api/users")
      .then((response) => {
        props.fetchUsers(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const refreshBooks = () => {
    axios
      .get("http://localhost:8080/api/books")
      .then((response) => {
        props.fetchBooks(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const mClasses = useStyles(props);

  let search = null;

  if (isUser) {
    search = (
      <div className={classes.UserCont}>
        <div className={classes.UserField}>
          <div className={classes.TextFieldCont}>
            <TextField
              className={classes.TextField}
              id="outlined-required"
              label="First Name"
              variant="outlined"
              name="firstName"
              margin="dense"
              value={user.firstName}
              onChange={handleUserChange}
            />
          </div>
        </div>
        <div className={classes.UserField}>
          <div className={classes.TextFieldCont}>
            <TextField
              className={classes.TextField}
              id="outlined-required"
              label="Last Name"
              variant="outlined"
              name="lastName"
              margin="dense"
              value={user.lastName}
              onChange={handleUserChange}
            />
          </div>
        </div>
      </div>
    );
  } else {
    search = (
      <div className={classes.BookCont}>
        <div className={classes.BookField}>
          <div className={classes.TextFieldCont}>
            <TextField
              className={classes.TextField}
              id="outlined-required"
              label="Book Name"
              variant="outlined"
              name="name"
              margin="dense"
              value={book.name}
              onChange={handleBookChange}
            />
          </div>
        </div>
        <div className={classes.BookField}>
          <div className={classes.TextFieldCont}>
            <TextField
              className={classes.TextField}
              id="outlined-required"
              label="Book Author"
              variant="outlined"
              name="author"
              size="small"
              margin="dense"
              value={book.author}
              onChange={handleBookChange}
            />
          </div>
        </div>
        <div className={classes.BookField}>
          <div className={classes.TextFieldCont}>
            <TextField
              className={classes.TextField}
              id="outlined-required"
              label="ISBN"
              variant="outlined"
              name="isbn"
              size="small"
              margin="dense"
              value={book.isbn}
              onChange={handleBookChange}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <form>
      {search}
      <div className={classes.ButtonOuterCont}>
        <div className={classes.ButtonCont}>
          <div className={classes.Search}>
            <IconButton
              aria-label="search"
              className={mClasses.button}
              onClick={isUser ? searchUser : searchBook}
            >
              <Search />
            </IconButton>
          </div>
          <div className={classes.Add}>
            <IconButton
              aria-label="add"
              className={mClasses.button}
              onClick={props.newItem}
            >
              <Add />
            </IconButton>
          </div>
        </div>
      </div>
    </form>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    newItem: () => dispatch({ type: "NEW_ITEM" }),
    fetchBooks: (data) => dispatch({ type: "FETCH_BOOKS", data: data }),
    fetchUsers: (data) => dispatch({ type: "FETCH_USERS", data: data }),
  };
};

export default connect(null, mapDispatchToProps)(SearchField);
