import http from 'http';

import { app } from './app';
import { connect, getRoutes } from './socket';

const httpServer = http.createServer(app);

connect(httpServer);

getRoutes();

const port = process.env.PORT || 3030;

httpServer.listen(port, () => console.log(`Server running at port ${port}`));

export { httpServer, port };
