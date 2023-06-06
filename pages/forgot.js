import React from 'react'
import Link from "next/link";
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const Forgot = () => {
  const router = useRouter();
  useEffect(()=>{
    if(localStorage.getItem('token')){
      router.push('/');
    }
  },[])
    return (
        <div>
          <div className="flex min-h-full items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <img className="mx-auto h-12 w-auto" src="/cozyclothscircular.png" alt="Your Company"/>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">htmlForgot Password</h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or
            <Link legacyBehavior href={'/login'}><a href="#" className="font-medium text-gray-600 hover:text-gray-500"> Login </a></Link>
          </p>
        </div>
        <htmlForm className="mt-8 space-y-6" action="#" method="POST">
          <input type="hidden" name="remember" value="true"/>
          <div className="-space-y-px rounded-md shadow-sm">
            <div>
              <label htmlFor="email-address" className="sr-only">Email address</label>
              <input id="email-address" name="email" type="email" autoComplete="email" required className="relative block w-full rounded-t-md border-0 px-1.5 py-1,5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6" placeholder="Email address"/>
            </div>
          </div>
    
          <div>
            <button type="submit" className="group relative flex w-full justify-center rounded-md bg-gray-600 px-3 py-2 text-sm font-semibold text-white hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <svg className="h-5 w-5 text-gray-500 group-hover:text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clipRule="evenodd" />
                </svg>
              </span>
              Continue
            </button>
          </div>
        </htmlForm>
      </div>
    </div>
        </div>
      );
}

export default Forgot
