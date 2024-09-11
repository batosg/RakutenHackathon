"use client"

import { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useApi from '@/hooks/useApi';

interface RegisterResponse {
    user_id: string,
    name: string,
    email: string,
    rakuten_id: string
}

interface UseRegisterReturnType {
    username: string;
    setUsername: (username: string) => void;
    email: string;
    setEmail: (email: string) => void;
    password: string;
    setPassword: (password: string) => void;
    confirmPassword: string;
    setConfirmPassword: (confirmPassword: string) => void;
    handleRegister: (e: React.FormEvent) => Promise<void>;
    isLoading: boolean;
    error: string | null;
}

const useRegister = (): UseRegisterReturnType => {
    const { data, error, loading, refetch } = useApi();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const router = useRouter();

    const fetchRegisterData = useCallback((name: string, email: string, password: string) => {
        refetch('/users/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            data: new URLSearchParams({ name, email, password })
        });
    }, [refetch]);

    useEffect(() => {
        if (data) {
            const response = data as RegisterResponse;
            console.log(response)
            if (response) {
                router.push('/auth/login');
            }
        }
    }, [data]);

    const handleRegister = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            console.log('パスワードが一致しません')
            return;
        }
        fetchRegisterData(username, email, password);
    }, [username, email, password, confirmPassword, fetchRegisterData]);

    return {
        username,
        setUsername,
        email,
        setEmail,
        password,
        setPassword,
        confirmPassword,
        setConfirmPassword,
        handleRegister,
        isLoading: loading,
        error: error ? error.message : null,
    };
};

export default useRegister;
