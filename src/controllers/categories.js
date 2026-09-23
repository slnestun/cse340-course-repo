import {
  getAllCategories,
  getCategoryDetails,
  getCategoriesByServiceProjectId,
  updateCategoryAssignments
} from '../models/categories.js';
import {
  getProjectsByCategoryId,
  getProjectDetails
} from '../models/projects.js';

const showCategoriesPage = async (req, res) => {
  const categories = await getAllCategories();

  const title = 'Service Categories';
  res.render('categories', {title, categories});
};

const showCategoryDetailsPage = async (req, res) => {
  const categoryId = req.params.id;
  const category = await getCategoryDetails(categoryId);

  if (!category) {
    const error = new Error('Category not found');
    error.status = 404;
    throw error;
  }

  const projects = await getProjectsByCategoryId(categoryId);

  const title = category.name;
  res.render('category', {title, category, projects});
};

const showAssignCategoriesForm = async (req, res) => {
  const projectId = req.params.projectId;
  const projectDetails = await getProjectDetails(projectId);

  if (!projectDetails) {
    const error = new Error('Project Not Found');
    error.status = 404;
    throw error;
  }

  const categories = await getAllCategories();
  const assignedCategories = await getCategoriesByServiceProjectId(projectId);
  const title = 'Assign Categories to Project';

  res.render('assign-categories', {
    title,
    projectId,
    projectDetails,
    categories,
    assignedCategories
  });
};

const processAssignCategoriesForm = async (req, res) => {
  const projectId = req.params.projectId;
  const selectedCategoryIds = req.body.categoryIds || [];
  const categoryIdsArray = Array.isArray(selectedCategoryIds)
    ? selectedCategoryIds
    : [selectedCategoryIds];

  await updateCategoryAssignments(projectId, categoryIdsArray);

  req.flash('success', 'Categories updated successfully.');
  res.redirect(`/project/${projectId}`);
};

export {
  showCategoriesPage,
  showCategoryDetailsPage,
  showAssignCategoriesForm,
  processAssignCategoriesForm
};
