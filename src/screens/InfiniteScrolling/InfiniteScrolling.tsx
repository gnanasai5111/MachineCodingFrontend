import { useCallback, useRef, useState } from "react";
import useInfiniteScrolling from "../../hooks/useInfiniteScrolling";
import "./styles.less";

function InfiniteScrolling() {
  const [page, setPage] = useState(0);
  const { data, loading, error, hasMore } = useInfiniteScrolling(page, 20);

  const observerRef = useRef<IntersectionObserver | null>(null);

  const targetRef = useCallback(
    (element: HTMLParagraphElement) => {
      if (loading) {
        return;
      }
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          if (hasMore) {
            setPage((prev) => prev + 1);
          }
        }
      });
      if (element) {
        observerRef.current.observe(element);
      }
    },
    [loading, hasMore]
  );

  return (
    <div className="container">
      <h1 className="main-heading">Infinite Scrolling</h1>
      <div className="infinite-scrolling-container">
        {data?.map((item, index) => {
          const isLast = index === data.length - 1;
          return (
            <div key={index} ref={isLast ? targetRef : null} className="item">
              <h1>{item.title}</h1>
              <p>{item.body}</p>
            </div>
          );
        })}
        {loading && <p>...loading</p>}
        {error && <p>Something went wrong</p>}
      </div>
    </div>
  );
}

export default InfiniteScrolling;
