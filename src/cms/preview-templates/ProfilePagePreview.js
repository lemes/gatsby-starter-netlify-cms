import React from "react";
import PropTypes from "prop-types";
import { ProfileTemplate } from "../../templates/profile-page";

const ProfilePagePreview = ({ entry, widgetFor, getAsset }) => {
  const entrySkills = entry.getIn(["data", "skills"]);
  const skills = entrySkills ? entrySkills.toJS() : [];
  return (
    <ProfileTemplate
      content={widgetFor("body")}
      avatar={getAsset(entry.getIn(["data", "avatar"]))}
      name={entry.getIn(["data", "name"])}
      job={entry.getIn(["data", "job"])}
      university={entry.getIn(["data", "university"])}
      graduationYear={entry.getIn(["data", "graduationYear"])}
      skills={skills}
      region={entry.getIn(["data", "region"])}
    />
  );
};

ProfilePagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func
  }),
  widgetFor: PropTypes.func
};

export default ProfilePagePreview;
