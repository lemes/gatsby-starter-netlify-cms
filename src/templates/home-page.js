import React from "react";
import PropTypes from "prop-types";
import { Link, graphql } from "gatsby";
import { navigate } from "gatsby-link";

import Layout from "../components/Layout";

import heroImage from "../img/agriculture-clouds-corn.jpg";

export const HomePageTemplate = ({ title, subtitle, features = [] }) => {
  function onSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);
    const search = new URLSearchParams();
    data.forEach((value, key) => {
      if (value) search.set(key, value);
    });
    navigate(form.getAttribute("action") + "?" + search.toString());
  }

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
          <h1 className="title is-spaced has-text-centered has-text-white has-text-weight-bold">
            {title}
          </h1>
          <h2 className="subtitle has-text-centered has-text-white has-text-weight-bold">
            {subtitle}
          </h2>
          <form action="/profiles" onSubmit={onSubmit}>
            <div className="field">
              <input
                className="input"
                type="text"
                name="area"
                placeholder="Área: milho, gado, pastagem, gestāo..."
              />
            </div>
            <div className="field">
              <input
                className="input"
                type="text"
                name="region"
                placeholder="Regiāo: Uberaba, Alto Paranaíba, Sāo Carlos..."
              />
            </div>
            <button className="button is-primary" type="submit">
              <span className="icon">
                <i className="fas fa-search" />
              </span>
              <span>Pesquisar</span>
            </button>
          </form>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="columns">
            {features.map(feature => (
              <div className="column" key={feature.title}>
                <div style={{ padding: "8px 0" }}>
                  <span
                    className="icon is-size-5 has-text-primary"
                    style={{ marginRight: 8 }}
                  >
                    <i className={feature.icon} />
                  </span>
                  <span className="has-text-weight-bold">{feature.title}</span>
                </div>
                <div className="has-text-justified has-text-grey">
                  {feature.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

// Note: Currently validation doesn't work on nested fields
const FeaturePropTypes = PropTypes.shape({
  title: PropTypes.string,
  icon: PropTypes.string,
  description: PropTypes.string
});

HomePageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  features: PropTypes.arrayOf(FeaturePropTypes).isRequired
};

const HomePage = ({ data }) => {
  const { markdownRemark: post } = data;

  return (
    <Layout>
      <HomePageTemplate
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
