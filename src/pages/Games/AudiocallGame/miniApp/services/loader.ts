import { url_words } from "../config/config";

export default class Loader {
  static async getWords() {
    try {
      const response = await fetch(url_words);
      const json = await response.json();
      return json;
    } catch (error) {
      console.log("error", error);
    }
  }
}
