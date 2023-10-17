import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { USER_POST_QUERY } from "../graphql";
import { GET_TOP_PDFS } from "../graphql";
import Logo from "./Logo";

const TrendingArticles = () => {
  const { loading, error, data } = useQuery(GET_TOP_PDFS);
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    if (!loading && data) {
      setArticles(data.topPdfs);
    }
  }, [loading, data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error 😦 </p>;

  const ArticleCard = ({ article }) => {
    return (
      <div className="m-4 bg-white rounded-2xl shadow-md shadow-cyan-500/50 hover: scale-105 hover:shadow-lg hover:shadow-cyan-500/50 ">
        <div className="p-4">
          <div className="flex flex-row justify-between">
            <div className="text-2xl font-semibold mb-1 truncate">
              {article.title}
            </div>
            <div className=" text-black text-xs font-mono font-semibold mt-1">
              {new Date(article.createdAt).toLocaleString()}
            </div>
          </div>

          <div
            className="text-md text-black line-clamp-2 truncate pt-1 pb-1" // Use line-clamp to limit to 2 lines
            dangerouslySetInnerHTML={{ __html: article.description }}
          />
          <div className="text-gray-600 text-xs font-bold">
            Institution: {article.institutionName}
          </div>
          <div className="flex flex-row justify-between">
            <div className="text-gray-600 text-xs font-bold">
              Author: {article.author}
            </div>
            <div className=" bg-[#E8E8E8] text-black text-md rounded-full pl-2 pr-2 pt-1 pb-1">
              {article.topic}
            </div>
          </div>

          {/* <a
            href={article.link}
            className="text-blue-500 hover:underline mt-2 block"
          >
            Read more
          </a> */}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-gray-50">
      <div className="container mx-auto p-4 bg-gray-50">
        <div className="mb-4 mt-4">
          <Logo />
        </div>

        <h1 className="text-3xl font-semibold mb-4 ">Trending Articles</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrendingArticles;