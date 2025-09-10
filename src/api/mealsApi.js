const BASE_URL = "https://www.themealdb.com/api/json/v1/1";

export async function getCategories() {
  const res = await fetch(`${BASE_URL}/categories.php`);
  if (!res.ok) throw new Error('Error fetching categories');
  const json = await res.json();
  return json.categories; // array
}

export async function getRecipesByCategory(cat) {
  const res = await fetch(`${BASE_URL}/filter.php?c=${encodeURIComponent(cat)}`);
  if (!res.ok) throw new Error('Error fetching recipes');
  const json = await res.json();
  return json.meals; // array
}

export async function getRecipeDetail(id) {
  const res = await fetch(`${BASE_URL}/lookup.php?i=${id}`);
  if (!res.ok) throw new Error('Error fetching detail');
  const json = await res.json();
  return json.meals ? json.meals[0] : null;
}

export async function searchRecipes(keyword) {
  const res = await fetch(`${BASE_URL}/search.php?s=${encodeURIComponent(keyword)}`);
  if (!res.ok) throw new Error('Error searching recipes');
  const json = await res.json();
  return json.meals; // may be null
}
    