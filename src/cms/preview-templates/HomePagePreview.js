import React from "react";
import { HomePageTemplate } from "../../templates/home-page";

const HomePagePreview = ({ entry }) => (
  <HomePageTemplate
    title={entry.getIn(["data", "title"])}
    subtitle={entry.getIn(["data", "subtitle"])}
    features={entry.getIn(["data", "features"])}
  />
);

export default HomePagePreview;
