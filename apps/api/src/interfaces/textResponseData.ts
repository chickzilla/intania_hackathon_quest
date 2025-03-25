interface TextResponseData {
  data: {
    sadness: number;
    joy: number;
    love: number;
    anger: number;
    fear: number;
    surprise: number;
  };
}

export default TextResponseData;

export interface AiResponseData {
  sadness: number;
  joy: number;
  love: number;
  anger: number;
  fear: number;
  surprise: number;
}