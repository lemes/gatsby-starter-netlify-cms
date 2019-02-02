import React from "react";
import Helmet from "react-helmet";
import { Link, graphql } from "gatsby";
import Layout from "../../components/Layout";

const ProfileItem = ({ avatar, name, job, skills, region }) => (
  <div className="card" style={{ padding: 8 }}>
    <div className="columns is-mobile">
      <div className="column is-narrow">
        <figure className="image is-96x96 is-marginless">
          <img
            className="is-rounded"
            alt="avatar"
            src={avatar.childImageSharp.fluid.src}
          />
        </figure>
      </div>
      <div className="column">
        <div className="title is-size-5">{name}</div>
        <div className="subtitle is-size-6">{job}</div>
        <button
          className="button is-primary is-outlined"
          style={{ marginTop: "-1rem" }}
        >
          <span class="icon ">
            <i class="far fa-envelope" />
          </span>
          <span>Chat</span>
        </button>
      </div>
    </div>
    <div className="columns is-mobile">
      <div className="column">
        <p className="has-text-info is-size-7">Especialidades</p>
        <div className="tags">
          {skills.map(skill => (
            <span key={skill} className="tag">
              {skill}
            </span>
          ))}
        </div>
      </div>
      <div className="column">
        <p className="has-text-info is-size-7">Região</p>
        <span className="tag">{region}</span>
      </div>
    </div>
  </div>
);

const ProfileListPage = ({
  data: {
    allMarkdownRemark: { edges = [] }
  }
}) => {
  return (
    <Layout>
      <section className="section">
        <Helmet title={`Profiles`} />
        <div className="container content" style={{ maxWidth: 400 }}>
          {edges.map((edge, index) => (
            <ProfileItem key={index} {...edge.node.frontmatter} />
          ))}
        </div>
      </section>
    </Layout>
  );
};

export default ProfileListPage;

export const tagPageQuery = graphql`
  query ProfilesQuery {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___name] }
      filter: { frontmatter: { templateKey: { eq: "profile-page" } } }
      limit: 100
    ) {
      totalCount
      edges {
        node {
          frontmatter {
            avatar {
              childImageSharp {
                fluid(maxWidth: 200, maxHeight: 200) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            name
            job
            university
            skills
            university
            graduationYear
            region
          }
        }
      }
    }
  }
`;
