"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import styles from "./ResonanceNetwork.module.css";
import {
  BASE_WORLD_PATH,
  VISITED_COUNTRIES,
  VISITED_NODES,
  TOUR_CONNECTIONS,
} from "./worldMapData";

export default function ResonanceNetwork() {
  const [activeNodeId, setActiveNodeId] = useState("kharkiv");
  const [hoveredNodeId, setHoveredNodeId] = useState(null);
  const containerRef = useRef(null);

  const currentNode =
    VISITED_NODES.find((n) => n.id === (hoveredNodeId || activeNodeId)) ||
    VISITED_NODES[0];

  // Country highlighting mapping
  const activeCountryCode = currentNode?.countryCode;

  // Determine placement: nodes near the top (Europe) place below the pin to avoid colliding with telemetry bar;
  // nodes in lower half (Johannesburg, Many More) place above the pin.
  const isTopHalf = currentNode.y < 350;
  const placement = isTopHalf ? "bottom" : "top";

  return (
    <section className={styles.chronicleSection} aria-label="The Chronicle & Tour Cities">
      <div className={styles.container}>
        {/* Editorial Header Area */}
        <div className={styles.headerArea}>
          <div className={styles.kicker}>
            <span className={styles.kickerLine} />
            <span>Taking One City at a Time · Tour Footprint</span>
          </div>

          <h2 className={`${styles.sectionTitle} font-editorial`}>
            The Chronicle: Spreading the Light City by City.
          </h2>

          {/* Narrative 2-Column Editorial Text */}
          <div className={styles.narrativeLayout}>
            <div className={styles.leadText}>
              Antidote Movement was born out of a clear divine mandate: to stand as the cure the world needs by spreading the love of God and the consciousness of His light through creative arts.
            </div>
            <div className={styles.bodyText}>
              <p>
                Too often, modern creative culture is defined by fleeting trends, cynicism, and noise. We are pioneering an intentional alternative — establishing platforms where Christian creatives, performing artists, designers, and storytellers can steward their divine gifts with uncompromising excellence and devotion.
              </p>
              <p>
                Taking one city at a time, we produce clean and godly content, host transformative gatherings, and organize tours that ignite local ecosystems of creators. We invite you to join this growing tribe as we glorify Yahweh together.
              </p>
            </div>
          </div>

          {/* Interactive Visited Cities Chip Strip */}
          <div className={styles.citiesChipBar} role="navigation" aria-label="Visited Tour Cities">
            <span className={styles.chipBarLabel}>
              <span className={styles.pulseDot} />
              Visited Cities:
            </span>
            <div className={styles.chipsScroll}>
              {VISITED_NODES.map((node) => {
                const isSelected = currentNode.id === node.id;
                const isFuture = node.type === "future";
                return (
                  <button
                    key={`chip-${node.id}`}
                    type="button"
                    className={`${styles.cityChip} ${isSelected ? styles.chipActive : ""
                      } ${isFuture ? styles.chipFuture : ""}`}
                    onClick={() => {
                      setActiveNodeId(node.id);
                      setHoveredNodeId(null);
                    }}
                    onMouseEnter={() => setHoveredNodeId(node.id)}
                    onMouseLeave={() => setHoveredNodeId(null)}
                  >
                    {isFuture && <span className={styles.starIcon}>✦ </span>}
                    {node.name}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}

