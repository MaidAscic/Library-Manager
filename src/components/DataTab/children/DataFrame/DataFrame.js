import React, { useContext } from "react";
import classes from "./DataFrame.module.css";
import ItemForm from "./ItemForm/ItemForm";
import MyList from "../ListFrame/List/List";
import { connect } from "react-redux";
import listItemContext from "../../../../context/ListItemContext";
const DataFrame = (props) => {
  const context = useContext(listItemContext);

  return (
    <div className={classes.DataFrame}>
      <div className={classes.InnerContainer}>
        <div className={classes.ItemCont}>
            <ItemForm items={props.items} />
          </div>
        <div>
          {props.userId !== null && !context.state.hasBook ? (
            <MyList items={props.items} showRent={true} clickable={false} />
          ) : null}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    userId: state.misc.userId,
  };
};

export default connect(mapStateToProps)(DataFrame);
