import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-100 py-8 px-4 mt-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Links Section */}
          <div>
            <h3 className="font-bold mb-4">Support</h3>
            <ul>
              <li><a href="/help" className="hover:underline">Help Center</a></li>
              <li><a href="/safety" className="hover:underline">Safety Information</a></li>
              <li><a href="/support" className="hover:underline">Cancellation Options</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4">Community</h3>
            <ul>
              <li><a href="/diversity" className="hover:underline">Diversity & Belonging</a></li>
              <li><a href="/refugees" className="hover:underline">Refugees</a></li>
              <li><a href="/accessibility" className="hover:underline">Accessibility</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4">Hosting</h3>
            <ul>
              <li><a href="/hosting" className="hover:underline">Become a Host</a></li>
              <li><a href="/responsible-hosting" className="hover:underline">Responsible Hosting</a></li>
              <li><a href="/host-updates" className="hover:underline">Host Updates</a></li>
            </ul>
          </div>

        </div>

        {/* Social Media & Copyright Section */}
        <div className="border-t border-gray-300 mt-8 pt-4 flex flex-col md:flex-row items-center justify-between">
          <div className="flex space-x-4 text-xl">
            <a href="https://www.facebook.com" target="_blank" rel="noreferrer">
              <FaFacebook className="hover:text-blue-600" />
            </a>
            <a href="https://www.twitter.com" target="_blank" rel="noreferrer">
              <FaTwitter className="hover:text-blue-400" />
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noreferrer">
              <FaInstagram className="hover:text-pink-500" />
            </a>
          </div>
          <div className="text-center text-sm mt-4 md:mt-0">
            &copy; 2024 Airbnb, Inc. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
