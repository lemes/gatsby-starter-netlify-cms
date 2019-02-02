import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";

import Layout from "../components/Layout";
import { HTMLContent } from "../components/Content";

import heroImage from "../img/agriculture-clouds-corn.jpg";

export const HomePageTemplate = ({ title, subtitle, features }) => {
  return (
    <>
      <section
        className="section"
        style={{
          backgroundImage: `
              linear-gradient(
                rgba(255, 255, 255, 0.45),
                rgba(255, 255, 255, 0.45)
              ),
              url("${heroImage}")`,
          backgroundSize: "200%",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center"
        }}
      >
        <div className="container" style={{ maxWidth: 400 }}>
          <h1 className="title has-text-centered has-text-white has-text-weight-bold">
            {title}
          </h1>
          <h2 className="subtitle has-text-centered has-text-white has-text-weight-bold">
            {subtitle}
          </h2>
          <div className="field">
            <input className="input" type="text" placeholder="Text input" />
          </div>
          <div className="field">
            <input className="input" type="text" placeholder="Text input" />
          </div>
          <input
            className="button is-primary"
            type="submit"
            value="Submit input"
          />
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="columns">
            {features.map(feature => (
              <div className="column" key={feature.title}>
                <div>
                  <span className="icon">
                    <i className={feature.icon} />
                  </span>
                  {feature.title}
                </div>
                <div className="has-text-justified">{feature.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

const HomePage = ({ data }) => {
  const { markdownRemark: post } = data;

  return (
    <Layout>
      <HomePageTemplate
        contentComponent={HTMLContent}
        title={post.frontmatter.title}
        subtitle={post.frontmatter.subtitle}
        features={post.frontmatter.features}
      />
    </Layout>
  );
};

HomePage.propTypes = {
  data: PropTypes.object.isRequired
};

export default HomePage;

export const homePageQuery = graphql`
  query HomePage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        subtitle
        features {
          icon
          title
          description
        }
      }
    }
  }
`;
