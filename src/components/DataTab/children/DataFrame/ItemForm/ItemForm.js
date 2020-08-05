import React from "react";
import User from "./User";
import Book from "./Book";
import axios from "axios";
import ListItemContext from "../../../../../context/ListItemContext";
import { connect } from "react-redux";
import classes from "./ItemForm.module.css";

class ItemForm extends React.Component {
  state = {
    user: null,
    book: null,
    newUser: {
      id: 0,
      firstName: "",
      lastName: "",
      age: 0,
    },
    newBook: {
      id: 0,
      name: "",
      author: "",
      isbn: "",
      rentalDate: "",
      returnDate: "",
    },
  };
  static contextType = ListItemContext;

  //PUTs
  returnBook = () => {

    axios
      .put("http://localhost:8080/api/users/return-book", this.state.user)
      .then((response) => {
        this.fetchUser(true);
        this.refreshUsers();
        this.refreshBooks();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  rentBook = (bookId) => {

    let updatedUser = {
      ...this.state.user,
      currentBook:{id : bookId}
    }
    axios
      .put("http://localhost:8080/api/users/rent-book", updatedUser)
      .then((response) => {
        this.fetchUser(true);
        this.refreshUsers();
        this.refreshBooks();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  updateUser = () => {
    axios
      .put("http://localhost:8080/api/users/", this.state.user)
      .then((response) => {
        this.refreshUsers();
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  updateBook = () => {
    axios
      .put("http://localhost:8080/api/books/", this.state.book)
      .then((response) => {
        this.refreshBooks();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // POSTs
  createUser = () => {
    axios
      .post("http://localhost:8080/api/users/", this.state.newUser)
      .then((response) => {
        this.refreshUsers();
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  createBook = () => {
    axios
      .post("http://localhost:8080/api/books/", this.state.newBook)
      .then((response) => {
        this.refreshBooks();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  //input handlers
  handleCurrentUserChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      user: {
        ...this.state.user,
        [name]: value,
      },
    });
  };
  handleCurrentBookChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      book: {
        ...this.state.book,
        [name]: value,
      },
    });
  };
  handleUserChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      newUser: {
        ...this.state.newUser,
        [name]: value,
      },
    });
  };
  handleBookChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      newBook: {
        ...this.state.newBook,
        [name]: value,
      },
    });
  };

  // GETs
  fetchUser = (isNeeded = false) => {
    if (this.props.userId) {
      if (
        isNeeded ||
        !this.state.user ||
        (this.state.user && this.state.user.id !== this.props.userId)
      ) {
        axios
          .get("http://localhost:8080/api/users/" + this.context.itemId)
          .then((response) => {
            this.setState({
              user: response.data,
            });
            this.context.updateContext("hasBook", this.state.user.currentBook !==null ? true:false);

          }).catch(function (error) {
            console.log(error);
          });;
      }
    }
  };
  fetchBook = () => {
    if (this.props.bookId) {
      if (
        !this.state.book ||
        (this.state.book && this.state.book.id !== this.props.bookId)
      ) {
        axios
          .get("http://localhost:8080/api/books/" + this.context.itemId)
          .then((response) => {
            this.setState({
              book: response.data,
            });
          }).catch(function (error) {
            console.log(error);
          });;
      }
    }
  };
  refreshUsers = () => {
    axios.get("http://localhost:8080/api/users").then((response) => {
      this.props.fetchUsers(response.data);
    }).catch(function (error) {
      console.log(error);
    });;
  };
  refreshBooks = () => {
    axios.get("http://localhost:8080/api/books").then((response) => {
      this.props.fetchBooks(response.data);
    }).catch(function (error) {
      console.log(error);
    });;
  };

  componentDidUpdate() {
    this.fetchBook();
    this.fetchUser();

  }
  componentWillUnmount() {
    this.props.removeID();
    this.refreshBooks();
    this.refreshUsers();
  }
  componentDidMount() {
    this.context.updateContext("rentBook", this.rentBook);

  }
  render() {
    let isUser = window.location.href.includes("user");
    let formData = null;
    if (!this.state.user && !this.state.book) {
    } else if (isUser) {
      formData = (
        <User
          user={this.state.user}
          handleChange={this.handleCurrentUserChange}
          method={this.updateUser}
          return={this.returnBook}
        />
      );
    } else {
      formData = (
        <Book
          book={this.state.book}
          handleChange={this.handleCurrentBookChange}
          method={this.updateBook}
        />
      );
    }

    let returnComponent;
    if (this.props.isNew === true) {
      returnComponent = (
        <div>
          <div className={classes.OuterFormContainer}>
            <form>
              {isUser ? (
                <User
                  user={this.state.newUser}
                  handleChange={this.handleUserChange}
                  method={this.createUser}
                />
              ) : (
                <Book
                  book={this.state.newBook}
                  handleChange={this.handleBookChange}
                  method={this.createBook}
                />
              )}
            </form>
          </div>
        </div>
      );
    } else {
      returnComponent =
        (!this.state.user ||
          (this.state.user && this.state.user.id !== this.props.userId)) &&
        (!this.state.book ||
          (this.state.book &&
            this.state.book.id !== this.props.bookId)) ? null : (
          <div >
            <div >
              <form>{formData}</form>
            </div>
          </div>
        );
    }

    return returnComponent;
  }
}
const mapStateToProps = (state) => {
  return {
    userId: state.misc.userId,
    bookId: state.misc.bookId,
    isNew: state.rest.isNew,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    removeID: () => dispatch({ type: "REMOVE_ID" }),
    fetchBooks: (data) => dispatch({ type: "FETCH_BOOKS", data: data }),
    fetchUsers: (data) => dispatch({ type: "FETCH_USERS", data: data }),
    newItem: () => dispatch({ type: "NEW_ITEM" }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemForm);
