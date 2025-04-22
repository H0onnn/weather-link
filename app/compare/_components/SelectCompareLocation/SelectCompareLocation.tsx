'use client';

import { parseAsString, useQueryStates } from 'nuqs';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const districts = {
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

const cityOptions = [
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

const myLocationData = {
  city: '서울특별시',
  district: '양천구',
};

const SelectCompareLocation = () => {
  const [location, setLocation] = useQueryStates({
    city: parseAsString,
    district: parseAsString,
  });

  const { city, district } = location;

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex items-center">
        <div className="w-24 text-sm text-gray500">내 위치</div>
        <div className="font-medium">
          {myLocationData.city} {myLocationData.district}
        </div>
      </div>

      <div className="flex items-center">
        <div className="w-24 text-sm text-gray500">비교 위치</div>
        <div className="flex items-center space-x-4">
          <Select value={city || ''} onValueChange={(value) => setLocation({ ...location, city: value })}>
            <SelectTrigger className="h-9 rounded-[16px] bg-white">
              <SelectValue placeholder="시/도 선택" />
            </SelectTrigger>
            <SelectContent>
              {cityOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {city && (
            <Select value={district || ''} onValueChange={(value) => setLocation({ ...location, district: value })}>
              <SelectTrigger className="h-9 rounded-[16px] bg-white">
                <SelectValue placeholder="구/군 선택" />
              </SelectTrigger>
              <SelectContent>
                {districts[city as keyof typeof districts]?.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>
      </div>
    </div>
  );
};

export default SelectCompareLocation;
