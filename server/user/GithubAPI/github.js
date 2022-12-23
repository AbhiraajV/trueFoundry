import { Octokit } from "@octokit/core";

export default class GithubRepoManager {
  constructor(key, gh_username, gh_repo, gh_filename) {
    this.gh_username = gh_username;
    this.gh_filename = gh_filename;
    this.gh_repo = gh_repo;
    this.octokit = new Octokit({
      auth: key,
    });
  }
  createRepo = async () => {
    try {
      const out = await this.octokit.request("POST /user/repos", {
        name: this.gh_repo,
      });
      console.log(
        out.status === 201
          ? "Repo created successfully"
          : " Something went wrong " + out
      );
    } catch (error) {
      console.log(error);
    }
  };

  addFileToRepo = async (content, message) => {
    try {
      console.log(content);
      const out = await this.octokit.request(
        "PUT /repos/" +
          this.gh_username +
          "/" +
          this.gh_repo +
          "/contents/" +
          this.gh_filename,
        {
          message: message ? message : "No commit message was provided",
          content: content ? content : "bXkgbmV3IGZpbGUgY29udGVudHM=",
        }
      );

      console.log(
        out.status === 201
          ? "Repo created successfully"
          : " Something went wrong " + out
      );
    } catch (error) {
      console.log(error);
    }
  };

  run = async () => {
    console.log("Creating the repo");
    return await this.createRepo()
      .then(async () => {
        console.log("Adding File");
        return await this.addFileToRepo()
          .then(() => {
            console.log("Repo created and files added successfully");
            return {
              ackMsg: true,
              status: "success",
              message: "Send an Email",
            };
          })
          .catch((error) => {
            console.log(
              "Repo was created but files were'nt added successfully"
            );
            return {
              ackMsg: false,
              message: "Repo created but files were'nt added",
              status: "fail",
            };
          });
      })
      .catch((error) => {
        console.log("Creating repo failed");
        return {
          ackMsg: false,
          message: "Repo creation failed",
          status: "fail",
        };
      });
  };
}
