import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import Content, { HTMLContent } from "../components/Content";

export const ProfileTemplate = ({
  content,
  contentComponent,
  avatar,
  name,
  job,
  university,
  graduationYear,
  skills = [],
  region,
  helmet
}) => {
  const ProfileContent = contentComponent || Content;

  return (
    <section className="section">
      {helmet || ""}
      <div className="container content">
        <div className="columns">
          <div className="column has-text-centered">
            <figure className="image">
              <img
                className="is-rounded"
                alt="avatar"
                src={avatar.childImageSharp.fluid.src}
              />
            </figure>
            <div className="is-size-2">{name}</div>
            <div>
              <span className="is-size-5">{job}</span>
              <div className="has-text-grey">
                {university} <span className="is-size-7">{graduationYear}</span>
              </div>
            </div>
            <button
              className="button is-primary is-outlined"
              style={{ margin: "1rem 0" }}
            >
              <span className="icon ">
                <i className="far fa-envelope" />
              </span>
              <span>Chat</span>
            </button>
            <div className="column">
              <div className="has-text-info is-size-7">Especialidades</div>
              <div className="tags" style={{ justifyContent: "center" }}>
                {skills.map(skill => (
                  <span key={skill} className="tag">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div className="column">
              <div className="has-text-info is-size-7">Região</div>
              <span className="tag">{region}</span>
            </div>
          </div>
          <div className="column is-paddingless">
            <ProfileContent content={content} />
          </div>
        </div>
      </div>
    </section>
  );
};

ProfileTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  helmet: PropTypes.object,
  name: PropTypes.string.isRequired,
  job: PropTypes.string.isRequired,
  university: PropTypes.string.isRequired,
  skills: PropTypes.array.isRequired
};

const Profile = ({ data }) => {
  const { markdownRemark: profile } = data;

  const description = `${profile.frontmatter.name} - ${
    profile.frontmatter.job
  }`;

  return (
    <Layout>
      <ProfileTemplate
        content={profile.html}
        contentComponent={HTMLContent}
        helmet={
          <Helmet titleTemplate="%s">
            <title>{`${description}`}</title>
            <meta name="description" content={`${description}`} />
          </Helmet>
        }
        {...profile.frontmatter}
      />
    </Layout>
  );
};

Profile.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object
  })
};

export default Profile;

export const pageQuery = graphql`
  query ProfileByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        avatar {
          childImageSharp {
            fluid(maxWidth: 400, maxHeight: 400) {
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
`;
