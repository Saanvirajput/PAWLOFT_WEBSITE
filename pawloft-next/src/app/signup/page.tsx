"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import '../Auth.css';

const Signup = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            return setError('Passwords do not match');
        }

        try {
            const { confirmPassword, ...submitData } = formData;
            const response = await fetch('http://localhost:5000/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(submitData)
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('token', data.token);
                router.push('/');
            } else {
                setError(data.msg || 'Signup failed');
            }
        } catch (err) {
            setError('Server error');
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <div className="mb-6 flex justify-center items-center gap-4">
                    <span className="w-8 h-[1px]" style={{ background: 'var(--secondary)' }}></span>
                    <span className="uppercase tracking-[0.3em] text-[10px] font-semibold" style={{ color: 'var(--secondary)' }}>Join the cause</span>
                </div>
                <h2>Institutional Membership</h2>
                <p className="auth-quote">"The greatness of a nation can be judged by the way its animals are treated."</p>
                <p className="auth-subtitle">Start your journey as a hero</p>

                {error && <div className="error-msg">{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Full Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Email Address</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Confirm Password</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
                </form>

                <p className="auth-footer">
                    Already have an account? <Link href="/login">Login</Link>
                </p>
            </div>
        </div>
    );
};

export default Signup;
