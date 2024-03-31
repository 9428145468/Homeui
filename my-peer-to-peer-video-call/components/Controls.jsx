import React from 'react';
import styles from '../styles/Controls.module.css'; // Import custom styles

const Controls = ({ peerId, onConnect, onMute, onVideoToggle, onShare }) => {
  return (
    <div className={styles.controls}>
      {peerId && (
        <>
          <button className={styles.button} onClick={onMute}>
            <svg
              className={styles.icon}
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              {/** Mute icon */}
              <path
                fillRule="evenodd"
                d="M10.2858 5.71429c-0.39553 0.39553-1.02388 0.39553-1.41941 0L5.71429 10.2858c-0.39553 0.39553-0.39553 1.02388 0 1.41941l4.57142 4.57142c0.39553 0.39553 1.02388 0.39553 1.41941 0l4.57142-4.57142c0.39553-0.39553 0.39553-1.02388 0-1.41941L10.2858 5.71429z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          <button className={styles.button} onClick={onVideoToggle}>
            <svg
              className={styles.icon}
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              {/** Video icon */}
              <path d="M0 8.33333L2.82843 11.1617C3.16176 11.495 3.58824 11.495 3.92157 11.1617L7.75 8.33333L11.5784 11.1617C12.0118 11.495 12.4383 11.495 12.7716 11.1617L15 8.33333L17.1716 11.1617C17.505 11.495 17.9317 11.495 18.265 11.1617L20 8.33333L X 0 (cont) 
          <button className={styles.button} onClick={onShare}>
            <svg
              className={styles.icon}
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              {/** Share icon (Customize based on your chosen library) */}
              <path d="M5 3a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 5h10v10H5V5z" />
            </svg>
          </button>
        </>
      )}
      {!peerId && (
        <button className={styles.connectButton} onClick={() => onConnect(prompt('Enter peer ID to connect:'))}>
          Connect
        </button>
      )}
    </div>
  );
};

export default Controls;
