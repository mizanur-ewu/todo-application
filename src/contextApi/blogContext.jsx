import React, { useState } from "react";

export const BlogContext = React.createContext();

const BlogProvider = ({ children }) => {

    const [blogState, setBlogState] = useState({
      loading: false,
      title: "Hello",
      message: "This is a post on context api",
    });

  return (
     <BlogContext.Provider value={[blogState, setBlogState]}>
        {children}
     </BlogContext.Provider>
  )};

  export default BlogProvider;