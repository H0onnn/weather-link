'use client';

import { sendCertEmail, verifyCertEmail } from '@/app/(auth)/sign-up/_model/apis';
import { useTimer } from '@/hooks';
import { useCallback, useState, useTransition } from 'react';
import { type Control, type FieldPath, type FieldValues, useWatch } from 'react-hook-form';

import { Input } from '@/components/Input';
import { Button } from '@/components/ui/button';

import { validEmail } from '@/utils/validUtils';

import { cn } from '@/lib/utils';

import CertNumInput from './CertNumInput';

export const enum AuthType {
  Signup = 'signUp',
  PasswordReset = 'passwordReset',
}

interface AuthenticatorProps<T extends FieldValues> {
  type: AuthType;
  control: Control<T>;
  name: FieldPath<T>;
  label?: string;
  error?: string;
  onVerified?: () => void;
  isSendButtonVisible?: boolean;
  className?: string;
  placeholder?: string;
}

const CODE_EXPIRE_TIME = 120;

const Authenticator = <T extends FieldValues>({
  type,
  control,
  name,
  label = '이메일',
  error,
  onVerified,
  className,
  placeholder = 'example@email.com',
  isSendButtonVisible = true,
  ...props
}: AuthenticatorProps<T>) => {
  const value = useWatch({
    control,
    name,
  });

  const isValidEmail = validEmail(value);

  // 인증번호 전송 로직 //
  const [certNumError, setCertNumError] = useState('');
  const [isCertNumSent, setIsCertNumSent] = useState(false);
  const [isSending, startCertTransition] = useTransition();

  const {
    remainingTime: resendRemainingTime,
    startTimer: startResendTimer,
    resetTimer: resetResendTimer,
  } = useTimer({ initialTime: CODE_EXPIRE_TIME });

  const handleSend = async () => {
    if (!isValidEmail || isSending) return;

    startCertTransition(async () => {
      try {
        const isSentSuccess =
          type === AuthType.Signup ? await SEND_FUNCTION['signUp'](value) : await SEND_FUNCTION['passwordReset'](value);

        if (isSentSuccess) {
          setIsCertNumSent(true);
          startResendTimer();
          startVerifyTimer();
        }
      } catch (error) {
        console.error('Failed to send cert number: ', error);
      }
    });
  };

  // 인증번호 검증 로직 //
  const [isVerified, setIsVerified] = useState(false);
  const [isVerifying, startVerifyTransition] = useTransition();
  const {
    remainingTime: verifyRemainingTime,
    startTimer: startVerifyTimer,
    resetTimer: resetVerifyTimer,
  } = useTimer({ initialTime: CODE_EXPIRE_TIME });

  const handleVerify = async (code: string) => {
    if (isVerifying || !isCertNumSent || !value) return;

    if (code.length !== 6) {
      setCertNumError('인증번호는 6자리여야 합니다.');
      return;
    }

    startVerifyTransition(async () => {
      try {
        const isVerifySuccess =
          type === AuthType.Signup
            ? await VERIFY_FUNCTION['signUp'](value, code)
            : await VERIFY_FUNCTION['passwordReset'](value, code);

        if (isVerifySuccess) {
          setIsCertNumSent(false);
          setIsVerified(true);
          resetResendTimer();
          resetVerifyTimer();
          onVerified?.();
        } else {
          setCertNumError('유효하지 않은 인증번호입니다.');
        }
      } catch (error) {
        console.error('Failed to verify cert number: ', error);
        setCertNumError('인증번호 확인 중 오류가 발생했습니다.');
      }
    });
  };

  const getSendButtonText = useCallback(() => {
    if (isVerified) return SEND_BUTTON_TEXT.completed;
    if (isCertNumSent) return SEND_BUTTON_TEXT.resend;
    if (isSending) return SEND_BUTTON_TEXT.sending;
    return SEND_BUTTON_TEXT.disabled;
  }, [isVerified, isCertNumSent, isSending]);

  const handleInputChange = () => {
    if (isVerified || isCertNumSent) return;

    if (resendRemainingTime > 0 || verifyRemainingTime > 0) {
      resetVerifyTimer();
      resetResendTimer();
      setIsCertNumSent(false);
      setIsVerified(false);
      setCertNumError('');
    }
  };

  return (
    <div className={cn('relative', className)}>
      <Input
        control={control}
        name={name}
        label={label}
        type="email"
        placeholder={placeholder}
        error={error}
        disabled={isVerified}
        rightSlot={
          isSendButtonVisible && (
            <Button
              size="sm"
              variant="outline"
              type="button"
              className={cn('text-xs', isVerified && 'cursor-default')}
              onClick={handleSend}
              disabled={isVerified || (!isValidEmail && !isCertNumSent) || isSending}
            >
              {getSendButtonText()}
            </Button>
          )
        }
        onChange={handleInputChange}
        autoComplete="email"
        {...props}
      />

      {isCertNumSent && verifyRemainingTime > 0 && (
        <CertNumInput
          remainingTime={verifyRemainingTime}
          onVerify={handleVerify}
          isLoading={isVerifying}
          certNumError={certNumError}
          setCertNumError={setCertNumError}
        />
      )}
    </div>
  );
};

export default Authenticator;

const SEND_BUTTON_TEXT = {
  completed: '인증완료',
  sending: '전송 중...',
  disabled: '인증하기',
  resend: '재전송',
};

// TODO: api
const SEND_FUNCTION = {
  signUp: (email: string) => {
    console.info('Sending verification code to:', email);
    return sendCertEmail(email);
  },
  passwordReset: (email: string) => {
    console.info('Sending password reset code to:', email);
    return Promise.resolve(true);
  },
} as const;

const VERIFY_FUNCTION = {
  signUp: (email: string, code: string) => {
    console.info('Verifying signup code:', code, 'for email:', email);
    return verifyCertEmail(email, code);
  },
  passwordReset: (email: string, code: string) => {
    console.info('Verifying password reset code:', code, 'for email:', email);
    return Promise.resolve(code === '123456');
  },
} as const;
