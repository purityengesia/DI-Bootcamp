// src/CategorySelector.jsx
import { useSelector, useDispatch } from 'react-redux';
import { setCategoryFilter } from './productivitySlice';
import { selectProductivityState } from './productivitySlice'; // Basic selector to get the whole slice

const CategorySelector = () => {
  const dispatch = useDispatch();
  const { categories, selectedCategoryId } = useSelector(selectProductivityState);

  return (
    <div style={styles.container}>
      <label style={styles.label}>Filter by Category:</label>
      <select
        value={selectedCategoryId}
        onChange={(e) => dispatch(setCategoryFilter(e.target.value))}
        style={styles.select}
      >
        <option value="All">All Categories</option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.name}
          </option>
        ))}
      </select>
    </div>
  );
};

const styles = {
  container: { marginBottom: '20px', textAlign: 'center' },
  label: { marginRight: '10px', fontWeight: 'bold', fontSize: '1.1rem' },
  select: { padding: '8px', borderRadius: '4px', fontSize: '1rem' },
};

export default CategorySelector;