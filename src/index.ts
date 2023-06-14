import app from './server';
import * as dotenv from 'dotenv';

// load env contents into process
dotenv.config();

app.listen(3000, () => {
    console.log('server listening on port 3000');
});
