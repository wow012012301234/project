import "./article.css";
import { Link } from "react-router-dom";


const Article = ({ imgUrl, date, title, index }) => {
  return (
    <div className="blog-container-article">
      <Link to={`/blog/${index}`}>
        <div className="blog-container-article-img">
          <img src={imgUrl} alt="blog" />
        </div>
      </Link>
      <div className="blog-container_article-content">
        <div>
          <p>{date}</p>
          <h3>{title}</h3>
        </div>
        <p>Read Full Article</p>
      </div>
    </div>
  );
};

export default Article;
