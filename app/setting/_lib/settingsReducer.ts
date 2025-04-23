export type DistrictOption = { value: string; label: string };

export interface DistrictMap {
  [city: string]: DistrictOption[];
}

export type SettingsState = {
  city: string;
  district: string;
  notificationsEnabled: boolean;
  temperatureThreshold: number;
  humidityThreshold: number;
  dustThreshold: string;
  windThreshold: number;
};

export type SettingsAction =
  | { type: 'SET_CITY'; payload: string }
  | { type: 'SET_DISTRICT'; payload: string }
  | { type: 'TOGGLE_NOTIFICATIONS'; payload: boolean }
  | { type: 'SET_TEMPERATURE_THRESHOLD'; payload: number }
  | { type: 'SET_HUMIDITY_THRESHOLD'; payload: number }
  | { type: 'SET_DUST_THRESHOLD'; payload: string }
  | { type: 'SET_WIND_THRESHOLD'; payload: number }
  | { type: 'RESET_SETTINGS' };

// TODO: 초기 설정값 데이터
export const initialState: SettingsState = {
  city: '',
  district: '',
  notificationsEnabled: true,
  temperatureThreshold: 25,
  humidityThreshold: 70,
  dustThreshold: 'normal',
  windThreshold: 15,
};

export const settingsReducer = (state: SettingsState, action: SettingsAction): SettingsState => {
  switch (action.type) {
    case 'SET_CITY':
      return {
        ...state,
        city: action.payload,
        district: '',
      };
    case 'SET_DISTRICT':
      return {
        ...state,
        district: action.payload,
      };
    case 'TOGGLE_NOTIFICATIONS':
      return {
        ...state,
        notificationsEnabled: action.payload,
      };
    case 'SET_TEMPERATURE_THRESHOLD':
      return {
        ...state,
        temperatureThreshold: action.payload,
      };
    case 'SET_HUMIDITY_THRESHOLD':
      return {
        ...state,
        humidityThreshold: action.payload,
      };
    case 'SET_DUST_THRESHOLD':
      return {
        ...state,
        dustThreshold: action.payload,
      };
    case 'SET_WIND_THRESHOLD':
      return {
        ...state,
        windThreshold: action.payload,
      };
    case 'RESET_SETTINGS':
      return initialState;
    default:
      return state;
  }
};

export const districts: DistrictMap = {
  seoul: [
    { value: 'gangnam', label: '강남구' },
    { value: 'gangdong', label: '강동구' },
    { value: 'gangbuk', label: '강북구' },
    { value: 'gangseo', label: '강서구' },
    { value: 'gwanak', label: '관악구' },
    { value: 'gwangjin', label: '광진구' },
    { value: 'guro', label: '구로구' },
    { value: 'geumcheon', label: '금천구' },
    { value: 'nowon', label: '노원구' },
  ],
  busan: [
    { value: 'haeundae', label: '해운대구' },
    { value: 'suyeong', label: '수영구' },
    { value: 'nam', label: '남구' },
    { value: 'buk', label: '북구' },
    { value: 'dong', label: '동구' },
    { value: 'seo', label: '서구' },
  ],
  incheon: [
    { value: 'yeonsu', label: '연수구' },
    { value: 'namdong', label: '남동구' },
    { value: 'bupyeong', label: '부평구' },
    { value: 'gyeyang', label: '계양구' },
    { value: 'michuhol', label: '미추홀구' },
  ],
};

export const cityOptions = [
  { value: 'seoul', label: '서울특별시' },
  { value: 'busan', label: '부산광역시' },
  { value: 'incheon', label: '인천광역시' },
  { value: 'daegu', label: '대구광역시' },
  { value: 'gwangju', label: '광주광역시' },
  { value: 'daejeon', label: '대전광역시' },
  { value: 'ulsan', label: '울산광역시' },
  { value: 'sejong', label: '세종특별자치시' },
  { value: 'gyeonggi', label: '경기도' },
];

export const dustOptions = [
  { value: 'good', label: '좋음' },
  { value: 'normal', label: '보통' },
  { value: 'bad', label: '나쁨' },
  { value: 'very_bad', label: '매우 나쁨' },
];
