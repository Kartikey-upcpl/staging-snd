import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { handleOtpMobileSubmit, handleOtpSubmit } from '../account/actions';

export function OtpModal({ isOpen, onClose }: any) {
    const [step, setStep] = useState(1); // Step 1: Mobile Input, Step 2: OTP, Step 3: Success
    const [mobile, setMobile] = useState('');
    const [otp, setOtp] = useState('');
    const [canResendOtp, setCanResendOtp] = useState(false); // Tracks whether "Send Again" is active
    const [timer, setTimer] = useState(30);


    const sendOtp = async () => {
        const result = await handleOtpMobileSubmit(mobile);

        if (result.success) {
            setStep(2); // Move to OTP input step
            setCanResendOtp(false); // Disable "Send Again" button
            setTimer(30); // Reset the timer
        } else {
            alert(result.message); // Show error message
        }
    };

    const verifyOtp = async () => {
        const result = await handleOtpSubmit(mobile, otp);

        if (result.success) {
            setStep(3); // Move to success step
        } else {
            alert(result.message); // Show error message
        }
    };

    // Timer logic
    useEffect(() => {
        let interval: any;
        if (!canResendOtp && timer > 0) {
            interval = setInterval(() => {
                setTimer((prevTimer) => prevTimer - 1);
            }, 1000);
        } else if (timer === 0) {
            setCanResendOtp(true); // Enable "Send Again" button
            clearInterval(interval);
        }

        return () => clearInterval(interval); // Cleanup on component unmount
    }, [timer, canResendOtp]);


    if (!isOpen) return null;

    return (
        <div className='otp_overlay' onClick={onClose}>
            <div className='otp_modal' onClick={(e) => e.stopPropagation()}>
                {step === 1 && (
                    <div className='space-y-5 '>
                        <div className='flex justify-center'>
                            <Image
                                src="/assets/staranddaisy/logo.png"
                                width={143}
                                height={54}
                                alt="Logo"
                                className="logo__image "
                            />
                        </div>
                        {/* <div>
                            <p>
                                Have an account? <a href="#">Login</a>
                            </p>
                        </div> */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                            <span>🇮🇳 +91</span>
                            <input
                                type="text"
                                placeholder="Enter mobile number"
                                value={mobile}
                                onChange={(e) => setMobile(e.target.value)}
                                className='otp_input'
                            />
                        </div>
                        <div>
                            <button onClick={sendOtp} className='otp_button'>Continue</button>
                        </div>
                        <div>
                            <p style={{ marginTop: '8px' }}>
                                <a href="/login">Signup with email</a>
                            </p>
                        </div>
                    </div>
                )}
                {step === 2 && (
                    <div className='space-y-5'>
                        <div className='flex justify-center'>
                            <Image
                                src="/assets/staranddaisy/logo.png"
                                width={143}
                                height={54}
                                alt="Logo"
                                className="logo__image "
                            />
                        </div>
                        <p className='font-medium'>Verify your account</p>
                        <p>Enter the verification code sent to your phone.</p>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                            {Array.from({ length: 6 }).map((_, index) => (
                                <input
                                    key={index}
                                    type="text"
                                    maxLength={1}
                                    className='otp_input text-center w-10'
                                    value={otp[index] || ''}
                                    onChange={(e) => {
                                        const newOtp = otp.split('');
                                        newOtp[index] = e.target.value;
                                        setOtp(newOtp.join(''));

                                        // Automatically move to the next input
                                        if (e.target.value && index < 5) {
                                            const nextInput = document.getElementById(`otp-${index + 1}`);
                                            if (nextInput) {
                                                nextInput.focus();
                                            }
                                        }
                                    }}
                                    id={`otp-${index}`}
                                    onKeyDown={(e) => {
                                        // Allow backspace to move to the previous input
                                        if (e.key === 'Backspace' && index > 0 && !otp[index]) {
                                            const prevInput = document.getElementById(`otp-${index - 1}`);
                                            if (prevInput) {
                                                prevInput.focus();
                                            }
                                        }
                                    }}
                                />
                            ))}
                        </div>
                        <button onClick={verifyOtp} className='otp_button'>Submit</button>
                        <p style={{ marginTop: '8px' }}>
                            Haven’t received the otp? <span >
                                <button
                                    onClick={sendOtp}
                                    disabled={!canResendOtp} // Disable the button if timer is running
                                    style={{ color: canResendOtp ? 'blue' : 'gray', cursor: canResendOtp ? 'pointer' : 'not-allowed' }}
                                >
                                    {canResendOtp ? 'Send again' : `Send again in ${timer}s`}
                                </button>
                            </span>
                        </p>
                    </div>
                )}
                {step === 3 && (
                    <div className='space-y-5'>
                        <div className='flex justify-center'>
                            <Image
                                src="/assets/staranddaisy/logo.png"
                                width={143}
                                height={54}
                                alt="Logo"
                                className="logo__image "
                            />
                        </div>
                        <div style={{ marginBottom: '16px' }}>
                            <span style={{ fontSize: '48px', color: 'green' }}>&#10003;</span>
                        </div>
                        <p className='font-medium'>Account verified!</p>
                        <p>Welcome to Star And Daisy</p>
                        <button className='otp_button'>
                            Go to dashboard
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
