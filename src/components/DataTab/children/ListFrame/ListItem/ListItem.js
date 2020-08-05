import React, {useContext} from "react";
import classes from "./ListItem.module.css";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import listItemContext from "../../../../../context/ListItemContext";

const ListItem = (props) => {
  
  const context = useContext(listItemContext);

  const useStyles = makeStyles({
    root: {
      verticalAlign: "middle",
      backgroundColor: "honeydew",
      color: (props) => props.color,
      minWidth: "80px",

      "&:hover": {
        backgroundColor: "grey",
      },
    },
  });
  const mClasses = useStyles(props);
  /*
    for user items
    name1 = first name
    name2 = last name
    status = if there is a book rented

    for book items
    name1 = book name
    name2 = author name
    status = if the book is rented

*/

  let classList = [
    classes.Default,
    props.showRent ? classes.Rentable : classes.ItemDiv,
  ];
  return (
    <div
      className={classList.join(" ")}
      onClick={props.clickable?
        ()=>props.selectId(props.id):()=>{}
      }
    >
      <p>{props.id}</p>
      <p>{props.name1}</p>
      <p>{props.name2}</p>
      <p>{props.status ? "Rented" : "Not rented"}</p>
      {props.showRent && !props.status ? (
        <p>
          <Button size="small" className={mClasses.root} onClick={()=>{context.state.rentBook(props.id)}}>
            Rent
          </Button>
        </p>
      ) : null}
       
    </div>
  );
};



export default ListItem;
