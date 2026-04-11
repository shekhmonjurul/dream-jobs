"use client"
import { Lock, User, Eye, EyeOff, LogIn } from 'lucide-react';
import { useRouter } from 'next/navigation'
import { useState } from 'react';
import { signIn } from '@/lib/auth-client';
export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // Custom Color: #07906a
  const brandColor = "#07906a";

  const formAction = async (data: FormData) => {
    setIsLoading(true);
    type formType = FormDataEntryValue | null;
    const userId: formType = data.get('user-id');
    const password: formType = data.get('password');

    const { data: signInData, error: signInError } = await signIn.email({
      email: userId as string,
      password: password as string,
      rememberMe: true,
      callbackURL: "/dashboard"
    });



    if (signInError) {
      console.log("signInError: ", signInError);
    }

    if (signInData) {
      router.push("/dashboard");
      console.log("signInData: ", signInData);
    }

    setIsLoading(false);

  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 text-black">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-300 border border-gray-100">

        {/* Header Section with Brand Color */}
        <div
          className="p-10 text-center"
          style={{ backgroundColor: brandColor }}
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full mb-4 shadow-inner">
            <LogIn className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight">Welcome Back</h2>
          <p className="text-white/80 mt-2 font-medium">Please sign in to your account</p>
        </div>

        {/* Form Section */}
        <div className="p-8">
          <form action={formAction} className="space-y-6">

            {/* User ID Field */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 block ml-1" htmlFor="user-id">
                User ID
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400 group-focus-within:text-[#07906a] transition-colors" />
                </div>
                <input
                  id="user-id"
                  type="text"
                  name='user-id'
                  required
                  className="block w-full pl-10 pr-3 py-3.5 border border-gray-200 rounded-xl leading-5 bg-gray-50 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#07906a] focus:border-transparent transition-all"
                  placeholder="Enter your user ID"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="text-sm font-bold text-gray-700" htmlFor="password">
                  Password
                </label>
                <button
                  type="button"
                  className="text-xs font-semibold hover:underline"
                  style={{ color: brandColor }}
                >
                  Forgot?
                </button>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-[#07906a] transition-colors" />
                </div>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  name='password'
                  required
                  className="block w-full pl-10 pr-10 py-3.5 border border-gray-200 rounded-xl leading-5 bg-gray-50 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#07906a] focus:border-transparent transition-all"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-[#07906a] cursor-pointer"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {/* Remember Me Toggle */}
            <div className="flex items-center">
              <input
                id="remember-me"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 cursor-pointer"
                style={{ accentColor: brandColor }}
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-600 cursor-pointer font-medium">
                Keep me logged in
              </label>
            </div>

            {/* Submit Button with Custom Color */}
            <button
              type="submit"
              disabled={isLoading}
              style={{ backgroundColor: brandColor }}
              className={`w-full flex justify-center items-center py-4 px-4 border border-transparent rounded-xl shadow-lg text-base font-bold text-white hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all active:scale-[0.98] cursor-pointer ${isLoading ? 'opacity-70 cursor-not-allowed' : ''
                }`}
            >
              {isLoading ? (
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                'SIGN IN'
              )}
            </button>
          </form>
        </div>

        {/* Footer */}
        <div className="px-8 py-5 bg-gray-50 border-t border-gray-100 text-center">
          <p className="text-sm text-gray-600 font-medium">
            Don't have an account?{' '}
            <button
              className="font-bold hover:underline"
              style={{ color: brandColor }}
            >
              Create Account
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

