'use client';

import type { Dispatch, SetStateAction } from 'react';
import { useState } from 'react';

import { ErrorMessage } from '@/components/ErrorMessage';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { formatSecondsToMMSS } from './util';

interface CertNumInputProps {
  onVerify: (certNum: string) => Promise<void>;
  certNumLength?: number;
  remainingTime: number;
  isLoading: boolean;
  certNumError: string;
  setCertNumError: Dispatch<SetStateAction<string>>;
}

const CertNumInput = ({
  onVerify,
  certNumLength = 6,
  remainingTime,
  isLoading,
  certNumError,
  setCertNumError,
}: CertNumInputProps) => {
  const [certNum, setCertNum] = useState('');

  const isValidCertNum = certNum.length === 6;
  const isVerifyDisabled = !isValidCertNum;

  const handleCertNumChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > certNumLength) return;
    setCertNum(e.target.value);
    setCertNumError('');
  };

  const handleVerifyClick = async () => {
    if (certNum.length !== certNumLength || isLoading) return;
    await onVerify(certNum);
  };

  return (
    <div className="flex flex-col">
      <div className="mt-4 flex gap-2">
        <div className="flex flex-1 items-center">
          <Input
            value={certNum}
            onChange={handleCertNumChange}
            disabled={isLoading}
            placeholder="인증번호를 입력해주세요"
            autoFocus={true}
            rightSlot={remainingTime > 0 && <ErrorMessage>{formatSecondsToMMSS(remainingTime)}</ErrorMessage>}
          />
        </div>
        <Button type="button" onClick={handleVerifyClick} disabled={isVerifyDisabled || remainingTime === 0}>
          인증하기
        </Button>
      </div>
      {certNumError && <ErrorMessage>{certNumError}</ErrorMessage>}
    </div>
  );
};

export default CertNumInput;
