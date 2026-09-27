import { body, validationResult } from 'express-validator';
import {
  getAllCategories,
  getCategoryDetails,
  getCategoriesByServiceProjectId,
  updateCategoryAssignments,
  createCategory,
  updateCategory
} from '../models/categories.js';
import {
  getProjectsByCategoryId,
  getProjectDetails
} from '../models/projects.js';

const categoryValidation = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Category name is required')
    .isLength({ min: 3, max: 100 })
    .withMessage('Category name must be between 3 and 100 characters')
];

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

const showNewCategoryForm = async (req, res) => {
  const title = 'Add New Category';
  res.render('new-category', { title });
};

const processNewCategoryForm = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    errors.array().forEach((error) => {
      req.flash('error', error.msg);
    });

    return res.redirect('/new-category');
  }

  const { name } = req.body;
  const categoryId = await createCategory(name);

  res.redirect(`/category/${categoryId}`);
};

const showEditCategoryForm = async (req, res) => {
  const categoryId = req.params.id;
  const category = await getCategoryDetails(categoryId);

  if (!category) {
    const error = new Error('Category not found');
    error.status = 404;
    throw error;
  }

  const title = 'Edit Category';
  res.render('edit-category', { title, category });
};

const processEditCategoryForm = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    errors.array().forEach((error) => {
      req.flash('error', error.msg);
    });

    return res.redirect(`/edit-category/${req.params.id}`);
  }

  const categoryId = req.params.id;
  const { name } = req.body;

  await updateCategory(categoryId, name);
  res.redirect(`/category/${categoryId}`);
};

export {
  showCategoriesPage,
  showCategoryDetailsPage,
  showAssignCategoriesForm,
  processAssignCategoriesForm,
  showNewCategoryForm,
  processNewCategoryForm,
  showEditCategoryForm,
  processEditCategoryForm,
  categoryValidation
};
