import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './config/swaggerSpec.js';
import { userRoutes, verifyToken } from './routes/users.js';
import { todoRoutes } from './routes/todos.js'

const app = express();
const PORT = process.env.PORT || 5011;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/todo-app', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

app.use('/api/users', userRoutes);

app.use('/api/todos', todoRoutes);

// Swagger route
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerSpec));