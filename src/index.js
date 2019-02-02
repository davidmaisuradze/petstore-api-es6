import express from 'express';
import './config/database';
import middlewaresConfig from './config/middlewares';
import ApiRoutes from './routes';

const app = express();
// wrap all the middlewares
middlewaresConfig(app);

// add the apiRoutes
app.use('/api', ApiRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Running on localhost:${port}`));