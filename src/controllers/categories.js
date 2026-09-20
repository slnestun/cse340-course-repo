import { getAllCategories, getCategoryDetails } from '../models/categories.js';
import { getProjectsByCategoryId } from '../models/projects.js';

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

export { showCategoriesPage, showCategoryDetailsPage };
