import React from "react";
import classes from "./List.module.css";
import ListItem from "../ListItem/ListItem";
import List from "@material-ui/core/List";
import { connect } from "react-redux";
const MyList = (props) => {
  let listItems =
    props.items &&
    props.items.map((item) => {
      if (item.hasOwnProperty("firstName")) {
        if (!props.clickable && item.currentBook !== null) {
          return (
            <ListItem
              key={item.id}
              id={item.id}
              name1={item.firstName}
              name2={item.lastName}
              status={item.currentBook === null ? false : true}
              selectId={props.selectUserId}
              clickable={props.clickable}
            />
          );
        } else if (props.clickable) {
          return (
            <ListItem
              key={item.id}
              id={item.id}
              name1={item.firstName}
              name2={item.lastName}
              status={item.currentBook === null ? false : true}
              selectId={props.selectUserId}
              clickable={props.clickable}
            />
          );
        } else {return null}
      } else {
        return (
          <ListItem
            key={item.id}
            id={item.id}
            name1={item.name}
            name2={item.author}
            status={item.user === null ? false : true}
            showRent={props.showRent}
            selectId={props.selectBookId}
            clickable={props.clickable}
          />
        );
      }
    });
  return (
    <div className={classes.ListFrame}>
      <List>{listItems}</List>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    bookItems: state.rest.bookItems,
    userItems: state.rest.userItems,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    selectUserId: (value) => dispatch({ type: "SELECT_USER_ID", value: value }),
    selectBookId: (value) => dispatch({ type: "SELECT_BOOK_ID", value: value }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(MyList);
