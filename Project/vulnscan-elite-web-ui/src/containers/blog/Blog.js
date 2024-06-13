import "./blog.css";
import React from "react";
import Article from "../../component/article/Article";
import blog01 from "./image/blog-05.jpg";
import blog02 from "./image/blog-06.jpg";
import blog03 from "./image/blog-03.jpg";
import blog04 from "./image/blog-07.jpg";
import blog05 from "./image/blog-04.jpg";

const Blog = () => {
  return (
    <div className=" blog section__padding">
      <div className="blog-heading">
        <h1 className="gradient__text">
          A lot is happening, We are blogging about it.
        </h1>
      </div>
      <div className="blog-container">
        <div className="blog-container_groupA">
          <Article
            imgUrl={blog01}
            date="Nov 16,2023"
            title="Top Network Vulnerability Tools for Effective Cyberattack Prevention 2023"
            index={1}
          />

        </div >
        <div className="blog-container_groupB">
          <Article
            imgUrl={blog02}
            date="Nov 16,2023"
            title="
            Guardians of Cybersecurity: Exploring the Leading Vulnerability Assessment Solutions"
            index={2}
          />
          <Article
            imgUrl={blog03}
            date="Nov 16,2023"
            title=" Vulnerabilities Test for a huge range of issues"
            index={3}
          />
          <Article
            imgUrl={blog04}
            date="sep 26,2023"
            title="
            Expertise
            Unrivaled protection against zero-day vulnerabilities"
            index={4}
          />
          <Article
            imgUrl={blog05}
            date="Nov 16,2023"
            title="
            Discover a better way to scan"
            index={5}
          />
        </div>
      </div>
    </div>
  );
};
export default Blog;