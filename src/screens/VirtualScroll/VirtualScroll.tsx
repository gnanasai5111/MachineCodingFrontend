import { useRef, useState } from "react";

function VirtualScroll() {
  const [scrollTop, setScrollTop] = useState(0);

  const containerHeight = 250;
  const totalItems = 1000;

  const itemHeight = 50;
  const totalHeight = totalItems * itemHeight;
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const scrollTimeout = useRef<number | null>(null);

  const visibleCount = Math.ceil(containerHeight / itemHeight) + 2;

  const startIndex = Math.floor(scrollTop / itemHeight);
  const endIndex = Math.min(totalItems - 1, startIndex + visibleCount);

  const visibleItems = Array.from(
    { length: endIndex - startIndex + 1 },
    (_, i) => `Item ${startIndex + i + 1}`
  );
  const handleScroll = () => {
    if (scrollTimeout.current) return;

    scrollTimeout.current = setTimeout(() => {
      if (scrollRef.current) {
        setScrollTop(scrollRef.current.scrollTop);
      }
      scrollTimeout.current = null;
    }, 100);
  };

  return (
    <div className="container">
      <h1 className="main-heading">Virtual Scroll</h1>
      <div
        className="virtual-scroll-container"
        style={{
          height: containerHeight,
          overflowY: "auto",
          overflowX: "hidden",
          border: "1px solid #eaeaea",
        }}
        ref={scrollRef}
        onScroll={handleScroll}
      >
        <div style={{ height: totalHeight, position: "relative" }}>
          <div
            style={{
              position: "absolute",
              top: startIndex * itemHeight,
              width: "100%",
            }}
          >
            {visibleItems.map((item) => {
              return (
                <div
                  key={item}
                  style={{ height: itemHeight, border: "1px solid #eaeaea" }}
                >
                  {item}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default VirtualScroll;
