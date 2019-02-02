import bodyParser from 'body-parser';
import compression from 'compression';
import helmet from 'helmet';
import cors from 'cors';
import expressStatusMonitor from 'express-status-monitor';

export default app => {
    app.use(compression());
    app.use(bodyParser.json());
    app.use(helmet());
    app.use(cors());
    app.use(expressStatusMonitor());
};