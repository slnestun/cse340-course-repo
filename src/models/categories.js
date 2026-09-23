import db from './db.js'

const getAllCategories = async () => {
    const query = `
        SELECT 
            category_id,
            name
        FROM public.category;`
    const result = await db.query(query)
    return result.rows
}

const getCategoryDetails = async (categoryId) => {
    const query = `
        SELECT 
            category_id,
            name
        FROM public.category
        WHERE category_id = $1;`
    const result = await db.query(query, [categoryId])
    return result.rows[0]
}

const getCategoriesByProjectId = async (projectId) => {
    const query = `
        SELECT
            c.category_id,
            c.name
        FROM public.category c
        JOIN public.project_category pc ON c.category_id = pc.category_id
        WHERE pc.project_id = $1;`
    const result = await db.query(query, [projectId])
    return result.rows
}

// Keep the function name used by the course activity while preserving the
// existing getCategoriesByProjectId function used elsewhere in the project.
const getCategoriesByServiceProjectId = async (projectId) => {
    return getCategoriesByProjectId(projectId)
}

const assignCategoryToProject = async (projectId, categoryId) => {
    const query = `
        INSERT INTO public.project_category (project_id, category_id)
        VALUES ($1, $2);`

    await db.query(query, [projectId, categoryId])
}

const updateCategoryAssignments = async (projectId, categoryIds) => {
    const deleteQuery = `
        DELETE FROM public.project_category
        WHERE project_id = $1;`

    await db.query(deleteQuery, [projectId])

    for (const categoryId of categoryIds) {
        await assignCategoryToProject(projectId, categoryId)
    }
}

export {
    getAllCategories,
    getCategoryDetails,
    getCategoriesByProjectId,
    getCategoriesByServiceProjectId,
    updateCategoryAssignments
}
