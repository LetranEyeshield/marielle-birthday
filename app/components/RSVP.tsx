"use client";

import { useState } from "react";
import { api } from "@/app/lib/axios";
import toast from "react-hot-toast";

interface RVSPInfo {
  fullName: string;
  email?: string;
  phone: string;
  address: string;
  attending: string;
  guests: number;
  message: string;
}

export default function RSVPForm() {
  const [formData, setFormData] = useState<RVSPInfo>({
    fullName: "",
    email: undefined,
    phone: "",
    address: "",
    attending: "",
    guests: 0,
    message: "",
  });

  const [showForm, setShowForm] = useState(false);

  const [loading, setLoading] = useState(false);

  //   const handleChange = (
  //     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  //   ) => {
  //     setFormData({ ...formData, [e.target.name]: e.target.value });
  //   };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: name === "guests" ? Number(value) : value,
    });
  };

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await api.post("/rsvp", formData);

      toast.success("RSVP sent successfully!", {
        duration: 3000,
        style: {
          padding: "12px 20px",
          borderRadius: "8px",
          textAlign: "center",
        },
      });

      setFormData({
        fullName: "",
        email: undefined,
        phone: "",
        address: "",
        attending: "",
        guests: 0,
        message: "",
      });
    } catch (err: any) {
      console.error("API request failed:", err);

      // ✅ Handle Zod validation errors
      if (err.response?.status === 400 && err.response.data?.errors) {
        const errors = err.response.data.errors;

        errors.forEach((error: any) => {
          //toast.error(`${error.path.join(".")}: ${error.message}`);
          toast.error(`${error.message}`, {
            duration: 10000,
            style: {
              padding: "12px 20px",
              borderRadius: "8px",
              textAlign: "center",
            },
          });
        });

        return;
      }

      // ❌ Other errors
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rsvp-div">
      {showForm && (
        <div
          className="modal-overlay"
          onClick={() => {
            if (!loading) setShowForm(false);
          }}
        >
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <form onSubmit={handleSubmit}>
              <h3 className="dancing-script">RSVP FORM</h3>

              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                className="w-full border rounded text-black bg-white"
                value={formData.fullName}
                onChange={handleChange}
                required
              />

              <input
                type="email"
                name="email"
                placeholder="Email"
                className="w-full border rounded text-black bg-white"
                value={formData.email || ""}
                onChange={handleChange}
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                className="w-full border rounded text-black bg-white"
                value={formData.phone}
                onChange={handleChange}
              />
              <input
                type="text"
                name="address"
                placeholder="Address"
                className="w-full border rounded text-black bg-white"
                value={formData.address}
                onChange={handleChange}
              />
              <select
                name="attending"
                value={formData.attending}
                onChange={handleChange}
              >
                <option value="" disabled>
                  Will You Be Attending?
                </option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
                <option value="maybe">Maybe</option>
              </select>
              <label htmlFor="guests">How many are you bringing?</label>
              <input
                type="number"
                name="guests"
                className="w-full border rounded text-black bg-white"
                value={formData.guests}
                onChange={handleChange}
              />

              <textarea
                name="message"
                placeholder="Message to the birthday celebrant"
                rows={4}
                className="w-full border rounded text-black bg-white"
                value={formData.message}
                onChange={handleChange}
                required
              />

              <div className="modal-actions">
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary"
                >
                  {loading ? "Sending..." : "Send"}
                </button>

                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  disabled={loading}
                  className={`btn-secondary ${loading ? "btn-disabled" : ""}`}
                >
                  {loading ? "Please wait..." : "Cancel"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <button onClick={() => setShowForm(true)} className="rsvp-btn">
        RSVP NOW
      </button>
    </div>
  );
}
