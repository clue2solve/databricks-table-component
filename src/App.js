import React from 'react';
import DatabricksTable from './DatabricksTable';
import { AppBar, Toolbar, Typography, CssBaseline, Container } from '@mui/material';

const App = () => {
    return (
        <div>
            <CssBaseline />
            <AppBar position="fixed">
                <Toolbar>
                    <Typography variant="h6" noWrap>
                        Databricks Data Viewer
                    </Typography>
                </Toolbar>
            </AppBar>
            <main style={{ padding: '24px', marginTop: '64px' }}>
                <Container>
                    <DatabricksTable 
                        sqlEndpoint="https://<databricks-instance>/api/2.0/sql/statements"
                        accessToken="your_access_token"
                        warehouseId="your_warehouse_id"
                    />
                </Container>
            </main>
        </div>
    );
};

export default App;
