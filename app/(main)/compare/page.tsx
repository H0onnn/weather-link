import { DetailComparison } from './_components/DetailComparison';
import { SelectCompareLocation } from './_components/SelectCompareLocation';
import { TodayComparison } from './_components/TodayComparison';

export default function ComparePage() {
  return (
    <div className="p-5">
      <SelectCompareLocation />
      <TodayComparison />
      <DetailComparison />
    </div>
  );
}
