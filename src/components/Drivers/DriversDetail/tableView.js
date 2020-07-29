import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

class TableView extends React.Component {

    createData(firstName, lastName, age) {
        return { firstName, lastName, age };
    }
    render() {
        const { firstName, lastName, age } = this.props;
        const rows = [
            this.createData(firstName, lastName, age),
        ];

        return (
            <div>
                <h2>Driver Details </h2>
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>First Name</TableCell>
                                <TableCell>Last Name</TableCell>
                                <TableCell align="right">Age</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <TableRow key={row.name}>
                                    <TableCell component="th" scope="row"> {row.firstName} </TableCell>
                                    <TableCell component="th" scope="row"> {row.lastName} </TableCell>
                                    <TableCell align="right">{row.age}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        )
    }

}
export default TableView;