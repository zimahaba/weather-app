import sunnyImage from './assets/Clear.png';
import cloudyImage from './assets/LightCloud.png';
import heavyCloudImage from './assets/HeavyCloud.png';
import showerImage from './assets/Shower.png';
import rainImage from './assets/LightRain.png';
import heavyRainImage from './assets/HeavyRain.png';
import thunderstormImage from './assets/Thunderstorm.png';
import snowImage from './assets/Snow.png';
import sleetImage from './assets/Sleet.png';
import hailImage from './assets/Hail.png';

const weatherImages = [sunnyImage, cloudyImage, heavyCloudImage, showerImage, rainImage, heavyRainImage, thunderstormImage, snowImage, sleetImage, hailImage];
const weatherDescription = ['Sunny', 'Cloudy', 'Mostly Cloudy', 'Shower', 'Rain', 'Heavy Rain', 'Thunderstorm', 'Snow', 'Sleet', 'Hail']

const imageMapCode = new Map();
imageMapCode.set(0, 0);
imageMapCode.set(1, 1);
imageMapCode.set(2, 1);
imageMapCode.set(3, 2);
imageMapCode.set(45, 2);
imageMapCode.set(48, 2);
imageMapCode.set(51, 9);
imageMapCode.set(53, 9);
imageMapCode.set(55, 9);
imageMapCode.set(56, 9);
imageMapCode.set(57, 9);
imageMapCode.set(61, 4);
imageMapCode.set(63, 4);
imageMapCode.set(65, 5);
imageMapCode.set(66, 8);
imageMapCode.set(67, 8);
imageMapCode.set(71, 7);
imageMapCode.set(73, 7);
imageMapCode.set(75, 7);
imageMapCode.set(77, 7);
imageMapCode.set(85, 7);
imageMapCode.set(86, 7);
imageMapCode.set(80, 3);
imageMapCode.set(81, 3);
imageMapCode.set(82, 3);
imageMapCode.set(95, 6);
imageMapCode.set(96, 6);
imageMapCode.set(99, 6);

const getWeatherByCode = (code) => {
  const weatherCode = imageMapCode.get(code);
  return {description: weatherDescription[weatherCode], image: weatherImages[weatherCode]};
}

const formatDateTime = (datetime) => {
  const year = datetime.getFullYear();
  const monthInt = parseInt(datetime.getMonth())+1;
  const month = monthInt < 10 ? '0' + monthInt : monthInt;
  const day = datetime.getDate() < 10 ? '0' + datetime.getDate() : datetime.getDate();
  return year + '-' + month + '-' + day;
}

export { formatDateTime, getWeatherByCode};