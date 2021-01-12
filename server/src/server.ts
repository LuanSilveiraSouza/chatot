import http from 'http';

import { app } from './app';
import { connect, getRoutes } from './socket';

const httpServer = http.createServer(app);

connect(httpServer);

getRoutes();

httpServer.listen(3030, () => console.log('Server running at port 3030'));
