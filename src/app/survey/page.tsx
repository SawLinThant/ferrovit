import Input from '@/components/common/Input';
import Dropdown from '@/components/common/Dropdown';

const SurveyPage = () => {
  const genderOptions = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'other', label: 'Other' }
  ];

  const ageOptions = [
    { value: '18-24', label: '18-24 years' },
    { value: '25-34', label: '25-34 years' },
    { value: '35-44', label: '35-44 years' },
    { value: '45-54', label: '45-54 years' },
    { value: '55+', label: '55+ years' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                Lorem ipsum dolor sit amet
              </h1>
              <p className="text-gray-600">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>

            <form action="/api/survey" method="POST">
              <div className="space-y-6">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">
                    Personal Information
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                      label="First Name"
                      name="firstName"
                      placeholder="Enter your first name"
                      required
                    />
                    <Input
                      label="Last Name"
                      name="lastName"
                      placeholder="Enter your last name"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <Dropdown
                      label="Gender"
                      name="gender"
                      options={genderOptions}
                      required
                    />
                    <Dropdown
                      label="Age Group"
                      name="ageGroup"
                      options={ageOptions}
                      required
                    />
                  </div>

                  <div className="mt-6">
                    <Input
                      label="Email Address"
                      name="email"
                      type="email"
                      placeholder="Enter your email address"
                      required
                    />
                  </div>

                  <div className="mt-6">
                    <Input
                      label="Phone Number"
                      name="phone"
                      type="tel"
                      placeholder="Enter your phone number"
                      required
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="bg-red-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-red-700 transition-colors"
                  >
                    Next
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SurveyPage; 