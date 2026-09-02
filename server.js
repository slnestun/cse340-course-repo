import express from 'express';
import {fileURLToPath} from 'url';
import path from 'path';

const nodeEnv = process.env.NODE_ENV?.toLowerCase() || 'production';
const port = process.env.PORT || 3000;

const currentFilePath = fileURLToPath(import.meta.url);
const currentDirectory = path.dirname(currentFilePath);

const app = express();

/**
  * Configure Express middleware
  */

// Serve static files from the public directory
app.use(express.static(path.join(currentDirectory, 'public')));

/**
  * Routes
  */

// Set EJS as the templating engine
app.set('view engine', 'ejs');

// Tell Express where to find your templates
app.set('views', path.join(currentDirectory, 'src/views'));


/**
  * Routes
  */
const renderHome = async (req, res) => {
    const title = 'Home';
    res.render('home', { title });
};

const renderOrganizations = async (req, res) => {
    const title = 'Our Partner Organizations';
    res.render('organizations', { title });
};

const renderProjects = async (req, res) => {
    const title = 'Service Projects';
    res.render('projects', { title });
};

const renderCategories = async (req, res) => {
    const title = 'Service Categories';
    res.render('categories', { title });
};

const logServerStart = () => {
  console.log(`Server is running at http://127.0.0.1:${port}`);
  console.log(`Environment: ${nodeEnv}`);
};

app.get('/', renderHome);
app.get('/organizations', renderOrganizations);
app.get('/projects', renderProjects);
app.get('/categories', renderCategories);

app.listen(port, logServerStart);
