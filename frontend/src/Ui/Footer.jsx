import React from 'react'

const Footer = () => {
  return (
    <>
  <span className="block h-0.5 w-full bg-gray-300 mx-auto mt-10"></span>
   <footer className=" mt-10 pb-10">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8 text-sm text-gray-600">
        
        {/* Resources */}
        <div>
          <h3 className="font-bold text-black mb-3">Resources</h3>
          <ul className="space-y-2 font-semibold">
            <li><a href="#">Find A Store</a></li>
            <li><a href="#">Become A Member</a></li>
            <li><a href="#">Running Shoe Finder</a></li>
            <li><a href="#">Product Advice</a></li>
            <li><a href="#">Send Us Feedback</a></li>
          </ul>
        </div>

        {/* Help */}
        <div>
          <h3 className="font-bold text-black mb-3">Help</h3>
          <ul className="space-y-2 font-semibold">
            <li><a href="#">Get Help</a></li>
            <li><a href="#">Order Status</a></li>
            <li><a href="#">Delivery</a></li>
            <li><a href="#">Returns</a></li>
            <li><a href="#">Payment Options</a></li>
            <li><a href="#">Contact Us On Nike.com Inquiries</a></li>
            <li><a href="#">Contact Us On All Other Inquiries</a></li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="font-bold text-black mb-3">Company</h3>
          <ul className="space-y-2 font-semibold">
            <li><a href="#">About Nike</a></li>
            <li><a href="#">News</a></li>
            <li><a href="#">Careers</a></li>
            <li><a href="#">Investors</a></li>
            <li><a href="#">Sustainability</a></li>
            <li><a href="#">Impact</a></li>
            <li><a href="#">Report a Concern</a></li>
          </ul>
        </div>
      </div>

      {/* Bottom section */}
      <div className="border-t text-xs text-gray-500 py-5 px-6 flex flex-col md:flex-row md:justify-between items-center max-w-7xl mx-auto">
        <p>© 2025 Nike, Inc. All rights reserved</p>
        <div className="flex flex-wrap gap-4 mt-2 md:mt-0 font-semibold">
          <a href="#">Guides</a>
          <a href="#">Terms of Sale</a>
          <a href="#">Terms of Use</a>
          <a href="#">Nike Privacy Policy</a>
          <a href="#">Privacy Settings</a>
        </div>
        <div className="flex items-center gap-1 mt-2 md:mt-0">
          <span className="text-lg">🌐</span>
          <span>India</span>
        </div>
      </div>
    </footer>
    </>
  )
}

export default Footer