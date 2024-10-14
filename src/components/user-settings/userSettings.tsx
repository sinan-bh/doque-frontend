'use client';
import React, { useState } from 'react';
import Image from 'next/image';

const ProfileSettings: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Profile updated:', { name, email, password, description });
    };

    return (
        <div className="h-full bg-gray-100 p-6">
            <div className="mb-6">
                <h2 className="text-3xl font-bold">My Settings</h2>
            </div>
            <div className="flex w-full mr-10 rounded-lg max-w-6xl mx-auto overflow-hidden shadow-md">
                <div className="flex-1 relative">
                    <div className="relative h-full bg-white p-6 flex items-center">
                        <div className="absolute top-0 left-0 w-full h-2/3 bg-cover bg-center" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1533134486753-c833f0ed4866?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8d2FsbHBhcGVyfGVufDB8fDB8fHww)' }}>
                        </div>
                        <div className="flex items-center">
                            <div className="mr-6 z-10">
                                <Image
                                    src="https://i.pravatar.cc/300"
                                    alt="Profile"
                                    className="rounded-full object-cover border-4 border-white"
                                    width={120}
                                    height={120}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="my-6"></div>
            <div className="max-w-6xl mr-10 mx-auto p-12  bg-white rounded-lg shadow-md relative">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex space-x-8">
                        <div className="flex-1 space-y-4">
                            <div className="flex flex-col">
                                <label className="text-sm font-medium text-gray-700">Full Name</label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
                                    required
                                />
                            </div>
                            <div className="flex flex-col">
                                <label className="text-sm font-medium text-gray-700">Email</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
                                    required
                                />
                            </div>
                            <div className="flex flex-col">
                                <label className="text-sm font-medium text-gray-700">Password</label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
                                />
                            </div>
                            <div className="mt-2">
                                <a href="#" className="text-sm text-blue-500 flex justify-end hover:underline">Change Password</a>
                            </div>
                        </div>
                        <div className="flex-1 flex flex-col justify-between space-y-4">
                            <div className="flex flex-col">
                                <label className="text-sm font-medium text-gray-700">Description</label>
                                <textarea
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    className="p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
                                    rows={6}
                                />
                            </div>
                            <div className="mt-auto">
                                <button
                                    type="submit"
                                    className="px-6 py-2 mr-2 bg-[#F6F8FA] float-end text-black border border-gray-500 rounded-lg shadow-lg hover:bg-gray-100 transition duration-200"
                                >
                                    Save 
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProfileSettings;
