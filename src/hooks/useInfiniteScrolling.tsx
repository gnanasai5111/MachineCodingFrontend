import { useEffect, useState } from "react";
import axios from "axios";

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

function useInfiniteScrolling(pageNumber: number, limit: number) {
  const [data, setData] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://jsonplaceholder.typicode.com/posts`, {
        params: {
          _page: pageNumber,
          _limit: limit,
        },
      })
      .then((res) => {
        setLoading(false);
        setData((prev) => [...prev, ...res.data]);
        if (res.data.length < limit) {
          setHasMore(false);
        }
      })
      .catch(() => {
        setError(true);
      });
  }, [pageNumber, limit]);
  return { data, loading, error, hasMore };
}

export default useInfiniteScrolling;
