"use client";

import styles from "@/components/ask-pet.module.css";

/**
 * A small signal-coloured creature that wanders the top edge of the panel.
 *
 * Purely decorative, so it is aria-hidden and carries no information the
 * interface does not already give in words. It walks faster while an answer is
 * being written, and CSS handles the whole thing, so it costs no renders.
 * `prefers-reduced-motion` parks it and stops the legs.
 */
export function AskPet({ busy = false }: { busy?: boolean }) {
  return (
    <div className={`${styles.track} ${busy ? styles.busy : ""}`} aria-hidden="true">
      <div className={styles.walker}>
        <div className={styles.bob}>
          <svg viewBox="0 0 24 20" className={styles.body}>
            {/* legs, behind the body */}
            <g className={styles.legs}>
              <path d="M8 15v3" />
              <path d="M12 15v3.4" />
              <path d="M16 15v3" />
            </g>
            {/* shell */}
            <path
              className={styles.shell}
              d="M4 15a8 6.6 0 0 1 16 0z"
            />
            {/* antenna with a signal tip */}
            <path className={styles.antenna} d="M12 8.4V5.2" />
            <circle className={styles.tip} cx="12" cy="4" r="1.7" />
            {/* eyes */}
            <g className={styles.eyes}>
              <circle cx="9.4" cy="12.2" r="1.05" />
              <circle cx="14.6" cy="12.2" r="1.05" />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}
