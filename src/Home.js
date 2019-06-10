import React from 'react';
import 'rc-slider/assets/index.css';
import { NavLink, Route } from 'react-router-dom';
import BookRoom from './BookRoom';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

export default class Home extends React.Component {
    constructor(props, context) {
        super(props, context);
        };

    render ()
    {
        return (
            <div className="container">
                    <img src={"sandal.jpg"} width={"75%"}/>
                    <div className="centered">
                        <Typography variant="h4" style={{marginBottom: '50px', font: '400 50px/1.3 Oleo Script, Helvetica, sans-serif'}}>
                        We can't wait to see you.
                        </Typography>
                        <NavLink exact to="/bookroom">
                            <Button variant="outlined">Book Now</Button>
                        </NavLink>
                    </div>

                    <div className="content">
                        <Route exact path="/bookroom" component={BookRoom} />
                    </div>
            </div>
        );
    }
}
