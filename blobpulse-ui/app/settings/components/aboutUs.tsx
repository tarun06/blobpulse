"use client";


import {
  ExternalLink,
  BadgeCheck,
  Briefcase,
  Cloud,
  Database,
  Cpu,
} from "lucide-react";


export default function AboutUs() {
  const skills = [
    "Azure",
    ".NET",
    "Solution Architecture",
    "Cloud FinOps",
    "Next.js",
    "Storage Optimization",
    "Enterprise Systems",
    "AI Integration",
  ];


  const features = [
    "Duplicate Detection",
    "Storage Waste Analysis",
    "Cost Optimization",
    "Region-Based Pricing",
    "Operational Insights",
    "FinOps Reporting",
  ];


  return (
    <div className="bg-[#0F172A] p-6 rounded-2xl border border-white/10 shadow-lg">


      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-xs uppercase tracking-widest text-white/40">
            About
          </p>


          <h2 className="text-xl font-semibold text-white mt-1">
            BlobPulse
          </h2>
        </div>


        <BadgeCheck className="w-6 h-6 text-cyan-400" />
      </div>


      {/* PROFILE */}
      <div className="flex items-center gap-4">


        <div className="relative">
          <img
            src="https://media.licdn.com/dms/image/v2/C5103AQFUlNPmhbfTLQ/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1516673669811?e=2147483647&v=beta&t=RQaqCj-hwCK8-9a2mK-5G4bA8DUQaB_gGHUmFaXaHnc"
            alt="Tarun Kalal"
            className="w-20 h-20 rounded-full object-cover border border-white/10"
          />


          <span className="absolute bottom-1 right-1 w-3 h-3 rounded-full bg-green-400 border-2 border-[#0F172A]" />
        </div>


        <div>
          <h3 className="text-lg font-semibold text-white">
            Tarun Kalal
          </h3>


          <p className="text-cyan-400 text-sm">
            Software Architect & Lead Engineer
          </p>


          <p className="text-white/50 text-sm mt-1">
            Building scalable systems across cloud, enterprise, and data platforms.
          </p>
        </div>


      </div>


      {/* ABOUT */}
      <div className="mt-6 space-y-3 text-sm leading-relaxed text-white/70">


        <p>
          Building cloud systems that prioritize performance, scale, and cost efficiency.
        </p>


        <p>
          BlobPulse helps teams understand Azure Blob Storage usage, detect duplication, and reduce storage costs through actionable insights.
        </p>


      </div>


      {/* SKILLS */}
      <div className="mt-6">


        <p className="text-xs uppercase tracking-widest text-white/40 mb-3">
          Expertise
        </p>


        <div className="flex flex-wrap gap-2">


          {skills.map((skill) => (
            <span
              key={skill}
              className="px-3 py-1 rounded-full text-xs
              bg-cyan-500/10 border border-cyan-500/20
              text-cyan-300"
            >
              {skill}
            </span>
          ))}


        </div>
      </div>


      {/* TECH */}
      <div className="mt-6">


        <p className="text-xs uppercase tracking-widest text-white/40 mb-3">
          Technology
        </p>


        <div className="grid grid-cols-2 gap-3 text-sm">


          <div className="flex items-center gap-2 text-white/70">
            <Cloud className="w-4 h-4 text-cyan-400" />
            Azure Cloud
          </div>


          <div className="flex items-center gap-2 text-white/70">
            <Cpu className="w-4 h-4 text-cyan-400" />
            .NET Core
          </div>

          <div className="flex items-center gap-2 text-white/70">
            <Database className="w-4 h-4 text-cyan-400" />
            Data Systems
          </div>

          <div className="flex items-center gap-2 text-white/70">
            <Briefcase className="w-4 h-4 text-cyan-400" />
            Enterprise Platforms
          </div>


        </div>
      </div>


      {/* FEATURES */}
      <div className="mt-6">
        <p className="text-xs uppercase tracking-widest text-white/40 mb-3">
          BlobPulse Features
        </p>


        <div className="grid md:grid-cols-2 gap-2 text-sm text-white/70">
          {features.map((feature) => (
            <div key={feature}>✓ {feature}</div>
          ))}
        </div>
      </div>
      
      {/* LINK */}
      <div className="mt-6">
        <a
          href="https://in.linkedin.com/in/tarun-kalal-27050353"
          target="_blank"
          rel="noopener noreferrer"
          className="
            inline-flex items-center gap-2
            px-4 py-2 rounded-lg
            bg-cyan-500/10 border border-cyan-500/20
            text-cyan-400 hover:bg-cyan-500/20
            transition
          "
        >
          <ExternalLink className="w-4 h-4" />
          Connect on LinkedIn
        </a>


      </div>


      {/* FOOTER */}
      <div className="mt-6 pt-4 border-t border-white/10">


        <p className="text-xs text-white/40">
          Designed & Developed by Tarun Kalal
        </p>


        <p className="text-xs text-white/30 mt-1">
          BlobPulse • Azure Storage Optimization Platform
        </p>


      </div>


    </div>
  );
}