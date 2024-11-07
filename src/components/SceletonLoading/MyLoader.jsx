import React from "react";
import ContentLoader from "react-content-loader";

const MyLoader = (props) => (
  <ContentLoader viewBox="0 0 400 380" height={380} width={'w-[23%]'} {...props}>
    <rect x="3" y="3" rx="10" ry="10" width="300" height="280" />
    <rect x="6" y="290" rx="0" ry="0" width="292" height="20" />
    <rect x="4" y="315" rx="0" ry="0" width="239" height="20" />
  </ContentLoader>
);

export default MyLoader;
