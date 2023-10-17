import React from 'react';

const TermsAndConditions = () => {
  return (
    <div className="bg-gray-100 min-h-screen p-4 sm:p-8 lg:p-12">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded shadow-md">
        <h1 className="text-3xl font-semibold text-gray-800 mb-4">Terms and Conditions for Using VOYAGER - Article Posting App</h1>

        <div className="text-gray-700 mb-4">
          <p>Welcome to Voyager, a platform that connects writers, readers, and enthusiasts in the world of words. To ensure a secure and enjoyable experience for all, we've laid out the following terms and conditions for using our article posting app. By using Voyager, you agree to abide by these terms and conditions. Please read them carefully.</p>
        </div>

        <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-4">1. Acceptance of Terms</h2>
        <div className="text-gray-700 mb-6">
          <p>By using Voyager, you acknowledge and agree to these terms and conditions. If you do not agree, please refrain from using our app.</p>
        </div>

        <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-4">2. Eligibility</h2>
        <div className="text-gray-700 mb-6">
          <p>You must be at least 13 years of age to use Voyager. If you are under 18 years old, you must have parental or legal guardian consent to use the app.</p>
        </div>

        <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-4">3. Account Registration</h2>
        <div className="text-gray-700 mb-6">
          <p>To access certain features and post articles on Voyager, you are required to register for an account. You agree to provide accurate and complete information when creating your account and to update it promptly if any changes occur.</p>
        </div>

        <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-4">4. User Responsibilities</h2>
        <div className="text-gray-700 mb-6">
          <p>You are responsible for maintaining the confidentiality of your account credentials.</p>
          <p>You agree not to share your account information or allow others to access your account.</p>
          <p>You are responsible for all activities that occur under your account.</p>
          <p>You must notify us immediately if you suspect any unauthorized access to your account.</p>
        </div>

        <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-4">5. Content Posting</h2>
        <div className="text-gray-700 mb-6">
          <p>You are solely responsible for the articles and content you post on Voyager.</p>
          <p>All content must comply with our community guidelines, which prohibit hate speech, harassment, explicit content, or any other harmful material.</p>
          <p>Voyager reserves the right to remove or edit any content that violates these guidelines.</p>
          <p>You grant Voyager a non-exclusive, worldwide, royalty-free license to use, display, reproduce, and distribute your content for the purposes of the app.</p>
        </div>

        {/* Add more sections for each point in your terms and conditions here */}
        
        <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-4">12. Contact Us</h2>
        <div className="text-gray-700 mb-6">
          <p>If you have any questions or concerns regarding these terms and conditions, please contact us at [Your Contact Information].</p>
        </div>

        <p className="text-gray-700 mt-8">
          Thank you for choosing Voyager. We hope you enjoy your journey in the world of articles, knowledge, and creativity. Your support and participation are what make Voyager a thriving community for writers and readers.
        </p>
      </div>
    </div>
  );
};

export default TermsAndConditions;
