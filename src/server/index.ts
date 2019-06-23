import 'source-map-support/register';
import App from './App';

const PORT: number = process.env.PORT ? Number(process.env.PORT) : 3000;
const app: App = new App();

app.listen(PORT);
