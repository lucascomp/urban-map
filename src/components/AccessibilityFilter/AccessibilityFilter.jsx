import React from 'react';
import PropTypes from 'prop-types';
import Button from '../Button';
import Checkbox from '../Checkbox';
import Dropdown, { DropdownContent } from '../Dropdown';
import filterIcon from './filter.svg';
import styles from './AccessibilityFilter.css';

const AccessibilityFilter = ({
  accessibilities,
  onAccessibilitiesChange,
}) => {
  const onFilterChange = (filterId) => ({ checked: newChecked }) => {
    const newAccessibilities = accessibilities.map(({ checked, id, name }) => ({
      checked: filterId === id ? newChecked : checked,
      id,
      name,
    }));

    onAccessibilitiesChange(newAccessibilities);
  };

  return (
    <Dropdown className={styles.Wrapper}>
      {({ open, toggle }) => (
        <>
          <Button className={styles.ButtonWrapper} onClick={toggle}>
            <img alt="Ícone de filtro" src={filterIcon} />
          </Button>
          {open && (
            <DropdownContent className={styles.Content}>
              <ul>
                {accessibilities.map(({ checked, id, name }) => (
                  <li className={styles.Item} key={id}>
                    <Checkbox
                      checked={checked}
                      name={name}
                      onChange={onFilterChange(id)}
                    >
                      {name}
                    </Checkbox>
                  </li>
                ))}
              </ul>
            </DropdownContent>
          )}
        </>
      )}
    </Dropdown>
  );
};

AccessibilityFilter.propTypes = {
  accessibilities: PropTypes.arrayOf(PropTypes.shape({
    checked: PropTypes.bool,
    id: PropTypes.number,
    name: PropTypes.string,
  })).isRequired,
  onAccessibilitiesChange: PropTypes.func.isRequired,
};

export default AccessibilityFilter;
