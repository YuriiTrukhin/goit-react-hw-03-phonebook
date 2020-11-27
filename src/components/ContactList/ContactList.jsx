import React from "react";
import PropTypes from "prop-types";
import styles from "./ContactList.module.css";

const ContactList = function ({ list, toDelete }) {
  return (
    <>
      <ul className={styles.list}>
        {list.map((el) => {
          return (
            <li key={el.id} className={styles.listItem}>
              {el.name} : {el.number}
              <button className={styles.btn} type="button" onClick={() => toDelete(el.id)}>
                Удалить
              </button>
            </li>
          );
        })}
      </ul>
    </>
  );
};
ContactList.propTypes = {
  toDelete: PropTypes.func.isRequired,
  list: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
};
export default ContactList;
