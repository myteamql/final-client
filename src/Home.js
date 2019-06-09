import React from 'react';
import 'rc-slider/assets/index.css';
import Grid from '@material-ui/core/Grid';

export default class BookRoom extends React.Component {
    constructor(props, context) {
        super(props, context);

        };



    render ()
    {
        return (
            <div>
                <Grid container spacing={8} justify="center" direction={"row"}>
                    <img src={"MyTeamQL_logo.png"}/>
                </Grid>
            </div>
        );
    }
}
