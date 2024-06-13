import Navbar from "../navbar/navbar";
import "./blog.css";
import { Link, useParams } from "react-router-dom";

import Footer from "../../containers/footer/footer";
import blogData from "./data/db";

const BlogPage = () => {
  let { id } = useParams();
  const post = blogData.find((item) => item.id === parseInt(id));
  return (
    <>
      <Navbar />
      <div className="container p-5 mt-5 ">
        <div className="row px-5">
          <div className="col-12 px-5">
            <div className="">
              <div className="content  py-5">
                <h2 className="gradient__text fs-1">{post.title}</h2>
              </div>
              <div className="">
                <img src={post.image} className="w-100 object-fit-contain" />
              </div>
              <div className="text-white  pt-4">
                {post.description.head.map((head, index) => (
                  <div key={index} className="gradient__bg p-4 rounded-2 mb-2">
                    <p>
                      <span>{head}</span>
                      {post.description.desc[index]}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
export default BlogPage;