import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
import "./Card.css";


function Cards(props) {
    return (
        <div className="infoBox">
            <Card
                onClick={props.onClick}
            className={`infoBox ${props.active && "infoBox--selected"} ${
                props.isRed && "infoBox--red"
            }`}>
                <CardContent>
                    <Typography className="title" color="textSecondary" gutterBottom> {props.title}</Typography>

                    <h2 className={`infoBox__cases ${!props.isRed && "infoBox__cases--green"}`}>{props.cases}</h2>

                <Typography className="infoBox__total" color="textSecondary">{props.total} Total</Typography>

                    
                </CardContent>
            </Card>
        </div>
            
           
    )
}

export default Cards
