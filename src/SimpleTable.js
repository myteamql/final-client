import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
    table: {
        minWidth: 700,
    },
});

class SimpleTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            props: props,
            monthlyRevenue: props.monthlyRevenue,
            months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

        }
    }

    render() {
        const {classes} = this.state.props;
        return (
            <Paper className={classes.root}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            {this.state.months.map(month => (
                                <TableCell align="center">{month}</TableCell>
                            ))}
                            <TableCell>Total</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            {this.state.months.map(month => (
                                (month in this.state.monthlyRevenue) ?
                                    <TableCell align="center">${this.state.monthlyRevenue[month]}</TableCell> :
                                    <TableCell align="center">$0</TableCell>
                            ))}
                            <TableCell>${this.state.props.total}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </Paper>
        )
    };
}

SimpleTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleTable);


