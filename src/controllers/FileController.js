import axios from "axios";
import languages from "../constants/Languages";

const api = "https://khow623j34.execute-api.us-east-1.amazonaws.com/dev";
const textFileRoute = `${api}/textFile`;

export const saveFile = async (
  fileName,
  fileContent,
  language,
  communityId
) => {
  const extension = languages.find((lang) => lang.id === language).extension;

  const payload = {
    file_name: fileName + extension,
    language: language,
    file_content: fileContent,
    community_id: communityId,
  };

  try {
    const response = await axios.post(textFileRoute, payload);
    if (response.status !== 200) {
      throw Object.assign(new Error(response.body), { code: response.status });
    }
    return true;
  } catch (error) {
    window.alert("Something went wrong" + error);
    return false;
  }
};

const ec2ServerRoute = "http://54.204.244.72:5000";
const getFilesRoute = `${ec2ServerRoute}/textFile`;
export const retrieveFiles = async () => {
  try {
    const response = await axios.get(getFilesRoute);
    if (response.status !== 200) {
      throw Object.assign(new Error(response.body), { code: response.status });
    }
    return [true, response.data];
  } catch (error) {
    window.alert("Could not fetch files " + error);
    return [false, []];
  }
};

export const retrieveFileContent = async (fileName) => {
  try {
    const specificFileRoute = `${textFileRoute}/fileContent`;
    const payload = {
      file_name: fileName,
    };
    const content = await axios.post(specificFileRoute, payload);
    console.log(content);
    return [true, content.data];
  } catch (error) {
    window.alert("Something went wrong" + error);
    return [false, null];
  }
};
