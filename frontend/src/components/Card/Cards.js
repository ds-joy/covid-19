import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
import "./Card.css";


function Cards(props) {
    return (
        <div className="infoBox">
            <Card>
                <CardContent>
                    <Typography className="title" color="textSecondary"> {props.title}</Typography>

                    <h2>{props.cases}</h2>

    <Typography className="title" color="textSecondary">{props.total}</Typography>

                    
                </CardContent>
            </Card>
        </div>
            
           
    )
}

export default Cards
