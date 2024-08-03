import React, { useEffect, useState } from "react";
import { FaPhoneAlt, FaTelegram, FaWhatsapp, FaEnvelope } from "react-icons/fa";
import { NavBar2 } from "./NavBar2";

interface ContactDetails {
  whatsapp_no: string;
  mobile_no_1: string;
  mobile_no_2: string;
  email_1: string;
  telegram_no: string;
  withdraw_proof: string;
}

const ContactUs = () => {
  const [contactDetails, setContactDetails] = useState<ContactDetails | null>(
    null
  );
  useEffect(() => {
    const fetchContactDetails = async () => {
      try {
        const response = await fetch(
          "https://development.smapidev.co.in/api/Api/app_details"
        );
        if (!response.ok) throw new Error("contact details is not fetched");
        const data = await response.json();
        setContactDetails(data.data.contact_details);
        console.log(data.data.contact_details);
      } catch (error) {
        console.error("there is a problem in fetching data", error);
      }
    };
    fetchContactDetails(); // fetchContactDetails calling here
  }, []);
  return (
    <div>
      <NavBar2 isContactUs={true} />
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4">
          {/* Mobile Number */}
          <div
            className="flex items-center bg-white p-4 rounded-lg shadow-md justify-center"
            onClick={() => {
              if (contactDetails) {
                window.location.href = `tel:${contactDetails.mobile_no_1}`;
              }
            }}
          >
            <FaPhoneAlt className="text-blue-500 mr-2" />
            <div>
              <p className="text-lg font-semibold">Mobile Number</p>
              <p className="text-gray-600">+{contactDetails?.mobile_no_1}</p>
            </div>
          </div>
          {/* Telegram */}
          <div className="flex items-center bg-white p-4 rounded-lg shadow-md justify-center">
            <FaTelegram className="text-blue-500 mr-2" />
            <div className="overflow-x-scroll">
              <p className="text-lg font-semibold">Telegram</p>
              <a href={contactDetails?.telegram_no} className="text-gray-600 ">
                {contactDetails?.telegram_no}
              </a>
            </div>
          </div>
          {/* WhatsApp */}
          <div
            className="flex items-center bg-white p-4 rounded-lg shadow-md justify-center"
            onClick={() => {
              window.location.href = `https://wa.me/+${contactDetails?.whatsapp_no}`;
            }}
          >
            <FaWhatsapp className="text-green-500 mr-2" />
            <div>
              <p className="text-lg font-semibold">WhatsApp</p>
              <p className="text-gray-600">+{contactDetails?.whatsapp_no}</p>
            </div>
          </div>
          {/* Email */}
          <div className="flex items-center bg-white p-4 rounded-lg shadow-md justify-center">
            <FaEnvelope className="text-red-500 mr-2" />
            <div>
              <p className="text-lg font-semibold">Email</p>
              <a href="mailto:example@example.com" className="text-gray-600">
                {contactDetails?.email_1}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
