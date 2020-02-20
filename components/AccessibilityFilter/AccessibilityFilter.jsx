import React from 'react';
import { useAccessibilities } from '../AccessibilitiesContext';
import Button from '../Button';
import Dropdown, { DropdownContent } from '../Dropdown';
import filterIcon from './filter.svg';
import styles from './AccessibilityFilter.css';

const AccessibilityFilter = () => {
  const accessibilites = useAccessibilities();

  return (
    <Dropdown className={styles.Wrapper}>
      {({ open, toggle }) => (
        <>
          <Button className={styles.ButtonWrapper} onClick={toggle}>
            <img alt="Ícone de filtro" src={filterIcon} />
          </Button>
          {open && (
            <DropdownContent variant="right" className={styles.Content}>
              futuro filtro de acessibilidades
            </DropdownContent>
          )}
        </>
      )}
    </Dropdown>
  );
};

export default AccessibilityFilter;
