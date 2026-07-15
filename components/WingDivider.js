import styles from "./WingDivider.module.css";

export default function WingDivider() {
  return (
    <div className={styles.divider}>
      <div className={styles.line}></div>
      <div className={styles.wing}>
        <svg width="40" height="20" viewBox="0 0 40 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 10C10 10 15 0 20 0C25 0 30 10 40 10C30 10 25 20 20 20C15 20 10 10 0 10Z" fill="currentColor"/>
        </svg>
      </div>
      <div className={styles.line}></div>
    </div>
  );
}
