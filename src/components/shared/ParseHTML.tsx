"use client";
import parse from "html-react-parser";
import Prism from "prismjs";
import { useEffect } from "react";

const ParseHTML = ({ data }: { data: any }) => {
  useEffect(() => {
    Prism.highlightAll();
  }, []);
  return <div>{parse(data)}</div>;
};

export default ParseHTML;
