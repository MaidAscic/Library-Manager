import React from "react";
import classes from "./ListFrame.module.css";
import MyList from "./List/List";
import SearchField from "./SearchField/SearchField";

const listFrame = (props) => {
  return (
    <div>
      <div className={classes.InnerContainer} >
        <SearchField type={props.type} />
        <MyList items={props.items} showRent={false} clickable={true}/>
      </div>
    </div>
  );
};

export default listFrame;
