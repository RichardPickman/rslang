import { IWord } from "../../../../../types/types";
import { base_url } from "../config/config";

const fetchImage = async (word: IWord) => {
  const options = {
    method: "GET",
  };
  try {
    const response = await fetch(`${base_url}${word.image}`, options);
    const imageBlob = await response.blob();
    const imageObjectURL = URL.createObjectURL(imageBlob);

    return imageObjectURL;
  } catch (error) {}
};

export default fetchImage;
