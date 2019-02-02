import React from "react";
import { HomePageTemplate } from "../../templates/home-page";

const HomePagePreview = ({ entry }) => {
  const featuresEntry = entry.getIn(["data", "features"]);
  const features = featuresEntry ? featuresEntry.toJS() : [];
  return (
    <HomePageTemplate
      title={entry.getIn(["data", "title"])}
      subtitle={entry.getIn(["data", "subtitle"])}
      features={features}
    />
  );
};

export default HomePagePreview;
