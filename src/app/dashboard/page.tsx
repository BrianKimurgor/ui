"use client";
import StatsCard from '@/components/StatsCard';
import { FaProjectDiagram, FaTools, FaBriefcase, FaCheckCircle } from 'react-icons/fa';


export default function Page() {


    // Function to format date

    return (
        <div className="p-2 w-full mx-auto h-full">
            <header className="mb-4">
                <h1 className="text-3xl font-bold text-gray-800">Portfolio Dashboard</h1>
            </header>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatsCard
                    title="Total Projects"
                    value={15}
                    color="#E0F7FA"
                    icon={<FaProjectDiagram />}
                    lastUpdated="April 27, 2025"
                />
                <StatsCard
                    title="Skills"
                    value={25}
                    color="#F1F8E9"
                    icon={<FaTools />}
                    lastUpdated="April 27, 2025"
                />
                <StatsCard
                    title="Experiences"
                    value={5}
                    color="#FFF3E0"
                    icon={<FaBriefcase />}
                    lastUpdated="April 27, 2025"
                />
                <StatsCard
                    title="Status"
                    value="Active"
                    color="#E8EAF6"
                    icon={<FaCheckCircle />}
                    lastUpdated="April 27, 2025"
                />
            </div>

            {/* Recent Activity */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Activity</h2>
                <div className="card bg-white shadow-md rounded-md">
                    <div className="card-body p-0">
                        <ul className="divide-y divide-gray-200">
                            <li className="p-4 hover:bg-gray-50">
                                <div className="flex justify-between flex-row">
                                    <div className="flex flex-row items-center">
                                        <p className="font-medium text-gray-800">Added new project &quot;AI Portfolio Analyzer&quot;</p>
                                        <p className="text-sm text-gray-500 ml-9">Apr 25, 2025 at 10:30 AM</p>
                                    </div>
                                    <span className="badge badge-primary">Project</span>
                                </div>
                            </li>
                            <li className="p-4 hover:bg-gray-50">
                                <div className="flex justify-between">
                                    <div className="flex flex-row items-center">
                                        <p className="font-medium text-gray-800">Updated skill &quot;TypeScript&quot; to Expert level</p>
                                        <p className="text-sm text-gray-500 ml-9">Apr 25, 2025 at 9:15 AM</p>
                                    </div>
                                    <span className="badge badge-secondary">Skill</span>
                                </div>
                            </li>
                            <li className="p-4 hover:bg-gray-50">
                                <div className="flex justify-between">
                                    <div className="flex flex-row items-center">
                                        <p className="font-medium text-gray-800">Updated work experience at &quot;TechCorp&quot;</p>
                                        <p className="text-sm text-gray-500 ml-9">Apr 22, 2025 at 9:45 AM</p>
                                    </div>
                                    <span className="badge badge-accent">Experience</span>
                                </div>
                            </li>
                            <li className="p-4 hover:bg-gray-50">
                                <div className="flex justify-between">
                                    <div className="flex flex-row items-center">
                                        <p className="font-medium text-gray-800">Refreshed portfolio homepage design</p>
                                        <p className="text-sm text-gray-500 ml-9">Apr 20, 2025 at 2:10 PM</p>
                                    </div>
                                    <span className="badge">Update</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* Portfolio Health */}
            <section>
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Portfolio Health</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="card bg-white shadow-md rounded-md">
                        <div className="flex flex-col justify-between h-full p-6 rounded-md">
                            <h3 className="font-semibold text-lg mb-2">Recommendations</h3>
                            <ul className="space-y-2">
                                <li className="flex items-start">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-warning mt-0.5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                    </svg>
                                    <span>Add more detailed descriptions to your 3 most recent projects</span>
                                </li>
                                <li className="flex items-start">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-warning mt-0.5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                    </svg>
                                    <span>Update your profile photo (last updated 6 months ago)</span>
                                </li>
                                <li className="flex items-start">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-success mt-0.5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span>Your skills section is up to date!</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="card bg-white shadow-md rounded-md">
                        <div className="flex flex-col justify-between h-full p-6 rounded-md">
                            <h3 className="font-semibold text-lg mb-2">Visibility Analytics</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm text-gray-500">Portfolio Views</p>
                                    <p className="text-2xl font-bold">1,243</p>
                                    <p className="text-xs text-success flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                        </svg>
                                        12% this month
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Contact Requests</p>
                                    <p className="text-2xl font-bold">8</p>
                                    <p className="text-xs text-success flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                        </svg>
                                        3 new this week
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Most Viewed Project</p>
                                    <p className="text-md font-medium">E-commerce Dashboard</p>
                                    <p className="text-xs text-gray-500">328 views</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Top Skill Interest</p>
                                    <p className="text-md font-medium">React.js</p>
                                    <p className="text-xs text-gray-500">42% of visitors</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}