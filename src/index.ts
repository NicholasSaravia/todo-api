import app from './server';
import * as dotenv from 'dotenv';

// load env contents into process
dotenv.config();

app.listen(3001, () => {
    console.log('server listening on port http://localhost:3001');
});
