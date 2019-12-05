import React, { useState, useEffect } from "react";

const Post: React.FC = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result: any = await window.fetch("/api/posts");
      const data = await result.json();
      console.log(data);
      setPosts(data.rows);
    };

    fetchData();

    return function cleanup() {
      console.log("no cleanup");
    };
  }, []);

  return (
    <div>
      <ul>
        {posts.map((post: any) => (
          <li>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Post;
