import React from "react";
import ListFrame from "./children/ListFrame/ListFrame";
import DataFrame from "./children/DataFrame/DataFrame";
import classes from "./DataTab.module.css";
import axios from "axios";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import ListItemContext from "../../context/ListItemContext";
class DataTab extends React.Component {
  state = {
    itemId: null,
    currentTab: <DataTab />,
    rentBook: null,
    returnBook: null,
    hasBook: false,
  };

  updateState = (key, val) => {
    this.setState({ [key]: val });
  };

  refreshUsers = () => {
    axios.get("http://localhost:8080/api/users").then((response) => {
      this.props.fetchUsers(response.data);
    });
  };

  refreshBooks = () => {
    axios.get("http://localhost:8080/api/books").then((response) => {
      this.props.fetchBooks(response.data);
    });
  };

  componentDidMount() {
    this.refreshBooks();
    this.refreshUsers();
  }

  render() {
    return this.props.bookItems === null || this.props.userItems === null ? (
      <p>Loading</p>
    ) : (
<React.Fragment>
        <ListItemContext.Provider
          value={{
            updateContext: this.updateState,
            state: this.state,
            itemId: this.props.userId,
            type: "users",
          }}
        >
          <Route
            path="/users"
            render={() => (
              <div className={classes.Container}>
                <ListFrame items={this.props.userItems} type="user" />
                {this.props.userId ? (
                  <DataFrame items={this.props.bookItems} />
                ) : null}
              </div>
            )}
          />

        </ListItemContext.Provider>
        <ListItemContext.Provider
          value={{
            updateContext: this.updateState,
            state: this.state,
            itemId: this.props.bookId,
            type: "books",
          }}
        >
          <Route
            path="/books"
            render={() => (
              <div className={classes.Container}>
                <ListFrame items={this.props.bookItems} type="book" />

                {this.props.bookId ? <DataFrame /> : null}
              </div>
            )}
          />

        </ListItemContext.Provider>
        <Redirect from="/" to="/users"/>
        </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    bookItems: state.rest.bookItems,
    userItems: state.rest.userItems,
    userId: state.misc.userId,
    bookId: state.misc.bookId,
    type: state.misc.type,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchBooks: (data) => dispatch({ type: "FETCH_BOOKS", data: data }),
    fetchUsers: (data) => dispatch({ type: "FETCH_USERS", data: data }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DataTab);
