import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Button } from '@mui/material';

const DatabricksTable = ({ sqlEndpoint, accessToken, warehouseId }) => {
    const [query, setQuery] = useState('');
    const [data, setData] = useState([]);
    const [columns, setColumns] = useState([]);

    const handleQueryChange = (event) => {
        setQuery(event.target.value);
    };

    const fetchData = async () => {
        try {
            const response = await axios.post(
                sqlEndpoint,
                { statement: query, warehouse_id: warehouseId },
                { headers: { Authorization: `Bearer ${accessToken}` } }
            );

            if (response.status === 200) {
                setColumns(response.data.columns.map(col => col.name));
                setData(response.data.rows);
            } else {
                console.error(`Error: ${response.status} - ${response.statusText}`);
            }
        } catch (error) {
            console.error(`Error: ${error}`);
        }
    };

    return (
        <Container>
            <TextField 
                label="SQL Query" 
                variant="outlined" 
                fullWidth 
                value={query} 
                onChange={handleQueryChange} 
                style={{ marginBottom: '20px' }}
            />
            <Button variant="contained" color="primary" onClick={fetchData}>
                Fetch Data
            </Button>
            <TableContainer component={Paper} style={{ marginTop: '20px', maxHeight: '400px' }}>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            {columns.map((col, index) => (
                                <TableCell key={index}>{col}</TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((row, rowIndex) => (
                            <TableRow key={rowIndex}>
                                {row.map((cell, cellIndex) => (
                                    <TableCell key={cellIndex}>{cell}</TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
};

DatabricksTable.propTypes = {
    sqlEndpoint: PropTypes.string.isRequired,
    accessToken: PropTypes.string.isRequired,
    warehouseId: PropTypes.string.isRequired,
};

export default DatabricksTable;
