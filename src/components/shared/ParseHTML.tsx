"use client";
import parse from "html-react-parser";
import Prism from "prismjs";
import "prismjs/components/prism-javascript";
import { useEffect } from "react";

const ParseHTML = ({ data }: { data: any }) => {
  useEffect(() => {
    Prism.highlightAll();
  }, []);
  return <div className="post-content">{parse(data)}</div>;
};

export default ParseHTML;
