import React from 'react';
import PropTypes from 'prop-types';
import { Menu } from 'semantic-ui-react';

/**
 * @description renders the individual sources
 * @constructor SourceItem
 * @param {string} id The id of the news source
 * @param {string} name The name of the news source
 * @param {func} onClick The parent onClick handler for selected news source
 * @param {Array} sortBysAvailable An array of available sort options for the source
 * @returns {Menu} Menu
 */
export default function SourceItem({ id, name, onClick, sortBysAvailable }) {
  /**
   * @description passes the id of the selected news source to its parent component (Sidebar)
   * @method
   * @memberOf SourceItem
   * @param {Object} event The event properties
   * @returns {void}
   */
  const handleClick = (event) => {
    event.preventDefault();
    const sourceId = event.target.getAttribute('href');
    onClick(sourceId, sortBysAvailable);
  };

  return (
    <Menu.Item name={name}>
      <a href={`${id}`} onClick={handleClick}>
        {name}
      </a>
    </Menu.Item>
  );
}

SourceItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  sortBysAvailable: PropTypes.array.isRequired
};
