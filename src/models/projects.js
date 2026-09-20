import db from './db.js'

const getAllProjects = async () => {
    const query = `
        SELECT
            sp.project_id,
            sp.title,
            sp.description,
            sp.location,
            sp.date,
            o.name AS organization_name
        FROM public.service_project AS sp
        JOIN public.organization AS o
            ON sp.organization_id = o.organization_id
        ORDER BY sp.date;
    `;

    const result = await db.query(query);

    return result.rows;
}

const getUpcomingProjects = async (numberOfProjects) => {
    const query = `
        SELECT
            sp.project_id,
            sp.title,
            sp.description,
            sp.date,
            sp.location,
            sp.organization_id,
            o.name AS organization_name
        FROM public.service_project AS sp
        JOIN public.organization AS o
            ON sp.organization_id = o.organization_id
        WHERE sp.date >= CURRENT_DATE
        ORDER BY sp.date ASC
        LIMIT $1;
    `;

    const result = await db.query(query, [numberOfProjects]);

    return result.rows;
}

const getProjectDetails = async (projectId) => {
    const query = `
        SELECT
            sp.project_id,
            sp.title,
            sp.description,
            sp.date,
            sp.location,
            sp.organization_id,
            o.name AS organization_name
        FROM public.service_project AS sp
        JOIN public.organization AS o
            ON sp.organization_id = o.organization_id
        WHERE sp.project_id = $1;
    `;
    const result = await db.query(query, [projectId]);
    return result.rows[0];
}

const getProjectsByOrganizationId = async (organizationId) => {
    const query = `
        SELECT
            project_id,
            organization_id,
            title,
            description,
            location,
            date
        FROM public.service_project
        WHERE organization_id = $1
        ORDER BY date ASC;
    `;

    const result = await db.query(query, [organizationId]);

    return result.rows;
}

const getProjectsByCategoryId = async (categoryId) => {
    const query = `
        SELECT
            sp.project_id,
            sp.organization_id,
            sp.title,
            sp.description,
            sp.location,
            sp.date
        FROM public.service_project AS sp
        JOIN public.project_category AS pc
            ON sp.project_id = pc.project_id
        WHERE pc.category_id = $1
        ORDER BY sp.date ASC;
    `;

    const result = await db.query(query, [categoryId]);

    return result.rows;
}

export {
    getAllProjects,
    getUpcomingProjects,
    getProjectDetails,
    getProjectsByOrganizationId,
    getProjectsByCategoryId
}
