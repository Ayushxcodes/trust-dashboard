"use client";

import { useState, useTransition, useEffect, useRef } from "react";
import Link from "next/link";
import { register } from "../actions";

export default function RegisterPage() {
  const [step, setStep] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  // Segmented Onboarding Type: "professional" | "corporate"
  const [clientType, setClientType] = useState<"professional" | "corporate">("corporate");

  // Step 1: Corporate Identity / Professional Firm
  const [companyName, setCompanyName] = useState("");
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [address, setAddress] = useState("");
  const [jurisdiction, setJurisdiction] = useState("United Kingdom (Companies House)");
  const [taxId, setTaxId] = useState("");
  const [membershipNumber, setMembershipNumber] = useState("");
  const [isMembershipValid, setIsMembershipValid] = useState<boolean | null>(null);
  const [isCheckingMembership, setIsCheckingMembership] = useState(false);

  // Step 2: Credentials
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Step 3: Entity Classification
  const [entityType, setEntityType] = useState("Private Limited Company (Ltd / Corp)");

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMembershipChange = (val: string) => {
    setMembershipNumber(val);
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    if (clientType === "professional" && val.trim().length >= 5) {
      setIsCheckingMembership(true);
      setError(null);

      timerRef.current = setTimeout(() => {
        setIsCheckingMembership(false);
        if (
          val.toUpperCase().startsWith("FCS-") ||
          val.toUpperCase().startsWith("ACS-") ||
          val.toUpperCase().startsWith("FCA-") ||
          val.toUpperCase().startsWith("ACA-") ||
          val.length >= 6
        ) {
          setIsMembershipValid(true);
        } else {
          setIsMembershipValid(false);
          setError("ICAI/ICSI Membership Number lookup failed. Must start with FCS-, ACS-, FCA- or ACA-.");
        }
      }, 1000);
    } else {
      setIsCheckingMembership(false);
      setIsMembershipValid(null);
    }
  };

  const handleClientTypeChange = (type: "professional" | "corporate") => {
    setClientType(type);
    setError(null);
    setIsCheckingMembership(false);
    setIsMembershipValid(null);
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
  };

  // Password Complexity Verification: Uppercase, number, special character, 8 min length
  const isPasswordComplex = (pass: string) => {
    const uppercase = /[A-Z]/.test(pass);
    const number = /[0-9]/.test(pass);
    const special = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(pass);
    const minLength = pass.length >= 8;
    return uppercase && number && special && minLength;
  };

  // Step validation check
  const isStep1Valid = () => {
    if (clientType === "corporate") {
      return companyName.trim() !== "" && registrationNumber.trim() !== "" && address.trim() !== "";
    } else {
      return companyName.trim() !== "" && registrationNumber.trim() !== "" && address.trim() !== "" && membershipNumber.trim() !== "" && isMembershipValid === true;
    }
  };

  const isStep2Valid = () => {
    return (
      name.trim() !== "" &&
      email.trim() !== "" &&
      mobileNumber.trim() !== "" &&
      isPasswordComplex(password) &&
      password === confirmPassword
    );
  };

  const handleNextStep = () => {
    setError(null);
    if (step === 1) {
      if (!isStep1Valid()) {
        if (clientType === "professional" && isMembershipValid !== true) {
          setError("Membership verification is pending or invalid.");
        } else {
          setError("Please complete all required identity details.");
        }
        return;
      }
      setStep(2);
    } else if (step === 2) {
      if (!isStep2Valid()) {
        if (!isPasswordComplex(password)) {
          setError("Password must be at least 8 characters, containing uppercase, numeric, and special characters.");
        } else if (password !== confirmPassword) {
          setError("Password confirmation does not match.");
        } else {
          setError("Please complete all credentials inputs.");
        }
        return;
      }
      setStep(3);
    }
  };

  const handlePrevStep = () => {
    setError(null);
    setStep((s) => Math.max(1, s - 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!isStep1Valid() || !isStep2Valid()) {
      setError("Form validation failed. Please check all steps inputs.");
      return;
    }

    startTransition(async () => {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("companyName", companyName);
      formData.append("role", "USER");

      const res = await register(formData);
      if (res && !res.success) {
        setError(res.error || "An unexpected registration error occurred.");
      }
    });
  };

  return (
    <div className="min-h-screen bg-[#F0F4F8] text-[#0B1528] flex flex-col md:flex-row font-sans selection:bg-indigo-500 selection:text-white">
      
      {/* LEFT PANE: BRANDING DETAILS */}
      <aside className="md:w-5/12 bg-[#0B1528] text-slate-350 p-10 flex flex-col justify-between border-r border-[#152238] shrink-0">
        
        {/* Top Header */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gradient-to-tr from-teal-400 to-emerald-400 flex items-center justify-center rounded">
              <span className="font-extrabold text-[#0B1528] text-base tracking-wider">TL</span>
            </div>
            <div>
              <span className="text-lg font-black text-white tracking-widest uppercase block">TrustLink</span>
              <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest block leading-none">
                Compliance Infrastructure
              </span>
            </div>
          </div>

          <div className="space-y-4 pt-8">
            <h2 className="text-2xl font-black text-white tracking-tight leading-snug">
              Dematerialization & Compliance Sync Engines
            </h2>
            <p className="text-xs text-slate-400 leading-relaxed">
              Accelerate physical folio electronic conversions under Rule 9B. TrustLink connects corporate entities directly to depository registrars, legal specialists, and the Ministry of Corporate Affairs data networks.
            </p>
          </div>
        </div>

        {/* Mid Features */}
        <div className="space-y-4 py-8 border-y border-[#152238] my-8">
          <div className="flex items-start gap-3 text-xs">
            <svg className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <div>
              <span className="font-bold text-white block">Sovereign Data Storage</span>
              <span className="text-[10px] text-slate-400 block">Full compliance with regional digital sovereignty directives.</span>
            </div>
          </div>

          <div className="flex items-start gap-3 text-xs">
            <svg className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 8H17" />
            </svg>
            <div>
              <span className="font-bold text-white block">NSDL / CDSL API Integration</span>
              <span className="text-[10px] text-slate-400 block">Real-time sync of digital depository credit letters and audit logs.</span>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest space-y-1">
          <span>© 2026 Registry Administration Systems</span>
          <span className="block">Version 4.2.0-stable</span>
        </div>
      </aside>

      {/* RIGHT PANE: REGISTRATION FORM WIZARD */}
      <section className="flex-1 p-8 md:p-12 flex flex-col justify-between overflow-y-auto">
        
        {/* Header Navigation */}
        <header className="flex items-center justify-between pb-6 border-b border-zinc-200/60 shrink-0 mb-6">
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-zinc-400">
            Registration Portal
          </span>
          <Link
            href="/login"
            className="px-3 py-1 rounded border border-dashed border-zinc-300 text-zinc-500 hover:text-zinc-800 text-[10px] font-bold uppercase tracking-widest"
          >
            Cancel Registration
          </Link>
        </header>

        {/* Central Card Area */}
        <div className="max-w-2xl w-full mx-auto flex-1 flex flex-col justify-center space-y-6">
          
          <div className="flex justify-between items-end">
            <h1 className="text-xl font-bold tracking-tight text-zinc-900">Onboarding Workflow</h1>
            <span className="text-[9px] font-extrabold bg-[#E2E8F0] px-2 py-0.5 rounded text-zinc-650 tracking-wider uppercase">
              STEP {step} OF 3
            </span>
          </div>

          {/* Steps Horizontal Line */}
          <div className="grid grid-cols-3 gap-4 border-b border-zinc-200 pb-4 text-center">
            <div className="flex flex-col items-center">
              <span className={`w-6 h-6 rounded flex items-center justify-center text-xs font-extrabold transition-colors ${
                step === 1 ? "bg-[#0B1528] text-white" : "border border-zinc-300 text-zinc-455 bg-white"
              }`}>
                1
              </span>
              <span className={`text-[9px] font-extrabold uppercase mt-2 tracking-widest ${
                step === 1 ? "text-zinc-900" : "text-zinc-400"
              }`}>
                Organization
              </span>
            </div>

            <div className="flex flex-col items-center">
              <span className={`w-6 h-6 rounded flex items-center justify-center text-xs font-extrabold transition-colors ${
                step === 2 ? "bg-[#0B1528] text-white" : "border border-zinc-300 text-zinc-455 bg-white"
              }`}>
                2
              </span>
              <span className={`text-[9px] font-extrabold uppercase mt-2 tracking-widest ${
                step === 2 ? "text-zinc-900" : "text-zinc-400"
              }`}>
                Credentials
              </span>
            </div>

            <div className="flex flex-col items-center">
              <span className={`w-6 h-6 rounded flex items-center justify-center text-xs font-extrabold transition-colors ${
                step === 3 ? "bg-[#0B1528] text-white" : "border border-zinc-300 text-zinc-455 bg-white"
              }`}>
                3
              </span>
              <span className={`text-[9px] font-extrabold uppercase mt-2 tracking-widest ${
                step === 3 ? "text-zinc-900" : "text-zinc-400"
              }`}>
                Entity Type
              </span>
            </div>
          </div>

          {/* Card container */}
          <div className="bg-white border border-zinc-200 rounded p-6 md:p-8 shadow-md">
            
            {error && (
              <div className="mb-6 p-3.5 rounded bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold flex items-center gap-2">
                <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <span>{error}</span>
              </div>
            )}

            {/* STEP 1: ORGANIZATION / PROFESSIONAL SEGMENT */}
            {step === 1 && (
              <div className="space-y-6">
                
                {/* Onboarding Segmented Control Tab */}
                <div className="space-y-2">
                  <label className="block text-[10px] font-extrabold text-zinc-500 uppercase tracking-wider">
                    Onboarding Category
                  </label>
                  <div className="grid grid-cols-2 p-1 bg-zinc-100 rounded border border-zinc-200">
                    <button
                      type="button"
                      onClick={() => handleClientTypeChange("corporate")}
                      className={`py-2 text-center text-xs font-extrabold rounded uppercase tracking-wider transition-all cursor-pointer ${
                        clientType === "corporate"
                          ? "bg-white text-[#0B1528] shadow-sm"
                          : "text-zinc-450 hover:text-zinc-700"
                      }`}
                    >
                      Corporate Client
                    </button>
                    <button
                      type="button"
                      onClick={() => handleClientTypeChange("professional")}
                      className={`py-2 text-center text-xs font-extrabold rounded uppercase tracking-wider transition-all cursor-pointer ${
                        clientType === "professional"
                          ? "bg-white text-[#0B1528] shadow-sm"
                          : "text-zinc-450 hover:text-zinc-700"
                      }`}
                    >
                      Practicing Professional
                    </button>
                  </div>
                </div>

                {/* Form Fields grid */}
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="block text-[10px] font-extrabold text-zinc-500 uppercase tracking-wider">
                        {clientType === "corporate" ? "Full Legal Name" : "Firm Legal Name"}
                      </label>
                      <input
                        type="text"
                        required
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        placeholder={clientType === "corporate" ? "e.g. Global Holdings Ltd" : "e.g. Sterling Audit Partners"}
                        className="w-full px-4 py-2 rounded border border-zinc-200 bg-zinc-50/30 text-xs text-zinc-800 placeholder-zinc-400 focus:outline-none focus:border-indigo-500 focus:bg-white transition-all"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-[10px] font-extrabold text-zinc-500 uppercase tracking-wider">
                        {clientType === "corporate" ? "Registration Number" : "Firm Registration Number"}
                      </label>
                      <input
                        type="text"
                        required
                        value={registrationNumber}
                        onChange={(e) => setRegistrationNumber(e.target.value)}
                        placeholder="CRN-000-000-000"
                        className="w-full px-4 py-2 rounded border border-zinc-200 bg-zinc-50/30 text-xs text-zinc-800 placeholder-zinc-400 focus:outline-none focus:border-indigo-500 focus:bg-white transition-all"
                      />
                    </div>
                  </div>

                  {/* Address */}
                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-extrabold text-zinc-500 uppercase tracking-wider">
                      Registered Business Address
                    </label>
                    <input
                      type="text"
                      required
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Principal Place of Business"
                      className="w-full px-4 py-2 rounded border border-zinc-200 bg-zinc-50/30 text-xs text-zinc-800 placeholder-zinc-400 focus:outline-none focus:border-indigo-500 focus:bg-white transition-all"
                    />
                  </div>

                  {/* Conditional ICAI/ICSI Hook */}
                  {clientType === "professional" ? (
                    <div className="space-y-1.5">
                      <div className="flex justify-between items-center">
                        <label className="block text-[10px] font-extrabold text-zinc-500 uppercase tracking-wider">
                          ICAI / ICSI Membership Number
                        </label>
                        {isCheckingMembership && (
                          <span className="text-[9px] font-bold text-zinc-450 animate-pulse">Checking status...</span>
                        )}
                        {isMembershipValid === true && (
                          <span className="text-[9px] font-bold text-emerald-650 flex items-center gap-0.5">
                            ● ACTIVE MEMBER (VERIFIED)
                          </span>
                        )}
                        {isMembershipValid === false && (
                          <span className="text-[9px] font-bold text-rose-650">
                            ● REGISTRAR MATCH FAILED
                          </span>
                        )}
                      </div>
                      <input
                        type="text"
                        required
                        value={membershipNumber}
                        onChange={(e) => handleMembershipChange(e.target.value)}
                        placeholder="e.g. FCS-12345 or ACS-67890"
                        className="w-full px-4 py-2 rounded border border-zinc-200 bg-zinc-50/30 text-xs text-zinc-800 placeholder-zinc-400 focus:outline-none focus:border-indigo-500 focus:bg-white transition-all"
                      />
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="block text-[10px] font-extrabold text-zinc-500 uppercase tracking-wider">
                          Jurisdiction
                        </label>
                        <select
                          value={jurisdiction}
                          onChange={(e) => setJurisdiction(e.target.value)}
                          className="w-full px-4 py-2 rounded border border-zinc-200 bg-zinc-50/30 text-xs text-zinc-800 focus:outline-none focus:border-indigo-500 focus:bg-white transition-all"
                        >
                          <option>United Kingdom (Companies House)</option>
                          <option>United States (Delaware)</option>
                          <option>India (MCA)</option>
                          <option>Singapore (ACRA)</option>
                        </select>
                      </div>

                      <div className="space-y-1.5">
                        <label className="block text-[10px] font-extrabold text-zinc-500 uppercase tracking-wider">
                          PAN / Tax ID (Permanent Account Number)
                        </label>
                        <input
                          type="text"
                          value={taxId}
                          onChange={(e) => setTaxId(e.target.value)}
                          placeholder="e.g. ABCDE1234F (Form Input Grid)"
                          className="w-full px-4 py-2 rounded border border-zinc-200 bg-zinc-50/30 text-xs text-zinc-800 placeholder-zinc-400 focus:outline-none focus:border-indigo-500 focus:bg-white transition-all"
                        />
                        <span className="text-[9px] text-emerald-650 font-bold block">
                          ✓ Standard form grid input (No file upload required at sign-up)
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-zinc-150 flex justify-end">
                  <button
                    type="button"
                    onClick={handleNextStep}
                    disabled={!isStep1Valid()}
                    className="px-6 py-2.5 rounded bg-[#0B1528] hover:bg-[#1E293B] text-white text-xs font-bold tracking-wider uppercase transition-colors flex items-center gap-1.5 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shadow"
                  >
                    Next Phase →
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: CREDENTIALS */}
            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-base font-bold text-zinc-900">Representative Credentials</h3>
                  <p className="text-zinc-500 text-xs mt-0.5">
                    Establish contact email and password credentials for account management.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-extrabold text-zinc-500 uppercase tracking-wider">
                      Authorized Representative Name
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Jane Doe"
                      className="w-full px-4 py-2 rounded border border-zinc-200 bg-zinc-50/30 text-xs text-zinc-800 placeholder-zinc-400 focus:outline-none focus:border-indigo-500 focus:bg-white transition-all"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-extrabold text-zinc-500 uppercase tracking-wider">
                      Mobile Number
                    </label>
                    <input
                      type="text"
                      required
                      value={mobileNumber}
                      onChange={(e) => setMobileNumber(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full px-4 py-2 rounded border border-zinc-200 bg-zinc-50/30 text-xs text-zinc-800 placeholder-zinc-400 focus:outline-none focus:border-indigo-500 focus:bg-white transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[10px] font-extrabold text-zinc-500 uppercase tracking-wider">
                    Official Corporate Email
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="jane@company.com"
                    className="w-full px-4 py-2 rounded border border-zinc-200 bg-zinc-50/30 text-xs text-zinc-800 placeholder-zinc-400 focus:outline-none focus:border-indigo-500 focus:bg-white transition-all"
                  />
                </div>

                {/* Password Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-extrabold text-zinc-500 uppercase tracking-wider">
                      Access Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full pl-4 pr-10 py-2 rounded border border-zinc-200 bg-zinc-50/30 text-xs text-zinc-800 placeholder-zinc-400 focus:outline-none focus:border-indigo-500 focus:bg-white transition-all"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        tabIndex={-1}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-700 transition-colors focus:outline-none cursor-pointer"
                      >
                        {showPassword ? (
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                          </svg>
                        ) : (
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        )}
                      </button>
                    </div>
                    <span className="text-[9px] text-zinc-400 block pt-0.5">
                      Enforce: 8+ characters, uppercase, number, special char.
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-extrabold text-zinc-500 uppercase tracking-wider">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full pl-4 pr-10 py-2 rounded border border-zinc-200 bg-zinc-50/30 text-xs text-zinc-800 placeholder-zinc-400 focus:outline-none focus:border-indigo-500 focus:bg-white transition-all"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        tabIndex={-1}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-700 transition-colors focus:outline-none cursor-pointer"
                      >
                        {showConfirmPassword ? (
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                          </svg>
                        ) : (
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-zinc-150 flex justify-between">
                  <button
                    type="button"
                    onClick={handlePrevStep}
                    className="px-6 py-2.5 rounded border border-zinc-300 bg-white hover:bg-zinc-50 text-zinc-650 text-xs font-bold tracking-wider uppercase transition-colors cursor-pointer shadow-sm"
                  >
                    ← Previous Phase
                  </button>
                  <button
                    type="button"
                    onClick={handleNextStep}
                    disabled={!isStep2Valid()}
                    className="px-6 py-2.5 rounded bg-[#0B1528] hover:bg-[#1E293B] text-white text-xs font-bold tracking-wider uppercase transition-colors flex items-center gap-1.5 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shadow"
                  >
                    Next Phase →
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: ENTITY CLASSIFICATION & SANDBOX TIER */}
            {step === 3 && (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <h3 className="text-base font-bold text-zinc-900">Entity Classification</h3>
                  <p className="text-zinc-500 text-xs mt-0.5">
                    Select the legal structure of your enterprise for compliance tiering.
                  </p>
                </div>

                {/* Entity Type Radio Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                  {[
                    "Private Limited Company (Ltd / Corp)",
                    "Public Limited Company (Plc)",
                    "Partnership / Trust Association",
                    "Sole Proprietorship / Independent Rep",
                  ].map((type) => (
                    <label
                      key={type}
                      className={`p-4 rounded border flex items-center justify-between cursor-pointer transition-all ${
                        entityType === type
                          ? "bg-indigo-50/40 border-indigo-250 shadow-sm"
                          : "bg-zinc-50/30 border-zinc-200 hover:bg-zinc-50"
                      }`}
                    >
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-zinc-800">{type}</span>
                        <span className="text-[9px] text-zinc-400 mt-0.5">Compliance Level Tier {type.includes("Public") ? "1" : "2"}</span>
                      </div>
                      <input
                        type="radio"
                        name="entityType"
                        value={type}
                        checked={entityType === type}
                        onChange={() => setEntityType(type)}
                        className="accent-[#0B1528] h-4 w-4"
                      />
                    </label>
                  ))}
                </div>

                <div className="pt-4 border-t border-zinc-150 flex justify-between">
                  <button
                    type="button"
                    onClick={handlePrevStep}
                    disabled={isPending}
                    className="px-6 py-2.5 rounded border border-zinc-300 bg-white hover:bg-zinc-50 text-zinc-650 text-xs font-bold tracking-wider uppercase transition-colors cursor-pointer shadow-sm disabled:opacity-50"
                  >
                    ← Previous Phase
                  </button>
                  <button
                    type="submit"
                    disabled={isPending}
                    className="px-6 py-2.5 rounded bg-[#0B1528] hover:bg-[#1E293B] text-white text-xs font-bold tracking-wider uppercase transition-colors flex items-center gap-1.5 cursor-pointer shadow disabled:opacity-50"
                  >
                    {isPending ? (
                      <>
                        <svg className="animate-spin h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Creating Account...
                      </>
                    ) : (
                      <>
                        Create Institutional Account ✓
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}

          </div>

        </div>

        {/* Bottom security support rows */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs leading-relaxed max-w-4xl w-full mx-auto mt-8 shrink-0">
          <div className="p-4 rounded border border-zinc-200 bg-white/50 space-y-1.5">
            <h4 className="font-extrabold text-[#0B1528] text-[10px] uppercase tracking-wider">Security Standard</h4>
            <p className="text-zinc-550 text-[10px]">
              All data is encrypted via AES-256 protocols. Your information is stored on sovereign cloud infrastructure compliant with global regulatory frameworks.
            </p>
          </div>

          <div className="p-4 rounded border border-zinc-200 bg-white/50 space-y-1.5">
            <h4 className="font-extrabold text-[#0B1528] text-[10px] uppercase tracking-wider">Verification SLA</h4>
            <p className="text-zinc-550 text-[10px]">
              Most entity verifications are processed within 24 hours. Complex multi-jurisdictional structures may require additional documentation and manual review.
            </p>
          </div>

          <div className="p-4 rounded border border-zinc-200 bg-white/50 space-y-1.5">
            <h4 className="font-extrabold text-[#0B1528] text-[10px] uppercase tracking-wider">Institutional Support</h4>
            <p className="text-zinc-550 text-[10px]">
              Require assistance with entity classification? Contact our dedicated registrar helpdesk available 24/7 for institutional clients.
            </p>
          </div>
        </div>

        {/* Page Footer */}
        <footer className="max-w-6xl w-full mx-auto border-t border-zinc-200/60 pt-4 mt-6 flex flex-col sm:flex-row items-center justify-between text-[9px] font-bold text-zinc-400 uppercase tracking-widest gap-2 shrink-0">
          <span>© 2026 Registry Administration Systems | V4.2.0-Stable</span>
          <div className="flex gap-4">
            <Link href="#privacy" className="hover:text-zinc-650 transition-colors">Privacy Policy</Link>
            <span>/</span>
            <Link href="#terms" className="hover:text-zinc-650 transition-colors">Terms of Access</Link>
          </div>
        </footer>

      </section>

    </div>
  );
}
