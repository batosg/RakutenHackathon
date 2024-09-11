"use client"

import { useState, useCallback, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import useApi from '@/hooks/useApi';

interface LoginResponse {
    access_token: string;
    token_type: string;
}

interface UseLoginReturnType {
    email: string;
    setEmail: (email: string) => void;
    password: string;
    setPassword: (password: string) => void;
    handleLogin: (e: React.FormEvent) => Promise<void>;
    isLoading: boolean;
    error: string | null;
}

const useLogin = (): UseLoginReturnType => {
    const { data, error, loading, refetch } = useApi();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();
    const currentLoginAttempt = useRef<{ email: string; password: string } | null>(null);

    const fetchLoginData = useCallback((email: string, password: string) => {
        currentLoginAttempt.current = { email, password };
        refetch('/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            data: new URLSearchParams({ email, password })
        });
    }, [refetch]);

    useEffect(() => {
        if (data) {
            const response = data as LoginResponse;
            if (response && response.access_token && currentLoginAttempt.current) {
                localStorage.setItem('access_token', response.access_token);
                router.push('/');
                currentLoginAttempt.current = null;
            }
        }
    }, [data, router]);

    const handleLogin = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();
        fetchLoginData(email, password);
    }, [email, password, fetchLoginData]);

    return {
        email,
        setEmail,
        password,
        setPassword,
        handleLogin,
        isLoading: loading,
        error: error ? error.message : null,
    };
};

export default useLogin;