import GithubRepoManager from "./github.js";

export const SubscribeEvents = async (payload) => {
  const {
    data: { event, data },
  } = JSON.parse(payload);

  let { key, gh_username, gh_repo, gh_filename } = data;
  console.log({ data, event });
  let result = null;
  switch (event) {
    case "CREATE_REPO":
      console.log("Endpoint currently unavailable");
      break;
    case "ADD_FILES":
      console.log("Endpoint currently unavailable");
      break;
    case "CREATE_REPO_WITH_FILES":
      console.log("Here");
      const gh = new GithubRepoManager(key, gh_username, gh_repo, gh_filename);
      result = await gh.run();
      break;
    default:
      break;
  }
  return result;
};
