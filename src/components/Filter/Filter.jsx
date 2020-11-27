import React from "react";
import PropTypes from "prop-types";
import styles from "./Filter.module.css";
const Filter = function ({ filterRender, filter }) {
  return (
    <div className={styles.box}>
      <label className={styles.label}>Find contacts by name</label>
      <input className={styles.input} type="text" value={filter} onChange={(e) => filterRender(e.target.value)} />
    </div>
  );
};
Filter.propTypes = {
  filterRender: PropTypes.func.isRequired,
  filter: PropTypes.string,
};
export default Filter;
