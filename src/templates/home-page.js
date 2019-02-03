import React from "react";
import PropTypes from "prop-types";
import { Link, graphql } from "gatsby";
import { navigate } from "gatsby-link";

import Layout from "../components/Layout";

import heroImage from "../img/agriculture-clouds-corn.jpg";

export const HomePageTemplate = ({
  title,
  subtitle,
  features = [],
  posts = []
}) => {
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
      <section className="section">
        <div className="container">
          <div className="content">
            <h1 className="has-text-weight-bold is-size-3">Últimas Notícias</h1>
          </div>
          {posts.map(({ node: post }) => (
            <div
              className="content"
              style={{ border: "1px solid #333", padding: "2em 4em" }}
              key={post.id}
            >
              <p>
                <Link className="has-text-primary" to={post.fields.slug}>
                  {post.frontmatter.title}
                </Link>
                <span> &bull; </span>
                <small>{post.frontmatter.date}</small>
              </p>
              <p>
                {post.excerpt}
                <br />
                <br />
                <Link className="button is-small" to={post.fields.slug}>
                  Leia mais →
                </Link>
              </p>
            </div>
          ))}
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
  features: PropTypes.arrayOf(FeaturePropTypes).isRequired,
  posts: PropTypes.array.isRequired
};

const HomePage = ({ data }) => {
  const {
    markdownRemark: home,
    allMarkdownRemark: { edges: posts }
  } = data;

  return (
    <Layout>
      <HomePageTemplate
        title={home.frontmatter.title}
        subtitle={home.frontmatter.subtitle}
        features={home.frontmatter.features}
        posts={posts}
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
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
    ) {
      edges {
        node {
          excerpt(pruneLength: 400)
          id
          fields {
            slug
          }
          frontmatter {
            title
            templateKey
            date(formatString: "MMMM DD, YYYY")
          }
        }
      }
    }
  }
`;
