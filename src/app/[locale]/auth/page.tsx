'use client';
import React, { useState } from 'react';
import { Mail, Lock, User, Phone } from 'lucide-react';
import { Transition } from '@headlessui/react';
import toast from 'react-hot-toast';
import {
  useLoginUserMutation,
  useSignUserMutation,
  useForgotPasswordMutation
} from '@/store/authApi';
import { useRouter } from 'next/navigation';
import InputField from '@/app/components/dashboard/InputField';

// Define a type for the RTK Query error object
export interface ApiError {
  data?: {
    message?: string;
    // Fixed: Replaced 'any' with 'unknown' to avoid linting error
    [key: string]: unknown;
  };
  status?: number;
  // Add other properties that might be on the error object
}

interface OnStateChangeProps {
  onStateChange: (state: 'login' | 'signup' | 'forgot') => void;
}

function App() {
  const [cardState, setCardState] = useState<'login' | 'signup' | 'forgot'>('login');

  return (
    <>
      <div className="flex items-center bg-[var(--tunyce-maroon)] justify-center min-h-screen p-4">
        <div className="relative w-full max-w-sm h-[500px] perspective-1000">
          <div
            className="absolute w-full h-full transition-transform duration-700 ease-in-out"
            style={{
              transformStyle: 'preserve-3d',
              transform: cardState === 'forgot' ? 'rotateY(180deg)' : 'rotateY(0deg)',
            }}
          >
            {/* FRONT (Login/Signup inner flip) */}
            <div className="absolute w-full h-full backface-hidden">
              <div
                className="w-full h-full transition-transform duration-700 ease-in-out"
                style={{
                  transformStyle: 'preserve-3d',
                  transform: cardState === 'signup' ? 'rotateY(180deg)' : 'rotateY(0deg)',
                }}
              >
                {/* LOGIN */}
                <div className="absolute w-full h-full backface-hidden bg-white shadow-xl p-8 flex items-center justify-center">
                  <Transition
                    as="div"
                    show={cardState === 'login'}
                    enter="transition-opacity duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition-opacity duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                    className="w-full h-full flex items-center justify-center"
                  >
                    <LoginForm onStateChange={setCardState} />
                  </Transition>
                </div>

                {/* SIGNUP */}
                <div className="absolute w-full h-full backface-hidden bg-white shadow-xl p-8 flex items-center justify-center transform rotate-y-180">
                  <Transition
                    as="div"
                    show={cardState === 'signup'}
                    enter="transition-opacity duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition-opacity duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                    className="w-full h-full flex items-center justify-center"
                  >
                    <SignupForm onStateChange={setCardState} />
                  </Transition>
                </div>
              </div>
            </div>

            {/* BACK (Forgot Password) */}
            <div className="absolute w-full h-full backface-hidden bg-white shadow-xl p-8 flex items-center justify-center transform rotate-y-180">
              <Transition
                as="div"
                show={cardState === 'forgot'}
                enter="transition-opacity duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                className="w-full h-full flex items-center justify-center"
              >
                <ForgotPasswordForm onStateChange={setCardState} />
              </Transition>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const LoginForm: React.FC<OnStateChangeProps> = ({ onStateChange }) => {
  const [loginUser, { isLoading }] = useLoginUserMutation();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const email = (form.email as HTMLInputElement).value;
    const password = (form.password as HTMLInputElement).value;

    try {
      const user = await loginUser({ email, password }).unwrap();
      console.log('✅ Login successful:', user);
       // Save to sessionStorage
      sessionStorage.setItem('accessToken', user?.access);
      sessionStorage.setItem('refreshToken', user?.refresh);
      sessionStorage.setItem('username', user?.username);

      console.log('Login successful, tokens stored in sessionStorage');

      router.push('/dashboard')
      toast.success(`Welcome back, ${user.username || 'User'}!`);
    } catch (err) {
      // Fixed: Type assertion for the error object
      const apiError = err as ApiError;
      console.error('❌ Login failed - full error object', apiError);
      console.error('Status:', apiError?.status);
      console.error('Data:', apiError?.data);

      let message: string = 'Login failed';

      if (apiError?.data) {
        if (typeof apiError.data === 'string') {
          message = apiError.data;
        } else if (typeof apiError.data === 'object') {
          const firstError = Object.values(apiError.data)
            .flat()
            .find((msg) => typeof msg === 'string');
          if (firstError) {
            message = firstError;
          }
        }
      }
      toast.error(message);
    }
  };

  return (
    <div className="flex flex-col w-full text-center p-2 animate-fade-in">
      <h2 className="text-3xl font-bold mb-2 text-slate-800">Welcome Back</h2>
      <form onSubmit={handleSubmit}>
        <InputField label="Email Address" type="email" name="email" Icon={Mail} />
        <InputField label="Password" type="password" name="password" Icon={Lock} />

        <div className="flex justify-end mb-6">
          <button
            type="button"
            className="text-sm text-blue-600"
            onClick={() => onStateChange('forgot')}
          >
            Forgot Password?
          </button>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700"
        >
          {isLoading ? 'Signing in...' : 'Sign In'}
        </button>
      </form>

      <div className="mt-8 text-sm text-slate-600">
        {/* Fixed: Use &apos; for the apostrophe */}
        Don&apos;t have an account?{' '}
        <button
          type="button"
          className="font-semibold text-blue-600"
          onClick={() => onStateChange('signup')}
        >
          Sign up
        </button>
      </div>
    </div>
  );
};

const SignupForm: React.FC<OnStateChangeProps> = ({ onStateChange }) => {
  const [signupUser, { isLoading }] = useSignUserMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    // Fixed: Correctly get the input values by name
    const username = (form.username as HTMLInputElement).value;
    const phone_number = (form.phone_number as HTMLInputElement).value;
    const email = (form.email as HTMLInputElement).value;
    const password = (form.password as HTMLInputElement).value;

    try {
      const user = await signupUser({ username, email, password, phone_number }).unwrap();
      toast.success(`Account created for ${user.name || user.username}!`);
    } catch (err) {
      /// Fixed: Type assertion for the error object
      const apiError = err as ApiError;
      console.error('❌ Login failed - full error object', apiError);
      console.error('Status:', apiError?.status);
      console.error('Data:', apiError?.data);

      let message: string = 'Login failed';

      if (apiError?.data) {
        if (typeof apiError.data === 'string') {
          message = apiError.data;
        } else if (typeof apiError.data === 'object') {
          const firstError = Object.values(apiError.data)
            .flat()
            .find((msg) => typeof msg === 'string');
          if (firstError) {
            message = firstError;
          }
        }
      }
      toast.error(message);
    }
  };

  return (
    <div className="flex flex-col w-full text-center p-2 animate-fade-in">
      <h2 className="text-3xl font-bold mb-2 text-slate-800">Create Account</h2>
      <form onSubmit={handleSubmit}>
        {/* Fixed: Change name from "name" to "username" */}
        <InputField label="Full Name" type="text" name="username" Icon={User} />
        <InputField label="Email Address" type="email" name="email" Icon={Mail} />
        {/* Fixed: Change type from "number" to "tel" for better user experience */}
        <InputField label="Phone Number" type="tel" name="phone_number" Icon={Phone} />
        <InputField label="Password" type="password" name="password" Icon={Lock} />
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 mt-6"
        >
          {isLoading ? 'Creating...' : 'Create Account'}
        </button>
      </form>
      <div className="mt-8 text-sm text-slate-600">
        {/* Fixed: Use &apos; for the apostrophe */}
        Already have an account?{' '}
        <button
          type="button"
          className="font-semibold text-blue-600"
          onClick={() => onStateChange('login')}
        >
          Login
        </button>
      </div>
    </div>
  );
};

const ForgotPasswordForm: React.FC<OnStateChangeProps> = ({ onStateChange }) => {
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const email = (form.email as HTMLInputElement).value;

    try {
      await forgotPassword({ email }).unwrap();
      toast.success('Password reset link sent!');
    } catch (err) {
      // Fixed: Type assertion for the error object
      const apiError = err as ApiError;
      toast.error(apiError?.data?.message || 'Request failed');
    }
  };

  return (
    <div className="flex flex-col w-full text-center p-2 animate-fade-in">
      <h2 className="text-3xl font-bold mb-2 text-slate-800">Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <InputField label="Email Address" type="email" name="email" Icon={Mail} />
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 mt-6"
        >
          {isLoading ? 'Sending...' : 'Send Reset Link'}
        </button>
      </form>
      <div className="mt-8 text-sm text-slate-600">
        Remember your password?{' '}
        <button
          type="button"
          className="font-semibold text-blue-600"
          onClick={() => onStateChange('login')}
        >
          Return to Login
        </button>
      </div>
    </div>
  );
};

export default App;
