import { getUpcomingProjects, getProjectDetails } from '../models/projects.js';
import { getCategoriesByProjectId } from '../models/categories.js';

const NUMBER_OF_UPCOMING_PROJECTS = 5;

const showProjectsPage = async (req, res) => {
        const title = 'Upcoming Service Projects';
        const projects = await getUpcomingProjects(NUMBER_OF_UPCOMING_PROJECTS);

        //console.log('Projects:', projects);

        res.render('projects', { title, projects });
};

const showProjectDetailsPage = async (req, res) => {
        const projectId = req.params.id;
        const project = await getProjectDetails(projectId);
        const categories = await getCategoriesByProjectId(projectId);

        if (!project) {
                const error = new Error('Project Not Found');
                error.status = 404;
                throw error;
        }

        const title = project.title;

        res.render('project', {title, project, categories});
};
export { showProjectsPage, showProjectDetailsPage };
