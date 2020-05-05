import React from 'react';
import PropTypes from 'prop-types';
import { ShareButtons, generateShareIcon } from 'react-share';

const FacebookIcon = generateShareIcon('facebook');
const TwitterIcon = generateShareIcon('twitter');
const WhatsappIcon = generateShareIcon('whatsapp');
const GooglePlusIcon = generateShareIcon('google');

const {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  GooglePlusShareButton,
} = ShareButtons;

/**
 * @description provides social media share features
 * @function
 * @param {string} url The url to the article to share
 * @param {string} title The title to the article to share
 * @returns {div} div
 */
export default function ShareIcon({ url, title }) {
  return (
    <div className="share-container">
      <div className="social-share">
        <TwitterShareButton
          url={url}
          title={title}
          className="share-button"
        >
          <TwitterIcon size={32} round />
        </TwitterShareButton>
      </div>
      <div className="social-share">
        <FacebookShareButton
          url={url}
          title={title}
          className="share-button"
        >
          <FacebookIcon size={32} round />
        </FacebookShareButton>
      </div>
      <div className="social-share">
        <GooglePlusShareButton
          url={url}
          title={title}
          className="share-button"
        >
          <GooglePlusIcon size={32} round />
        </GooglePlusShareButton>
      </div>
      <div className="social-share">
        <WhatsappShareButton
          url={url}
          title={title}
          className="share-button"
        >
          <WhatsappIcon size={32} round />
        </WhatsappShareButton>
      </div>
    </div>
  );
}

ShareIcon.propTypes = {
  url: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
};
