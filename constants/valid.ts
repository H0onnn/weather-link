// 이름
export const NAME_REGEX = /^[가-힣a-zA-Z0-9]+$/;
export const NAME_MAX_LENGTH = 8;
export const NAME_ERROR_MESSAGE = '이름은 한글, 영어, 숫자만 입력 가능합니다.';
export const NAME_LENGTH_ERROR_MESSAGE = '이름은 최대 8글자까지 입력 가능합니다.';
export const NAME_REQUIRED_ERROR_MESSAGE = '사용할 이름을 입력해주세요.';

// 이메일
export const EMAIL_REQUIRED_ERROR_MESSAGE = '이메일을 입력해주세요.';
export const EMAIL_FORMAT_ERROR_MESSAGE = '이메일 형식이 올바르지 않습니다.';

// 비밀번호
export const PASSWORD_REQUIRED_ERROR_MESSAGE = '비밀번호를 입력해주세요.';
export const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*[0-9]).{8,}$/;
export const PASSWORD_MIN_LENGTH = 8;
export const PASSWORD_ERROR_MESSAGE = '비밀번호는 특수문자, 대소문자를 포함해 최소 8자 이상이어야 합니다.';
export const PASSWORD_CONFIRM_ERROR_MESSAGE = '비밀번호가 일치하지 않습니다.';

// 위치
export const SIDO_REQUIRED_ERROR_MESSAGE = '시/도를 입력해주세요.';
export const GUGUN_REQUIRED_ERROR_MESSAGE = '시/군/구를 입력해주세요.';

// 약관
export const TERMS_REQUIRED_ERROR_MESSAGE = '서비스 이용약관에 동의해주세요.';
export const LOCATION_TERMS_REQUIRED_ERROR_MESSAGE = '개인정보 수집 및 이용에 동의해주세요.';
export const ALL_TERMS_REQUIRED_ERROR_MESSAGE = '모든 필수 약관에 동의해주세요.';

// 파일
export const INVALID_IMAGE_ERROR_MESSAGE = '유효한 이미지 파일이 아닙니다.';
